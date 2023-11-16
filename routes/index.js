//PART OF EXPRESS SETUP
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

//=============================TRY/CATCH HANDLER FOR PROMISES==================
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  }
}
//==================================ROUTES=====================================

/** RENDER Home Route redirected to ( /books )*/
router.get('/', asyncHandler(async (req, res) => {
  const bookInstances = await Book.findAll();
  const booksJSON = bookInstances.map(book => book.toJSON());
  res.render('index', { books: booksJSON });
})
);


/** RENDER New Book Form ( /books/new ) */

router.get('/new', (req, res) => {
  res.render('new-book');
})

/** POST New Book to Database ( /books/new )  */

router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    console.log(req.body);
    book = await Book.create(req.body);
    console.log(book);
    res.send('post request for new book');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.log(error);
    } else {
      throw error;
    }
  }
})
);

/** Rendered Book Detail Page /books/:id  */
router.get('/:id', asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const bookInstances = await Book.findAll();
  if (id <= bookInstances.length) {
    res.render('update-book');
  } else {
    const error = new Error();
    error.status = 404;
    error.message = '404 Error: The book you are looking for does not exist';
    next(error);
  }
}));

//Updates book info in the database
// router.post('/books/:id', (req,res)=>{
//   res.render('update-book');
// })

//Deletes a book. Be careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
// router.post('/books/:id/delete', (req, res)=>{

// })

//Exports
module.exports = router;