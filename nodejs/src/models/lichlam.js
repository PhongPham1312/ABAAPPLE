'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lichlam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Lichlam.init({
    user: DataTypes.STRING,
    ngay: DataTypes.STRING,
    ca: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Lichlam',
  });
  return Lichlam;
};