document.getElementById('studentForm').addEventListener('submit', addStudent);

function addStudent(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;

    // POST request to store student data in CRUDCrud
    axios.post('https://crudcrud.com/api/2c45fbfcdbdf4c83bf8790f6238e0e87/students', {
        name: name,
        mobile: mobile,
        address: address
    })
    .then(response => {
        const student = response.data;
        displayStudent(student);
    })
    .catch(error => console.error('Error:', error));
}

function displayStudent(student) {
    const studentList = document.getElementById('studentList');
    const listItem = document.createElement('li');
    listItem.textContent = `Name: ${student.name}, Mobile: ${student.mobile}, Address: ${student.address}`;
    studentList.appendChild(listItem);
}

// Fetch all students on page load
axios.get('https://crudcrud.com/api/2c45fbfcdbdf4c83bf8790f6238e0e87/students')
.then(response => {
    const students = response.data;
    students.forEach(student => {
        displayStudent(student);
    });
})
.catch(error => console.error('Error:', error));

function displayStudent(student) {
    const studentList = document.getElementById('studentList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>Name: ${student.name}, Mobile: ${student.mobile}, Address: ${student.address}</span>
        <button onclick="editStudent('${student._id}', '${student.name}', '${student.mobile}', '${student.address}')">Edit</button>
        <button onclick="deleteStudent('${student._id}')">Delete</button>
    `;
    studentList.appendChild(listItem);
}

function editStudent(id, name, mobile, address) {
    const newName = prompt("Enter new name:", name);
    const newMobile = prompt("Enter new mobile number:", mobile);
    const newAddress = prompt("Enter new address:", address);

    axios.put(`https://crudcrud.com/api/2c45fbfcdbdf4c83bf8790f6238e0e87/students/${id}`, {
        name: newName,
        mobile: newMobile,
        address: newAddress
    })
    .then(response => {
        // Reload the page to reflect changes
        location.reload();
    })
    .catch(error => console.error('Error:', error));
}

function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        axios.delete(`https://crudcrud.com/api/2c45fbfcdbdf4c83bf8790f6238e0e87/students/${id}`)
        .then(response => {
            // Reload the page to reflect changes
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    }
}

