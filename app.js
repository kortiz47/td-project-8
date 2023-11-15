//PART OF THE EXPRESS SETUP
// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');

//Connection to Database
const db = require("./models/index");
const sequelize = db.sequelize;

//Test the Connection
(async()=>{
  //Sync all tables
  await sequelize.sync();
  try{
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  }catch(error){
    console.error('Error connecting to the database: ', error);
  }
})();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//Main page route /books
app.get('/books', (req, res)=>{
  res.render('index');
})


//===============================ERROR HANDLERS=================================

//404 Error Handler - Page Not Found
app.use((req, res, next)=>{
  const error = new Error();
  error.status = 404;
  error.message = '404 Error: The page you are looking for does not exist. Please try again.';
  //console.log(error);
  res.render('page-not-found', {error, title: 'Page Not Found'});  
})

//Global Error Handler
app.use((err, req, res, next)=>{
  if(err.status === 404){
    res.status(404).render('page-not-found', {err})
  }else{
    err.status = 500;
    err.message = '500 Error: Oh no! Something went wrong with our server. Please try again.';
    console.log({err});
    res.render('error', {err, title: 'Server Error'})
  }
  
})

module.exports = app;
