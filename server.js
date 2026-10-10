require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());

// Connect MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "studentDB"
    });

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Student CRUD API is running!" });
});

// CREATE: Add a student
app.post("/students", async (req, res) => {
  try {
    const { name, email, age, department } = req.body;

    if (!name || !email || age === undefined ||
        age === null || age === "" || !department) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const student = await Student.create({
      name,
      email,
      age,
      department
    });

    res.status(201).json({
      message: "Student created successfully",
      student
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ: Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      count: students.length,
      students
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ: Get one student
app.get("/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE: Update a student
app.put("/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const allowedFields = ["name", "email", "age", "department"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide a field to update"
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

startServer();
