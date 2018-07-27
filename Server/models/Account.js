
var uuidv1  = require('uuid/v1');

module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique :true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lastFour: {
            type: DataTypes.STRING,
            allowNull: false

        },
        cardExpire: {
            type: DataTypes.STRING,
            allowNull: false

        }
    });

    // associations ======================

    Account.associate = function(models){
        Account.belongsTo(models.User, {
            foreignKey: "userUUID",
            onDelete: "cascade"
        });
    };

    return Account;
}
