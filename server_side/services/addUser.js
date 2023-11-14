import sql from 'mssql';
import {config} from './config.js';
import bcrypt from 'bcrypt';

export const AddUser = async (data) =>
{

    const saltRounds = 10; // Number of salt rounds, higher is more secure but slower

    const password = data.password;

    bcrypt.hash(password, saltRounds)
    .then(async (hash) => {

        const user = {
            userName: data.userName,
            password: hash,
            accessLevel: data.accessLevel
        }

        try{

            //Creates login but not student or admin
            await sql.connect(config);
    
            const query = 'INSERT INTO Login VALUES (@userName, @password, @accessLevel)';
    
            const request = new sql.Request();
    
            request.input('userName', sql.NVarChar, user.userName);
            request.input('password', sql.NVarChar, user.password);
            request.input('accessLevel', sql.Int, user.accessLevel);
            
            const result = await request.query(query);
    
            return result;
    
        }
        catch(err){
            console.error('Error reading data:', err);
        }
        finally{
            await sql.close();
        }

    })
    .catch(err => {
        console.error('Error while hashing password:', err);
    });
}