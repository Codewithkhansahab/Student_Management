import mysql, { createConnection } from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const db = createConnection({
    host : process.env.HOST,
    user :process.env.USER,
    password :process.env.PASSWORD,
    database : process.env.DATABASE
})
db.connect(err=>{
    if(err)
        throw err
    else{
        console.log("Database Connected successfully !!")
    }
})
export default db;