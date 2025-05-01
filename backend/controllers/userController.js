import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//function for creating token
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
//Route for User Login
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        //check if user is available or not
        const user = await userModel.findOne({email});
        //checking if user exists
        if (!user) {
            res.json({success:false, message:"User does not exists"});
        }
        //comparing the user's password with the password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message:"Incorrect Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}

//Route for User Registration
const registerUser = async (req,res) => {
    try {
        //We will get the name email and password from the user
        const {name, email, password} = req.body;
        //now we will check is user already exists or not, if not then we will add that user
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User already exits"})
        }
        //validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if (password.length<8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }
        //if validation of email and password is successful, we create the user account
        //Now we are hashing the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt) 

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
        })
        //Saving user to the database
        const user =  await newUser.save();
        //We will use this token to make user login 
        const token = createToken(user._id);
        //Setting this token as response
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
        
    }
}

//Route for Admin Login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export {loginUser, registerUser, adminLogin};