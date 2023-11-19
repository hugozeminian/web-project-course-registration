import { config } from "./config.js";
import sql from 'mssql';

// Use props and course id?
export const DeleteCourse = async (props)=>{

    const courseCode = props.courseCode
    const section = props.section
    const termID = props.termID
    const year = props.year

    try{

        await sql.connect(config);

        const query =   
            `DELETE FROM Course WHERE 
            CourseCode = @courseCode AND 
            Section = @section AND 
            TermID = @termID AND 
            Year = @year`;

        const request = new sql.Request();

        request.input('courseCode', sql.VarChar, courseCode);
        request.input('section', sql.Int, section);
        request.input('termID', sql.Int, termID);
        request.input('year', sql.Int, year);

        await request.query(query);

    }
    catch(err){
        throw(err);
    }
    finally{
        await sql.close();
    }
}