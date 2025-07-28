// Gotham Fit - Main Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initModeToggle();
    initBatRings();
    initUtilityBelt();
    initQuickActions();
    initActivityLog();
    loadUserData();
    
    // Set initial mode
    updateMode('bulk');
});

// ===== MODE TOGGLE =====
function initModeToggle() {
    const bulkBtn = document.querySelector('.bulk-mode');
    const cutBtn = document.querySelector('.cut-mode');
    
    bulkBtn.addEventListener('click', () => updateMode('bulk'));
    cutBtn.addEventListener('click', () => updateMode('cut'));
}

function updateMode(mode) {
    const bulkBtn = document.querySelector('.bulk-mode');
    const cutBtn = document.querySelector('.cut-mode');
    const body = document.body;
    
    if (mode === 'bulk') {
        bulkBtn.classList.add('active');
        cutBtn.classList.remove('active');
        body.style.setProperty('--bat-accent', '#f0c808');
    } else {
        cutBtn.classList.add('active');
        bulkBtn.classList.remove('active');
        body.style.setProperty('--bat-accent', '#00a8e8');
    }
    
    // Update daily goals based on mode
    updateDailyGoals(mode);
    saveUserData();
}

function updateDailyGoals(mode) {
    const calorieGoal = document.querySelector('.calories .bat-ring span');
    const proteinGoal = document.querySelector('.protein .bat-ring span');
    
    if (mode === 'bulk') {
        calorieGoal.innerHTML = '<span>2,450</span>/3,200';
        proteinGoal.innerHTML = '<span>185</span>/220g';
    } else {
        calorieGoal.innerHTML = '<span>1,850</span>/2,200';
        proteinGoal.innerHTML = '<span>165</span>/180g';
    }
    
    updateRingValues();
}

// ===== BAT RINGS =====
function initBatRings() {
    updateRingValues();
}

function updateRingValues() {
    const rings = document.querySelectorAll('.bat-ring');
    
    rings.forEach(ring => {
        const text = ring.textContent.trim();
        const values = text.match(/(\d+)/g);
        const current = parseInt(values[0]);
        const goal = parseInt(values[1]);
        const percentage = Math.min(Math.round((current / goal) * 100), 100);
        
        ring.setAttribute('data-value', percentage);
        
        const circumference = 2 * Math.PI * 36;
        const offset = circumference - (percentage / 100) * circumference;
        
        ring.style.setProperty('--circumference', circumference);
        ring.style.setProperty('--offset', offset);
    });
}

// ===== QUICK ACTIONS =====
function initQuickActions() {
    const mealBtn = document.querySelector('.meal-log');
    const workoutBtn = document.querySelector('.workout-log');
    const waterBtn = document.querySelector('.water-log');
    
    mealBtn.addEventListener('click', () => logActivity('meal'));
    workoutBtn.addEventListener('click', () => logActivity('workout'));
    waterBtn.addEventListener('click', () => logActivity('water'));
}

function logActivity(type) {
    // In a real app, you would show a modal form here
    // For this example, we'll simulate logging
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let activity;
    switch(type) {
        case 'meal':
            activity = {
                title: "Logged Meal",
                details: `500 kcal | 35g protein`,
                time: timeString,
                calories: -500,
                icon: 'meal'
            };
            updateNutrition(500, 35);
            break;
            
        case 'workout':
            activity = {
                title: "Completed Workout",
                details: "Chest & Tri's | 45 min",
                time: timeString,
                calories: 350,
                icon: 'chest'
            };
            updateWorkout(45);
            break;
            
        case 'water':
            activity = {
                title: "Water Intake",
                details: "Drank 16oz of water",
                time: timeString,
                calories: 0,
                icon: 'drop'
            };
            break;
    }
    
    addActivityToLog(activity);
    saveUserData();
}

function updateNutrition(calories, protein) {
    // Update calorie display
    const calorieDisplay = document.querySelector('.calories .bat-ring span');
    const currentCalories = parseInt(calorieDisplay.textContent.match(/\d+/)[0]);
    const newCalories = currentCalories + calories;
    const calorieGoal = parseInt(calorieDisplay.textContent.split('/')[1]);
    calorieDisplay.innerHTML = `<span>${newCalories}</span>/${calorieGoal}`;
    
    // Update protein display
    const proteinDisplay = document.querySelector('.protein .bat-ring span');
    const currentProtein = parseInt(proteinDisplay.textContent.match(/\d+/)[0]);
    const newProtein = currentProtein + protein;
    const proteinGoal = parseInt(proteinDisplay.textContent.split('/')[1]);
    proteinDisplay.innerHTML = `<span>${newProtein}</span>/${proteinGoal}g`;
    
    updateRingValues();
}

