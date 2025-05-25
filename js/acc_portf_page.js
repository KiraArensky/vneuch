// Данные дипломов в памяти
let diplomas = [
    {
        id: 1,
        name: "Название",
        description: "Здесь должно быть описание",
        nomination: "спорт"
    }
];
let currentDiplomaId = null;

// Отображение списка дипломов
function renderDiplomas() {
    const diplomasList = document.getElementById('diplomasList');
    diplomasList.innerHTML = '';

    diplomas.forEach(diploma => {
        const diplomaElement = document.createElement('div');
        diplomaElement.className = 'diploma-item';
        diplomaElement.onclick = () => showDiplomaView(diploma.id);
        
        diplomaElement.innerHTML = `
            <div class="diploma-title">${diploma.name}</div>
        `;
        
        diplomasList.appendChild(diplomaElement);
    });
}

// Показать модальное окно добавления
function showAddModal() {
    document.getElementById('addModal').classList.add('show');
}

// Скрыть модальное окно добавления
function hideAddModal() {
    document.getElementById('addModal').classList.remove('show');
    clearForm();
}

// Очистить форму
function clearForm() {
    document.getElementById('diplomaName').value = '';
    document.getElementById('diplomaDescription').value = '';
    document.getElementById('diplomaNomination').value = '';
}

// Загрузка диплома (имитация)
function uploadDiploma() {
    alert('Функция загрузки диплома');
}

// Сохранить диплом
function saveDiploma() {
    const name = document.getElementById('diplomaName').value;
    const description = document.getElementById('diplomaDescription').value;
    const nomination = document.getElementById('diplomaNomination').value;

    if (!name.trim()) {
        alert('Введите название диплома');
        return;
    }

    const newDiploma = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        nomination: nomination.trim()
    };

    diplomas.push(newDiploma);
    renderDiplomas();
    hideAddModal();
}

// Показать просмотр диплома
function showDiplomaView(diplomaId) {
    currentDiplomaId = diplomaId;
    const diploma = diplomas.find(d => d.id === diplomaId);
    
    if (diploma) {
        document.getElementById('viewDiplomaName').textContent = diploma.name;
        document.getElementById('diplomaView').classList.add('show');
    }
}

// Скрыть просмотр диплома
function hideDiplomaView() {
    document.getElementById('diplomaView').classList.remove('show');
    currentDiplomaId = null;
}

// Редактировать диплом
function editDiploma() {
    if (currentDiplomaId) {
        const diploma = diplomas.find(d => d.id === currentDiplomaId);
        if (diploma) {
            document.getElementById('diplomaName').value = diploma.name;
            document.getElementById('diplomaDescription').value = diploma.description;
            document.getElementById('diplomaNomination').value = diploma.nomination;
            
            hideDiplomaView();
            showAddModal();
            
            // Изменяем функцию сохранения для редактирования
            const saveBtn = document.querySelector('.save-btn');
            saveBtn.onclick = function() {
                diploma.name = document.getElementById('diplomaName').value.trim();
                diploma.description = document.getElementById('diplomaDescription').value.trim();
                diploma.nomination = document.getElementById('diplomaNomination').value.trim();
                
                renderDiplomas();
                hideAddModal();
                
                // Возвращаем обычную функцию сохранения
                saveBtn.onclick = saveDiploma;
            };
        }
    }
}

// Удалить диплом
function deleteDiploma() {
    if (currentDiplomaId && confirm('Удалить диплом?')) {
        diplomas = diplomas.filter(d => d.id !== currentDiplomaId);
        renderDiplomas();
        hideDiplomaView();
    }
}

// Поиск дипломов
document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const diplomaItems = document.querySelectorAll('.diploma-item');
    
    diplomaItems.forEach((item, index) => {
        const diploma = diplomas[index];
        if (diploma && diploma.name.toLowerCase().includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Кнопка назад
function goBack() {
    // В реальном Telegram Mini App здесь будет закрытие приложения
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.close();
    } else {
        alert('Возврат в Telegram');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderDiplomas();
    // Telegram WebApp initialization (tg.ready(), tg.expand(), theming)
    // is handled by js/common.js, which should be loaded before this script.
});
