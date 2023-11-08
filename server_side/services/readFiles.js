//Loads each file returning a promise (async)
import fs from 'fs';

export const LoadAdmList = (dirname) => {
    return new Promise((resolve, reject) => {
      fs.readFile(dirname + '/repository/startAdmList.json', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        }
        });
    });
};

export const LoadContactList = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dirname + '/repository/startContactList.json', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
            } catch (error) {
            reject(error);
            }
        }
        });
    });
};

export const LoadCoursesList = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dirname + '/repository/startCoursesList.json', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
            } catch (error) {
            reject(error);
            }
        }
        });
    });
};

export const LoadProgramsList = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dirname + '/repository/startProgramsList.json', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
            } catch (error) {
            reject(error);
            }
        }
        });
    });
};

export const LoadStudentsList = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dirname + '/repository/startStudentList.json', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
            } catch (error) {
            reject(error);
            }
        }
        });
    });
};