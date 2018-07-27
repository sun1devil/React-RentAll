const router = require("express").Router();
const rentalController = require("../../controllers/rental-controller");

// Matches with "/api/rental"
router.route("/")
  	.post(rentalController.create)




module.exports = router;
