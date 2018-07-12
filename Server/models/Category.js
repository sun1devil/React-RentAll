var uuidv1  = require('uuid/v1');

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique :true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique :true
        }
    });

    return Category;
}
