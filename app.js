import express from "express";
import db from './db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import sortRoutes from './routes/sortRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.toast = req.query.toast || null;
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/", studentRoutes);
app.use("/", reportRoutes);
app.use("/", sortRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.listen(3000, () => {
//   console.log("Server started for student management System !!");
// });
