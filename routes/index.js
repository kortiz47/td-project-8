//PART OF EXPRESS SETUP
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

/* GET home page. Redirected to /books */

/** need to fix the logging of error */
router.get('/', async(req, res, next)=>{
  const books = await Book.findAll();
  //console.log(books);
  res.json(books);
  // const error = new Error();
  // error.status = 500;
  // next(error);
});

//Main page route /books
router.get('/books', (req, res)=>{
  res.render('index');
})


//Exports
module.exports = router;