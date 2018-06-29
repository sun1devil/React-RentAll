
var uuidv1  = require('uuid/v1');

var bcrypt  = require('bcrypt');


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {

        uuid: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          isUnique :true
        },
       
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                min: 4,
                notNull:true,
                notEmpty:true
            }
        },

        local_pw: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                min:6,
                notNull:true,
                notEmpty:true
            }
        },

        createdAt: Sequelize.DATE, 
        updatedAt: Sequelize.DATE

    });
    // methods ======================
      // generating a hash
      User.generateHash = function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      };

      // checking if password is valid
      User.prototype.validPassword = function(password) {
          return bcrypt.compareSync(password, this.local_pw);
      };

    User.associate = function(models){
        User.hasMany(models.Items, {
            foreignKey: "owner_id",
            onDelete: "cascade"
        });
    };

    User.associate = function(models){
        User.hasMany(models.Rentals, {
            foreignKey: "rental_id"
        });
    };

    return Accounts;
}