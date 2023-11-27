import { config } from "./config.js"
import sql from 'mssql'

export const AdminUpdateCourse = async (props) => {
    try{

        await sql.connect(config);

        const query = ` UPDATE Course
                        SET CourseCode = @CourseCode,
                        Section = @Section,
                        ProgramID = @ProgramID,
                        Name = @Name,
                        Description = @Description,
                        TermID = @TermID,
                        Year = @Year,
                        Days = @Days,
                        Hours = @Hours,
                        StartDate = @StartDate,
                        EndDate = @EndDate,
                        CampusID = @CampusID,
                        Room = @Room,
                        DomesticFees = @DomesticFees,
                        InternationalFees = @InternationalFees,
                        SeatsAvailable = @SeatsAvailable,
                        ClassSize = @ClassSize,
                        DeliveryMode = @DeliveryMode
                        WHERE CourseCode = @OldCourseCode  AND
                              Section = @OldSection        AND
                              ProgramID = @OldProgramID    AND
                              TermID = @OldTermID          AND
                              Year = @OldYear
                        `;

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
        request.input('OldCourseCode',          sql.NVarChar,       props.OldCourseCode);
        request.input('OldSection',             sql.Int,            props.OldSection);
        request.input('OldProgramID',           sql.Int,            props.OldProgramID);
        request.input('OldTermID',              sql.Int,            props.OldTermID);
        request.input('OldYear',                sql.Int,            props.OldYear);

        await request.query(query);

    }
    catch(err){
        console.log(err);
    }
    finally{
        await sql.close();
    }
}