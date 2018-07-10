
var uuidv1  = require('uuid/v1');

module.exports = function(sequelize, DataTypes) {
    var StripeCustomer = sequelize.define("StripeCustomer", {

        uuid: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          isUnique :true
        },

        customer_id: {
            type: DataTypes.STRING,
        },

        lastFour: {
            type: DataTypes.STRING,
        }
    });

    // methods ======================

    StripeCustomer.associate = function(models){
        StripeCustomer.belongsTo(models.User, {
            foreignKey: "userUUID"
        });
    };

    return StripeCustomer;
}
