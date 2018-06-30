
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
            type: DateTypes.STRING,
        },

        lastFour: {
            type: DataTypes.STRING,
        }
    });

    // methods ======================
    
    StripeCustomer.associate = function(models){
        StripeCustomer.belongTo(models.User, {
            foreignKey: "UserUUID"
        });
    };

    return StripeCustomer;
}