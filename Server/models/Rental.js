module.exports = function(sequelize, DataTypes) {
    var Rental = sequelize.define("Rentals",{
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        total_cost: {
            type: DataTypes.DECIMAL(12,2),
            allowNull: false
        }
    });

    // associations ======================

    Rental.associate = function(models){
        Rental.belongsTo(models.User, {foreignKey: "userUUID"});
    }

     Rental.associate = function(models){
        Rental.belongsTo(models.Item, {foreignKey: "itemUUID"});
    }

    return Rental;
}
