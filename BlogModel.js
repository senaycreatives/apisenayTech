const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const BlogSchema= new Schema({
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
    },
    image:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true,
        minlength: 6
    }
    ,
    Date:{
        type: Date,
        default: Date.now
    }
    ,
    likecount:{
        type: Number,
        default: 0,
    

    },
    isFeatured:{
        type: Boolean,
        default: false
    }
    ,
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
})
const joischema =Joi.object( {
    Title:Joi.string().min(6).required(),
    Description:Joi.string().min(6).required(),
    image:Joi.string().required(),
    Author:Joi.string().required(),
    isFeatured:Joi.boolean().default(false),

    content:Joi.string().min(6).required(),

 
})
const BlogModel = mongoose.model('Blog',BlogSchema);
const validateJoi=(data)=>{
    return joischema.validate(data)
}

module.exports.BlogModel = BlogModel;
module.exports.validateJoi=validateJoi