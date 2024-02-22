const express = require('express');
const router = express.Router();
const { BlogModel, validateJoi } = require('../BlogModel');
const AuthMiddleware = require('../Middleware/AuthorizationMiddleware');
const mongoose = require('mongoose');
const multerconfig = require('../MulterConfig');




router.get('/', async (req, res) => {
    try {
        const result = await BlogModel.find();
        res.send(result);
    } catch (err) {
        res.status(500).send('Error in getting data');
    }
});
router.get('/me', AuthMiddleware,async (req, res) => {
    try {
        const result = await BlogModel.find({ Author: req.user.id });
        res.send(result);
    }
    catch (err) {
        res.status(500).send('Error in getting data')
    }
})

router.post('/', AuthMiddleware, multerconfig.single('image'), (req, res) => {
    try {
        req.body.Author = req.user.id;
        req.body.image = 'http://localhost:3000/images/' + req.file.filename;

        const { error } = validateJoi(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const blog = new BlogModel(req.body);
        blog.save();
        res.send(blog);
    } catch (error) {
        res.status(500).send('Error in Saving');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const isvalid = mongoose.Types.ObjectId.isValid(id);
        if (!isvalid) return res.status(404).send('The blog with the given ID was not found.');
        const blog = await BlogModel.findById(id);
        if (!blog) return res.status(404).send('The blog with the given ID was not found.');
        res.send(blog);
    } catch (error) {
        res.status(500).send('Error in getting data');
    }
});

router.delete('/:id', AuthMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const isvalid = mongoose.Types.ObjectId.isValid(id);
        if (!isvalid) return res.status(404).send('The blog with the given ID was not found.');
        
        const blog = await BlogModel.findByIdAndDelete(id);
        
        if (!blog) return res.status(404).send('The blog with the given ID was not found.');
        
        res.send(blog);
    } catch (error) {
        res.status(500).send('Error in DELETING data');
    }
});

module.exports = router;
