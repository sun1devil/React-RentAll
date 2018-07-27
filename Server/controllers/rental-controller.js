const axios = require("axios");
const db = require("../models");

const stripe = require('stripe')('sk_test_BPb1AswqaVLPqiZiIJKbmeHu');
// Defining methods for the nytController

// findAll searches the NYT API and returns only the entries we haven't already saved
module.exports = {

  create: function(req, res){
    if(req.isAuthenticated()){
    //   const rental = {
    //   itemUUID: this.state.item.uuui,
    //   ownerUUID: this.set.item.userUUID,
    //   rentalTotal: this.getTotal(),
    //   formatMonths: this.state.formattedMonthObj,
    //   availabileDates: this.state.availabileDates
    //   chosenDates: this.state.chosenDates
    // }
    db.StripeCustomer
    .findOne({where:{
      userUUID:req.session.passport.user
    }})
    .then(dbSC=>{

          // When it's time to charge the customer again, retrieve the customer ID.
      stripe.charges.create({
        amount: req.body.rentalTotal * 100, // $15.00 this time
        currency: 'usd',
        customer: dbSC.dataValues["customer_id"] // Previously stored, then retrieved
      }), function(err, customer) {
          if(err){
            console.log("err", err)
          }
      }
      req.json(dbSC)
    })
    .catch(err => res.status(422).json(err));


    }else{res.status(422).json(err)}
  }
};
