
const API_URL = "/students";

const table = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const totalDepartments = document.getElementById("totalDepartments");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("studentModal");
const form = document.getElementById("studentForm");
const message = document.getElementById("message");
const saveBtn = document.getElementById("saveBtn");

let students = [];
let editingId = null;

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || result.error || "Request failed.");
  }

  return result;
}

function getStudentList(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.students)) return result.students;
  if (Array.isArray(result.data)) return result.data;
  return [];
}

async function loadStudents() {
  table.innerHTML =
    '<tr><td colspan="5" class="empty">Loading students...</td></tr>';

  try {
    const result = await request(API_URL);
    students = getStudentList(result);
    renderStudents();
    showMessage("Student records loaded successfully.");
  } catch (error) {
    table.innerHTML =
      '<tr><td colspan="5" class="empty">Could not load students.</td></tr>';
    showMessage(error.message, true);
  }
}

function renderStudents() {
  totalStudents.textContent = students.length;

  const departments = new Set(
    students.map(s => s.department).filter(Boolean)
  );
  totalDepartments.textContent = departments.size;

  const query = searchInput.value.trim().toLowerCase();

  const filtered = students.filter(student =>
    [student.name, student.email, student.department]
      .some(value => String(value || "").toLowerCase().includes(query))
  );

  if (!filtered.length) {
    table.innerHTML =
      '<tr><td colspan="5" class="empty">No students found.</td></tr>';
    return;
  }

  table.replaceChildren();

  filtered.forEach(student => {
    const tr = document.createElement("tr");

    const nameCell = document.createElement("td");
    const avatar = document.createElement("span");
    avatar.className = "student-avatar";
    avatar.textContent = (student.name || "?").trim().charAt(0).toUpperCase();

    const name = document.createElement("span");
    name.className = "student-name";
    name.textContent = student.name || "";

    nameCell.append(avatar, name);

    const emailCell = document.createElement("td");
    emailCell.textContent = student.email || "";

    const ageCell = document.createElement("td");
    ageCell.textContent = student.age ?? "";

    const departmentCell = document.createElement("td");
    const department = document.createElement("span");
    department.className = "department";
    department.textContent = student.department || "";
    departmentCell.append(department);

    const actionsCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.className = "action-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openEditForm(student));

    const deleteButton = document.createElement("button");
    deleteButton.className = "action-btn delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteStudent(student));

    actionsCell.append(editButton, deleteButton);
    tr.append(nameCell, emailCell, ageCell, departmentCell, actionsCell);
    table.append(tr);
  });
}

function openAddForm() {
  editingId = null;
  form.reset();
  document.getElementById("formTitle").textContent = "Add Student";
  saveBtn.textContent = "Save Student";
  modal.classList.remove("hidden");
  document.getElementById("name").focus();
}

function openEditForm(student) {
  editingId = student._id || student.id;

  if (!editingId) {
    showMessage("Student ID is missing.", true);
    return;
  }

  form.elements.name.value = student.name || "";
  form.elements.email.value = student.email || "";
  form.elements.age.value = student.age ?? "";
  form.elements.department.value = student.department || "";

  document.getElementById("formTitle").textContent = "Edit Student";
  saveBtn.textContent = "Update Student";
  modal.classList.remove("hidden");
}

function closeForm() {
  modal.classList.add("hidden");
  form.reset();
  editingId = null;
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const data = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    age: Number(form.elements.age.value),
    department: form.elements.department.value.trim()
  };

  if (!data.name || !data.email || !data.department ||
      !Number.isFinite(data.age) || data.age < 1) {
    showMessage("Please enter valid student details.", true);
    return;
  }

  saveBtn.disabled = true;

  try {
    if (editingId) {
      await request(`${API_URL}/${encodeURIComponent(editingId)}`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
      showMessage("Student updated successfully!");
    } else {
      await request(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });
      showMessage("Student created successfully!");
    }

    closeForm();
    await loadStudents();
  } catch (error) {
    showMessage(error.message, true);
  } finally {
    saveBtn.disabled = false;
  }
});

async function deleteStudent(student) {
  const id = student._id || student.id;

  if (!id) {
    showMessage("Student ID is missing.", true);
    return;
  }

  if (!confirm(`Delete ${student.name || "this student"}?`)) return;

  try {
    await request(`${API_URL}/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
    showMessage("Student deleted successfully!");
    await loadStudents();
  } catch (error) {
    showMessage(error.message, true);
  }
}

document.getElementById("addStudentBtn")
  .addEventListener("click", openAddForm);

document.getElementById("closeModal")
  .addEventListener("click", closeForm);

document.getElementById("cancelBtn")
  .addEventListener("click", closeForm);

modal.addEventListener("click", event => {
  if (event.target === modal) closeForm();
});

searchInput.addEventListener("input", renderStudents);

loadStudents();
