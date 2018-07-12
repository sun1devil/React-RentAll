const router = require("express").Router();
const accountController = require("../../controllers/account-controller");

// Matches with "/api/account/all"
router.route("/all")
  // .get(accountController.findAll)


// Matches with "/api/account"
router.route("/")
	.get(accountController.findById)
  	.post(accountController.create)

  // .put(accountController.update)
  // .delete(accountController.remove);



module.exports = router;
