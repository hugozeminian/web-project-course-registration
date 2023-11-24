import sql from 'mssql';
import { config } from './config.js';

export const readStudentID = async (userName) => {

    try {

        await sql.connect(config);

        const query =

            `SELECT 
                StudentID 
            FROM Student
            WHERE Username = @userName`;

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