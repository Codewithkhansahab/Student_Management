import express from "express";
const router = express.Router();
import db from "../db.js";

router.get("/giveadd", (req, res) => res.render("addStudent"));

router.post("/add", (req, res) => {
  const { name, email, course, age, gender, dob, address, phone, admission_date, status } = req.body;
  const sql = "INSERT INTO studentrecord (name, email, course, age, gender, dob, address, phone, admission_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, email, course, age, gender, dob, address, phone, admission_date, status], (err) => {
    if (err) 
        return res.status(500).send("Internal Server Error");
    res.render("adminPanel", { toast: "added" });
  });
});

router.get("/givelist", (req, res) => {
  const search = req.query.search;
  let str = "SELECT * FROM studentrecord";
  let values = [];
  if (search) {
    str += " WHERE name LIKE ? OR email LIKE ?";
    values = [`%${search}%`, `%${search}%`];
  }
  db.query(str, values, (err, result) => {
    if (err) 
        return res.status(500).send("Internal Server Error");
    res.render("listStudent", { result, search });
  });
});

router.get("/viewDetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM studentrecord WHERE id = ?", [id], (err, result) => {
    if (err) 
        return res.status(500).send("internel Server Error");
    res.render("viewDetails", { student: result[0] });
  });
});

router.get("/edit", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM studentrecord WHERE id = ?", [id], (err, result) => {
    if (err) 
        return res.status(404).send("Student not found");
    res.render("editStudent", { student: result[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, course, age, gender, dob, address, phone, admission_date, status } = req.body;
  const sql = `UPDATE studentrecord SET name=?, email=?, course=?, age=?, gender=?, dob=?, address=?, phone=?, admission_date=?, status=? WHERE id=?`;
  db.query(sql, [name, email, course, age, gender, dob, address, phone, admission_date, status, id], (err) => {
    if (err) return res.status(500).send("Internal Server Error !!");
    res.render("adminPanel", { toast: "updated" });
  });
});

router.get("/remove/:id", (req, res) => {
  db.query("DELETE FROM studentrecord WHERE id = ?", [req.params.id], (err) => {
    if (err) 
        return res.status(500).send("Internel Server Error!!");
    res.render("adminPanel", { toast: "deleted" });
  });
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard")
});

router.get("/back", (req, res) => res.render("adminPanel"));

export default router;
