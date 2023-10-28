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
        return registeredCourse.studentId === courseInformation.studentId && registeredCourse.courseId === courseInformation.courseId;
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
      
    if (!courseRegistrations) {
      courseRegistrations = [];
    } else {
      courseRegistrations = JSON.parse(courseRegistrations);
    }
  
    let authenticatedUser = getAuthenticatedUser();
    let userId = authenticatedUser.userId;
  
    let myCourseList = courseRegistrations.filter(registration => registration.studentId === userId);
  
    return myCourseList;
  }
  


export const removeCourseRegistration = (courseInformation) => {
    console.log("🚀 ~ file: api.js:100 ~ removeCourseRegistration ~ courseInformation:", courseInformation)
    let courseRegistrations = JSON.parse(localStorage.getItem("bvc-courseRegistrations"));
    console.log("🚀 ~ file: api.js:102 ~ removeCourseRegistration ~ courseRegistrations:", courseRegistrations)

    if (courseRegistrations) {
        const indexToRemove = courseRegistrations.findIndex(
            (courseRegistration) =>
                courseRegistration.studentId === courseInformation.studentId &&
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
    let contactData = localStorage.getItem("bvc-contactListData");
    let contactList = JSON.parse(contactData || "[]");
    return contactList;
}

export const getProgramsList = () => {
    let programsData = localStorage.getItem("bvc-programsData");
    let programsList = JSON.parse(programsData || "[]");
    return programsList;
}

export const getAuthenticatedUser = () => {
    let authenticatedData = localStorage.getItem("bvc-authentication");

    if (authenticatedData) {
        try {
            return JSON.parse(authenticatedData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    return null;
}

const authenticationData = {
    "isAuthenticated": false,
    "isAdmin": false,
    "username": "",
    "first_name": "Visitor",
    "userId": ""
};

export const loginVerification = (loginData, isAdmin = false) => {
    const userList = isAdmin ? getAdminList() : getStudentList();

    const isLoginValid = userList.some((user) => {
        return user.username === loginData.username && user.current_password === loginData.password;
    });

    const matchingUser = userList.find((user) => {
        return user.username === loginData.username && user.current_password === loginData.password;
    });

    authenticationData.isAuthenticated = isLoginValid
    authenticationData.isAdmin = isAdmin
    authenticationData.username = matchingUser ? matchingUser.username : null
    authenticationData.first_name = matchingUser ? matchingUser.first_name : null
    authenticationData.userId = matchingUser ? isAdmin ? matchingUser.adminId : matchingUser.studentId : null

    localStorage.setItem("bvc-authentication", JSON.stringify(authenticationData));

    return isLoginValid;
}

export const logout = () => {
    authenticationData.isAuthenticated = false;
    authenticationData.isAdmin = false;
    authenticationData.username = "";
    authenticationData.first_name = "Visitor";
    authenticationData.userId = ""

    localStorage.setItem("bvc-authentication", JSON.stringify(authenticationData));

}

export const getUserInformation = (authenticatedData, userInformationList) => {
    const matchingStudent = userInformationList.find((user) => {
        return user.username === authenticatedData.username;
    });

    return matchingStudent
}