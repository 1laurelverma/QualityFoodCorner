const Developer = require('../models/developer');
const fs = require('fs');
const { uploadFile, getFileStream } = require('./../assets/s3')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

// @desc Get All Developers
// @route GET /api/developer/all
// @access Public
exports.getAllDevelopers = async (req, res) => {
    
    try {
        
        const developers = await Developer.find();
        // const developers = await Developer.find({}, { name: 1, email: 1, facebook: 1, });

        if(developers){
            return res.status(200).json({ 
                developers: developers
            })
        }

    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
}

// @desc Get a Developers
// @route GET /api/developers/:id
// @access Public
exports.getDeveloperByID = async (req, res) => {
    
    try {

        const id = req.params.developerId
        
        const developer = await Developer.findById(id);

        if(developer){
            return res.status(200).json({ 
                developer: developer
            })
        }

    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
}

// @desc Create a Offer
// @route POST /api/developer/create/:userId
// @access Admin
exports.createDeveloper = async (req, res) => {

    try {

        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)

        const { name, email, facebook, instagram, linkedin } = req.body

        if (!name) {
            return res.status(400).json({
                error: "Name field is empty !"
            })
        }

        if (!email) {
            return res.status(400).json({
                error: "Email field is empty !"
            })
        }

        const data = {
            name: name,
            email: email,
            facebook: facebook,
            instagram: instagram,
            linkedin: linkedin,
            imgUrl: result.Location
        }

        let developer = new Developer(data);

        const developerCreated = await developer.save()

        if (developerCreated) {
            return res.status(201).json(developerCreated)
        }


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

exports.deleteDeveloper = async (req, res) => {
    try {

        const developer = Developer.findById(req.params.developerId)
 
        const deletedDeveloper = await developer.remove();

        if (deletedDeveloper) {
            return res.json({
                message: `Successfully Deleted Team Member`
            })
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    
    } catch (error) {

        console.error(error);
        
        return res.status(400).json({
            error: 'Failed to delete'
        })
    }
}