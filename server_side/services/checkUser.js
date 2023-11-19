import { SetConfig, config } from "./config.js";
import sql from 'mssql';
import bcrypt from 'bcrypt';

export const CheckUser = async (data) => {

    const user = {
        userName: data.userName,
        password: data.password,
        accessLevel: data.accessLevel
    }

    try{

        await sql.connect(config);
        
        const query = 'SELECT Password FROM Login WHERE UserName = @userName';
        const request = new sql.Request();
        request.input('userName', sql.NVarChar, data.userName);

        const result = await request.query(query);
        const passwordResult = result.recordset[0].Password;
        
        const match = await bcrypt.compare(user.password, passwordResult);

        return match;

    }
    catch(err)
    {
        throw err;
    }
    finally{
        sql.close();
    }
}