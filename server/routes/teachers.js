// Include the required modules
const { createTeacher, getAllTeachers,getTeacherById,updateTeacher } = require('../models/teachers');
const express = require('express');
const Joi = require('joi'); // JSON validation

const route = express.Router();

route.get('/', (req, res) => {
    getAllTeachers()
    .then((result) => {
        res.send(result);
        console.log("Created a new teacher: ", result.name);
    })
    .catch((err) => {
        res.status(500);
        res.send("Error: Unable to create teacher\n"+ err.message);
        console.log("Error: Unable to create teacher\n"+ err);
    });
});

//API with param id
route.get('/:id', (req, res) => {
    const id = req.params.id;
    //Get the teacher object using id
    getTeacherById(id)
    .then((result) => {
        res.send(result);
        console.log("Created a new teacher: ", result.name);
    })
    .catch((err) => {
        res.status(404);
        res.send("Error: Unable to create teacher\n" + err.message);
        console.log("Error: Unable to create teacher\n" + err);
    });

});

/****************** END: get requests *************/

/****************** BEGIN: post requests *************/

// POST API to create a new teacher
route.post('/', (req, res) => {
    // Validate the teacher info
    const { error } = validateTeacher(req.body);
    
    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Add teacher to db
    createTeacher(req.body)
        .then((result) => {
            res.send(result);
            console.log("Created a new teacher: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create teacher\n", err.message);
            console.log("Error: Unable to create teacher\n", err);
        });
});

/****************** END: post requests *************/

/****************** BEGIN: PUT requests *************/
// Handler to update a teacher using put method
route.put('/:id', (req, res) => {
    // Look up the teacher. If not found return 404
    const { error } = validateTeacher(req.body);
    
    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Update teacher to db
    updateTeacher(req.body)
        .then((result) => {
            res.send(result);
            console.log("Updated teacher: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to update teacher\n", err.message);
            console.log("Error: Unable to update teacher\n", err);
        });


});

// Handler to delete a teacher using delete method
route.delete('/:id', (req, res) => {
    // Look up the teacher. If not found return 404
    const { error } = validateTeacher(req.body);
    
    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Add teacher to db
    deleteTeacher(req.body)
        .then((result) => {
            res.send(result);
            console.log("Created a new teacher: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create teacher\n", err.message);
            console.log("Error: Unable to create teacher\n", err);
        });

});

// Validate function
function validateTeacher(teacher) {
    // Define schema
    const schema = {
        name: Joi.string().min(4).max(60).required(),
        author: Joi.string().min(4).max(60).required(),
        tags: Joi.array().items(Joi.string()),
        date: Joi.date(),
        price: Joi.number(),
        isPublished: Joi.boolean()
    };

    // Validate
    const result = Joi.validate(teacher, schema);

    return result;
}

module.exports = route;