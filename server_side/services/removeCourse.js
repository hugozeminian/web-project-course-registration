import { config } from "./config.js";
import sql from 'mssql';

export const RemoveCourse = async (props) => {
    try{

        await sql.connect(config);
        
        const query = `
            DELETE 
            FROM StudentCourses
            WHERE
                StudentID = @StudentID AND
                CourseCode = @CourseCode AND
                Section = @Section AND
                TermID = @TermID AND
                [Year] = @Year
                `;

        const request = new sql.Request();

        request.input('StudentID',          sql.Int,            props.StudentID);
        request.input('CourseCode',         sql.NVarChar,       props.CourseCode);
        request.input('Section',            sql.Int,            props.Section);
        request.input('TermID',             sql.Int,            props.TermID);
        request.input('Year',               sql.Int,            props.Year);

        await request.query(query);

        // Increment the SeatsAvailable column in the Course table
        const incrementSeatsQuery = `
            UPDATE Course
            SET SeatsAvailable = SeatsAvailable + 1
            WHERE CourseCode = @CourseCode
            AND Section = @Section
            AND TermID = @TermID
            AND [Year] = @Year
        `;

        const incrementSeatsRequest = new sql.Request();
        incrementSeatsRequest.input('CourseCode',   sql.NVarChar,   props.CourseCode);
        incrementSeatsRequest.input('Section',      sql.Int,        props.Section);
        incrementSeatsRequest.input('TermID',       sql.Int,        props.TermID);
        incrementSeatsRequest.input('Year',         sql.Int,        props.Year);

        await incrementSeatsRequest.query(incrementSeatsQuery);
    }
    catch(err)
    {
        console.log(err);
    }
    finally
    {
        sql.close();
    }

}