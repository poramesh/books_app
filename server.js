
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  //const bodyParser = require('body-parser')
  
  const indexRouter = require('./router/index')
  const authorRouter = require('./router/authors')
  const bookRouter = require('./router/books')
  
  app.set('view engine', 'ejs') //Express will handle loading EJS for rendering your templates without the need for an extra require('ejs') line.
  app.set('views', __dirname + '/views') //If you don’t set this line and your views are in a folder called views in the root directory, Express will still find them by default. But if you store your views elsewhere, this line is necessary.
  app.set('layout', 'layouts/layout') //by default it is layout.ejs in the view folder since its in layouts folder, we gotta specifically mention it.
//You don’t need to add the .ejs extension because Express knows it’s using EJS as the view engine.
  app.use(expressLayouts)
  app.use(express.static('public'))
  //app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
  app.use(express.urlencoded({limit:'10mb', extended: false}))

  const mongoose = require('mongoose')
  mongoose.connect(process.env.DATABASE_URL)
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'))
  console.log('Index Router:', bookRouter);

  app.use('/', indexRouter)
  app.use('/authors', authorRouter)
  //app.use('/books', bookRouter)
  
  app.listen(process.env.PORT || 3000)