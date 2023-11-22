import { SetConfig, config } from "./config.js";
import sql from 'mssql';
import bcrypt from 'bcrypt';

export const CheckUser = async (data) => {
console.log("🚀 ~ file: checkUser.js:6 ~ CheckUser ~ data:", data)

    const user = {
        userName: data.userName,
        password: data.password,
        accessLevel: data.accessLevel
    }
    console.log("🚀 ~ file: checkUser.js:13 ~ CheckUser ~ user.data.userName:", data.userName)

    try{

        await sql.connect(config);
        
        const query = 'SELECT dbo.ufCheckUser(@userName)';
        const request = new sql.Request();
        request.input('userName', sql.NVarChar, data.userName);

        const result = await request.query(query);

        const passwordResult = Object.values(result.recordset[0]);

        // console.log(passwordResult[0]);

        const match = await bcrypt.compare(user.password, passwordResult[0]);

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