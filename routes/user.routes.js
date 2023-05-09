const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password} = req.body
    const hashedPass = bcrypt.hashSync(password,10)
    const userData = {...req.body,password:hashedPass}
    try {
        const checkedData = await userModel.find({email:email})
        if(checkedData.length>0){
            res.status(400).send({msg:"User already exist, please login"})
        }else{
            const setuserData = new userModel(userData)
            await setuserData.save()
            res.status(201).send({msg:"registerd successfully"})
        }
    } catch (error) {
        res.status(400).send({msg:"registeration failed"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const userData = await userModel.find({email})
        const hashedPass = userData[0].password
        const decoded = bcrypt.compareSync(password,hashedPass)
        if(decoded){
            res.status(201).send({msg:"login successfully",token:jwt.sign({userId:userData[0]._id},"user")})
        }else{
            res.status(400).send({msg:"No account exist"})
        }
    } catch (error) {
        res.status(400).send({msg:"Login failed"})
    }
})

module.exports = userRouter