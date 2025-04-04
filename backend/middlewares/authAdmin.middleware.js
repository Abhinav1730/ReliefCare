import jwt from "jsonwebtoken"

//Admin authentication middleware
const authAdmin = async(req,res,next)=>{
    try {
        const {admintoken} = req.headers
        if(!admintoken){
            return res.json({success:false,message:"Not Authorised , Login Again"})
        }
        const decodedtoken = jwt.verify(admintoken,process.env.JWT_SECRET)
        if(decodedtoken!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorised , Login Again"})
        }
        next()
    } catch (error) {
        console.log(error);
    res.json({ success: false, message: error.message });
    }
}

export default authAdmin