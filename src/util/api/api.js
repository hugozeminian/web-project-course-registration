import { getNextAvailableID } from "../general-functions/generalFunctions";
/*
#############################
#####  ADMIN FUNCTIONS  #####
#############################
*/
export const admDeleteCourse = (courseInformation) => {
    let courseList = getCoursesList();

    if (courseList) {
        const indexToRemove = courseList.findIndex(
            (course) => course.courseId === courseInformation.courseId
        );

        if (indexToRemove !== -1) {
            courseList.splice(indexToRemove, 1);
            localStorage.setItem("bvc-coursesData", JSON.stringify(courseList));
        }

    }
}


export const admAddNewCourse = (courseInformation) => {
    let courseList = getCoursesList();

    if (!courseList) {
        courseList = [];
    }

    let nextId = getNextAvailableID(courseList, "courseId");
    courseInformation.courseId = nextId;
    courseList.push(courseInformation);
    localStorage.setItem("bvc-coursesData", JSON.stringify(courseList));
}


/*
#############################
##### STUDENT FUNCTIONS #####
#############################
*/
export const addStudentRegistration = (studentInformation) => {
    let studentRegistration = JSON.parse(localStorage.getItem("bvc-studentData"));

    if (!studentRegistration) {
        studentRegistration = [];
    }

    let nextId = getNextAvailableID(studentRegistration, "studentId");
    studentInformation.studentId = nextId;
    studentRegistration.push(studentInformation);
    localStorage.setItem("bvc-studentData", JSON.stringify(studentRegistration));
    return false;
}

export const addCourseRegistration = (courseInformation) => {
    let courseRegistrations = JSON.parse(localStorage.getItem("bvc-courseRegistrations"));

    if (!courseRegistrations) {
        courseRegistrations = [];
    }

    const isAlreadyRegistered = courseRegistrations.some((registeredCourse) => {
        return registeredCourse.courseId === courseInformation.courseId;
    });

    if (isAlreadyRegistered) {
        return true
    } else {
        let nextId = getNextAvailableID(courseRegistrations);
        courseInformation.id = nextId;
        courseRegistrations.push(courseInformation);
        localStorage.setItem("bvc-courseRegistrations", JSON.stringify(courseRegistrations));
        return false;
    }
}


export const getCourseRegistrationList = () => {
    let courseRegistrations = localStorage.getItem("bvc-courseRegistrations");
    let myCourseList = JSON.parse(courseRegistrations || "[]");
    return myCourseList;
}


export const removeCourseRegistration = (courseInformation) => {
    let courseRegistrations = JSON.parse(localStorage.getItem("bvc-courseRegistrations"));

    if (courseRegistrations) {
        const indexToRemove = courseRegistrations.findIndex(
            (courseRegistration) =>
                // courseRegistration.studentId === courseInformation.studentId &&
                courseRegistration.courseId === courseInformation.courseId
        );

        if (indexToRemove !== -1) {
            courseRegistrations.splice(indexToRemove, 1);
            localStorage.setItem("bvc-courseRegistrations", JSON.stringify(courseRegistrations));
        }
    }
}


export const sendMessageContact = (messageStudentsData) => {
    let messageStudents = JSON.parse(localStorage.getItem("bvc-messageStudents"));

    if (!messageStudents) {
        messageStudents = [];
    }

    let nextId = getNextAvailableID(messageStudents);
    messageStudentsData.id = nextId;
    messageStudents.push(messageStudentsData);
    localStorage.setItem("bvc-messageStudents", JSON.stringify(messageStudents));
}


/*
#############################
##### PUBLIC  FUNCTIONS #####
#############################
*/
export const getCoursesList = () => {
    let coursesData = localStorage.getItem("bvc-coursesData");
    let coursesList = JSON.parse(coursesData || "[]");
    return coursesList;
}

export const getStudentList = () => {
    let studentData = localStorage.getItem("bvc-studentData");
    let studentList = JSON.parse(studentData || "[]");
    return studentList;
}

export const getAdminList = () => {
    let adminData = localStorage.getItem("bvc-adminData");
    let adminList = JSON.parse(adminData || "[]");
    return adminList;
}

export const getContactList = () => {
    let adminData = localStorage.getItem("bvc-contactListData");
    let adminList = JSON.parse(adminData || "[]");
    return adminList;
}