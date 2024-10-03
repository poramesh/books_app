const express = require('express')
const router = express.Router()
const path = require('path')
const Book = require('../models/book')
const multer = require('multer') // a middleware for handling multipart/form-data in Node.js, primarily used for uploading files.
//library and makes it easy to upload files to your server, such as images, documents, etc.
const fs = require('fs') //to make sure we arent saving a soemthign that it is not valid
const uploadPath = path.join('public', Book.coverImageBasePath) 
const Author = require('../models/author')
const { networkInterfaces } = require('os')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req,file,callback)=>{
      callback(null, imageMimeTypes.includes(file.mimetype))
  }
})
/**
 * If the image is allowed, callback(null, true) is called to proceed with the upload. If not, callback(null, false) rejects the file.
 * 
 */


router.get('/', async (req, res) => {
    let query = Book.find()
    if (req.query.title != null && req.query.title != '') {
      query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
      query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
      query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
      const books = await query.exec()
      res.render('books/index', {
        books: books,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })

router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
  })


//upload.single('cover'): This middleware tells Multer to expect a single file upload in a form field named 'cover'.
router.post('/', upload.single('cover'), async (req,res) =>{
    const fileName = req.file != null ? req.file.filename : null

/**
 * If the file upload succeeds: req.file will be an object that contains properties like filename. In this case, fileName will be assigned the value of req.file.filename.
If the file upload fails (e.g., the file is rejected by fileFilter, or no file is uploaded): req.file will be null or undefined, and fileName will be set to null because of the conditional (? :) operator.
 */
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      publishDate: new Date(req.body.publishDate),
      pageCount: req.body.pageCount,
      coverImageName: fileName,
      description: req.body.description
    })

    try{
        const newBook = await book.save()
        console.log(newBook)
        res.redirect('books')
    }catch{
        console.log("I am removing the book cause i was errored")
        if(book.coverImageName != null){
        removeBookCover(book.coverImageName)
    }
    renderNewPage(res,book,true)
    }
})


function removeBookCover(fileName){
      fs.unlink(path.join(uploadPath, fileName), err =>{
      if(err) console.error(err)  
    })
 }
 
async function renderNewPage(res, book, hasError=false){
    try{
    const authors = await Author.find({})
    const params ={
        authors: authors,
        book: book
    }
    if(hasError) params.errorMessage = 'error creating book'
    res.render('books/new',params)
    }
    catch{
     res.redirect('/books')
    }

}
 


module.exports = router
 
 
