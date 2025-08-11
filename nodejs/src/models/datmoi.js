'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Datmoi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Datmoi.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    tentk: DataTypes.STRING,
    tennh: DataTypes.STRING,
    sotk: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Datmoi',
  });
  return Datmoi;
};