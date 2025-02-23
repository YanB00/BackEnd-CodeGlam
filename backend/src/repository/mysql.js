import mysql from "mysql2/promise.js";

async function connectDB() {
    return await mysql.createConnection({
        host:"localhost",
        user: "root",
        password:"",
        port: 3306,
        database:'codeglam'
    });
}

export default {connectDB};