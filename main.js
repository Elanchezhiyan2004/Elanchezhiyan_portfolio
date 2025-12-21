import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import pkg from "pg";
const {Pool}=pkg;
// const {Pool}=require('pg')


// import { supabase } from "./supabase-client.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT,

  host:'localhost',
  user:'postgres',
  port:5432,
  password:'2004',
  database:'finmet'
});

pool.connect().then(()=>console.log("Connnect to DB"));

// app.get("/users",async (req,res)=>
// {
//   const query=`
//   Select * from form order by emp_id 
//   `;
//     try
//     {
//       console.log("trying to fetch for table");
//       const result=await pool.query(query); 
//       res.send(result.rows);
//     }
//     catch(err){
//       console.log("failed.fetch for the table");
//     res.send("Error "+err.message);
// }  });

// app.listen(3000, () => console.log("Server running on port 3000"));