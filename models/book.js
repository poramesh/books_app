const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: Buffer, // This indicates that the image file will be stored in binary data. A Buffer can hold the raw data of the image in byte forma
    required: false
  },
  coverImageType:{
    type: String, //mimetype
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
})


//This code is used to generate a data URL for the coverImage field, allowing you to display the image directly in an HTML page without needing to save it to a file system or serve it separately.

bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType!=null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`  } //data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...
})


module.exports = mongoose.model('Book', bookSchema)
