const mongoose = require("mongoose")

const userSchema= mongoose.Schema({
    title:String,
    genre:String,
    author:String,
    publishing_year:Number
},{
    versionKey:false
})


const BookModel = mongoose.model("book",userSchema)

module.exports={
    BookModel
}