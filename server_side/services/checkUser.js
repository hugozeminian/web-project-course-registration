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
        
        const query = 'SELECT dbo.ufCheckUser(@userName, @accessLevel)';
        const request = new sql.Request();
        request.input('userName', sql.NVarChar, data.userName);
        request.input('accessLevel', sql.Int, data.accessLevel);

        const result = await request.query(query);

        const passwordResult = Object.values(result.recordset[0]);

        // console.log(passwordResult[0]);

        if (passwordResult[0] !== null) {
            return await bcrypt.compare(user.password, passwordResult[0]);
        } else {
            return false;
        }

    }
    catch(err)
    {
        throw err;
    }
    finally{
        sql.close();
    }
}