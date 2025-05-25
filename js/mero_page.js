let selectedRole = null;
let selectedFilters = 0;

function showFilterModal() {
    document.getElementById('filterModal').classList.add('active');
}

function hideFilterModal() {
    document.getElementById('filterModal').classList.remove('active');
}

function toggleFilterGroup(groupName) {
    const options = document.getElementById(`${groupName}-options`);
    const chevron = document.querySelector(`[onclick="toggleFilterGroup('${groupName}')"] .chevron`);
    
    options.classList.toggle('collapsed');
    chevron.classList.toggle('rotated');
}

function toggleFilter(checkbox) {
    checkbox.classList.toggle('checked');
    updateFilterCount();
}

function updateFilterCount() {
    const checkedFilters = document.querySelectorAll('.filter-checkbox.checked').length;
    selectedFilters = checkedFilters;
    const applyBtn = document.querySelector('.apply-filters-btn');
    if (applyBtn) {
        applyBtn.textContent = `Применить (${checkedFilters})`;
    }
}

function resetFilters() {
    document.querySelectorAll('.filter-checkbox.checked').forEach(checkbox => {
        checkbox.classList.remove('checked');
    });
    document.querySelectorAll('.format-btn').forEach(btn => btn.classList.remove('active'));
    // Assuming the first format button should be active by default
    const firstFormatBtn = document.querySelector('.format-btn');
    if (firstFormatBtn) {
        firstFormatBtn.classList.add('active');
    }
    updateFilterCount();
}

function applyFilters() {
    hideFilterModal();
    // Here you would apply the actual filters to the content
    console.log('Applying filters...');
}

// Format buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Add logic to filter content based on tab if needed
        });
    });

    // Navigation
    // This part seems to handle main navigation, ensure it doesn't conflict with localStorage logic if used elsewhere
    // For mero_page.html, it might be okay, but for pages like main_page.html, acc_page.html, this could override localStorage based active state.
    // Consider if this generic nav item handling is appropriate for all pages or if it should be page-specific.
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // If these are actual navigation links, preventDefault might not be desired unless handling SPA-style.
            // e.preventDefault(); 
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            // If using hrefs for navigation, direct window.location.href = this.getAttribute('href');
        });
    });

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Initialize filter counts and other dynamic elements if necessary
    updateFilterCount(); 
});


function showRoleModal() {
    document.getElementById('roleModal').classList.add('active');
}

function hideRoleModal() {
    document.getElementById('roleModal').classList.remove('active');
    selectedRole = null;
    // Reset all radio buttons
    document.querySelectorAll('.role-radio').forEach(radio => {
        radio.classList.remove('checked');
    });
}

function selectRole(role) {
    selectedRole = role;
    // Reset all radio buttons
    document.querySelectorAll('.role-radio').forEach(radio => {
        radio.classList.remove('checked');
    });
    // Check selected radio
    const radioElement = document.getElementById(`radio-${role}`);
    if (radioElement) {
        radioElement.classList.add('checked');
    }
}

function showPhotoUpload() {
    if (selectedRole) {
        document.getElementById('roleModal').classList.remove('active');
        document.getElementById('photoModal').classList.add('active');
    }
}

function hidePhotoModal() {
    document.getElementById('photoModal').classList.remove('active');
}

function uploadPhoto() {
    // Simulate photo upload
    console.log('Uploading photo...');
    // Potentially trigger a file input click here
}

function sendApplication() {
    document.getElementById('photoModal').classList.remove('active');
    document.getElementById('successModal').classList.add('active');
}

function hideSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}
