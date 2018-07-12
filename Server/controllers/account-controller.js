const db = require("../models");

const passport = require('passport');

const stripe = require('stripe')('sk_test_BPb1AswqaVLPqiZiIJKbmeHu');
// Defining methods for the accountController
module.exports = {
  getCurrentUserId: function(req){
    let userId;
    if(req.isAuthenticated()){
      userId = req.session.passport.user;
      console.log(`user: ${userId}`);
    } else {
      userId = false
    }
    return userId
  },

  checkAuthentication: function(req){
    if(req.isAuthenticated()){
      return true
    }
    else {
      return false
    }
  },
  // findAll: function(req, res) {
  //   db.account
  //     .findAll()
  //     .then(dbaccount =>{
  //       let  accounts = [];
  //       dbaccount.forEach(account => {
  //         accounts.push({
  //           uuid:account.dataValues.uuid,
  //           email: account.dataValues.email,
  //           createdAt: account.dataValues.createdAt
  //         });

  //       })

  //       res.json(accounts);
  //     })
  //     .catch(err => res.status(422).json(err));
  // },
  findById: function(req, res) {

    if(req.isAuthenticated()){
       db.Account
        .findOne({
          where: {
            userUUID: req.session.passport.user
          }
        })
        .then(dbaccount => {
          const results = dbaccount.dataValues;
          const account = {
            createdAt: results.createdAt,
            updatedAt: results.updateAt,
            name: results.name,
            phone: results.phone,
            street: results.street,
            city: results.city,
            state: results.state,
            country: results.country,
            zip: results.zip,
            lat: results.lat,
            lng: results.lng,
            lastFour: results.lastFour,
            cardExpire: results.cardExpire
          }

          res.json(account);
        })
        .catch(err => res.status(422).json(err));
    }
  },
  create: function(req, res) {
    // console.log("body", req.body);
    if(req.isAuthenticated()){

      const account ={
        name: req.body.user.name,
        street: req.body.user.street,
        city: req.body.user.city,
        state: req.body.user.state,
        country: req.body.user.country,
        phone: req.body.user.phone,
        zip: req.body.stripeToken.card.address_zip,
        lat: parseFloat(req.body.user.lat),
        lng: parseFloat(req.body.user.lng),
        lastFour: req.body.stripeToken.card.last4,
        cardExpire: `${req.body.stripeToken.card.exp_month}/${req.body.stripeToken.card.exp_year}`,
        userUUID: req.session.passport.user
      }
      const token = req.body.stripeToken.id

    db.Account
      .create(account)
      .then(dbaccount => {
        // console.log("create", dbaccount)

        stripe.customers.create({
          metadata: {
            userUUID: req.session.passport.user,
            name: req.body.user.name
          },
          email: req.body.email,
          source: token // obtained with Stripe.js

        }, function(err, customer) {
          if(err){
            console.log("err", err)
          }

          db.StripeCustomer
          .create({customer_id:customer.id, userUUID: req.session.passport.user})
          .then(dbSC=>{
            console.log("dbSC", dbSC)
          })

          // asynchronously called
        });

        // res.json(dbaccount)
      })
      .catch(err => console.log("err", err));
      //res.status(422).json(err)
    }
  },
  update: function(req, res) {
    if(req.isAuthenticated()){
      db.Account
        .update(req.body, { where:{ userUUID: req.session.passport.user }}, )
        .then(dbaccount => {
          console.log("update ", dbaccount)
          //res.json(dbaccount)
        })
        .catch(err => {
          console.log("err",err)
          // res.status(422).json(err)
        });
    }
  }
  // remove: function(req, res) {
  //   db.account
  //     .findById({ _id: req.params.id })
  //     .then(dbaccount => dbaccount.remove())
  //     .then(dbaccount => res.json(dbaccount))
  //     .catch(err => res.status(422).json(err));
  // },



};

