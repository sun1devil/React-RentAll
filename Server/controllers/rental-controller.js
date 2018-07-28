const axios  = require("axios");
const db     = require("../models");
const moment = require("moment");

const stripe = require('stripe')('sk_test_BPb1AswqaVLPqiZiIJKbmeHu');
// Defining methods for the nytController

// findAll searches the NYT API and returns only the entries we haven't already saved
module.exports = {

  create: function(req, res){
    if(req.isAuthenticated()){

    const rental = {
      rentalDates: JSON.stringify(req.body.chosenDates),
      totalCost: req.body.rentalTotal,
      itemUUID: req.body.itemUUID,
      itemOwnerUUID: req.body.ownerUUID,
      userUUID: req.session.passport.user
    }

    const item = {
        userUUID: req.body.itemUUID,
        availability: [],
        disabled: []
    }

    console.log(rental);
    // console.log("rental", req.body);

    
    // loop through the availabileDates
    // conver to mm/d/yyyy format
    // then remove any date that is in both the availabileDates and chosenDates
    // cover unavailable dates to an array push chosen dates and covert to a string


    db.StripeCustomer
    .findOne({where:{
      userUUID:req.session.passport.user
    }})
    .then(dbSC=>{
      console.log(dbSC)
    //When it's time to charge the customer again, retrieve the customer ID.
      stripe.charges.create({
        amount: req.body.rentalTotal * 100, // $15.00 this time
        currency: 'usd',
        customer: dbSC.dataValues["customer_id"] // Previously stored, then retrieved
      }), function(err, customer) {
          if(err){
            console.log("err", err);
          }
          console.log("customer", customer)
          // create rental here
          // db.Rental.create(rental)
          // .then(dbrental=>{
          //   console.log(dbrental)
          //   // update item availability
          
          // .catch(err => console.log(err));
          
      }
      //req.json(dbSC)
    })
            // console.log(dbrental)
      .catch(err => res.status(422).json(err));
    }
    else{res.status(422)}
  }
};
