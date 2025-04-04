// DOM Elements
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const setBtn = document.getElementById('set-btn');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

// Timer variables
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let paused = true;
let running = false;
let totalSeconds = 0;

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
setBtn.addEventListener('click', setTimer);

// Format time to HH:MM:SS
function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update timer display
function updateDisplay() {
    if (!paused) {
        updatedTime = Date.now();
        
        if (savedTime) {
            difference = (updatedTime - startTime) + savedTime;
        } else {
            difference = updatedTime - startTime;
        }
        
        // For countdown timer
        let remainingSeconds = Math.max(0, totalSeconds - Math.floor(difference / 1000));
        
        if (remainingSeconds <= 0) {
            resetTimer();
            alert('Timer finished!');
            return;
        }
        
        timerDisplay.textContent = formatTime(remainingSeconds);
    }
}

// Start timer
function startTimer() {
    if (!running) {
        // If no time is set, default to stopwatch mode
        if (totalSeconds === 0) {
            totalSeconds = 24 * 60 * 60; // 24 hours max
        }
        
        startTime = Date.now();
        tInterval = setInterval(updateDisplay, 100);
        paused = false;
        running = true;
    } else if (paused) {
        // If timer was paused, resume
        paused = false;
        startTime = Date.now();
    }
}

// Pause timer
function pauseTimer() {
    if (!paused && running) {
        paused = true;
        clearInterval(tInterval);
        savedTime = difference;
    }
}

// Reset timer
function resetTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = true;
    running = false;
    timerDisplay.textContent = formatTime(totalSeconds);
}

// Set timer
function setTimer() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // Update display
    timerDisplay.textContent = formatTime(totalSeconds);
    
    // Reset timer state
    resetTimer();
}

// Initialize
resetTimer();