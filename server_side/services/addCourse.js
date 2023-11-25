import { config } from "./config.js";
import sql from 'mssql';

export const AddCourse = async (props) => {

    try {

        await sql.connect(config);

        // Check if the course already exists
        const checkQuery = `
            SELECT COUNT(*) AS CourseCount
            FROM StudentCourses
            WHERE StudentID = @StudentID
            AND CourseCode = @CourseCode
            AND Section = @Section
            AND TermID = @TermID
            AND Year = @Year
        `;

        const checkRequest = new sql.Request();
        checkRequest.input('StudentID',     sql.Int,        props.StudentID);
        checkRequest.input('CourseCode',    sql.NVarChar,   props.CourseCode);
        checkRequest.input('Section',       sql.Int,        props.Section);
        checkRequest.input('TermID',        sql.Int,        props.TermID);
        checkRequest.input('Year',          sql.Int,        props.Year);

        const { recordset } = await checkRequest.query(checkQuery);
        const courseAlreadyExists = recordset[0].CourseCount > 0;


        // If the course already exists, return true
        if (courseAlreadyExists) {
            console.log("Course already exists.");
            return true;
        }

        // If the course doesn't exist, proceed with the insertion
        const query = `
            INSERT INTO StudentCourses
            VALUES (
                @StudentID,
                @CourseCode,
                @Section,
                @TermID,
                @Year
            )`;

        const request = new sql.Request();

        request.input('StudentID',      sql.Int,        props.StudentID);
        request.input('CourseCode',     sql.NVarChar,   props.CourseCode);
        request.input('Section',        sql.Int,        props.Section);
        request.input('TermID',         sql.Int,        props.TermID);
        request.input('Year',           sql.Int,        props.Year);

        await request.query(query);

        // Update the SeatsAvailable column in the Course table
        const updateSeatsQuery = `
            UPDATE Course
            SET SeatsAvailable = SeatsAvailable - 1
            WHERE CourseCode = @CourseCode
            AND Section = @Section
            AND TermID = @TermID
            AND Year = @Year
        `;

        const updateSeatsRequest = new sql.Request();
        updateSeatsRequest.input('CourseCode',  sql.NVarChar,   props.CourseCode);
        updateSeatsRequest.input('Section',     sql.Int,        props.Section);
        updateSeatsRequest.input('TermID',      sql.Int,        props.TermID);
        updateSeatsRequest.input('Year',        sql.Int,        props.Year);

        await updateSeatsRequest.query(updateSeatsQuery);

        return false;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        sql.close();
    }

}