const db = require("../models");

// Defining methods for the categoryController
module.exports = {
  findAll: function(req, res) {
    db.Category
      .findAll()
      .then(dbcategory =>{
        res.json(dbcategory)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
       db.Category
        .findById(req.params.id)
        .then(dbcategory => res.json(dbcategory))
        .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Category
      .create(req.body)
      .then(dbcategory => res.json(dbcategory))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Category
      .update(req.body, { where:{ uuid: req.params.id }}, )
      .then(dbcategory => res.json(dbcategory))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Category
      .findById(req.param.id)
      .then(dbcategory => dbcategory.remove())
      .then(dbcategory => res.json(dbcategory))
      .catch(err => res.status(422).json(err));
  }
};

