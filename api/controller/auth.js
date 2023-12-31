import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { createError } from "../utils/errors.js";
import jwt from 'jsonwebtoken'


export const register = async ( req,res,next)=>{
    try{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser= new User({
            ...req.body,
            password:hash
        })

        await newUser.save()
        res.status(200).send("User has been created")
    }catch(err){
        next(err)
    }
}

export const login = async ( req,res,next)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user)  return next(createError(404,"user not found!!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)

        if(!isPasswordCorrect) return next(createError(400,"Wrong Password!!"))

        const token = jwt.sign({id:user._id, isAdmin:user.isadmin},process.env.JWT)
        
        const {password,isadmin, ...otherDetails} = user._doc
      
        res.cookie("access_token", token,{
            httpOnly:true,
        })
        .status(200)
        .json({details:{...otherDetails},isadmin})
    }catch(err){
        next(err)
    }
}