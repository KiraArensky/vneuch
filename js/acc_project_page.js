let projects = [
    {
        name: "Электронная открытка",
        description: "Краткое описание проекта",
        url: "https://student.surgu.ru",
        logo: null
    }
];

let currentProject = null;

function showCreateForm() {
    document.getElementById('projects-list').classList.add('hidden');
    document.getElementById('project-view').classList.add('hidden');
    document.getElementById('create-form').classList.remove('hidden');
    clearForm();
}

function showProjectsList() {
    document.getElementById('create-form').classList.add('hidden');
    document.getElementById('project-view').classList.add('hidden');
    document.getElementById('projects-list').classList.remove('hidden');
    renderProjects();
}

function showProject(index) {
    currentProject = index;
    const project = projects[index];
    
    document.getElementById('view-project-title').textContent = project.name;
    document.getElementById('view-project-subtitle').textContent = '🔗 Ссылка на АИС';
    document.getElementById('view-project-description').textContent = project.description;
    
    const imageEl = document.getElementById('view-project-image');
    if (project.logo) {
        imageEl.style.backgroundImage = `url(${project.logo})`;
        imageEl.style.backgroundSize = 'cover';
        imageEl.style.backgroundPosition = 'center';
    } else {
        imageEl.style.backgroundImage = 'none';
    }
    
    document.getElementById('projects-list').classList.add('hidden');
    document.getElementById('create-form').classList.add('hidden');
    document.getElementById('project-view').classList.remove('hidden');
}

function editProject() {
    if (currentProject !== null) {
        const project = projects[currentProject];
        document.getElementById('project-name').value = project.name;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-url').value = project.url;
        
        showCreateForm();
    }
}

function deleteProject() {
    if (currentProject !== null && confirm('Удалить проект?')) {
        projects.splice(currentProject, 1);
        showProjectsList();
    }
}

function saveProject() {
    const name = document.getElementById('project-name').value.trim();
    const description = document.getElementById('project-description').value.trim();
    const url = document.getElementById('project-url').value.trim();
    
    if (!name) {
        alert('Введите название проекта');
        return;
    }
    
    const logoInput = document.getElementById('logo-input');
    let logoData = null;
    
    if (logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoData = e.target.result;
            saveProjectData();
        };
        reader.readAsDataURL(logoInput.files[0]);
    } else if (currentProject !== null && projects[currentProject]) { // Check if currentProject is valid
        logoData = projects[currentProject].logo;
        saveProjectData();
    } else {
        saveProjectData();
    }
    
    function saveProjectData() {
        const projectData = {
            name: name,
            description: description,
            url: url,
            logo: logoData
        };
        
        if (currentProject !== null && projects[currentProject]) { // Check if currentProject is valid
            projects[currentProject] = projectData;
        } else {
            projects.push(projectData);
        }
        
        showProjectsList();
    }
}

function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadArea = document.querySelector('.logo-upload');
            uploadArea.style.backgroundImage = `url(${e.target.result})`;
            uploadArea.style.backgroundSize = 'cover';
            uploadArea.style.backgroundPosition = 'center';
            uploadArea.querySelector('.upload-icon').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function clearForm() {
    document.getElementById('project-name').value = '';
    document.getElementById('project-description').value = '';
    document.getElementById('project-url').value = '';
    document.getElementById('logo-input').value = '';
    
    const uploadArea = document.querySelector('.logo-upload');
    uploadArea.style.backgroundImage = 'none';
    uploadArea.querySelector('.upload-icon').style.display = 'flex';
    
    currentProject = null;
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return; // Add a guard in case the element isn't found
    container.innerHTML = '';
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => showProject(index);
        
        card.innerHTML = `
            <div class="project-card-image" style="${project.logo ? `background-image: url(${project.logo}); background-size: cover; background-position: center;` : ''}"></div>
            <div class="project-card-title">${project.name}</div>
            <div class="project-card-desc">${project.description}</div>
            <button class="open-btn" onclick="event.stopPropagation(); if(window.Telegram && window.Telegram.WebApp) { window.Telegram.WebApp.openLink('${project.url}'); } else { window.open('${project.url}', '_blank'); }">Открыть АИС</button>
        `;
        
        container.appendChild(card);
    });
}

function filterProjects() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.project-card-title').textContent.toLowerCase();
        const desc = card.querySelector('.project-card-desc').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});
