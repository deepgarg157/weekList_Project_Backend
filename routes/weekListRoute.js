const router=require('express').Router()
const moment = require('moment')
const WeeklistModel=require('../models/weekListModel')

router.get('/week-lists',async(req,res)=>{
    const data=await WeeklistModel.find({})
    console.log(data)
    data.map((item)=>{
        var expectedDate=moment(item.creationTime).add(7,'days')
        var currentDate=moment()
        return {
            name:item.name,
            tasks:item.tasks,
            _id:item._id,
            timeLeft:expectedDate.from(currentDate)
        }
    })
    return res.json({
        success:true,
        message:"Weeklist fetched Successfully",
        data
    })
})

router.post('/create-week-list',async(req,res)=>{
    const existingList=await WeeklistModel.find({})
    req.body.creationTime=moment().format()
    existingList.filter((item)=>{
        var expectedDate=moment(item.creationTime).add(7,'seconds')
        var currentDate=moment()
        if(expectedDate.diff(currentDate)>=0){
            return item
        }
    })

    if(existingList.length===2) return res.json({
        success:false,
        message:"Two list already exist",
        data:null
    })
    try{
            const data=await WeeklistModel.insertMany(req.body)
            return res.json({
                success:true,
                message:"Weeklist created Successfully",
                data
            })
        }catch(error){
            return res.json({
                success:false,
                message:"Something went wrong",
                data:error.message
            })
        }
    
})

router.patch('/mark-task/:id',async(req,res)=>{
    try{
        const data=await WeeklistModel.findById(req.params.id)
        console.log(data)
        data.tasks=[...data.tasks,...req.body.tasks]
        const finalData=await data.save()
        return res.json({
            success:true,
            message:"Weeklist updated Successfully",
            data:finalData
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Something went wrong",
            data:error.message
        })
    }
})

module.exports=router