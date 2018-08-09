/*
 * Title: The teacher model implementation
 * Description: Implements APIs for performing CRUD operations
 * on MongoDB.
 * APIs can be invoked by route handlers. 
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/wsa-teacher', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Teacher Schema
const teacherSchema = new mongoose.Schema({
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

// Create a model from the Schema (Teacher is a model (Class))
const Teacher = mongoose.model('Teacher', teacherSchema);

/* Get All teacher 
 * IN: None. TODO: Add filter params
 * OUT: Teachers collection in JSON format
 */
async function getAllTeachers() {
    try {
        const teacher = await Teacher.find();
        return teacher 
    }
    catch (err){
        console.log("Error: Unable to query database");
        throw err;
    }
 }

/* Get teacher by ID
 * IN: id (teacher object ID)
 * OUT: Single teacher object
 */
async function getTeacherById(teacherId) {

    try {
        const teacher = await Teacher.findById(teacherId)
        return teacher;
    }
    catch (err) {
        console.log("Error: ");
        throw err;
    }
}

/* Create a teacher
 * IN: Teacher object
 * Output: Teacher Object, including object id
 */
async function createTeacher(teacherInfo) {
    // Instantiate the Teacher. Here teacher represents a document object
    const teacher = new Teacher(teacherInfo);

    // Validate and save the document
    try {
        // Use validate method to validate a document
        var result = await teacher.validate();
        result = await teacher.save();
        return result;
    }
    catch (err) {
        console.log("Error: Could not save document");
        throw err;
    }
}

 /* Update a teacher by ID
  * IN: Teacher object, including object id
  * OUT: Updated teacher object
  */

 async function updateTeacher(teacherInfo){  
    const id = teacherInfo._id 
    try {
        let teacher = await Teacher.findById(id)
        if(!teacher){
            console.log("Error: Cannot find Teacher");
            throw new Error("Teacher not found");
        }
        //Modify the Properties
        teacher.set(teacherInfo);
        // save the document - save()
        const result = await teacher.save();
        return result;
    } catch (error) {
        console.log("Error: Cannot find Teacher");
        throw err;        
    } 
 }
 // updateTeacher('5b5fe88c661fb027205d3bb2')

 /* Delete a teacher by ID
  * IN: id (teacher object ID)
  */

  module.exports.createTeacher = createTeacher;
  module.exports.getAllTeachers = getAllTeachers;
  module.exports.getTeacherById = getTeacherById;
  module.exports.updateTeacher = updateTeacher;