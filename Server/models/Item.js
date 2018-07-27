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
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
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
        categoryUUID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        availability:{
            type: DataTypes.STRING
        },
         disabled:{
            type: DataTypes.STRING
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
    return Item;
}
