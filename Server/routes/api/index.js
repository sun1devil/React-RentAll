const router = require("express").Router();

const UserRoutes 	= require("./user");
const AccountRoutes = require("./account");
const ItemRoutes 	= require("./item");
const categoryRoutes 	= require("./category");

router.use("/user", UserRoutes);

router.use("/account", AccountRoutes);

router.use("/item", ItemRoutes);

router.use("/category", categoryRoutes);


module.exports = router;
