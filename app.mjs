// app.mjs

// Import required libraries
import Notyf from 'notyf';
import axios from 'axios';

// Function to display students data
async function displayStudents() {
  try {
    const response = await axios.get('/api/students'); // Replace '/api/students' with your API endpoint to fetch student data
    studentsData = response.data; // Assuming the response contains an array of student records
    renderStudents();
  } catch (error) {
    console.error('Error fetching students data:', error);
  }
}

// Function to render students data
function renderStudents() {
  dataContainer.innerHTML = ''; // Clear the previous data
  studentsData.forEach((student) => {
    const studentElement = document.createElement('div');
    studentElement.innerHTML = `
      <p>Student Name: ${student.name}</p>
      <p>Course Fee: ${student.courseFee}</p>
      <p>Course Title: ${student.courseTitle}</p>
      <p>Batch Number: ${student.batchNumber}</p>
      <button class="edit-button" data-id="${student.id}">Edit</button>
      <button class="delete-button" data-id="${student.id}">Delete</button>
      <hr>
    `;
    dataContainer.appendChild(studentElement);
  });
}

// Function to add a new student
async function addStudent(event) {
  try {
    event.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const courseFee = document.getElementById('courseFee').value;
    const courseTitle = document.getElementById('courseTitle').value;
    const batchNumber = document.getElementById('batchNumber').value;

    const newStudent = {
      name: studentName,
      courseFee: courseFee,
      courseTitle: courseTitle,
      batchNumber: batchNumber,
    };

    // Make a POST request to add the new student to the server (Replace '/api/students' with your API endpoint)
    const response = await axios.post('/api/students', newStudent);
    const addedStudent = response.data;

    studentsData.push(addedStudent);
    renderStudents();

    // Show a success notification using Notyf
    notyf.success('Student added successfully!');
  } catch (error) {
    console.error('Error adding student:', error);
    notyf.error('Failed to add student.');
  }
}

// Function to edit a student
async function editStudent(studentId) {
  try {
    const studentToUpdate = studentsData.find((student) => student.id === studentId);
    if (!studentToUpdate) return;

    // Implement the logic to get the updated student data from the user (e.g., using a form or prompt)
    const updatedStudentData = {
      // Implement the fields to update
      name: prompt('Enter updated student name:', studentToUpdate.name),
      courseFee: prompt('Enter updated course fee:', studentToUpdate.courseFee),
      courseTitle: prompt('Enter updated course title:', studentToUpdate.courseTitle),
      batchNumber: prompt('Enter updated batch number:', studentToUpdate.batchNumber),
    };

    // Make a PUT request to update the student data on the server (Replace `/api/students/${studentId}` with your API endpoint)
    await axios.put(`/api/students/${studentId}`, updatedStudentData);

    // Update the local data
    Object.assign(studentToUpdate, updatedStudentData);
    renderStudents();

    // Show a success notification using Notyf
    notyf.success('Student updated successfully!');
  } catch (error) {
    console.error('Error updating student:', error);
    notyf.error('Failed to update student.');
  }
}

// Function to delete a student
async function deleteStudent(studentId) {
  try {
    // Make a DELETE request to remove the student from the server (Replace `/api/students/${studentId}` with your API endpoint)
    await axios.delete(`/api/students/${studentId}`);

    // Remove the student from the local data
    studentsData = studentsData.filter((student) => student.id !== studentId);
    renderStudents();

    // Show a success notification using Notyf
    notyf.success('Student deleted successfully!');
  } catch (error) {
    console.error('Error deleting student:', error);
    notyf.error('Failed to delete student.');
  }
}

// Function to search for students
function searchStudents(searchQuery) {
  const filteredStudents = studentsData.filter((student) => {
    const lowerCaseName = student.name.toLowerCase();
    return lowerCaseName.includes(searchQuery);
  });
  renderFilteredStudents(filteredStudents);
}

// Function to render filtered students
function renderFilteredStudents(filteredStudents) {
  dataContainer.innerHTML = ''; // Clear the previous data
  filteredStudents.forEach((student) => {
    const studentElement = document.createElement('div');
    studentElement.innerHTML = `
      <p>Student Name: ${student.name}</p>
      <p>Course Fee: ${student.courseFee}</p>
      <p>Course Title: ${student.courseTitle}</p>
      <p>Batch Number: ${student.batchNumber}</p>
      <hr>
    `;
    dataContainer.appendChild(studentElement);
  });
}

// Initialize Notyf for notifications
const notyf = new Notyf();

// Sample data (You can replace this with data fetched from the server)
let studentsData = [];

// Get references to HTML elements
const addStudentForm = document.getElementById('addStudentForm');
const dataContainer = document.getElementById('data');
const searchInput = document.getElementById('searchInput');

// Event listener for form submission to add a new student
addStudentForm.addEventListener('submit', addStudent);

// Event delegation for handling edit and delete buttons
dataContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-button')) {
    const studentId = event.target.getAttribute('data-id');
    editStudent(studentId);
  } else if (event.target.classList.contains('delete-button')) {
    const studentId = event.target.getAttribute('data-id');
    deleteStudent(studentId);
  }
});

// Event listener for search input
searchInput.addEventListener('input', (event) => {
  const searchQuery = event.target.value.trim().toLowerCase();
  searchStudents(searchQuery);
});

// Call the display function initially to show existing data
displayStudents();
