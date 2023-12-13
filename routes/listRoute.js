const  authMiddleware = require('../middlewares/authMiddleware')

const router=require('express').Router()

router.get('/list',authMiddleware,(req,res)=>{
    return res.json({
        message:'this is list route'
    })
})
module.exports=router