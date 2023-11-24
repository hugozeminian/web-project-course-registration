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
            sc.Year,
            c.Name,
            c.Description,
            c.StartDate,
            c.EndDate,
            c.Room,
            c.SeatsAvailable,
            c.ClassSize,
            c.DeliveryMode,
            cp.CampusName,
            t.Term
        FROM 
            Student s
        JOIN 
            Program p ON 
            s.ProgramID = p.ProgramID
        JOIN
            StudentCourses sc ON 
            sc.StudentID = s.StudentID
        JOIN 
            Course c ON 
            c.CourseCode = sc.CourseCode AND
            c.Section = sc.Section AND
            c.TermID = sc.TermID AND
            c.Year = sc.Year
        JOIN
            Campus cp ON
            cp.CampusID = c.CampusID
        JOIN
            Term t ON
            t.TermID = sc.TermID
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