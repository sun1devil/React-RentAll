const db = require("../models");

const passport = require('passport');

// Defining methods for the articleController
module.exports = {
  // findAll: function(req, res) {
  //   db.Article
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbArticle => res.json(dbArticle))
  //     .catch(err => res.status(422).json(err));
  // },
  // findById: function(req, res) {
  //   db.Article
  //     .findById(req.params.id)
  //     .then(dbArticle => res.json(dbArticle))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    if(req.isAuthenticated()){
    const item = {
      categoryUUID: req.body.item_categoryid,
      userUUID: req.session.passport.user,
      category: req.body.item_category,
      description: req.body.item_description,
      featured: req.body.item_featured,
      availability: req.body.available_dates,
      disabled: req.body.disabled_dates,
      price: req.body.item_price,
    };

    console.log("item", item);

      db.Item.create(item)
      .then(dbItem => {
        let imageFile = req.files.file;
        let filePath = `${__dirname}/../../Client/public/assets/uploads/${dbItem.uuid}.jpg`
        console.log('filpath', filePath);
        imageFile.mv(filePath, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });

        res.json(dbItem)
      }).catch(err => res.status(422).json(err));
    }
    else {res.status(422).json(err)}
  },

  findWhere:function(req, res){
    console.log(req.params.id, req.params.location);
    let location = []
    if(req.params.location !== undefined){
      ocation = req.params.location.split("%");
    }

    if(req.params.id !== undefined){
      if(location.length>0){
         db.Item
         .findAll(
          {where:{categoryUUID:req.params.id}
        })
        .then(dbItem=>{
            res.json(dbItem);
        })
        .catch(err => {
          console.log("err",err)
          res.status(422).json(err)
        });
      }
      db.Item
        .findAll(
          {where:{categoryUUID:req.params.id}
        })
        .then(dbItem=>{
            res.json(dbItem);
        })
        .catch(err => {
          console.log("err",err)
          res.status(422).json(err)
        });

    }else {
      db.Item
        .findAll()
        .then(dbItem=>{
            res.json(dbItem);
        })
        .catch(err => {
          console.log("err",err)
          res.status(422).json(err)
        });
    }
  }
  // update: function(req, res) {
  //   db.Article
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbArticle => res.json(dbArticle))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Article
  //     .findById({ _id: req.params.id })
  //     .then(dbArticle => dbArticle.remove())
  //     .then(dbArticle => res.json(dbArticle))
  //     .catch(err => res.status(422).json(err));
  // }
};
