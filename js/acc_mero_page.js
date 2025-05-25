let events = [];
let currentTab = 'all';

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.tab;
        renderEvents();
    });
});

// Format toggle
document.querySelectorAll('.format-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        document.querySelectorAll('.format-toggle').forEach(t => t.classList.remove('active'));
        toggle.classList.add('active');
    });
});

function showCreateForm() {
    document.getElementById('create-form').classList.add('show');
}

function hideCreateForm() {
    document.getElementById('create-form').classList.remove('show');
}

function showEventDetail() {
    document.getElementById('event-detail').classList.add('show');
}

function hideEventDetail() {
    document.getElementById('event-detail').classList.remove('show');
}

function showSuccessModal() {
    document.getElementById('success-modal').classList.add('show');
}

function hideSuccessModal() {
    document.getElementById('success-modal').classList.remove('show');
}

function submitEvent() {
    const eventData = {
        id: Date.now(),
        name: document.getElementById('event-name').value || 'Новое мероприятие',
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value || 'Не указано',
        description: document.getElementById('event-description').value,
        level: document.getElementById('event-level').value,
        nomination: document.getElementById('event-nomination').value,
        format: document.querySelector('.format-toggle.active').dataset.format,
        status: 'pending',
        isMy: true
    };

    events.push(eventData);
    hideCreateForm();
    showSuccessModal();
    renderEvents();
    updateTabCounts();
    
    // Clear form
    document.getElementById('create-form').querySelectorAll('input, textarea, select').forEach(input => {
        if (input.type !== 'date' && input.type !== 'time') {
            input.value = '';
        }
    });
}

function renderEvents() {
    const eventsList = document.getElementById('events-list');
    const filteredEvents = currentTab === 'all' ? events : events.filter(event => event.isMy);

    if (filteredEvents.length === 0) {
        eventsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📅</div>
                <div>Мероприятий пока нет</div>
            </div>
        `;
        return;
    }

    eventsList.innerHTML = filteredEvents.map(event => `
        <div class="event-card">
            <div class="event-image"></div>
            <div class="event-info">
                <div class="event-title">${event.name}</div>
                <div class="event-details">
                    <span>📅 ${formatDate(event.startDate)} ${event.time}</span>
                </div>
                <div class="event-location">📍 ${event.location}</div>
            </div>
            <button class="check-btn ${event.status === 'pending' ? 'purple' : ''}" onclick="showEventDetail()">
                ${event.status === 'pending' ? 'На проверке' : 'На проверке'}
            </button>
        </div>
    `).join('');
}

function updateTabCounts() {
    const allCount = events.length;
    const myCount = events.filter(event => event.isMy).length;
    
    document.querySelector('[data-tab="all"]').textContent = `Все (${allCount})`;
    document.querySelector('[data-tab="my"]').textContent = `Мои (${myCount})`;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

// Initialize with sample event
events.push({
    id: 1,
    name: 'Турслет',
    startDate: '2025-09-08',
    time: '09:00',
    location: 'База отдыха «Зашквар», Сургут',
    description: 'Первосвятительное ядро автоматически погружается в студенческую жизнь...',
    status: 'pending',
    isMy: true
});

renderEvents();
updateTabCounts();
