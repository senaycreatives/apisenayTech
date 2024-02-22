const express = require('express')
const router = express.Router()
const { ProjectCatagory, validateJoi } = require('../ProjectCatagory')
const AuthMiddleware = require('../Middleware/AuthorizationMiddleware')
const mongoose = require('mongoose')
router.get('/', async (req, res) => {
    try {
        const result = await ProjectCatagory.find()
        res.send(result)
    }
    catch (err) {
        res.status(500).send('Error in getting data')
    }

})

router.post('/',AuthMiddleware, (req, res) => {
    try {
        const { error } = validateJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const catagory = new ProjectCatagory(req.body)
        catagory.save()
        res.send(catagory)
    } catch (error) {
        res.status(500).send('Error in Saving')
    }
})
router.get('/:id', async (req, res) => {
    try {
        const id=req.params.id
        const isvalid = mongoose.Types.ObjectId.isValid(id)
        if (!isvalid) return res.status(404).send('The catagory with the given ID was not found.')
        const catagory = await ProjectCatagory.findById(id);
        if (!catagory) return res.status(404).send('The catagory with the given ID was not found.')
        res.send(catagory)
    }
    catch (error) {
        res.status(500).send('Error in getting data')
    }
})
router.delete('/:id',AuthMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const isvalid = mongoose.Types.ObjectId.isValid(id)
        if (!isvalid) return res.status(404).send('The catagory with the given ID was not found.')
        const catagory = await ProjectCatagory.findByIdAndDelete(id);
        if (!catagory) return res.status(404).send('The catagory with the given ID was not found.')
        res.send(catagory)

    }
    catch (error) {
        res.status(500).send('Error in DELETING data')
    }
})

module.exports = router