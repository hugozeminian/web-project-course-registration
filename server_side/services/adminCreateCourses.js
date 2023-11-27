import { config } from "./config.js";
import sql from 'mssql';

export const AdminCreateCourses = async (props) => {

    try {

        await sql.connect(config);

        // Verify if the term already exists
        const checkTermQuery = `
        IF NOT EXISTS (
            SELECT 1
            FROM Term
            WHERE Term = @Term AND [Year] = @Year
        )
        BEGIN
            -- Insert records into the Term table
            INSERT INTO Term (Term, [Year])
            VALUES (@Term, @Year);
        END;
    `;

        const checkTermRequest = new sql.Request();
        checkTermRequest.input('Term', sql.NVarChar, props.Term);
        checkTermRequest.input('Year', sql.Int, props.Year);

        await checkTermRequest.query(checkTermQuery);


        // Select term ID
        const selectTermIdQuery = `
        SELECT TermID FROM Term
        WHERE Term = @Term AND [Year] = @Year
        `;

        const selectTermIdRequest = new sql.Request();
        selectTermIdRequest.input('Term', sql.NVarChar, props.Term);
        selectTermIdRequest.input('Year', sql.Int, props.Year);

        const termResult = await selectTermIdRequest.query(selectTermIdQuery);
        const termId = termResult.recordset[0].TermID;


        //Insert the course
        const insertCourseQuery = `
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

        request.input('CourseCode', sql.NVarChar, props.CourseCode);
        request.input('Section', sql.Int, props.Section);
        request.input('ProgramID', sql.Int, props.ProgramID);
        request.input('Name', sql.NVarChar, props.Name);
        request.input('Description', sql.NVarChar, props.Description);
        request.input('TermID', sql.Int, termId);
        request.input('Year', sql.Int, props.Year);
        request.input('Days', sql.NVarChar, props.Days);
        request.input('Hours', sql.NVarChar, props.Hours);
        request.input('StartDate', sql.Date, props.StartDate);
        request.input('EndDate', sql.Date, props.EndDate);
        request.input('CampusID', sql.Int, props.CampusID);
        request.input('Room', sql.NVarChar, props.Room);
        request.input('DomesticFees', sql.SmallMoney, props.DomesticFees);
        request.input('InternationalFees', sql.SmallMoney, props.InternationalFees);
        request.input('SeatsAvailable', sql.Int, props.SeatsAvailable);
        request.input('ClassSize', sql.Int, props.ClassSize);
        request.input('DeliveryMode', sql.NVarChar, props.DeliveryMode);

        await request.query(insertCourseQuery);

    }
    catch (err) {
        console.log(err);
    }
    finally {
        sql.close();
    }

}