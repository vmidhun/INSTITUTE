// Include the required modules
const { createStudent, getAllStudents,getStudentById,updateStudent } = require('../models/students');
const express = require('express');
const Joi = require('joi'); // JSON validation

const route = express.Router();

route.get('/', (req, res) => {
    getAllStudents()
    .then((result) => {
        res.send(result);
        console.log("Created a new student: ", result.name);
    })
    .catch((err) => {
        res.status(500);
        res.send("Error: Unable to create student\n"+ err.message);
        console.log("Error: Unable to create student\n"+ err);
    });
});

//API with param id
route.get('/:id', (req, res) => {
    const id = req.params.id;
    //Get the student object using id
    getStudentById(id)
    .then((result) => {
        res.send(result);
        console.log("Created a new student: ", result.name);
    })
    .catch((err) => {
        res.status(404);
        res.send("Error: Unable to create student\n" + err.message);
        console.log("Error: Unable to create student\n" + err);
    });

});

/****************** END: get requests *************/

/****************** BEGIN: post requests *************/

// POST API to create a new student
route.post('/', (req, res) => {
    // Validate the student info
    const { error } = validateStudent(req.body);
    
    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Add student to db
    createStudent(req.body)
        .then((result) => {
            res.send(result);
            console.log("Created a new student: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create student\n", err.message);
            console.log("Error: Unable to create student\n", err);
        });
});

/****************** END: post requests *************/

/****************** BEGIN: PUT requests *************/
// Handler to update a student using put method
route.put('/:id', (req, res) => {
    // Look up the student. If not found return 404
    const { error } = validateStudent(req.body);
    
    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Update student to db
    updateStudent(req.body)
        .then((result) => {
            res.send(result);
            console.log("Updated student: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to update student\n", err.message);
            console.log("Error: Unable to update student\n", err);
        });


});

// Handler to delete a student using delete method
route.delete('/:id', (req, res) => {
    // Look up the student. If not found return 404
    const { error } = validateStudent(req.body);
    
    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Add student to db
    deleteStudent(req.body)
        .then((result) => {
            res.send(result);
            console.log("Created a new student: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create student\n", err.message);
            console.log("Error: Unable to create student\n", err);
        });

});

// Validate function
function validateStudent(student) {
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
    const result = Joi.validate(student, schema);

    return result;
}

module.exports = route;