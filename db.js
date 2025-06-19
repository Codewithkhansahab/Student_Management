import mysql, { createConnection } from 'mysql2';

const db = createConnection({
    host : "localhost",
    user :"root",
    password :"lala@123",
    database : "test"
})
db.connect(err=>{
    if(err)
        throw err
    else{
        console.log("Database Connected successfully !!")
    }
})
export default db;