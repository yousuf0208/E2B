/* Base Styles */
body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
    margin: 0;
    padding: 20px;
    color: #2d3748;
    line-height: 1.6;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 30px;
}

h1 {
    color: #2E86AB;
    margin-bottom: 10px;
}

/* Card Styles */
.card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Button Styles */
button {
    border: none;
    border-radius: 5px;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    margin-top: 15px;
    font-weight: bold;
}

.action-btn {
    background-color: #2E86AB;
    color: white;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11);
}

.action-btn:hover {
    background-color: #1a6a8f;
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1);
}

.secondary-btn {
    background-color: #f0f0f0;
    color: #333;
}

.secondary-btn:hover {
    background-color: #e0e0e0;
}

/* Timer Styles */
.timer-container {
    text-align: center;
    margin: 20px 0;
}

#time {
    font-size: 48px;
    font-weight: bold;
    display: block;
    margin: 15px 0;
}

.timer.warning {
    color: #e53e3e;
    animation: pulse 1s infinite;
}

/* Visualizer Styles */
.visualizer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 60px;
    margin-bottom: 15px;
}

.visualizer .bar {
    width: 6px;
    margin: 0 2px;
    background-color: #2E86AB;
    border-radius: 3px;
    transition: height 0.2s ease;
}

/* Textarea Styles */
textarea {
    width: 100%;
    height: 120px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    font-family: 'Arial', sans-serif;
    margin-bottom: 10px;
    transition: border 0.3s ease;
}

textarea:focus {
    border-color: #2E86AB;
    outline: none;
}

/* Footer Styles */
.footer {
    text-align: center;
    margin-top: 30px;
    color: #666;
    font-size: 14px;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: white;
    margin: 10% auto;
    padding: 25px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    max-height: 70vh;
    overflow-y: auto;
}

.close-btn {
    float: right;
    font-size: 24px;
    cursor: pointer;
}

/* Session Item Styles */
.session-item {
    padding: 15px;
    border-bottom: 1px solid #eee;
}

.session-item h4 {
    margin-top: 0;
    color: #2E86AB;
}

.session-item p {
    white-space: pre-wrap;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.pulse {
    animation: pulse 1.5s infinite;
    display: inline-block;
    color: #e53e3e;
}

/* Responsive Design */
@media (max-width: 480px) {
    .container {
        padding: 15px;
    }
    
    .card {
        padding: 20px;
    }
    
    #time {
        font-size: 36px;
    }
    
    button {
        padding: 10px 15px;
    }
}
