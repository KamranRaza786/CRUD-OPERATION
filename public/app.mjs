// app.mjs
import express from "express";
import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';
import dotenv from "dotenv";
import mongodbUri from "../atlas_uri.mjs";
import './src/config/index.mjs'

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());

// Define the nanoid generator for products
const productNanoid = customAlphabet('1234567890', 20);

app.get("/", (req, res) => {
  res.send(`"Welcome to AI Chatbot Development Program!"`);
});

// MongoDB Connection
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("nameInput").value,
    cnicNumber: document.getElementById("cnicInput").value,
    fatherName: document.getElementById("fatherNameInput").value,
    age: parseInt(document.getElementById("ageInput").value),
    dateOfBirth: new Date(document.getElementById("dobInput").value),
    gender: document.querySelector('input[name="gender"]:checked').value,
    religion: document.querySelector('input[name="religion"]:checked').value,
    nationality: document.getElementById("nationalityInput").value,
    picture: document.getElementById("pictureInput").value,
    // Add more fields as needed
  };
  try {
    const response = await fetch("/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data.message); // "Student added successfully"
    console.log(data.data); // Newly added student data
    // Handle any additional logic or UI updates after successful form submission
  } catch (error) {
    console.error("Error adding student:", error.message);
    // Handle errors or show error messages to the user
  }
});


const Student = mongoose.model("Student", studentSchema);

// Add a new student
app.post("/student", (req, res) => {
  const studentData = req.body;
  const studentID = customAlphabet('1234567890', 20)();

  const newStudent = new Student({
    studentID,
    name: studentData.name,
    cnicNumber: studentData.cnicNumber,
    fatherName: studentData.fatherName,
    age: studentData.age,
    dateOfBirth: studentData.dateOfBirth,
    gender: studentData.gender,
    religion: studentData.religion,
    nationality: studentData.nationality,
    picture: studentData.picture,
    // Add more fields as needed
  });

  newStudent.save()
    .then((student) => {
      res.status(201).send({ message: "Student added successfully", data: student });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error adding student", error: err.message });
    });
});

// Update a student by studentID
app.put("/student/:id", (req, res) => {
  const studentID = req.params.id;
  const updatedData = req.body;

  Student.findOneAndUpdate({ studentID }, updatedData, { new: true })
    .then((updatedStudent) => {
      if (!updatedStudent) {
        return res.status(404).send({ message: "Student not found" });
      }
      res.send({ message: "Student updated successfully", data: updatedStudent });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating student", error: err.message });
    });
});

// Delete a student by studentID
app.delete("/student/:id", (req, res) => {
  const studentID = req.params.id;

  Student.findOneAndDelete({ studentID })
    .then((deletedStudent) => {
      if (!deletedStudent) {
        return res.status(404).send({ message: "Student not found" });
      }
      res.send({ message: "Student deleted successfully", data: deletedStudent });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting student", error: err.message });
    });
});

// Get all students
app.get("/students", (req, res) => {
  Student.find()
    .then((allStudents) => {
      res.send({ message: "All students", data: allStudents });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error fetching students", error: err.message });
    });
});

// Search or findProductByID function
app.get("/student/:id", (req, res) => {
  const studentID = req.params.id;

  Student.findOne({ studentID })
    .then((foundStudent) => {
      if (!foundStudent) {
        return res.status(404).send({ message: "Student not found" });
      }
      res.send({ message: "Student found", data: foundStudent });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error finding student", error: err.message });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});






