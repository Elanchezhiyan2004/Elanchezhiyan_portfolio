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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  // host:'localhost',
  // user:'postgres',
  // port:5432,
  // password:'2004',
  // database:'finmet'
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



app.post("/get", async (req,res) => {
  const {emp_id}=req.body;

  const query=`Select * from form where emp_id=$1
  `
  ;

  const values=[emp_id];

  pool.query(query,values,(err,result) =>
  {

    if(err)
    {
      console.log("Fetching error");
      return res.send("Error :"+ err.message);
    }

    if(result.rows.length==0)
    {
      return res.status(404).json({ message: "Employee not found" })
    }
    res.json(result.rows[0]);
  });
});


app.delete("/delete",async (req,res) => {
  const {emp_id}=req.body;
  console.log(emp_id);

  const query=`
  Delete from form where emp_id=$1
  `;

  const values=[emp_id];

  pool.query(query,values,(err,result)=>{

    if(err)
    {
      console.log("Deletion error");
      return res.send("Error :",err.message);
    }
    res.send(result.rows);
  });

});

app.post("/submit", async (req, res) => {
  const { emp_name, emp_id, date, email, task, status, queries } = req.body;

  var query = `
    INSERT INTO form (emp_name, emp_id, date, email, task, status, queries)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
  `;

  const values = [emp_name, emp_id, date, email, task, status, queries];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).send("Error: " + err.message);
    }
    res.send(result);
  });
});


app.post("/edit",async(req,res) =>{
  const {emp_name, emp_id, date, email, task, status, queries}=req.body;

  const values=[emp_name, emp_id, date, email, task, status, queries];

  const query=`
  Update form 
  set 
  emp_name=$1,date=$3,email=$4,task=$5,status=$6,queries=$7 
  where emp_id=$2
  `;

  pool.query(query,values,(err,result)=> {
    if (err) {
      console.log("DB Error:", err);
      return res.send("Error: " + err.message);
    }
    res.send(result.rows);
  });


});


app.post("/sendEmail", async (req, res) => {
  const { emp_name, emp_id, date, email, task, status, queries } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "elanchezhiyanelanchezhiyan5@gmail.com",
      pass: "cimo guov otej chuu"
    }
  });

  const info = await transporter.sendMail({
    from: "elanchezhiyanelanchezhiyan5@gmail.com",
    to: email,
    subject: "Finmet Form Submission",
    text: `
Dear ${emp_name},


Greetings,Thank you for submitting your Task Accomplishment Form.

Here are the details we have received from you:

Employee ID  : ${emp_id}
Date         : ${date}
Task         : ${task}
Status       : ${status}
Queries      : ${queries}

We appreciate your effort in completing the assigned task and thank you for sharing your queries/suggestions with us.  
Our team will review them and get back to you if any further information is needed.

Thank you for your cooperation.

Regards,  
Finmet Team

`
  });

  res.json({ success: true, messageId: info.messageId });
});


app.get("/users",async (req,res)=>
{
  const query=`
  Select * from form order by emp_id 
  `;
    try
    {
      console.log("trying to fetch for table");
      const result=await pool.query(query); 
      res.send(result.rows);
    }
    catch(err){
      console.log("failed.fetch for the table");
    res.send("Error "+err.message);
}  });

app.listen(3000, () => console.log("Server running on port 3000"));

// app.listen(3000, () => console.log("Server running on port 3000"));
