import { config } from "./config.js";
import sql from 'mssql';

export const AddCourse = async (props) => {

    try{

        await sql.connect(config);
        
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

        request.input('StudentID',          sql.Int,            props.StudentID);
        request.input('CourseCode',         sql.NVarChar,       props.CourseCode);
        request.input('Section',            sql.Int,            props.Section);
        request.input('TermID',             sql.Int,            props.TermID);
        request.input('Year',               sql.Int,            props.Year);

        await request.query(query);
    }
    catch(err)
    {
        throw err;
    }
    finally
    {
        sql.close();
    }

}