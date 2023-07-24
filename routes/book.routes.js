
const express = require("express")
const jwt = require("jsonwebtoken")
const { BookModel } = require("../modul/book.model")
const { auth } = require("../middleware/auth.middleware")

const booksRoutes = express.Router()


booksRoutes.get("/",auth ,async(req, res) => {
    const query = req.query
    
    try {
        const book = await BookModel.find(query)
        res.status(200).json({msg: "All the books present in the database",book})
    } catch (err) {
        res.status(400).json({err:err.message})
    }
})






booksRoutes.post("/add", auth, async (req, res) => {
    const {title, genre, author, publishing_year} = req.body;
    try {
        const user = new BookModel({title, genre, author, publishing_year})
        await user.save()
        res.status(200).json({msg:"Book added", "addedBook":req.body })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})



booksRoutes.patch("/update/:id", auth, async (req, res) => {
    const {id} = req.params;
    const payload = req.body;

    try {
        await BookModel.findByIdAndUpdate({_id:id},payload)
        const BookModel = await BookModel.find({_id:id})
        res.status(200).json({msg:"Book has been updated"})
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})




booksRoutes.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;

    try {
        const deletedBook = await BookModel.find({_id:id})
        await BookModel.findByIdAndDelete({_id:id})
        res.status(200).json({msg:"Book has been deleted"})
    } catch (err) {
        res.status(400).json({err:err.message})
    }
})


module.exports = {
    booksRoutes
}


