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



//===============================ERROR HANDLERS=================================

//404 Error Handler - Page Not Found
router.use((req, res, next)=>{
  const error = new Error();
  error.status = 404;
  error.message = '404 Error: The page you are looking for does not exist. Please try again.';
  res.render('error', {error});  
})

//Global Error Handler

//Exports
module.exports = router;