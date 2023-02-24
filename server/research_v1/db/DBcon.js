import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config()
//connection to mysql database

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

const db = mysql.createConnection(dbconfig);
db.connect((error)=>{
    if(!!error){
        console.log(error);
    }else{
        console.log("Connected....");
    }
})
export default db; 
