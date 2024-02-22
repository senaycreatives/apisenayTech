const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;


const AdminSchema= new Schema({
    Name:{
        type: String,
        required: true,
      
        minlength: 6,
       
    }
    ,
    username:{
        type: String,
        required: true,
        minlength: 6,
        unique: true

    }
    ,
    Email:{
        type: String,
        required: true,
        minlength: 6
    }
    ,
    Password:{
        type: String,
        required: true,
        minlength: 6
    },
    Role:{
        type: String,
        required: true,
     
    }
    ,
    instalinks:{
        type: String,
        required: true,
        minlength: 6
    }
    ,
    githublink:{
        type: String,
        required: true,
        minlength: 6
    },
    portfolio:{
        type: String,
        required: true,
        minlength: 6
    
    },
    Image:{
        type: String,
        required: true

    }

})
const joischema=Joi.object({
    Name:Joi.string().min(6).required(),
    username:Joi.string().min(6).required(),
    Email:Joi.string().min(6).required(),
    Password:Joi.string().min(6).required(),
    Role:Joi.string().required(),
    instalinks:Joi.string().min(6).required(),
    githublink:Joi.string().min(6).required(),
    portfolio:Joi.string().min(6).required(),
    Image:Joi.string().min(6).required(),
})
const joischemaforput=Joi.object({
    Name:Joi.string().min(6),
    username:Joi.string().min(6),
    Email:Joi.string().min(6),
    Password:Joi.string().min(6),
    Role:Joi.string(),
    instalinks:Joi.string().min(6),
    githublink:Joi.string().min(6),
    portfolio:Joi.string().min(6),
    Image:Joi.string().min(6),

})
const validateJoiforput=(data)=>{
    return joischemaforput.validate(data)
}
const validateJoi=(data)=>{
    return joischema.validate(data)
}
const AdminModel = mongoose.model('Admin', AdminSchema)

module.exports.AdminModel = AdminModel
module.exports.validateJoi=validateJoi
module.exports.validateJoiforput=validateJoiforput