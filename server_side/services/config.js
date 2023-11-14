export var config = {
    server: 'WECK',
    user: "adminUser",
    password: "admin",
    database: 'BowRegistration',
    options:{
        trustServerCertificate: true
    }
};

export const SetConfig = (data)=>{

    config = {
        server: 'WECK',
        user: data.userName,
        password: data.password,
        accessLevel: data.accessLevel,
        database: 'BowRegistration',
        options:{
            trustServerCertificate: true
        }
    };
};