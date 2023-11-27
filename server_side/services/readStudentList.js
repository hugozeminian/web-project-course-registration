import sql from 'mssql';
import {config} from './config.js';

export const ReadStudentList = async () =>
{

    try{

        await sql.connect(config);

        const query = `
        SELECT  s.FirstName,
                s.MiddleName,
                s.LastName,
                s.Phone,
                s.Email,
                s.ProgramID,
                s.DateOfBirth,
                p.ProgramName,
                pt.ProgramType
            FROM Student s
            JOIN Program p
            ON s.ProgramID = p.ProgramID
            JOIN ProgramType pt
            ON p.TypeID = pt.TypeID
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