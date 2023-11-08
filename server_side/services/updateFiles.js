import fs from 'fs';
import * as services from './readFiles.js'

export const AddNewStudent = (dirname, student) => {
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