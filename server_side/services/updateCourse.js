import { config } from "./config.js"
import sql from 'mssql'

export const UpdateCourse = async ()=>{
    
    const course = 4

    try{

        await sql.connect(config);

        const query = `UPDATE Courses SET startDate = 'July 13, 2024' WHERE courseID = @courseid`;

        const request = new sql.Request();

        request.input('courseid', sql.Int, course);

        await request.query(query);

    }
    catch(err){
        console.error('Error reading data:', err);
    }
    finally{
        await sql.close();
    }
}