import sql from 'mssql';
import {config} from './config.js';

export const ReadPrograms = async () =>
{

    try{

        await sql.connect(config);

        const query = `
        SELECT p.ProgramID,
               p.ProgramName,
               p.Description,
               t.Term,
               p.Year,
               p.StartDate,
               p.EndDate,
               p.DomesticFees,
               p.InternationalFees,
               p.CourseMin,
               p.CourseMax,
               pt.ProgramType,
               d.DepartmentName
            FROM Program p
            JOIN ProgramType pt
            ON p.TypeID = pt.TypeID
            JOIN Department d
            ON p.DepartmentID = d.DepartmentID
            JOIN Term t
            ON p.TermID = t.TermID
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