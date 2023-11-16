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
    book = await Book.create(req.body);
    res.redirect('/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.log(error);
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


/** Update Book Information  ( /books/:id ) */
router.post('/:id', asyncHandler(async(req,res)=>{
  let updatedBook;
  try{
    const id = parseInt(req.params.id);
    const findBookByPk = await Book.findByPk(id);
    if(findBookByPk){
      updatedBook = await findBookByPk.update(req.body);
      res.redirect('/');
    }else{
      res.sendStatus(404);
    }
  }catch(error){
    if (error.name === 'SequelizeValidationError') {
      console.log(error);
    } else {
      throw error;
    }
  }
}))

//Deletes a book. Be careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
// router.post('/:id/delete', asyncHandler(async(req, res) => {
//   console.log(req.params.id);
//   const bookById = await Book.findByPk(req.params.id);
//   console.log('bookId: '+ bookById);
// })
// );

//Exports
module.exports = router;