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

router.get('/books/new', (req, res)=>{
  res.render('new-book');
})

//should post a new book to the database
// router.post('/books/new', (req, res)=>{
//   res.render('new-book');
// })

//Shows book detail form
router.get('/books/:id', (req,res)=>{
  res.render('update-book');
})

//Updates book info in the database
// router.post('/books/:id', (req,res)=>{
//   res.render('update-book');
// })

//Deletes a book. Be careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
// router.post('/books/:id/delete', (req, res)=>{

// })

//Exports
module.exports = router;