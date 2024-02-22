const mongoose =require('mongoose')
const Joi = require('joi');
const Schema = mongoose.Schema;

const ProjectCatagorySchema= new Schema({
    Name:{
        type: String,
        required: true,
      
  
       
    }
    ,
    Description:{
        type: String,
        required: true,
        minlength: 6
    }
    ,
    Date:{
        type: Date,
        default: Date.now
    }});

const ProjectCatagory = mongoose.model('ProjectCatagory',ProjectCatagorySchema)
const joischema = Joi.object({
    Name:Joi.string().required(),
    Description:Joi.string().min(6).required(),
  

})
const validateJoi=(data)=>{
    return joischema.validate(data)
}
module.exports.ProjectCatagory = ProjectCatagory
module.exports.validateJoi=validateJoi

