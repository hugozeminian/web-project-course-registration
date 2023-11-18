import express, {json, urlencoded} from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readData } from './services/readCourses.js';
import sql from 'mssql';
import { SetConfig, config } from './services/config.js';
import { AddCourse } from './services/addCourses.js';
import { DeleteCourse } from './services/deleteCourse.js';
import { UpdateCourse } from './services/updateCourse.js';
import { CheckUser } from './services/checkUser.js';
import { AddUser } from './services/addUser.js';

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

//Uncomment to let the middleware check user credentials

app.use(async (req, res, next)=>{

    const user = {
        userName: req.body.userName,
        password: req.body.password,
        accessLevel: req.body.accessLevel
    }

    SetConfig(user);

    try{
        
        const passCheck = await CheckUser(user);
        if(passCheck)
        {
            console.log("User verified.")
            next();
        }
        
    }
    catch(err)
    {
        console.error(err.message);
        res.status(401).json({error: "Unauthorized."});  
    }
})

//=================== MIDDLEWARE END ================================

app.get('/coursesList', async (req, res) => {

    try{
        const data = await readData();
        res.json(data);
    }
    
    catch (error) {
        console.error('Error connecting to the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

//

//Hugo
// app.post('/addCourse', async(req, res)=>{

//     if(config.isAdmin === 1)
//     {
//         try{
//             await AddCourse();
//             res.status(200).json({Success:"Course was added."})
//         }
//         catch{
//             res.status(403).json({error: "Unable to add new course"})
//         }  
//     }
//     else{
//         res.status(401).json({ error: "Unauthorized"})
//     }
// })

//William
// app.delete('/deleteCourse', async(req, res)=>{

//     if(config.isAdmin === 1)
//     {
//         try{
//             await DeleteCourse();
//             res.status(200).json({Success:"Course was deleted."})
//         }
//         catch{
//             res.status(403).json({error: "Unable to delete course"})
//         }  
//     }
//     else{
//         res.status(401).json({ error: "Unauthorized"})
//     }
// })

//Fabio
// app.put('/updateCourse', async (req,res) => {

//     if(config.isAdmin === 1)
//     {
//         try{
//             await UpdateCourse();
//             res.status(200).json({Success:"Course was updated."})
//         }
//         catch{
//             res.status(403).json({error: "Unable to update course"})
//         }  
//     }
//     else{
//         res.status(401).json({ error: "Unauthorized"})
//     }
// })

//Ajustar resposta
app.post('/addUser', async (req,res) => {

    const user = {
        userName: req.body.userName,
        password: req.body.password,
        accessLevel: req.body.accessLevel
    }
    try{
        const response = await AddUser(user);
        console.log(response);
        res.status(200).json({Success:"User was added."})
    }
    catch{
        res.status(403).json({error: "Unable to add user."})
    } 
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

