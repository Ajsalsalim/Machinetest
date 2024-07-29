const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    price:Number,
    author:String,
    language:String,
    year:Number,
    image:String,


});

const Book = mongoose.model("Book",bookSchema);
module.exports = Book
