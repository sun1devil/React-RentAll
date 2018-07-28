var uuidv1  = require('uuid/v1');
var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    var Rental = sequelize.define("Rentals",{
        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique :true
        },
        rentalDates: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalCost: {
            type: DataTypes.DECIMAL(12,2),
            allowNull: false
        },
        itemUUID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        itemOwnerUUID: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });

    // associations ======================

    Rental.associate = function(models){
        Rental.belongsTo(models.User, {foreignKey: "userUUID"});
    }

    return Rental;
}
