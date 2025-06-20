import express from "express";
const router = express.Router();
import db from "../db.js";

router.get("/sort", (req, res) => {
  db.query("SELECT * FROM studentrecord ORDER BY name ASC", (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("listStudent", { result, search: "", toast: null });
  });
});

router.get("/sortName", (req, res) => {
  db.query("SELECT * FROM studentrecord ORDER BY name ASC", (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("listStudent", { result, search: "", toast: "sortName" });
  });
});

router.get("/emailSort", (req, res) => {
  db.query("SELECT * FROM studentrecord ORDER BY email ASC", (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("listStudent", { result, search: "", toast: null });
  });
});

router.get("/idSort", (req, res) => {
  db.query("SELECT * FROM studentrecord ORDER BY id ASC", (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("listStudent", { result, search: "", toast: null });
  });
});

router.get("/ageSort", (req, res) => {
  db.query("SELECT * FROM studentrecord ORDER BY age ASC", (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("listStudent", { result, search: "", toast: null });
  });
});

export default router;
