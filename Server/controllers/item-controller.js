const db = require("../models");

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
    console.log("req",req)
    const item = {
      category: req.body.item_category,
      featured: req.body.item_featured
    };

    // console.log(item);



    // db.Item
    //   .create(item)
    //   .then(dbItem => {
    //      let imageFile = req.files.file;
    //       let filePath = `${__dirname}/../../Client/public/assets/uploads/${dbItem.uuid}.jpg`
    //       console.log('filpath', filePath);

    //       imageFile.mv(filePath, function(err) {
    //         if (err) {
    //           return res.status(500).send(err);
    //         }
    //       });
    //   })
    //   .catch(err => res.status(422).json(err));
  },
  findWhere:function(req, res){
    console.log(req.params.id, req.params.location);

    const location = req.params.location.split("%");
    if(req.params.id !== undefined){
      if(location.length>0){
         db.Item
         .findAll(
          {where:{categoryUUID:req.params.id},
          include: [{// Notice `include` takes an ARRAY
                model: db.User,
                where: { city: location[0], state: location[1]}
              }]
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
        .findAll({
          include: [{// Notice `include` takes an ARRAY
                model: User,
                where: { city: location[0], state: location[1]}
              }]
        })
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
