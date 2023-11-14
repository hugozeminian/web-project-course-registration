import { config } from "./config.js";
import sql from 'mssql';

export const AddCourse = async ()=>{

    const course = {
        season: "Summer",
        courseNumber: "CS0202",
        title: "Full-Stack Web Development",
        courseDescription: "Take a deep dive into the world of web development with our Full-Stack Web Development Bootcamp. In this intensive program, you'll master web development from front-end to back-end, equipping you with the latest technologies and frameworks to build modern web applications. Whether you're a beginner or an experienced developer looking to expand your skill set, this bootcamp will help you achieve your goals. Join us on Mondays from 6:30 PM to 8:30 PM, starting on July 15, 2024, and ending on November 30, 2024, in Calgary. This class-based program offers a collaborative learning environment and has a limited number of seats available, so reserve your spot now to secure your future in web development.",
        weekDays: "Mondays",
        courseHours: "6:30 PM - 8:30 PM",
        startDate: "July 15, 2024",
        endDate: "November 30, 2024",
        campus: "Calgary",
        deliveryMode: "In Class",
        seatsAvailable: 22,
        classSize: 40,
        program: "Diploma (2 years)",
        courseMin: 2,
        courseMax: 5
    }

    try{

        await sql.connect(config);

        const query = `INSERT INTO Courses VALUES (
            @season,
            @courseNumber,
            @title,
            @courseDescription,
            @weekDays,
            @courseHours,
            @startDate,
            @endDate,
            @campus,
            @deliveryMode,
            @seatsAvailable,
            @classSize,
            @program,
            @courseMin,
            @courseMax
        )`;

        const request = new sql.Request();

        request.input('season',             sql.NVarChar,   course.season);
        request.input('courseNumber',       sql.NVarChar,   course.courseNumber);
        request.input('title',              sql.NVarChar,   course.title);
        request.input('courseDescription',  sql.NVarChar,   course.courseDescription);
        request.input('weekDays',           sql.NVarChar,   course.weekDays);
        request.input('courseHours',        sql.NVarChar,   course.courseHours);
        request.input('startDate',          sql.NVarChar,   course.startDate);
        request.input('endDate',            sql.NVarChar,   course.endDate);
        request.input('campus',             sql.NVarChar,   course.campus);
        request.input('deliveryMode',       sql.NVarChar,   course.deliveryMode);
        request.input('seatsAvailable',     sql.Int,        course.seatsAvailable);
        request.input('classSize',          sql.Int,        course.classSize);
        request.input('program',            sql.NVarChar,   course.program);
        request.input('courseMin',          sql.Int,        course.courseMin);
        request.input('courseMax',          sql.Int,        course.courseMax);

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