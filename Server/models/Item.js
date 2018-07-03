var uuidv1  = require('uuid/v1');
var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    var Items = sequelize.define("Items",{

        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique :true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                notNull:true,
                notEmpty:true

            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
                min: 1,
                notNull:true,
                notEmpty:true
            }
        },

        price: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },

        rate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min: 1,
                notNull:true,
                notEmpty:true
            }
        },

        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                notNull:true,
                notEmpty:true
            }
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

    Items.associate = function(models){
        Items.belongsTo(models.User, {
            foreignKey: "UserUUID"
        });
    }

    // Items.associate = function(models){
    //     Items.hasMany(models.Rental, {
    //         foreignKey: "rental_id"
    //     });
    // }

    return Items;
}
