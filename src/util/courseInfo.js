let courseID = window.localStorage.getItem('courseID');
courseID = courseID || null;

function setCourseID(courseId) {
    courseID = courseId;
    window.localStorage.setItem('courseID', courseID);
}
function getCourseID() {
    return courseID;
}

export { setCourseID, getCourseID };
