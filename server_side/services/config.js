const server = 'WECK'

export var config = {
    server: server,
    user: "adminUser",
    password: "admin",
    database: 'BowRegistration',
    options: {
        trustServerCertificate: true
    }
};

export const SetConfig = (data) => {
    config = {
        ...config,
        user: data.userName,
        password: data.password,
        accessLevel: data.accessLevel,
    };
};
