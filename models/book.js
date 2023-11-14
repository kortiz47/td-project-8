//ADDED ON STEP 4 - CREATE BOOK MODEL
'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "The 'title' input cannot be blank. Please add a title."
        },
        notEmpty: {
          msg: "The 'title' input cannot be blank. Please add a title."
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The 'author' input cannot be blank. Please add an author."
        },
        notEmpty: {
          msg: "The 'author' input cannot be blank. Please add an author."
        }
      }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};