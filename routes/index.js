//PART OF EXPRESS SETUP
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;
const { Op } = require("sequelize");


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
  //Search
  const search = req.query.search|| '';

  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Book.findAndCountAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
        { genre: { [Op.like]: `%${search}%` } },
        { year: { [Op.like]: `%${search}%` } },
      ]
    },
    offset,
    limit
  })

  const totalPages = Math.ceil(count / limit)
  res.render('index', { books: rows, pageBtns: totalPages, currentPage: page });
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
      const errorMsgs = error.errors.map(error => error.message);
      res.render('new-book', { errors: errorMsgs, book });
    } else {
      throw error;
    }
  }
})
);

/** Rendered Book Detail Page ( /books/:id ) */
router.get('/:id', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const bookInstances = await Book.findAll();
  const bookIdsArray = bookInstances.map(book => book.id);
  if (bookIdsArray.includes(id)) {
    const book = bookInstances.find(book => book.id == id);
    res.render('update-book', { book });
  } else {
    const error = new Error();
    error.status = 404;
    error.message = '404 Error: The book you are looking for does not exist';
    next(error);
  }
}));


/** Update Book Information  ( /books/:id ) POST*/
router.post('/:id', asyncHandler(async (req, res) => {
  let updatedBook;
  const id = parseInt(req.params.id);
  try {
    const findBookByPk = await Book.findByPk(id);
    if (findBookByPk) {
      updatedBook = await findBookByPk.update(req.body);
      res.redirect('/');
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      updatedBook = await Book.build(req.body);
      updatedBook.id = req.params.id;
      const errorMsgs = error.errors.map(error => error.message);
      res.render('update-book', { book: updatedBook, errors: errorMsgs });
    } else {
      throw error;
    }
  }
}))

/** Delete Book ( /books/:id/delete ) POST */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const bookById = await Book.findByPk(id);
  await bookById.destroy();
  res.redirect('/');
})
);

//=========================Exports==========================
module.exports = router;