// app.mjs

// Import required libraries
import Notyf from 'notyf';
import axios from 'axios';

// Function to display students data
function displayStudents() {
  // Implement code to fetch data from the server (e.g., API) using axios
  // Update the studentsData array with the fetched data

  // Code to generate HTML elements for each student record and append it to the dataContainer
}

// Function to add a new student
function addStudent(event) {
  // Implement code to handle form submission and add a new student record to the server (e.g., API) using axios
  // Refresh the displayed list of students after a successful addition

  // Show a success notification using Notyf
}

// Function to edit a student
function editStudent(studentId) {
  // Implement code to handle the edit functionality for a specific student record
  // Update the student data on the server (e.g., API) using axios
  // Refresh the displayed list of students after a successful edit

  // Show a success notification using Notyf
}

// Function to delete a student
function deleteStudent(studentId) {
  // Implement code to handle the delete functionality for a specific student record
  // Remove the student data from the server (e.g., API) using axios
  // Refresh the displayed list of students after a successful deletion

  // Show a success notification using Notyf
}

// Function to search for students
function searchStudents(searchQuery) {
  // Implement code to filter the studentsData array based on the searchQuery
  // Display the filtered results in the dataContainer
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
addStudentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addStudent();
});

// Event listener for search input
searchInput.addEventListener('input', (event) => {
  const searchQuery = event.target.value.trim().toLowerCase();
  searchStudents(searchQuery);
});

// Call the display function initially to show existing data
displayStudents();
