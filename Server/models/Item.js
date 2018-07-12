var uuidv1  = require('uuid/v1');
var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    var Item = sequelize.define("Item",{

        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique :true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

    });

    // associations ======================

    Item.associate = function(models){
        Item.belongsTo(models.User, {
            foreignKey: "userUUID"
        });
    }

    Item.associate = function(models){
        Item.hasMany(models.Rental, {
            foreignKey: "rentalUUID"
        });
    }

    Item.associate = function(models){
        Item.hasMany(models.Availability, {
            foreignKey: "AvailabilityUUID"
        });
    }

    Item.associate = function(models){
        Item.belongsTo(models.Category, {
            foreignKey: "categoryUUID"
        });
    };

    return Item;
}
