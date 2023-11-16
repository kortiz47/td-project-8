//ADDED ON STEP 4 - CREATE BOOK MODEL
'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
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
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};