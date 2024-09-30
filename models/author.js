const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Author', authorSchema) //Author could be safely called as the name of the table.whenever someonse invoking this part of code they need to use new Author.