

const express = require("express")
const {UserModel} = require("../modul/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {blacklisting} = require("../blacklisting")


const userRouter = express.Router()

userRouter.get("/",(req,res)=>{
    res.status(200).json({msg: "Home page"})
})

userRouter.post("/register",async (req,res)=>{
    const {name,email,pass,city,age} = req.body;

    // console.log(pass);
    

    try {
        bcrypt.hash(pass, 5 , async(err,hash)=> {
            if(err){
                res.status(400).json({err:err.message})
            }else{
                const user = new UserModel({name,email,pass:hash,age,city})
                await user.save()
            }
        })
        res.status(200).json({msg:"The new user has been registered", "registeredUser":req.body})
    } catch (err) {
        res.status(400).json({err:err.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email, pass} = req.body;

    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(result){
                    var token = jwt.sign({course: "backend"}, "masai",{
                        expiresIn: 300
                    });
                    var refreshToken = jwt.sign({course: "backend"}, "masai",{
                        expiresIn: 300
                    });
                    res.status(200).json({msg:"Login successful!", token:token, refreshToken:refreshToken})
                }else{
                    res.status(200).json({msg: "Worng Credentials!!"})
                }
            })
        } else{
            res.status(200).json({msg:"Worng Credentials!!"})
        }   
    } catch (err) {
        res.status(400).json({err:err.message})
    }
})




userRouter.get("/logout",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try {
        blacklisting.push(token)
        res.status(200).json({msg:"User has been logged out"})
    } catch (err) {
        res.status(400).json({err:err.message})
    }
})




module.exports={
    userRouter
}



// {
//     "name": "rani",
//     "email":"rani@gmail.com",
//       "pass":"rani",
//       "age": 22,
//       "city": "delhi"
//   }