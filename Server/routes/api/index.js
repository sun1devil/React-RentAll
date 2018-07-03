const router = require("express").Router();
const UserRoutes = require("./user");
const ItemRoutes = require("./item");

router.use("/user", UserRoutes);

router.use("/item", ItemRoutes);

module.exports = router;
