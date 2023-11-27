import { config } from "./config.js";
import sql from 'mssql';

export const AdminCreateCourses = async (props) => {

    try{
//adicionar primeiro o term na base de dados, pegar o term e gerar o curso
        await sql.connect(config);
        const query = `
            INSERT INTO Course
            VALUES (
                @CourseCode,
                @Section,
                @ProgramID,
                @Name,
                @Description,
                @TermID,
                @Year,
                @Days,
                @Hours,
                @StartDate,
                @EndDate,
                @CampusID,
                @Room,
                @DomesticFees,
                @InternationalFees,
                @SeatsAvailable,
                @ClassSize,
                @DeliveryMode
            )`;

        const request = new sql.Request();

        request.input('CourseCode',             sql.NVarChar,       props.CourseCode);
        request.input('Section',                sql.Int,            props.Section);
        request.input('ProgramID',              sql.Int,            props.ProgramID);
        request.input('Name',                   sql.NVarChar,       props.Name);
        request.input('Description',            sql.NVarChar,       props.Description);
        request.input('TermID',                 sql.Int,            props.TermID);
        request.input('Year',                   sql.Int,            props.Year);
        request.input('Days',                   sql.NVarChar,       props.Days);
        request.input('Hours',                  sql.NVarChar,       props.Hours);
        request.input('StartDate',              sql.Date,           props.StartDate);
        request.input('EndDate',                sql.Date,           props.EndDate);
        request.input('CampusID',               sql.Int,            props.CampusID);
        request.input('Room',                   sql.NVarChar,       props.Room);
        request.input('DomesticFees',           sql.SmallMoney,     props.DomesticFees);
        request.input('InternationalFees',      sql.SmallMoney,     props.InternationalFees); 
        request.input('SeatsAvailable',         sql.Int,            props.SeatsAvailable);
        request.input('ClassSize',              sql.Int,            props.ClassSize);
        request.input('DeliveryMode',           sql.NVarChar,       props.DeliveryMode);

        await request.query(query);
        
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