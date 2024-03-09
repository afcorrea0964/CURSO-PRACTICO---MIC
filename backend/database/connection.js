import sql from 'mssql'

const dbSettings = { 
    user: 'afcorrea',
    password: 'sabina1949',
    server: 'localhost',
    database: 'arriendos',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },

};
export async function getConnection() {
        try {
    const pool = await sql.connect(dbSettings)
    return pool;
        } catch (error) {
        console.error(error)
    }

    }
    
    export {sql};



