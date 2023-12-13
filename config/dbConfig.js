const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://admin:admin123@cluster0.zeg1dyy.mongodb.net/?retryWrites=true&w=majority')
const db=mongoose.connection
db.on('connected',()=>{
    console.log('Connection successfull')
})

db.on('error',(error)=>{
    console.log('Connection error  ')
})