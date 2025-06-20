import express from "express";
const router = express.Router();
import db from "../db.js";

router.get("/", (req, res) => res.render("index"));

router.get("/login", (req, res) => res.render("index"));

router.post("/loginHome", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userstudentmanage WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");
    if (result.length > 0) {
      res.render("adminPanel", { toast: "loginsuccess" });
    } else {
      res.render("index", { toast: "invalid" });
    }
  });
});

router.get("/logout", (req, res) => res.render("index"));

router.get("/registerPage", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO userstudentmanage(name,email,password) VALUES(?,?,?)";
  db.query(sql, [name, email, password], (err) => {
    if (err) return res.status(500).send("Internel server Error");
    res.redirect("/?toast=registered");
  });
});

export default router;
