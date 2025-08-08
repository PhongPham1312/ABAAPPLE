'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thuchi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Thuchi.init({
    type: DataTypes.STRING,
    content: DataTypes.STRING,
    money: DataTypes.STRING,
    ngay: DataTypes.STRING,
    link: DataTypes.STRING,
    dam: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Thuchi',
  });
  return Thuchi;
};