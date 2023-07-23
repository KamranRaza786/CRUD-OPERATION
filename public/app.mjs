import Notyf from 'https://cdn.jsdelivr.net/npm/notyf@3.10.2/dist/notyf.esm.min.js';

const notyf = new Notyf();
const baseUrl = 'https://crud-operation-alpha.vercel.app/';
document.addEventListener('DOMContentLoaded', function () {
  startLoading();
  getStudents();
  
  const addButton = document.querySelector('.big-button');
  const newStudentContainer = document.querySelector('.new-student-container');
  const cancelButton = document.querySelector('.btn-secondary');
  const form = newStudentContainer.querySelector('form');

  toggleStudentEntryFields(false);

  addButton.addEventListener('click', function () {
    toggleStudentEntryFields(true);
  });

  cancelButton.addEventListener('click', function () {
    toggleStudentEntryFields(false);
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    startLoading();

    const newStudent = {
      name: document.getElementById('student-name').value,
      course: document.getElementById('student-course').value,
      // Add other student properties as needed
    };

    try {
      const response = await fetch(`${baseUrl}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error('Failed to create student.');
      }

      notyf.success('Student created successfully.');
      getStudents();
      form.reset();
      toggleStudentEntryFields(false);
    } catch (error) {
      notyf.error('Failed to create student.');
    }

    stopLoading();
  });
});

async function getStudents() {
  startLoading();

  try {
    const response = await fetch(`${baseUrl}/students`);
    if (!response.ok) {
      throw new Error('Failed to fetch students.');
    }

    const students = await response.json();
    displayStudents(students);
  } catch (error) {
    notyf.error('Failed to fetch students.');
  }

  stopLoading();
}

function displayStudents(students) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  students.forEach((student) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${student.name}</h3>
      <p>Course: ${student.course}</p>
      <button class="btn-danger" data-id="${student.id}">Delete</button>
      <button class="btn-secondary" data-id="${student.id}">Edit</button>
    `;
    container.appendChild(card);
  });

  // Add event listeners to dynamically added "Edit" and "Delete" buttons
  container.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('btn-danger')) {
      const studentId = target.dataset.id;
      deleteStudent(studentId);
    } else if (target.classList.contains('btn-secondary')) {
      const studentId = target.dataset.id;
      editStudent(studentId);
    }
  });
}

async function deleteStudent(studentId) {
  startLoading();

  try {
    const response = await fetch(`${baseUrl}/students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete student.');
    }

    notyf.success('Student deleted successfully.');
    getStudents();
  } catch (error) {
    notyf.error('Failed to delete student.');
  }

  stopLoading();
}

async function editStudent(studentId) {
  startLoading();

  try {
    const response = await fetch(`${baseUrl}/students/${studentId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch student details.');
    }

    const student = await response.json();

    // Fill the form with the selected student details
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-course').value = student.course;
    // Add other student properties to fill the form

    toggleStudentEntryFields(true);
  } catch (error) {
    notyf.error('Failed to fetch student details.');
  }

  stopLoading();
}

function toggleStudentEntryFields(isDisplay) {
  document.querySelector('.new-student-container').style.display = isDisplay ? 'block' : 'none';
}

function startLoading() {
  document.getElementById('loader-overlay').style.display = 'flex';
}

function stopLoading() {
  document.getElementById('loader-overlay').style.display = 'none';
}
