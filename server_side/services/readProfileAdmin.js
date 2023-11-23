import sql from 'mssql';
import {config} from './config.js';

export const ReadProfileAdmin = async (userName) => {
    try{

        await sql.connect(config);

        const query = 

        `SELECT 
            AdminID,
            Username,
            FirstName,
            MiddleName,
            LastName,
            Phone,
            Email,
            DateOfBirth
        FROM 
            Admin
        WHERE 
        Username = @userName`;

        const request = new sql.Request();

        request.input('userName', sql.VarChar, userName);

        const result = await request.query(query);

        return result.recordset;

    }
    catch(err){
        console.error('Error reading data:', err);
    }
    finally{
        await sql.close();
    }
}