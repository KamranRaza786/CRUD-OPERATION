// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/student_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Student = mongoose.model('Student', studentSchema);

app.use(cors());
app.use(bodyParser.json());

// Create operation
app.post('/students', (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    age: req.body.age,
  });

  newStudent.save((err, student) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error creating student');
    } else {
      console.log('Student created:', student);
      res.status(201).send(student);
    }
  });
});

// Read operation
app.get('/students', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching students');
    } else {
      res.status(200).send(students);
    }
  });
});

// Update operation
app.put('/students/:id', (req, res) => {
  Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, age: req.body.age },
    { new: true },
    (err, student) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating student');
      } else {
        console.log('Student updated:', student);
        res.status(200).send(student);
      }
    }
  );
});

// Delete operation
app.delete('/students/:id', (req, res) => {
  Student.findByIdAndDelete(req.params.id, (err, student) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting student');
    } else {
      console.log('Student deleted:', student);
      res.status(200).send(student);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
