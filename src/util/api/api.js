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
export const getNextCourseRegistrationID = (courseRegistrations) => {
    let courseId = 0;

    courseRegistrations.forEach((courseRegistration) => {
        if (courseRegistration.id > courseId) {
            courseId = courseRegistration.id;
        }
    });

    return courseId+1;
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
        alert("This course is already registered.");
    } else {
        let nextId = getNextCourseRegistrationID(courseRegistrations);
        courseInformation.id = nextId;
        courseRegistrations.push(courseInformation);
        localStorage.setItem("courseRegistrations", JSON.stringify(courseRegistrations));
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