async function getData() {
  try {
    console.log("Fetching data from DB...");

    const res = await fetch("http://localhost:3000/users");
    const ans = await res.json();

    let tab = "";

    ans.forEach(row => {
      tab += `
        <tr>
          <td>${row.emp_name}</td>
          <td>${row.emp_id}</td>
          <td>${row.email}</td>
          <td>
              <button onclick=" editUser('${row.emp_id}') ">Edit</button>
              <button onclick="openpopup(); view_user('${row.emp_id}') ">View</button>
              <button onclick="delete_user('${row.emp_id}')"> Delete</button>
          </td>
        </tr>
      `;
    });

    document.getElementById("tbody").innerHTML = tab;

  } catch (err) {
    console.error("Error loading table:", err);
  }
}

  
async function view_user(emp_id) {
    try{
    const emp_data={
        emp_id
    };

    const res=await fetch("http://localhost:3000/get",{
        method :"POST",
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify(emp_data)
    });

    const row = await res.json();

  if (row.message == "Employee not found") {
    console.log("NO MATCHES FOUND");
    return;
  }

  document.getElementById("emp_name_span").textContent=row.emp_name;
  document.getElementById("emp_id_span").textContent=row.emp_id;
  document.getElementById("date_span").textContent=row.date;
  document.getElementById("email_span").textContent=row.email;
  document.getElementById("task_span").textContent=row.task;
  document.getElementById("status_span").textContent=row.status;
  document.getElementById("queries_span").textContent=row.queries;
}
catch(err)
{
    console.log("Error occured :",err.message);
}
}

//   function editUser(emp__id)
// {
//   document.getElementById("pop-input").value=document.getElementById(emp__id).value;
//   edit("tyui");
// }

// function editUser(emp_id) {
//   window.location.href = `forms.html?emp_id=${emp_id}`;
// }

// function openpopup(){
//   popup.classList.add("open-popup");
// }

// function closepopup()
// {
//   popup.classList.remove("open-popup");
// }

function editUser(emp_id) {
  console.log("Edit clicked for:", emp_id);  
  window.location.href = `forms.html?emp_id=${emp_id}`;
}

function delete_user(emp_id) {
  console.log("deleting data :",emp_id);
  delete_data(emp_id);
}


async function delete_data(emp_id){

    const data = {
    emp_id
  };



  const res=await fetch("http://localhost:3000/delete",{
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  })

  const fim=await res.json();
  console.log(fim);
  }



window.onload = getData;

