// app.mjs
import express from "express";
import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';
import mongodbUri from "./atlas_uri.mjs";

const app = express();
app.use(express.json());

<<<<<<< HEAD:index.mjs
// Connect to MongoDB
//mongoose.connect("mongodb+srv://aipectowner:<Sultan@7872#>@cluster0.k9gnplp.mongodb.net/student_database?retryWrites=true&w=majority", {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
=======
app.get("/", (req, res) => {
  res.send(`"Welcome to AI Chatbot Development Program!"`);
});

// MongoDB Connection
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
>>>>>>> f3bac18bc0331f1702f877026a3e320fd05995bb:app.mjs
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define the Student schema and model
const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  cnicNumber: { type: String, required: true },
  fatherName: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  religion: { type: String, enum: ["Muslim", "Non-Muslim"], required: true },
  nationality: { type: String, required: true },
  picture: { type: String, required: true },
  // Add more fields as needed
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
