// const { supabase } = require("./supabase-client");

// require supabase  from './DAY 1/supabase-client.js';
// import { createClient } from "@supabase/supabase-js";
// import supabase from "./supabase-client";

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const emp_id = params.get("emp_id");

  if (emp_id) {
    document.getElementById("pop_input").value = emp_id;
    edit(); 
  }
}


// document.getElementById('edit').addEventListener('click',(event)=>{
//   event.preventDefault();
//   edit('Edit_pop-up');
// });

// document.getElementById('delete').addEventListener('click',(event)=>{
//   event.preventDefault();
//   delete_data();
// });

document.getElementById('submit').addEventListener('click',(event)=>{
  event.preventDefault();
  submit();
});





function check_edit(){
  clear_old_error();
  var emp_id=document.getElementById('emp_id').value;

 var message="mandatory(*) field.";
  if(emp_id=="")
  {
    errorMessage('id_err',message);
    return false;
  }
  return true;
}



// function editUser(emp__id)
// {
//   document.getElementById("pop-input").value=document.getElementById(emp__id).value;
//   edit("tyui");
// }

// async function edit(spanid){
//   // const err_id=document.getElementById(spanid);
//   // if(check_edit()){
//   //   const data = {
//   //   emp_name: document.getElementById('emp_name').value,
//   //   emp_id: document.getElementById('emp_id').value,
//   //   date: document.getElementById('date').value,
//   //   email: document.getElementById('mail_box').value,
//   //   task: document.getElementById('task').value,
//   //   status: document.getElementById('status').value,
//   //   queries: document.querySelector("#queries_container input").value
//   // };

//   const sending={
//     emp_id:document.getElementById("pop_input").value
//   }
//   const res= await fetch("http://localhost:3000/get",{
//     method:"POST",
//     headers:{"Content-Type":"application/json"},
//     body:JSON.stringify(sending)
//   })
//   // .then(res => res.json())
//   // .then(response => console.log("Edited the details", response))
//   // .catch(err => console.error("Error :",err))

//   const data= await res.json();
//   // const fim=await res.text();
//   // console.log(fim);

//   if(data.message=="Employees not found")
//   {
//     reset();
//     alert("NO MATCHES FOUND");
//     return;
//   }
//   if(data.emp_name=="" || data.emp_name==null|| data.emp_id=="" || data.emp_id==null || data.date==""||data.date==null ||data.email==""||data.email==null ||data.task==null|| data.status==null|| data.queries==null)
//   {
//     reset();
//     return;
//   }
//   document.getElementById('emp_name').value = data.emp_name,
//   document.getElementById('emp_id').value = data.emp_id,
//   document.getElementById('date').value = data.date,
//   document.getElementById('mail_box').value = data.email,
//   document.getElementById('task').value = data.task,
//   document.getElementById('status').value =data.status,
//   document.querySelector("#queries_container input").value = data.queries

//   delete_data();
//   // closepopup();
//   }

async function edit() {
  const sending = {
    emp_id: document.getElementById("pop_input").value
  };

  const res = await fetch("http://localhost:3000/get", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sending)
  });

  const data = await res.json();

  if (data.message == "Employee not found") {
    alert("NO MATCHES FOUND");
    return;
  }

  document.getElementById('emp_name').value = data.emp_name;
  document.getElementById('emp_id').value = data.emp_id;
  document.getElementById('date').value = data.date;
  document.getElementById('mail_box').value = data.email;
  document.getElementById('task').value = data.task;
  document.getElementById('status').value = data.status;
  document.getElementById('box').value = data.queries;

  document.getElementById("popup").style.display = "none";
  delete_data();
}


async function delete_data(){
  
    const data = {
    emp_id: document.getElementById('pop_input').value
  };

  document.getElementById('pop_input').value="";

  const res=await fetch("http://localhost:3000/delete",{
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  })
  // .then(res => res.json())
  // .then(response => console.log("deleted the details", response))
  // .catch(err => console.error("Error :",err))

  const fim=await res.json();
  console.log(fim);
  }


async function sendEmail() {

  const data = {
    emp_name: document.getElementById('emp_name').value,
    emp_id: document.getElementById('emp_id').value,
    date: document.getElementById('date').value,
    email: document.getElementById('mail_box').value,
    task: document.getElementById('task').value,
    status: document.getElementById('status').value,
    queries: document.querySelector("#queries_container input").value
  };

  const res=await fetch("http://localhost:3000/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  const fim=await res.json();
  console.log(fim);
}

async function insertToDB(){

  const data = {
    emp_name: document.getElementById('emp_name').value,
    emp_id: document.getElementById('emp_id').value,
    date: document.getElementById('date').value,
    email: document.getElementById('mail_box').value,
    task: document.getElementById('task').value,
    status: document.getElementById('status').value,
    queries: document.getElementById('box').value
  };
  const res= await fetch("http://localhost:3000/submit",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  })


      const fin = await res.text();
      console.log(fin);
}


function reset()
{
document.getElementById('emp_id').value="";
  document.getElementById('emp_name').value="";
  document.getElementById('date').value="";
  document.getElementById('mail_box').value="";
  document.getElementById('status').value="";
  document.getElementById('task').value="";
  document.getElementById('box').value="";
}

function clear_old_error(){
  var name=document.getElementById('name_err');
  var date=document.getElementById('date_err');
  var id=document.getElementById('id_err');
  var mail=document.getElementById('mail_err');
  name.textContent="";
  date.textContent="";
  id.textContent="";
  mail.textContent="";
  
}

function check()
{
  clear_old_error();
  var emp_id=document.getElementById('emp_id').value;
  var empName=document.getElementById('emp_name').value;
  var date=document.getElementById('date').value;
  var mail=document.getElementById('mail_box').value;
  var flag=true;
  var message="mandatory(*) field.";
  if(date=="" )
    {
      errorMessage('date_err',message);
      flag=false;
    }
  if(emp_id=="")
  {
    errorMessage('id_err',message);
    flag=false;
  }
  if(empName==""){
    errorMessage('name_err',message);
    flag=false;
  }
  if(mail==""&&!mail.includes("@")&&(!mail.includes(".com")||!mail.includes(".in")))
  {
    message="Kindly enter a valid mail id";
    errorMessage('mail_err',message);
    flag=false;
  }
  return flag;
}

function errorMessage(spanid,message)
{
  const errid=document.getElementById(spanid);
  errid.textContent=message;
}



function submit(){
  if(check())
    {
var inputs=details.querySelectorAll('input , textarea');
for(let i=0;i<inputs.length;i++)
{
    if(inputs[i]!='submit' && inputs[i]!='reset')
    {
        console.log(inputs[i].value);
    }
}
sendEmail();
insertToDB();
reset();
}
  else
    {
      console.log("Kindly enter the mandatory(*) fields ");
    }
    }

