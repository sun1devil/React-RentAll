var Sequelize = require("sequelize");

var uuidv1  = require('uuid/v1');

var bcrypt  = require('bcrypt');


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {

        uuid: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          isUnique :true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique :true,
            validate: {
                isEmail: true,
                min: 2,
            }
        },

        local_pw: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                min:6,
            }
        },

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

    });

    // methods ======================
      // generating a hash
      User.generateHash = function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      };

      // checking if password is valid
      User.prototype.validPassword = function(password) {
          return bcrypt.compareSync(password, this.local_pw);
      };

    // associations ======================

    // User.associate = function(models){
    //     User.hasMany(models.Item, {
    //         foreignKey: "itemUUID",
    //         onDelete: "cascade"
    //     });
    // };

    // User.associate = function(models){
    //     User.hasMany(models.Rental, {
    //         foreignKey: "rentalUUID",
    //         onDelete: "cascade"
    //     });
    // };

    // User.associate = function(models){
    //     User.hasOne(models.Account, {
    //         foreignKey: "accountUUID",
    //         onDelete: "cascade"
    //     });
    // };

    // User.associate = function(models){
    //     User.hasOne(models.StripeCustomer, {
    //         foreignKey: "stripeCustomerUUID",
    //         onDelete: "cascade"
    //     });
    // };

    return User;
}
