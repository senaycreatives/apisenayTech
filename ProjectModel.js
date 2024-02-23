const mongoose = require('mongoose');
const Joi = require('joi');


const Schema = mongoose.Schema;

const ProjectSchema= new Schema({
    Title:{
        type: String,
        required: true,
      
        minlength: 6,
    }
    ,
    Description:{
        type: String,
        required: true,
        minlength: 6
    }
    ,
    image:{
        type: String,
        required: true
    }
    ,
    Date:{
        type: Date,
        default: Date.now

    },
    Catagory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectCatagory',
        required: true
    },
    ProjectType: {
        type: String,
        enum: ['MobileApp', 'WebDev', 'TelegramBot','Ui/Ux Design'], // Define your options here
        required: true
    }

    
    



});
const Projectjoi=Joi.object({
    Title:Joi.string().min(6).required(),
    Description:Joi.string().min(6).required(),
    Catagory:Joi.string().required(),
    image:Joi.string().required(),
    ProjectType:Joi.string().valid('MobileApp','WebDev','TelegramBot','Ui/Ux Design').required(),
    
})
const validateJoi=(data)=>{
    return Projectjoi.validate(data)
}

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports.ProjectModel = ProjectModel;
module.exports.validateJoi=validateJoi;

