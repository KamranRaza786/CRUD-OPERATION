import express from "express";
import { customAlphabet } from 'nanoid';
import mongoose from "mongoose";

const nanoid = customAlphabet('1234567890', 20);

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/student_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define the Student schema and model
const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  // Add more fields as needed
});

const Student = mongoose.model("Student", studentSchema);

// ... (The rest of the existing code remains unchanged)

// Add a new student
app.post("/student", (req, res) => {
  const studentData = req.body;
  const studentID = nanoid();

  const newStudent = new Student({
    studentID,
    name: studentData.name,
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

// ... (The rest of the existing code remains unchanged)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
