const router = require("express").Router();
const userController = require("../../controllers/user-controller");
const passport = require('passport');

<<<<<<< HEAD
// Matches with "/api/item"
=======
// Matches with "/api/user"
>>>>>>> 1fa97ed60a247ef905ad7134fdfe690854d54c23
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

<<<<<<< HEAD
// Matches with "/api/item/:id"
router
  .route("/:id")
=======
// Matches with "/api/user"
router
  .route("/")
>>>>>>> 1fa97ed60a247ef905ad7134fdfe690854d54c23
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
