const router = require("express").Router();
const categoryController = require("../../controllers/category-controller");

// Matches with "/api/category"
router.route("/")
  .get(categoryController.findAll);

// Matches with "/api/category/id"
router.route("/:id")
	.get(categoryController.findById)
  	.put(categoryController.update)
  	.delete(categoryController.remove);

// Matches with "/api/category/rtyhj456fghjki87ytgbnjki8" (admin only)
router.route("/rtyhj456fghjki87ytgbnjki8")
  	.post(categoryController.create)



module.exports = router;
