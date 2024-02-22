const express=require('express')
const router=express.Router()
const bycrypt = require('bcrypt');
const {AdminModel,validateJoi,validateJoiforput}=require('../AdminModel')
const mongoose=require('mongoose')
const multerconfig = require('../MulterConfig');


router.get('/',async (req, res) => {
        try{
                const result = await AdminModel.find()
                res.send(result)
        }
        catch(err){
     res.status(500).send('Error in getting data')
        }
    
})

router.post('/',multerconfig.single('image'), (req, res) => {
    try {
        console.log(validateJoi(req.body))
        req.body.Image = 'https://crabby-frog-swimsuit.cyclic.app/images/' + req.file.filename;
        const {error}= validateJoi(req.body);
        console.log(error)
        if(error) return res.status(400).send(error.details[0].message)
        req.body.Password = bycrypt.hashSync(req.body.Password, bycrypt.genSaltSync(10));
        const admin = new AdminModel(req.body)
        admin.save()
        res.send(admin)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error in Saving')
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const isvalid = mongoose.Types.ObjectId.isValid(id)
        if (!isvalid) return res.status(400).send('The admin with the given ID was not found.')
        const admin = await AdminModel.findById(id);
        if (!admin) return res.status(404).send('The admin with the given ID was not found.')
        res.send(admin)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Error in getting data')
    }
})
router.put('/:id',multerconfig.single('image'),async(req,res)=>{
    try {
        const id = req.params.id
        const isvalid = mongoose.Types.ObjectId.isValid(id)
        if (!isvalid) return res.status(400).send('The admin with the given ID was not found.')
        if(req.file){
            req.body.Image = 'https://crabby-frog-swimsuit.cyclic.app/images/' + req.file.filename;
        }
        const {error}= validateJoiforput(req.body);
        if(error) return res.status(400).send(error.details[0].message)
        const admin =await AdminModel.findByIdAndUpdate(id,req.body);
    if(!admin) return res.status(404).send('The admin with the given ID was not found.')
    res.send(admin)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Error in updating data')
    }
})
router.delete('/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const isvalid = mongoose.Types.ObjectId.isValid(id)
        if (!isvalid) return res.status(400).send('The admin with the given ID was not found.')
        const admin =await AdminModel.findByIdAndDelete(id);
    

        if (!admin) return res.status(404).send('The admin with the given ID was not found.')
        res.send(admin)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Error in DELETING data')
    }
})

module.exports=router