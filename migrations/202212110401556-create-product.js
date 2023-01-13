'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      merchant_id: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'Merchant',

          // This is the column name of the referenced model
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [3, 50]
        }
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min: 1
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min: 10000
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product');
  }
};