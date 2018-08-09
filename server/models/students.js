/*
 * Title: The student model implementation
 * Description: Implements APIs for performing CRUD operations
 * on MongoDB.
 * APIs can be invoked by route handlers. 
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/wsa-students', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60
    },
    author: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60
    },
    tags: [String],
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        }
    },
    isPublished: Boolean
});

// Create a model from the Schema (Student is a model (Class))
const Student = mongoose.model('Student', studentSchema);

/* Get All students 
 * IN: None. TODO: Add filter params
 * OUT: Students collection in JSON format
 */
async function getAllStudents() {
    try {
        const students = await Student.find();
        return students;
    }
    catch (err){
        console.log("Error: Unable to query database");
        throw err;
    }
 }

/* Get student by ID
 * IN: id (student object ID)
 * OUT: Single student object
 */
async function getStudentById(studentId) {

    try {
        const student = await Student.findById(studentId)
        return student;
    }
    catch (err) {
        console.log("Error: ");
        throw err;
    }
}

/* Create a student
 * IN: Student object
 * Output: Student Object, including object id
 */
async function createStudent(studentInfo) {
    // Instantiate the Student. Here student represents a document object
    const student = new Student(studentInfo);

    // Validate and save the document
    try {
        // Use validate method to validate a document
        var result = await student.validate();
        result = await student.save();
        return result;
    }
    catch (err) {
        console.log("Error: Could not save document");
        throw err;
    }
}

 /* Update a student by ID
  * IN: Student object, including object id
  * OUT: Updated student object
  */

 async function updateStudent(studentInfo){  
    const id = studentInfo._id 
    try {
        let student = await Student.findById(id)
        if(!student){
            console.log("Error: Cannot find Student");
            throw new Error("Student not found");
        }
        //Modify the Properties
        student.set(studentInfo);
        // save the document - save()
        const result = await student.save();
        return result;
    } catch (error) {
        console.log("Error: Cannot find Student");
        throw err;        
    } 
 }
 // updateStudent('5b5fe88c661fb027205d3bb2')

 /* Delete a student by ID
  * IN: id (student object ID)
  */

  module.exports.createStudent = createStudent;
  module.exports.getAllStudents = getAllStudents;
  module.exports.getStudentById = getStudentById;
  module.exports.updateStudent = updateStudent;