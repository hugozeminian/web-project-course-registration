import express, {json, urlencoded} from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as services from './services/readFiles.js';
import * as update from './services/updateFiles.js';

//
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

//Middleware to avoid being blocked from CORS policy
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
    next();
  });
  
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.get('/admList', async (req, res) => {
    try {
      const response = await services.LoadAdmList(__dirname);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/contactList', async (req, res) => {
try {
    const response = await services.LoadContactList(__dirname);
    res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/coursesList', async (req, res) => {
    try {
        const response = await services.LoadCoursesList(__dirname);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/programsList', async (req, res) => {
    try {
        const response = await services.LoadProgramsList(__dirname);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/studentsList', async (req, res) => {
    try {
        const response = await services.LoadStudentsList(__dirname);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

