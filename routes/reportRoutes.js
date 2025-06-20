import express from "express";
const router = express.Router();
import db from "../db.js";

router.get("/addReport", (req, res) => {
  db.query("SELECT id, name, email FROM studentrecord", (err, result) => {
    if (err) return res.status(500).send("Error fetching students");
    res.render("addReport", { students: result });
  });
});

router.post("/submitReport", (req, res) => {
  const { studentID, reportTitle, reportContent, date } = req.body;
  const sql = "INSERT INTO reports(student_id,title,content,report_date) VALUES(?,?,?,?)";
  db.query(sql, [studentID, reportTitle, reportContent, date], (err) => {
    if (err) return res.status(500).send("Internel server Error!");
    res.render("adminPanel", { toast: "submitted" });
  });
});

router.get("/showReports", (req, res) => {
  const sql = `SELECT reports.id, studentrecord.name AS student_name, reports.title, reports.content, reports.report_date FROM reports JOIN studentrecord ON reports.student_id = studentrecord.id`;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send("Intenel server Error!");
    res.render("showReport", { reports: result });
  });
});

export default router;
