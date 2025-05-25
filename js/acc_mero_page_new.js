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

function showCreateForm() {
    // Здесь будет логика показа формы создания мероприятия
    alert('Форма создания мероприятия');
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
            <button class="check-btn ${event.status === 'pending' ? 'purple' : ''}">
                ${event.status === 'pending' ? 'На проверке' : 'На проверке'}
            </button>
        </div>
    `).join('');
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

// Инициализация
renderEvents();
