import express, { json, urlencoded } from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ReadCourses } from './services/readCourses.js';
import sql from 'mssql';
import { SetConfig, config } from './services/config.js';
import { AdminCreateCourses } from './services/adminCreateCourses.js';
import { AdminDeleteCourse } from './services/adminDeleteCourse.js';
import { AdminUpdateCourse } from './services/adminUpdateCourse.js';
import { CheckUser } from './services/checkUser.js';
import { AddUser } from './services/addUser.js';
import { ReadPrograms } from './services/readPrograms.js';
import { ReadProfileStudent } from './services/readProfileStudent.js';
import { ReadProfileAdmin } from './services/readProfileAdmin.js';
import { ReadStudentAddedCourses } from './services/readStudentAddedCourses.js';
import { AddCourse } from './services/addCourse.js';
import { readStudentID } from './services/readStudentId.js';
import { RemoveCourse } from './services/removeCourse.js';
import { ContactMessage } from './services/contactMessage.js';


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
    if (req.path == '/login' || req.path == '/coursesList' || req.path == '/addUser' || req.path == '/programsList') {
        next();
    } else {
        const user = {
            // userName: req.body.userName,
            // password: req.body.password,
            // accessLevel: req.body.accessLevel
            userName: "adminUser",
            password: "admin",
            accessLevel: 99
        }
        SetConfig(user);

        try {
            const passCheck = await CheckUser(user);
            if (passCheck) {
                console.log(`User verified. Method: ${req.method}, Path: ${req.path}`)
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

app.get('/studentID', async (req, res) => {
    try {
        const userName = req.headers['username']
        if (!userName) {
            res.status(400).json({ error: 'User Name not provided in headers' });
            return;
        }

        const data = await readStudentID(userName);

        res.json(data);
    }
    catch (error) {
        console.error('Error connecting to the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
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

app.get('/studentAddedCourses', async (req, res) => {
    try {
        const userName = req.headers['username']
        if (!userName) {
            res.status(400).json({ error: 'User Name not provided in headers' });
            return;
        }
        const data = await ReadStudentAddedCourses(userName);

        res.json(data);
    }
    catch (error) {
        console.error('Error connecting to the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

app.post('/studentAddedCourses', async (req, res) => {
        try {
            const isAlreadyRegistered = await AddCourse(req.body);
            res.status(200).json({ isAlreadyRegistered: isAlreadyRegistered, message: "Course was added." });
        }
        catch {
            res.status(403).json({ error: "Unable to add course" })
        }
});

app.delete('/studentAddedCourses', async (req, res) => {
        try {
            await RemoveCourse(req.body.data);
            res.status(200).json({ Success: "Course was removed." })
        }
        catch {
            res.status(403).json({ error: "Unable to remove course" })
        }
})

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

app.post('/contactMessage', async (req, res) => {
    try {
        await ContactMessage(req.body);
        res.status(200).json({ Success: "Message sent." });
    }
    catch {
        res.status(403).json({ error: "Unable to send message" })
    }
});

app.post('/adminCreateCourses', async (req, res) => {
    if (config.accessLevel === 99) {
        try {
            await AdminCreateCourses(req.body);
            res.status(200).json({ Success: "Course was created." })
        }
        catch {
            res.status(403).json({ error: "Unable to create new course" })
        }
    }
    else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

app.delete('/adminDeleteCourse', async (req, res) => {

    const course = {
        courseCode: req.body.data.CourseCode,
        section: req.body.data.Section,
        termID: req.body.data.TermID,
        year: req.body.data.Year,
    }
    console.log("🚀 ~ file: server.js:263 ~ app.delete ~ course:", course)
    if (config.accessLevel === 99) {
        try {
            await AdminDeleteCourse(course);
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

app.put('/adminUpdateCourse', async (req, res) => {
    if (config.accessLevel === 99) {
        try {
            await AdminUpdateCourse(req.body);
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

