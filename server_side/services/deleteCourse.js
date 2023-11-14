import { config } from "./config.js";
import sql from 'mssql';

export const DeleteCourse = async ()=>{

    const course = 4

    try{

        await sql.connect(config);

        const query = 'DELETE FROM Courses WHERE courseID = @courseid';

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