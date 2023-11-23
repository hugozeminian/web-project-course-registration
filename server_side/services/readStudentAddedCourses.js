import sql from 'mssql';
import {config} from './config.js';

export const ReadStudentAddedCourses = async (userName) => {
    try{

        await sql.connect(config);

        const query = 

        `SELECT 
            s.StudentID,
            s.Username,
            p.ProgramName,
            p.CourseMin,
            p.CourseMax,
            sc.CourseCode,
            sc.Section,
            sc.TermID,
            sc.Year
        FROM 
            Student s
        JOIN 
            Program p ON s.ProgramID = p.ProgramID
        JOIN
            StudentCourses sc ON sc.StudentID = s.StudentID
        WHERE 
            s.Username = @userName`;

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