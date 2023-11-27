import { config } from "./config.js";
import sql from 'mssql';

// Use props and course id?
export const AdminDeleteCourse = async (props) => {
    
    const { courseCode, section, termID, year } = props;

    try{

        await sql.connect(config);

        // Delete from StudentCourses table
        const studentCoursesQuery =   
            `DELETE FROM StudentCourses WHERE 
            CourseCode = @courseCode AND 
            Section = @section AND 
            TermID = @termID AND 
            Year = @year`;

        const studentCoursesRequest = new sql.Request();

        studentCoursesRequest.input('courseCode', sql.VarChar, courseCode);
        studentCoursesRequest.input('section', sql.Int, section);
        studentCoursesRequest.input('termID', sql.Int, termID);
        studentCoursesRequest.input('year', sql.Int, year);

        await studentCoursesRequest.query(studentCoursesQuery);

        // Delete from Course table
        const courseQuery =   
            `DELETE FROM Course WHERE 
            CourseCode = @courseCode AND 
            Section = @section AND 
            TermID = @termID AND 
            Year = @year`;

        const courseRequest = new sql.Request();

        courseRequest.input('courseCode', sql.VarChar, courseCode);
        courseRequest.input('section', sql.Int, section);
        courseRequest.input('termID', sql.Int, termID);
        courseRequest.input('year', sql.Int, year);

        await courseRequest.query(courseQuery);

    }
    catch(err){
        console.log(err);
    }
    finally{
        await sql.close();
    }
}