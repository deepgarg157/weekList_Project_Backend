const {Schema, model}=require('mongoose')

const WeekList=new Schema({
    name:{
        type:String,
        required:true
    },
    tasks:{
        type:Array,
        required:true,
        timestamps:true
    },
    creationTime:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const WeekListModel=model('Weeklist',WeekList)
module.exports=WeekListModel