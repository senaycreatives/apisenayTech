const express=require('express')
const router=express.Router()
const {ProjectModel,validateJoi}=require('../ProjectModel')
const{ProjectCatagory}=require('../ProjectCatagory')
const mongoose=require('mongoose')
const AuthMiddleware = require('../Middleware/AuthorizationMiddleware')
const multerconfig = require('../MulterConfig');
router.get('/',async (req, res) => {
    try{
        const result = await ProjectModel.find()
        res.send(result)
    }
    catch(err){
   res.status(500).send('Error in getting data')
    }
  
})
router.get('/:projectType',async (req, res) => {
    try{
    const ProjectTypes=['MobileApp', 'WebDev', 'TelegramBot','Ui/Ux Design']
    if(!ProjectTypes.includes(req.params.projectType)) return res.status(400).send('Invalid Project Type')
        
        const result = await ProjectModel.find({projectType:req.params.projectType})
        res.send(result)
    }
    catch(err){
   res.status(500).send('Error in getting data')
        }
})


router.post('/',AuthMiddleware,multerconfig.single('image'), async(req, res) => {
    try {
        req.body.image = 'https://api.senaycreatives.com/images/' + req.file.filename;
        const {error}= validateJoi(req.body);
        if(error) return res.status(400).send(error.details[0].message)
        const isvalid = mongoose.Types.ObjectId.isValid(req.body.Catagory)
        if (!isvalid) return res.status(404).send('The Catagory with the given ID was not found.')
        const isCatagoryExist = await ProjectCatagory.findById(req.body.Catagory)
    console.log(isCatagoryExist)
        if (!isCatagoryExist) return res.status(400).send('Invalid Catagory')

        const project = new ProjectModel(req.body)
        project.save()
        res.send(project)
    } catch (error) {
        res.status(500).send('Error in Saving')
        console.log(error,'errp')
    }

})
router.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const isvalid = mongoose.Types.ObjectId.isValid(id)
        if (!isvalid) return res.status(404).send('The project with the given ID was not found.')
        const project = await ProjectModel.findById(id)
        if (!project) return res.status(404).send('The project with the given ID was not found.')
        res.send(project)

    } catch (error) {
        res.status(500).send('Error in getting data')
    }
})
router.delete('/:id',AuthMiddleware,async(req,res)=>{
    try {
        const id = req.params.id
        const isvalid = mongoose.Types.ObjectId.isValid(id)
        if (!isvalid) return res.status(404).send('The project with the given ID was not found.')
        const project = await ProjectModel.findByIdAndDelete(id);
        if (!project) return res.status(404).send('The project with the given ID was not found.')
        res.send(project)

    }
    catch (error) {
        res.status(500).send('Error in DELETING data')
    }
})

module.exports=router