//PART OF EXPRESS SETUP
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

//=============================TRY/CATCH HANDLER=============================
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      next(error);
    }
  }
}

//==================================ROUTES=====================================

/** RENDER Home Route redirected to ( /books )*/
router.get('/', asyncHandler(async (req, res) => {
  const bookInstances = await Book.findAll();
  const pageBtns = Math.ceil((bookInstances.length)/10);
  const booksJSON = bookInstances.map(book => book.toJSON());
  res.render('index', { books: booksJSON, pageBtns});
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
    book = await Book.create(req.body);
    res.redirect('/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      const bookJSON = book.toJSON();
      const errorMsgs = error.errors.map(error => error.message);
      const titleError = errorMsgs.includes("The 'title' input cannot be blank. Please add a title.");
      const authorError = errorMsgs.includes("The 'author' input cannot be blank. Please add an author.");
      console.log(errorMsgs);
      
      res.render('new-book', {error: errorMsgs, noTitle: titleError, noAuthor: authorError, book: bookJSON});
    } else {
      throw error;
    }
  }
})
);

/** Rendered Book Detail Page ( /books/:id ) */
router.get('/:id', asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const bookInstances = await Book.findAll();
  const booksJSON = bookInstances.map(book => book.toJSON());
  const bookIDs = booksJSON.map(book => book.id);
  if (bookIDs.includes(parseInt(id))) {
    const bookMatch = booksJSON.find(book => book.id == id);
    res.render('update-book', { book: bookMatch });
  } else {
    const error = new Error();
    error.status = 404;
    error.message = '404 Error: The book you are looking for does not exist';
    next(error);
  }
}));


/** Update Book Information  ( /books/:id ) POST*/
router.post('/:id', asyncHandler(async(req,res)=>{
  let updatedBook;
  const id = parseInt(req.params.id);
  try{
    const findBookByPk = await Book.findByPk(id);
    if(findBookByPk){
      updatedBook = await findBookByPk.update(req.body);
      res.redirect('/');
    }else{
      res.sendStatus(404);
    }
  }catch(error){
    if (error.name === 'SequelizeValidationError') {
      updatedBook = await Book.build(req.body);
      updatedBook.id = req.params.id;
      const errorMsgs = error.errors.map(error => error.message);
      const titleError = errorMsgs.includes("The 'title' input cannot be blank. Please add a title.");
      const authorError = errorMsgs.includes("The 'author' input cannot be blank. Please add an author.");
      res.redirect(`/books/${id}`, {book: updatedBook, error: errorMsgs, titleErr: titleError, authorErr: authorError});
    } else {
      throw error;
    }
  }
}))

/** Delete Book ( /books/:id/delete ) POST */
router.post('/:id/delete', asyncHandler(async(req, res) => {
  const id = req.params.id;
  const bookById = await Book.findByPk(id);
  await bookById.destroy();
  res.redirect('/');
})
);

//=========================Exports==========================
module.exports = router;