
var uuidv1  = require('uuid/v1');

module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {

        uuid: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          isUnique :true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$",'i'],
                min:1,
                notNull:true,
                notEmpty:true
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$",'i'],
                min:1,
                notNull:true,
                notEmpty:true
            }
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                notNull:true,
                notEmpty:true
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$",'i'],
                min:1,
                notNull:true,
                notEmpty:true
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$",'i'],
                min: 1,
                notNull:true,
                notEmpty:true
            }
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                not: ["[a-z]",'i'],
                min: 1,
                notNull:true,
                notEmpty:true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isInt: true,
                not: ["[a-z]",'i'],
                len: [10],
                notNull:true,
                notEmpty:true
            }
        }
    });
    // methods ======================

    Account.associate = function(models){
        Account.belongsTo(models.User, {
            foreignKey: "UserUUID"
        });
    };

    return Account;
}
