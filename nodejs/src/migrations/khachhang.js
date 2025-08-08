'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Khachhangs', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      diachi: {
        type: Sequelize.STRING
      },
      cmt: {
        type: Sequelize.STRING
      },
      cms: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING,
      },
      type: {
            type: Sequelize.STRING,
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Khachhangs');
  }
};