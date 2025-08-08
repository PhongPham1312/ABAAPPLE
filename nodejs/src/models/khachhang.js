'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khachhang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Khachhang.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    diachi: DataTypes.STRING,
    cmt: DataTypes.STRING,
    cms: DataTypes.STRING,
    type: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Khachhang',
  });
  return Khachhang;
};