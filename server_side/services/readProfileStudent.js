import sql from 'mssql';
import { config } from './config.js';

export const ReadProfileStudent = async (userName) => {
    try {

        await sql.connect(config);

        const query =

            `SELECT 
                s.StudentID,
                s.Username,
                s.FirstName,
                s.LastName,
                s.Phone,
                s.Email,
                s.DateOfBirth,
                p.ProgramName,
                p.CourseMin,
                p.CourseMax,
                d.DepartmentName,
                (SELECT COUNT(StudentID) FROM StudentCourses WHERE StudentID = s.StudentID) AS CoursesRegistered
            FROM 
                Student s
            JOIN 
                Program p ON s.ProgramID = p.ProgramID
            JOIN
                Department d ON p.DepartmentID = d.DepartmentID
            WHERE 
                s.Username = @userName`;

        const request = new sql.Request();

        request.input('userName', sql.VarChar, userName);

        const result = await request.query(query);

        return result.recordset;

    }
    catch (err) {
        console.error('Error reading data:', err);
        throw err;
    }
    finally {
        try {
            await sql.close();
        } catch (closeError) {
            console.error('Error closing SQL connection:', closeError);
        }
    }
}