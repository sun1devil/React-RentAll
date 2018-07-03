const router = require("express").Router();
const userController = require("../../controllers/user-controller");
const passport = require('passport');

// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/user"
router
  .route("/")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;