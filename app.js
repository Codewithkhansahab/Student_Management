import express from "express";
import db from './db.js'
import { name } from "ejs";

const app = express()

app.use(express.urlencoded({extended : false}))
app.set('view engine','ejs')
app.use(express.static("public"));



//render index page
app.get("/",(req,res)=>{
    res.render("index")
})
//render index page
app.get("/login",(req,res)=>{
    res.render("index")
})
//after login redirected by admin panel
app.post("/loginHome", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM userstudentmanage WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    if (result.length > 0) {
      // Login Success
      res.render("adminPanel", { toast: "loginsuccess" });
    } else {
      // Invalid credentials
      res.redirect("/?toast=invalid");
    }
  });
});

// rendered to add report
app.get("/addReport", (req, res) => {
  const sql = "SELECT id, name, email FROM studentrecord";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching students");
    }
    res.render("addReport", { students: result });
  });
});


// Submit report
app.post("/submitReport",(req,res)=>{
    const {studentID,reportTitle,reportContent,date} = req.body;
    const sql = "insert into reports(student_id,title,content,report_date) values(?,?,?,?)"

    db.query(sql,[studentID,reportTitle,reportContent,date],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Internel server Error!")
        }
        else{
            res.render("adminPanel",{toast : 'submitted'})
        }
    })
})
// showing reports using foreign key with join 
app.get("/showReports",(req,res)=>{
    const sql = `select reports.id,studentrecord.name as student_name,reports.title,reports.content,reports.report_date from reports join studentrecord on reports.student_id = studentrecord.id`;
    db.query(sql,(err,result)=>{
        if(err){
        console.log(err)
        res.status(500).send("Intenel server Error!")
        }
        else{
            res.render("showReport",{reports : result})
        }
    })
})
 
//render on dashboard
app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})
//after logout redirecting to login page
app.get("/logout",(req,res)=>{
    res.render("index")
})
//if user want to register
app.get("/registerPage",(req,res)=>{
    res.render("register")
})
//for save user data 
app.post("/register",(req,res)=>{
    const toast = req.query.toast;
    const {name,email,password} = req.body
    const sql = "insert into userstudentmanage(name,email,password) values(?,?,?)";
    
    db.query(sql, [name,email,password],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Internel server Error")
        }
        else{
            res.redirect("/?toast=registered")
        }
    })
})
//component for back button 
app.get("/back",(req,res)=>{
    res.render("adminPanel")
})








//giving add from 
app.get("/giveadd",(req,res)=>{
    res.render("addStudent")
})
app.get("/edit", (req, res) => {
    const id = req.query.id;
    const sql = "SELECT * FROM studentrecord WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(404).send("Student not found");
        } else {
            res.render("editStudent", { student: result[0]});
        }
    });
});
//submit the details from add form
app.post("/add",(req,res)=>{
    const {name,email,course,age,gender,dob,address,phone,admission_date,status}=req.body;
    const sql = "insert into studentrecord (name,email,course,age,gender,dob,address,phone,admission_date,status)values (?,?,?,?,?,?,?,?,?,?)";
    db.query(sql,[name,email,course,age,gender,dob,address,phone,admission_date,status],(err,result)=>{
        if(err){
            res.status(500).send("Internel Server Error")
        }
        else{
            res.redirect("/",{toast :"added"});
        }
    })
})
//showing student list
app.get("/givelist", (req, res) => {
    const search = req.query.search;
    let str = "SELECT * FROM studentrecord";
    let values = [];

  
    if (search) {
        str += " WHERE name LIKE ? or email like ?";
       values = [`%${search}%`,`%${search}%`]
    }

    db.query(str, values, (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.render("listStudent", { result, search });
    });
});
//showin details of student particular by id 
app.get("/viewDetails/:id",(req,res)=>{
    const id = req.params.id;
    const sql = "select * from studentrecord where id = ?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500).send("internel Server Error")
        }
        else{
            res.render("viewDetails",{student : result[0]})
        }
    })
})

//updating the data of user by existing value
app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const {
        name,email,course, age, gender,dob,
        address,phone,admission_date,status} = req.body;

    const sql = `
        UPDATE studentrecord
        SET name = ?, email = ?, course = ?, age = ?, gender = ?, dob = ?, 
            address = ?, phone = ?, admission_date = ?, status = ?
        WHERE id = ?
    `;

    const values = [
        name, email, course, age, gender, dob,
        address, phone, admission_date, status, id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error during update:", err);
            return res.status(500).send("Internal Server Error !!");
        } else {
            res.redirect("/?toast=updated");
        }
    });
});
// delete a student
app.get("/remove/:id",(req,res)=>{
    const id = req.params.id;
    const sql = "delete from studentrecord where id = ?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Internel Server Error!!")
        }
        else{
           res.render("adminPanel",{toast :'deleted'})
        }
    })
})
// sort by name
app.get("/sort", (req, res) => {
    const sql = "SELECT * FROM studentrecord ORDER BY name ASC"; 
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.render("listStudent", { result, search: "" ,toast : null});
        }
    });
});
app.get("/sortName", (req, res) => {
    const sql = "SELECT * FROM studentrecord ORDER BY name ASC"; 
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.render("listStudent", { result, search : "",toast : 'sortName'});
        }
    });
});
app.get("/emailSort", (req, res) => {
    const sql = "SELECT * FROM studentrecord ORDER BY email ASC"; 
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.render("listStudent", { result, search : "", toast : null});
        }
    });
});
app.get("/idSort", (req, res) => {
    const sql = "SELECT * FROM studentrecord ORDER BY id ASC"; 
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.render("listStudent", { result, search : "",toast : null});
        }
    });
});
app.get("/ageSort", (req, res) => {
    const sql = "SELECT * FROM studentrecord ORDER BY age ASC"; 
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.render("listStudent", { result, search : "",toast : null});
        }
    });
});


app.listen(3000,()=>{
    console.log("Server started for student managemnet System !!")
})
