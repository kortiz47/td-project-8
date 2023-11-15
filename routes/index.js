//PART OF EXPRESS SETUP
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

//==================================ROUTES=====================================

/** Rendered Home Route redirected to /books */
router.get('/', async(req, res)=>{
  const bookInstances = await Book.findAll();
  const booksJSON = bookInstances.map(book => book.toJSON());
  console.log(booksJSON)
  res.render('index', {books: booksJSON});
});


/** Rendered New Book Form /books/new route */

router.get('/new', (req, res)=>{
  res.render('new-book');
})

// //should post a new book to the database
// // router.post('/books/new', (req, res)=>{
// //   res.render('new-book');
// // })

/** Rendered Book Detail Page /books/:id  */
router.get('/:id', (req,res)=>{
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