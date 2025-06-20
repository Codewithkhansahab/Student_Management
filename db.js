import mysql, { createConnection } from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const db = createConnection({
    host : HOST,
    user :USER,
    password :PASSWORD,
    database : DATABASE
})
db.connect(err=>{
    if(err)
        throw err
    else{
        console.log("Database Connected successfully !!")
    }
})
export default db;