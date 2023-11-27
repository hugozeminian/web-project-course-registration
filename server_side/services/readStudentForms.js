import sql from 'mssql';
import {config} from './config.js';

export const ReadStudentForms = async () =>
{

    try{

        await sql.connect(config);

        const query = `
        SELECT  
                Name, 
                Email, 
                Date, 
                Message 
        FROM 
                Contact
            `;

        const request = new sql.Request();

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