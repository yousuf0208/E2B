// DOM Elements
const topicDisplay = document.getElementById('topic-display');
const generateBtn = document.getElementById('generate-btn');
const timeDisplay = document.getElementById('time');
const recordBtn = document.getElementById('record-btn');
const playback = document.getElementById('playback');
const notes = document.getElementById('notes');
const saveBtn = document.getElementById('save-btn');
const historyBtn = document.getElementById('history-btn');
const visualizer = document.getElementById('visualizer');
const historyModal = document.getElementById('history-modal');
const closeBtn = document.querySelector('.close-btn');
const sessionsList = document.getElementById('sessions-list');

// Topics Database
const topics = [
    "Describe a book you recently read",
    "Talk about a memorable journey",
    "Describe a skill you want to learn",
    "Discuss a famous person you admire",
    "Describe a place you would like to visit",
    "Talk about an important decision you made",
    "Describe a childhood memory",
    "Discuss a tradition in your country"
];

// Audio Visualization
let audioContext, analyser, dataArray;
const bars = [];

// Initialize visualizer bars
for (let i = 0; i < 10; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = '2px';
    visualizer.appendChild(bar);
    bars.push(bar);
}

// Generate Topic with Loading Effect
generateBtn.addEventListener('click', () => {
    // Show loading state
    topicDisplay.innerHTML = '<h2 class="loading">Generating topic...</h2>';
    generateBtn.disabled = true;
    
    setTimeout(() => {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        topicDisplay.innerHTML = `<h2>${randomTopic}</h2>`;
        generateBtn.disabled = false;
        startTimer(60); // 1-minute preparation timer
    }, 800);
});

// Timer Function
let timerInterval;
function startTimer(seconds) {
    clearInterval(timerInterval); // Clear any existing timer
    timeDisplay.classList.remove('warning');
    
    let remaining = seconds;
    updateTimerDisplay(remaining);
    
    timerInterval = setInterval(() => {
        remaining--;
        updateTimerDisplay(remaining);
        
        if (remaining <= 10) {
            timeDisplay.classList.add('warning');
        }
        
        if (remaining <= 0) {
            clearInterval(timerInterval);
            showConfetti();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Confetti Effect
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Recording Functionality
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

recordBtn.addEventListener('click', toggleRecording);

async function toggleRecording() {
    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setupAudioContext(stream);
            
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.ondataavailable = (e) => {
                audioChunks.push(e.data);
            };
            
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
                playback.src = URL.createObjectURL(audioBlob);
                playback.hidden = false;
                showConfetti();
                
                // Stop all tracks in the stream
                stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.start();
            startTimer(120); // 2-minute speaking timer
            recordBtn.innerHTML = '<span class="pulse">●</span> Stop Recording';
            isRecording = true;
        } catch (error) {
            alert("Could not access microphone. Please check permissions.");
            console.error("Recording error:", error);
        }
    } else {
        mediaRecorder.stop();
        recordBtn.textContent = "Start Recording";
        isRecording = false;
    }
}

function setupAudioContext(stream) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 64;
    
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    updateVisualizer();
}

function updateVisualizer() {
    if (!analyser) return;
    
    requestAnimationFrame(updateVisualizer);
    analyser.getByteFrequencyData(dataArray);
    
    bars.forEach((bar, i) => {
        const value = dataArray[i] || 0;
        const height = Math.max(2, value / 2);
        bar.style.height = `${height}px`;
        bar.style.backgroundColor = `hsl(${200 + (value / 2)}, 100%, 50%)`;
    });
}

// Save Session
saveBtn.addEventListener('click', () => {
    const topic = topicDisplay.querySelector('h2')?.textContent || "No topic selected";
    const noteText = notes.value.trim();
    
    if (!noteText) {
        alert("Please add some notes before saving!");
        return;
    }
    
    const sessionData = {
        topic,
        notes: noteText,
        date: new Date().toLocaleString(),
        audioUrl: playback.src || null
    };
    
    const sessions = JSON.parse(localStorage.getItem('speak60_sessions')) || [];
    sessions.unshift(sessionData); // Add new session to beginning
    localStorage.setItem('speak60_sessions', JSON.stringify(sessions));
    
    alert("Session saved successfully!");
    notes.value = "";
});

// History Modal
historyBtn.addEventListener('click', showHistoryModal);
closeBtn.addEventListener('click', hideHistoryModal);

function showHistoryModal() {
    const sessions = JSON.parse(localStorage.getItem('speak60_sessions')) || [];
    
    if (sessions.length === 0) {
        sessionsList.innerHTML = "<p>No saved sessions yet.</p>";
    } else {
        sessionsList.innerHTML = sessions.map((session, index) => `
            <div class="session-item">
                <h4>${session.topic}</h4>
                <small>${session.date}</small>
                <p>${session.notes}</p>
                ${session.audioUrl ? `<audio src="${session.audioUrl}" controls></audio>` : ''}
            </div>
        `).join('');
    }
    
    historyModal.style.display = "block";
}

function hideHistoryModal() {
    historyModal.style.display = "none";
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === historyModal) {
        hideHistoryModal();
    }
});

// Initialize audio context on first user interaction
document.addEventListener('click', () => {
    if (!audioContext) {
        // Create a silent audio context to avoid auto-play issues
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}, { once: true });