function updateWorkout(minutes) {
    const workoutDisplay = document.querySelector('.workout .bat-ring span');
    const currentMinutes = parseInt(workoutDisplay.textContent.match(/\d+/)[0]);
    const newMinutes = currentMinutes + minutes;
    const workoutGoal = parseInt(workoutDisplay.textContent.split('/')[1]);
    workoutDisplay.innerHTML = `<span>${newMinutes}</span>/${workoutGoal} min`;
    
    updateRingValues();
}

// ===== ACTIVITY LOG =====
function initActivityLog() {
    // Load any existing activities from storage
    const activities = JSON.parse(localStorage.getItem('gothamFitActivities')) || [];
    activities.forEach(activity => addActivityToLog(activity));
}

function addActivityToLog(activity) {
    const logContainer = document.querySelector('.log-items');
    
    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    
    const iconClass = activity.icon === 'chest' ? 'chest' : 'meal';
    
    logItem.innerHTML = `
        <div class="log-icon ${iconClass}">
            <i class="ph ph-${activity.icon === 'chest' ? 'barbell' : activity.icon}"></i>
        </div>
        <div class="log-details">
            <h3>${activity.title}</h3>
            <p>${activity.details}</p>
            <span class="log-time">${activity.time}</span>
        </div>
        <div class="log-calories">${activity.calories > 0 ? '+' : ''}${activity.calories} kcal</div>
    `;
    
    logContainer.insertBefore(logItem, logContainer.firstChild);
    
    // Limit to 10 activities
    if (logContainer.children.length > 10) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// ===== UTILITY BELT =====
function initUtilityBelt() {
    const beltItems = document.querySelectorAll('.belt-item');
    
    beltItems.forEach(item => {
        item.addEventListener('click', () => {
            beltItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // In a full app, this would switch between views
            console.log(`Navigating to ${item.querySelector('.ph').getAttribute('class').split(' ')[1]}`);
        });
    });
}

// ===== DATA PERSISTENCE =====
function saveUserData() {
    // Get current values
    const calorieDisplay = document.querySelector('.calories .bat-ring span');
    const proteinDisplay = document.querySelector('.protein .bat-ring span');
    const workoutDisplay = document.querySelector('.workout .bat-ring span');
    
    const currentMode = document.querySelector('.mode-toggle button.active').dataset.mode;
    
    const userData = {
        mode: currentMode,
        calories: parseInt(calorieDisplay.textContent.match(/\d+/)[0]),
        protein: parseInt(proteinDisplay.textContent.match(/\d+/)[0]),
        workout: parseInt(workoutDisplay.textContent.match(/\d+/)[0]),
        activities: Array.from(document.querySelectorAll('.log-item')).map(item => ({
            title: item.querySelector('h3').textContent,
            details: item.querySelector('p').textContent,
            time: item.querySelector('.log-time').textContent,
            calories: parseInt(item.querySelector('.log-calories').textContent),
            icon: item.querySelector('.log-icon').classList.contains('chest') ? 'chest' : 'meal'
        }))
    };
    
    localStorage.setItem('gothamFitData', JSON.stringify(userData));
}

function loadUserData() {
    const savedData = JSON.parse(localStorage.getItem('gothamFitData'));
    if (!savedData) return;
    
    // Set mode
    updateMode(savedData.mode);
    
    // Update displays
    const calorieGoal = savedData.mode === 'bulk' ? '3,200' : '2,200';
    const proteinGoal = savedData.mode === 'bulk' ? '220g' : '180g';
    
    document.querySelector('.calories .bat-ring span').innerHTML = 
        `<span>${savedData.calories}</span>/${calorieGoal}`;
    document.querySelector('.protein .bat-ring span').innerHTML = 
        `<span>${savedData.protein}</span>/${proteinGoal}`;
    document.querySelector('.workout .bat-ring span').innerHTML = 
        `<span>${savedData.workout}</span>/75 min`;
    
    // Update rings
    updateRingValues();
    
    // Load activities
    const logContainer = document.querySelector('.log-items');
    logContainer.innerHTML = '';
    savedData.activities.forEach(activity => addActivityToLog(activity));
}
