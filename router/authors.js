const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')




router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i') //i flag, it is capital insensitive.
    }
    try {
      const authors = await Author.find(searchOptions) 
      // When you pass this object to Author.find(searchOptions), Mongoose will translate it into a query like db.authors.find({ name: /John/i }).
      res.render('authors/index', {
        authors: authors,
        searchOptions: req.query //to repopulated the field
      })
    } catch {
      res.redirect('/')
    }
  })


router.get('/new', (req,res)=>{
    res.render('authors/new', {author: new Author()}) //this doesnt actually creates anything in the db but it does create an author obejct that wecan use to save/deelete inside the db and also use the object in the ejs file. 
})

/* 
router.post('/', (req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    author.save((err, newAuthor)=>{
        if(err){
            res.render('author/new',{ author: author,
                errorMessage:'error creating author'}
            )
        } else{
            res.redirect('authors')
        }
    })

})
    this doesnt work cause .save(fucntion) si deprecated

*/


router.post('/new', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      res.redirect('/authors/${newAuthor.id}')
    } catch(err) {
        res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })
  /*

    hey im here
    why am i here? ReferenceError: authors is not defined
    at C:\Users\pooja\Desktop\code-shh\javascript\simple_nodejs_\books_app\router\authors.js:44:20
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    """"all this error cayse i didnt mention it in quotes damnm"""""
*/



router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({ author: author.id }).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch {
    res.redirect('/')
  }
})



router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', { author: author })
  } catch {
    res.redirect('/authors')
  }
})





router.put('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save()
    res.redirect(`/authors/${author.id}`)
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  }
})
router.delete('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    await author.remove()
    res.redirect('/authors')
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.redirect(`/authors/${author.id}`)
    }
  }
})


module.exports = router

