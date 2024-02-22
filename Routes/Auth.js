const express = require('express');
const router = express.Router();
const {AdminModel}=require('../AdminModel')
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecretkey'
const createToken = (_id, username) => {
    return jwt.sign({ id:_id, username: username}, jwtSecret, { expiresIn: '3d' })
}

const schema = joi.object({
    username: joi.string().min(6).required(),
    Password: joi.string().min(6).required(),
})
const validateJoi = (data) => {
    return schema.validate(data)
}
router.post('/signin', async(req, res) => {
    try {
        const { error } = validateJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const admin =await AdminModel.findOne({ username: req.body.username })
        if (!admin) return res.status(400).send('Invalid Email or Password')

        const validPassword = bcrypt.compareSync(req.body.Password, admin.Password)
        if (!validPassword) return res.status(400).send('Invalid Email or Password')
        const token = createToken(admin._id, admin.username)
        res.header('auth-token', token)
        

        res.send({token:token,expiresIn:'3d',_id:admin._id,username:admin.username})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error in Saving')
    }
})


module.exports = router