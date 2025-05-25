function watchVideo() {
    alert('Открытие видео-инструкции...');
}

function openSection(section) {
    const sectionNames = {
        'media': 'Медиа и творчество',
        'student-media': 'Студенческое медиа «Сфера»',
        'science': 'Наука и проекты',
        'project-activities': 'Основы проектной деятельности',
        'sports': 'Спорт и Студ.отряды',
        'sso': 'ССО «Северные Лисы»',
        'volunteer': 'Волонтерство',
        'volunteer-center': 'Центр Волонтеров'
    };
    
    alert(`Переход в раздел: ${sectionNames[section]}`);
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation('main_page.html');
    // Any other main_page.html specific initializations can go here
});
