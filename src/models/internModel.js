const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
            unique:true
      },
      mobile:{
            type:Number,
            required:true,
            unique:true
      },
      collegeId:{
            type:objectId,
            required:true,
            ref:"College"
      },
      isDeleted:{
            type:Boolean,
            default:false
      },
},{timestamps:true})


module.exports = mongoose.model("Inters", internSchema)
