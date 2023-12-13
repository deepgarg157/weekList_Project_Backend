const authMiddleware=(req,res,next)=>{
    let token=req.headers.authorization
    token=token.split(' ')[1]
    let verify=
    next()
}
module.exports=authMiddleware