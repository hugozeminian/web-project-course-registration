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
            accessLevel: data.accessLevel,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            programID: data.programID,
            dateOfBirth: data.dateOfBirth
        }

        try{

            //Creates login but not student or admin
            await sql.connect(config);
    
            const queryLogin = 'INSERT INTO Login VALUES (@userName, @password, @accessLevel)';
    
            const request = new sql.Request();
    
            request.input('userName', sql.NVarChar, user.userName);
            request.input('password', sql.NVarChar, user.password);
            request.input('accessLevel', sql.Int, user.accessLevel);
            
            await request.query(queryLogin);


            if(user.accessLevel === 1)
            {
                const queryStudent = `INSERT INTO Student VALUES 
                                        (@userName, 
                                        @firstName,
                                        @middleName,
                                        @lastName,
                                        @phone,
                                        @email,
                                        @programID, 
                                        @dateOfBirth)`;
                
                request.input('firstName', sql.NVarChar, user.firstName);
                request.input('middleName', sql.NVarChar, user.middleName);
                request.input('lastName', sql.NVarChar, user.lastName);
                request.input('phone', sql.NVarChar, user.phone);
                request.input('email', sql.NVarChar, user.email);
                request.input('programID', sql.Int, user.programID);
                request.input('dateOfBirth', sql.Date, user.dateOfBirth);

                await request.query(queryStudent);

            }
            
            if(user.accessLevel === 99)
            {
                const queryAdmin = `INSERT INTO Admin VALUES 
                        (@userName, 
                         @firstName,
                         @middleName,
                         @lastName,
                         @phone,
                         @email, 
                         @dateOfBirth)`;
                
                request.input('firstName', sql.NVarChar, user.firstName);
                request.input('middleName', sql.NVarChar, user.middleName);
                request.input('lastName', sql.NVarChar, user.middleName);
                request.input('phone', sql.NVarChar, user.phone);
                request.input('email', sql.NVarChar, user.email);
                request.input('dateOfBirth', sql.Date, user.dateOfBirth);

                await request.query(queryAdmin);
                
            }

        }
        catch(err){
            console.log("Unable to perform queries: " + err);
        }
        finally{
            await sql.close();
        }

    })
    .catch(err => {
        console.log("Unable to hash the password: " + err);
    });

    return true;

}