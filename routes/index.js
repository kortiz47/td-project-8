//PART OF EXPRESS SETUP
const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

/* GET home page. */
router.get('/', async(req, res)=>{
  const books = await Book.findAll();
  console.log(books);
  res.json(books);
});

module.exports = router;
