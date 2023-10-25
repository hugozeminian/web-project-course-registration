/*
#############################
#####  ADMIN FUNCTIONS  #####
#############################
*/


/*
#############################
##### STUDENT FUNCTIONS #####
#############################
*/

export const getNextAvailableID = (existingIDs) => {
    let maxID = 0;

    if (existingIDs) {
        existingIDs.forEach((existingID) => {
            if (existingID.id > maxID) {
                maxID = existingID.id;
            }
        });
    }

    return maxID + 1;
}

export const addCourseRegistration = (courseInformation) => {
    let courseRegistrations = JSON.parse(localStorage.getItem("courseRegistrations"));

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
        localStorage.setItem("courseRegistrations", JSON.stringify(courseRegistrations));
        return false;
    }
}


export const getCourseRegistrationList = () => {
    let courseRegistrations = localStorage.getItem("courseRegistrations");
    let myCourseList = JSON.parse(courseRegistrations || "[]");
    return myCourseList;
}

export const removeCourseRegistration = (courseInformation) => {
    let courseRegistrations = JSON.parse(localStorage.getItem("courseRegistrations"));

    if (courseRegistrations) {
        const indexToRemove = courseRegistrations.findIndex(
            (courseRegistration) =>
                // courseRegistration.studentId === courseInformation.studentId &&
                courseRegistration.courseId === courseInformation.courseId
        );

        if (indexToRemove !== -1) {
            courseRegistrations.splice(indexToRemove, 1);
            localStorage.setItem("courseRegistrations", JSON.stringify(courseRegistrations));
        }

    }
}

export const sendMessageContact = (messageStudentsData) => {
    let messageStudents = JSON.parse(localStorage.getItem("messageStudents"));

    if (!messageStudents) {
        messageStudents = [];
    }

    let nextId = getNextAvailableID(messageStudents);
    messageStudentsData.id = nextId;
    messageStudents.push(messageStudentsData);
    localStorage.setItem("messageStudents", JSON.stringify(messageStudents));
}


