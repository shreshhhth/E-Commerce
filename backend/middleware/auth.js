import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    {/*getting token from the headers */}
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message:"Not Authorized Login Again"})
    }
    try {
        {/*Decoding the token here */}
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        {/*getting the id of the user from the decoded token and stored it in req.body.userId */}
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

export default authUser;