import mysql, { createConnection } from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const db = createConnection({
    host : "process.env.sql12.freesqldatabase.com",
    user :"process.env.sql12785930",
    password :"process.env.Please wait",
    database : "process.env.sql12785930"
})
db.connect(err=>{
    if(err)
        throw err
    else{
        console.log("Database Connected successfully !!")
    }
})
export default db;