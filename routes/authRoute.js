const User=require('../models/UserModel')
const bcrypt=require('bcrypt')
const router=require('express').Router()
const jwt=require('jsonwebtoken')
const jwtsecretkey='eirKK3@oer=g*isorgb1bo@obwbeiskl&@*^T#ngios@BJDBJA'

router.post('/register',async(req,res)=>{
    try{
        const existingUser=await User.findOne({email:req.body.email})
        if(existingUser)
        {
            return res.json({
                message:'User already exists',
                data:null
            })
        }
        req.body.password=bcrypt.hashSync(req.body.password,10)
        const data=await User.insertMany(req.body)
        const token=jwt.sign({userId:data._id},jwtsecretkey,{
            expiresIn:'7d'
        })
        return res.json({
            message:'User registered Successfully',
            data:{
                token
            }
        })
    }catch(error){
        return res.json({
            message:'Something went wrong',
            data:error.message
        })
    }
})


router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const userResponse=await User.findOne({email})
        const check=bcrypt.compareSync(password,userResponse.password)
        if(check){
            const token=jwt.sign({userId:userResponse._id},jwtsecretkey,{
                expiresIn:'7d'
            })
            return res.json({
                message:'User login Successfully',
                data:{
                    token
                }
            })
        }
        return res.json({
            message:'Email or password may not exist',
            data:null
        })
    }catch(error){
        return res.json({
            message:'Something went wrong',
            data:error.message
        })
    }
})
module.exports=router

// token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDE2MTU1MTMsImV4cCI6MTcwMjIyMDMxM30.v4t2GUgKx9cbHshJU-BUWa9Xi3bca2kJHFFvOsRWh2o