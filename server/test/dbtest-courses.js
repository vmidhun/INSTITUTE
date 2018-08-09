/* Unit test code for courses model */

const {createCourse, getAllCourses, getCourseById, updateCourse} = require('../models/courses');

function testCreateCourse() {
    // Create a course document
    createCourse({
        name: "C++ Programming Language",
        author: "Mubeen Jukaku",
        price: 15,
        duration: "2 Months",
        isPublished: true
    }).then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testGetAllCourses() {
    getAllCourses()
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testGetCoursesById(id) {
    getCourseById(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testupdateCoursesById(id) {
    var course = {
        tags : ['programming'],
        _id:'5b693ff87eba990389289306',
        name: 'Javascript Programming',
        author: 'Jaya kumar B',
        price: 15
    }
    updateCourse(course)
    .then ((res)=> console.log(res))
    .catch((res)=> console.log(err))

}


testCreateCourse();
//testGetAllCourses();
//testGetCoursesById('5b693ff87eba990389289306')
//testupdateCoursesById('5b693ff87eba990389289306')



