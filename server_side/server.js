import express, { json, urlencoded } from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ReadCourses } from './services/readCourses.js';
import sql from 'mssql';
import { SetConfig, config } from './services/config.js';
import { AddCourse } from './services/addCourses.js';
import { DeleteCourse } from './services/deleteCourse.js';
import { UpdateCourse } from './services/updateCourse.js';
import { CheckUser } from './services/checkUser.js';
import { AddUser } from './services/addUser.js';
import { ReadPrograms } from './services/readPrograms.js';
import { ReadProfileStudent } from './services/readProfileStudent.js';
import { ReadProfileAdmin } from './services/readProfileAdmin.js';


//Defines server and its port
const app = express();
const port = process.env.PORT || 3005;

//Converts url to file system path to read local files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

//Makes use of json method to allow json file being sent/received
app.use(express.json());

//Folders made available to stow any required files
app.use(express.static('services'));
app.use(express.static('repository'));


//=================== MIDDLEWARE BEGIN ==============================

//Middleware to avoid being blocked from CORS policy
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, username"
    );
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();

});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

//Uncomment to let the middleware check user credentials

app.use(async (req, res, next) => {
    if (req.path == '/login' || req.path == '/coursesList' || req.path == '/addUser' || '/programsList') {
        next();
    }
    else {
        const user = {
            userName: req.body.userName,
            password: req.body.password,
            accessLevel: req.body.accessLevel
        }
        SetConfig(user);

        try {

            const passCheck = await CheckUser(user);
            if (passCheck) {
                console.log("User verified.")
                next();
            }

        }
        catch (err) {
            console.error(err.message);
            res.status(401).json({ error: "Unauthorized." });
        }
    }
})

//=================== MIDDLEWARE END ================================

app.post('/login', async (req, res) => {

    const user = {
        userName: req.body.userName,
        password: req.body.password,
        accessLevel: req.body.accessLevel
    }

    const passCheck = await CheckUser(user);
    try {
        if (passCheck) {
            console.log("User logged.")
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(401).json({ error: "Unauthorized." });
    }

    res.json(passCheck);
});

app.get('/profileStudentInformation', async (req, res) => {
    try {
        const userName = req.headers['username']
        if (!userName) {
            res.status(400).json({ error: 'User Name not provided in headers' });
            return;
        }

        const data = await ReadProfileStudent(userName);

        res.json(data);
    }
    catch (error) {
        console.error('Error connecting to the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

app.get('/profileAdminInformation', async (req, res) => {
    try {
        const userName = req.headers['username']
        if (!userName) {
            res.status(400).json({ error: 'User Name not provided in headers' });
            return;
        }
        const data = await ReadProfileAdmin(userName);

        res.json(data);
    }
    catch (error) {
        console.error('Error connecting to the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

app.get('/coursesList', async (req, res) => {

    try {
        const data = await ReadCourses();
        res.json(data);
    }

    catch (error) {
        console.error('Error connecting to the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

app.get('/programsList', async (req, res) => {

    try {
        const data = await ReadPrograms();
        res.json(data);
    }

    catch (error) {
        console.error('Error connecting to the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

app.post('/addCourse', async (req, res) => {
    if (config.accessLevel === 99) {
        try {
            await AddCourse(req.body);
            res.status(200).json({ Success: "Course was added." })
        }
        catch {
            res.status(403).json({ error: "Unable to add new course" })
        }
    }
    else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

app.delete('/deleteCourse', async (req, res) => {

    const course = {
        courseCode: req.body.courseCode,
        section: req.body.section,
        termID: req.body.termID,
        year: req.body.year
    }

    if (config.accessLevel === 99) {
        try {
            await DeleteCourse(course);
            res.status(200).json({ Success: "Course was deleted." })
        }
        catch {
            res.status(403).json({ error: "Unable to delete course" })
        }
    }
    else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

app.put('/updateCourse', async (req, res) => {

    if (config.accessLevel === 99) {
        try {
            await UpdateCourse(req.body);
            res.status(200).json({ Success: "Course was updated." })
        }
        catch {
            res.status(403).json({ error: "Unable to update course" })
        }
    }
    else {
        res.status(401).json({ error: "Unauthorized" })
    }
})


app.post('/addUser', async (req, res) => {

    const user = {
        userName: req.body.userName,
        password: req.body.password,
        accessLevel: req.body.accessLevel,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        programID: req.body.programID,
        dateOfBirth: req.body.dateOfBirth
    }

    try {
        const response = await AddUser(user);
        if (response == true) {
            console.log(`User: ${user.userName} was added.`);
            res.status(200).json({ Success: "User was added." });
        }
    }
    catch {
        res.status(403).json({ error: "Unable to add user." })
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

