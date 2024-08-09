// script.js

let courses = [];
let materials = [];
let editingCourseId = null;
let editingMaterialId = null;

// Manajemen Kursus
document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('courseTitle').value;
    const description = document.getElementById('courseDescription').value;
    const duration = document.getElementById('courseDuration').value;

    if (editingCourseId) {
        // Update kursus
        const course = courses.find(course => course.id === editingCourseId);
        course.title = title;
        course.description = description;
        course.duration = duration;
        editingCourseId = null;
    } else {
        // Buat kursus baru
        const newCourse = {
            id: Date.now(),
            title,
            description,
            duration
        };
        courses.push(newCourse);
    }

    resetCourseForm();
    renderCourses();
    populateCourseSelect();
});

function renderCourses() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';
    courses.forEach(course => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${course.title}</strong>
            <span>${course.description} (${course.duration})</span>
            <div>
                <button onclick="editCourse(${course.id})">Edit</button>
                <button onclick="deleteCourse(${course.id})">Hapus</button>
            </div>
        `;
        courseList.appendChild(li);
    });
}

function editCourse(id) {
    const course = courses.find(course => course.id === id);
    document.getElementById('courseTitle').value = course.title;
    document.getElementById('courseDescription').value = course.description;
    document.getElementById('courseDuration').value = course.duration;
    editingCourseId = id;
}

function deleteCourse(id) {
    courses = courses.filter(course => course.id !== id);
    renderCourses();
    populateCourseSelect();
}

function resetCourseForm() {
    document.getElementById('courseTitle').value = '';
    document.getElementById('courseDescription').value = '';
    document.getElementById('courseDuration').value = '';
}

// Manajemen Materi
document.getElementById('materialForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const courseId = document.getElementById('courseSelect').value;
    const title = document.getElementById('materialTitle').value;
    const description = document.getElementById('materialDescription').value;
    const link = document.getElementById('materialLink').value;

    if (editingMaterialId) {
        // Update materi
        const material = materials.find(material => material.id === editingMaterialId);
        material.title = title;
        material.description = description;
        material.link = link;
        editingMaterialId = null;
    } else {
        // Buat materi baru
        const newMaterial = {
            id: Date.now(),
            courseId,
            title,
            description,
            link
        };
        materials.push(newMaterial);
    }

    resetMaterialForm();
    renderMaterials(courseId);
});

function renderMaterials(courseId) {
    const materialList = document.getElementById('materialList');
    materialList.innerHTML = '';
    materials
        .filter(material => material.courseId === courseId)
        .forEach(material => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${material.title}</strong>
                <span>${material.description} - <a href="${material.link}" target="_blank">Lihat</a></span>
                <div>
                    <button onclick="editMaterial(${material.id})">Edit</button>
                    <button onclick="deleteMaterial(${material.id})">Hapus</button>
                </div>
            `;
            materialList.appendChild(li);
        });
}

function editMaterial(id) {
    const material = materials.find(material => material.id === id);
    document.getElementById('courseSelect').value = material.courseId;
    document.getElementById('materialTitle').value = material.title;
    document.getElementById('materialDescription').value = material.description;
    document.getElementById('materialLink').value = material.link;
    editingMaterialId = id;
}

function deleteMaterial(id) {
    materials = materials.filter(material => material.id !== id);
    renderMaterials(document.getElementById('courseSelect').value);
}

function resetMaterialForm() {
    document.getElementById('materialTitle').value = '';
    document.getElementById('materialDescription').value = '';
    document.getElementById('materialLink').value = '';
}

function populateCourseSelect() {
    const courseSelect = document.getElementById('courseSelect');
    courseSelect.innerHTML = '';
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.title;
        courseSelect.appendChild(option);
    });
}

document.getElementById('courseSelect').addEventListener('change', function() {
    renderMaterials(this.value);
});

// Render awal
populateCourseSelect();
