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
/*



Structure of the src Attribute which is accepted format:
we converit the buffer from binary to base64 and send it so the data apckers are not lost int he network

data:: Indicates the start of a Data URL.
image/png: Specifies the MIME type (e.g., image/jpeg for JPEG images, image/gif for GIFs).
base64: Signals that the content is Base64-encoded.
BASE64_STRING: The actual Base64-encoded image data.
Example:

<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABA..." alt="Sample Image" />

 in an HTML <img> tag, the browser automatically decodes the Base64 string back into binary data internally
 */


 /***
  * 
  * 
const fs = require('fs');

// Step 1: Read an image file and encode it as Base64
const originalImage = fs.readFileSync('kadu.jpg'); // Original binary image
console.log(originalImage) //binaryy
const base64String = originalImage.toString('base64'); //converted to base64
// Step 2: Decode Base64 back to binary and save as a new file
const binaryData = Buffer.from(base64String, 'base64');
fs.writeFileSync('output2.jpg', originalImage);

console.log('Image successfully saved as output.png');
when i try to fs.writeFileSync('output2.jpg', originalImage); with base64String

it didnt store any page but base64 characterss. 

  */