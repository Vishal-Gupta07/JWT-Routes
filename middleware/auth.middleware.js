const jwt = require("jsonwebtoken")
const {blacklisting} = require("../blacklisting")
const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){

        if(blacklisting.includes(token)){
            res.json({msg:"Plase Login again!!"})
        }

        try {
            const decoded = jwt.verify(token, "masai");
            if(decoded){
                next()
            }else{
                res.status(200).json({msg:"Token is not recognised"})
            }
        } catch (err) {
            res.json({err:err.message})
        }
        
    }else{
        res.json({msg: "Plase login"})
    }
}


module.exports={
    auth
}