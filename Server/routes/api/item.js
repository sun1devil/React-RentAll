const router = require("express").Router();
const itemController = require("../../controllers/item-controller");

// Matches with "/api/item"
router.route("/")
  .get(itemController.findAll)
  .post(itemController.create);

// Matches with "/api/item/:id"
router
  .route("/:id")
  .get(itemController.findById)
  .put(itemController.update)
  .delete(itemController.remove);

module.exports = router;
