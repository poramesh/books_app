const mongoose = require('mongoose')
const Book = require('./book.js')

const authorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
      if (err) {
        next(err)
      } else if (books.length > 0) {
        next(new Error('This author has books still'))
      } else {
        next()
      }
    })
  })


module.exports = mongoose.model('Author', authorSchema) //Author could be safely called as the name of the table.whenever someonse invoking this part of code they need to use new Author.