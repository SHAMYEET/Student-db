const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "student_db"
});

// GET students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD student
app.post("/students", (req, res) => {
  const { name, usn } = req.body;

  db.query(
    "INSERT INTO students (name, usn) VALUES (?, ?)",
    [name, usn],
    (err, result) => {
      if (err) return res.json(err);
      res.json("Student added");
    }
  );
});
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(3001, () => {
  console.log("Server running on port 3001");
});