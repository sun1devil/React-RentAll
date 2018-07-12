
var uuidv1  = require('uuid/v1');

module.exports = function(sequelize, DataTypes) {
    var Availability = sequelize.define("Availability", {
        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique :true
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false
        },
        days: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    // associations ======================

    Availability.associate = function(models){
        Availability.belongsTo(models.Item, {
            foreignKey: "itemUUID"
        });
    };

    return Availability;
}
