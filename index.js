const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {booksRoutes} = require("./routes/book.routes")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const app = express()
app.use(express.json())


app.use("/users",userRouter)
app.use("/books",booksRoutes)





app.get("/refreshtoken",(req,res)=>{
    const generateToken = req.headers.authorization?.split(" ")[1]

    const decoded = jwt.verify(generateToken, "masai")

    if(decoded){
        const token = jwt.sign({course: "backend"},"masai",{
            expiresIn: 240
        })
        res.status(200).json({refreshToken: token})
    }else{
        res.send("Invaild regerneted token")
    }
})




app.listen(process.env.port,async()=>{

    try {
        await connection
        console.log(`server is running port ${process.env.port}`);
        console.log("connection to DB");
    } catch (err) {
        console.log(err);
        console.log("SomeThing is worng");
    }
})