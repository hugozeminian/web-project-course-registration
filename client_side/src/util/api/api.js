import Axios from "axios"

let authenticationData = {
    "StudentID": null,
    "userName": null,
    // "password": null,
    "accessLevel": 0,
    "isAuthenticated": null,
    "isAdmin": false,
};


/*
######################################################
                    GET METHODS          
######################################################
*/
const server = 'http://localhost:3005';

const fetchData = async (route, userName) => {
    try {
        const response = await Axios.get(server + route, {
            headers: {
                'userName': userName,
            },
        });

        if (response.status >= 200 && response.status < 300) {
            // console.log(`🚀 ~ file: api.js:223 ~ fetchData ~ response.data ~ route:${route} :`, response.data)
            return response.data;
        } else {
            throw new Error('Server responded with an error');
        }
    } catch (error) {
        console.error('Error fetching:', error.message);
        throw error;
    }
};

export const getCoursesList = async () => {
    const route = '/coursesList';
    return fetchData(route);
};

export const getProgramsList = async () => {
    const route = '/programsList';
    return fetchData(route);
};

export const getStudentID = async (_userName) => {
    const route = '/studentID';
    const userName = _userName
    return fetchData(route, userName);
}

export const getStudentsList = async () => {
    const route = '/studentList';
    return fetchData(route);
}

export const getStudentsForms = async () => {
    const route = '/studentForms';
    return fetchData(route);
}

export const getProfileInformation = async (authenticatedUser) => {
    if (authenticatedUser.isAdmin) {
        const route = '/profileAdminInformation';
        const userName = authenticatedUser.userName
        return fetchData(route, userName);
    } else {
        const route = '/profileStudentInformation';
        const userName = authenticatedUser.userName
        return fetchData(route, userName);
    }
}

export const getStudentAddedCourses = async (authenticatedUser) => {
    const route = '/studentAddedCourses';
    const userName = authenticatedUser.userName
    return fetchData(route, userName);
}

////////////////////////////////////////////////////////////////// deletar
export const getStudentList = () => {
    let studentData = localStorage.getItem("bvc-studentData");
    let studentList = JSON.parse(studentData || "[]");
    return studentList;
}

////////////////////////////////////////////////////////////////// deletar
export const getAdminList = () => {
    let adminData = localStorage.getItem("bvc-adminData");
    let adminList = JSON.parse(adminData || "[]");
    return adminList;
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


/*
######################################################
                    POST METHODS          
######################################################
*/
const postData = async (route, data) => {
    try {
        const response = await Axios.post(server + route, data);

        if (response.status >= 200 && response.status < 300) {
            // console.log("🚀 ~ file: api.js:312 ~ postData ~ response.data:", response.data)
            return response.data;
        } else {
            throw new Error('Server responded with an error');
        }
    } catch (error) {
        console.error('Error fetching:', error.message);
        throw error;
    }
};

export const loginVerification = async (loginData, isAdmin = false) => {
    const route = '/login';
    const passCheck = await postData(route, loginData);

    if (passCheck) {
        if (isAdmin) {
            authenticationData = {
                ...authenticationData,
                "userName": loginData.userName,
                // "password": loginData.password,
                "accessLevel": 99,
                "isAuthenticated": true,
                "isAdmin": true,
            };
        } else {
            const dataStudentID = await getStudentID(loginData.userName)
            const {StudentID} = dataStudentID[0]
            authenticationData = {
                ...authenticationData,
                "StudentID": StudentID,
                "userName": loginData.userName,
                // "password": loginData.password,
                "accessLevel": 1,
                "isAuthenticated": true,
                "isAdmin": false,
            };
        }
    } else {
        authenticationData = {
            ...authenticationData,
            "StudentID": null,
            "userName": null,
            // "password": null,
            "accessLevel": 0,
            "isAuthenticated": null,
            "isAdmin": false,
        };
    }
    localStorage.setItem("bvc-authentication", JSON.stringify(authenticationData));
    return passCheck;
};


export const logout = () => {

    authenticationData = {
        ...authenticationData,
        "StudentID": null,
        "userName": null,
        // "password": null,
        "accessLevel": 0,
        "isAuthenticated": null,
        "isAdmin": false,
    };

    localStorage.setItem("bvc-authentication", JSON.stringify(authenticationData));

}


export const addCourseRegistration = async (courseInformation) => {
    const route = '/studentAddedCourses';
    const isAlreadyRegistered = await postData(route, courseInformation);
    return isAlreadyRegistered
}


export const sendMessageContact = async (messageStudentData) => {
    const route = '/contactMessage';
    await postData(route, messageStudentData);
}


export const createCourse = async (courseInformation) => {
    const route = '/adminCreateCourses';
    await postData(route, courseInformation);
}

export const createUser = async (userInformation) => {
    const route = '/addUser';
    const isUserCreated = await postData(route, userInformation);
    return isUserCreated.isUserCreated
}

/*
######################################################
                    DELETE METHODS          
######################################################
*/

const deleteData = async (route, params) => {
    try {
        const response = await Axios.delete(server + route, { data: params });

        if (response.status >= 200 && response.status < 300) {
            // console.log("🚀 ~ file: api.js:454 ~ deleteData ~ response.data:", response.data)
            return response.data;
        } else {
            throw new Error('Server responded with an error');
        }
    } catch (error) {
        console.error('Error fetching:', error.message);
        throw error;
    }
};

export const removeCourseRegistration = async (courseInformation) => {
    const route = '/studentAddedCourses';
    await deleteData(route, { data: courseInformation });
};

export const deleteCourse = async (courseInformation) => {
    const route = '/adminDeleteCourse';
    await deleteData(route, { data: courseInformation });
};

/*
######################################################
                    PUT METHODS          
######################################################
*/
const updateData = async (route, params) => {
    try {
      const response = await Axios.put(server + route, params);
  
      if (response.status >= 200 && response.status < 300) {
        //   console.log("🚀 ~ file: api.js:500 ~ updateData ~ response.data:", response.data)
        return response.data;
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      console.error('Error fetching:', error.message);
      throw error;
    }
  };
  
  export const updateCourse = async (courseInformation) => {
    const route = '/adminUpdateCourse';
    await updateData(route, courseInformation);
};