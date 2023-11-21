import sql from 'mssql';
import {config} from './config.js';

export const ReadCourses = async () =>
{

    try{

        await sql.connect(config);

        const query = 
        `SELECT c.CourseCode,
                c.Section,
                c.Name,
                c.Description,
                c.Year,
                t.Term,
                c.Days,
                c.Hours,
                c.StartDate,
                c.EndDate,
                c.CampusID,
                c.Room,
                c.DomesticFees,
                c.InternationalFees,
                c.SeatsAvailable,
                c.ClassSize,
                c.DeliveryMode
        FROM Course c
        JOIN Term t
        ON c.TermID = t.TermID
        `;

        const request = new sql.Request();

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