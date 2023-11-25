import { config } from "./config.js";
import sql from 'mssql';

export const ContactMessage = async (props) => {
console.log("🚀 ~ file: contactMessage.js:5 ~ ContactMessage ~ props:", props)

    try {

        await sql.connect(config);

        const query = `
            INSERT INTO Contact
            VALUES (
                @Name,
                @Email,
                @Date,
                @Message
            )`;

        const request = new sql.Request();

        request.input('Name',      sql.NVarChar,    props.Name);
        request.input('Email',     sql.NVarChar,    props.Email);
        request.input('Date',      sql.Date,        props.Date);
        request.input('Message',   sql.NVarChar,    props.Message);
   
        await request.query(query);
        
    }
    catch (err) {
        throw err
    }
    finally {
        sql.close();
    }

}