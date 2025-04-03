import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from "../utils/error.js" ;
import jwt from 'jsonwebtoken';

export const signup = async(req,res,next)=>{
    
        // console.log(req.body)
        const {username,email,password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password,10);

        const newUser = new User({username,email,password:hashedPassword});
        try{
        await newUser.save();
        res.status(201).json('User created succesfully');
    }
    catch(err){
        // res.status(500).json(e.message);
        // next(errorHandler(500,'Error found in function'));
        next(err);
        // res.send(e.message);
        // res.send("hii")
    }

};
export const getalluser  = async(req,res) =>{
    try{
        const alluser  = await User.find();
        res.status(201).json({
            alluser
        });
    }
    catch{
        res.status(404).json("not fetched")
    }
}
export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email});
    if(!validUser) return res.status(404).json(errorHandler(404,'User not found',false));
    console.log(validUser)
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    console.log(validPassword)
    if(!validPassword) return  res.status(404).json(errorHandler(401,'Invalid Credentials',false));
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    console.log(validUser._doc);
    const {password:pass,...rest}=validUser._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(201).json(rest);
    } catch (error) {
        next(error);
    }


};

export const google = async(req,res,next)=>{
    try {
        const validUser = await User.findOne({email:req.body.email});
        if(validUser){
            const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
            console.log(validUser._doc);
            const {password:pass,...rest}=validUser._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(201).json(rest);
        }

        else
        {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                email: req.body.email, password:hashedPassword,avatar:req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            
            const {password:pass,...rest}=newUser._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(201).json(rest);

        }
    } catch (error) {
        next(error);
    }
};

export const signOut = async(req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('You have been successfully logged out');
    } catch (error) {
        next(error);
    }
}

