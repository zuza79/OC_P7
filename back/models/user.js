// user.model
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


module.exports = (sequelize, Sequelize) => {
  const Users =  sequelize.define('user', {
    'user_id': {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'firstname': {
      type: Sequelize.STRING,
      
    },
    "lastname": {
      type: Sequelize.STRING
    },
    "pseudo": {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    'email': {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    'password': {
      type: Sequelize.STRING(64),
      is: /^[0-9a-f]{64}$/i
    }, 
    'role':{
      type : Sequelize.STRING,
      allowNull : false
    },
    'createdAt': {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
   'updatedAt': {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }

  }, {
    tableName: 'users',
    freezeTableName: true,
    timestamps: false
  });
  return Users
};