const router = require("express").Router();

const UserRoutes 	= require("./user");
const AccountRoutes = require("./account");
const ItemRoutes 	= require("./item");

router.use("/user", UserRoutes);

router.use("/account", AccountRoutes);

router.use("/item", ItemRoutes);


module.exports = router;
