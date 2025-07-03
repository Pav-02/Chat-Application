const socket = io();

// DOM elements
const loginContainer = document.getElementById('loginContainer');
const chatContainer = document.getElementById('chatContainer');
const usernameInput = document.getElementById('usernameInput');
const joinBtn = document.getElementById('joinBtn');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const usersList = document.getElementById('usersList');
const userCount = document.getElementById('userCount');
const typingIndicator = document.getElementById('typingIndicator');

let username = '';
let typingTimer;

// Join chat
joinBtn.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});

function joinChat() {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit('join', username);
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
        messageInput.focus();
    }
}

// Send message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', { message });
        messageInput.value = '';
        socket.emit('stopTyping');
    }
}

// Typing indicator
messageInput.addEventListener('input', () => {
    socket.emit('typing');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        socket.emit('stopTyping');
    }, 1000);
});

// Socket event listeners
socket.on('message', (data) => {
    displayMessage(data);
});

socket.on('userJoined', (username) => {
    displaySystemMessage(`${username} joined the chat`);
});

socket.on('userLeft', (username) => {
    displaySystemMessage(`${username} left the chat`);
});

socket.on('updateUsers', (users) => {
    userCount.textContent = users.length;
    usersList.textContent = `Users: ${users.join(', ')}`;
});

socket.on('userTyping', (username) => {
    typingIndicator.textContent = `${username} is typing...`;
});

socket.on('userStoppedTyping', () => {
    typingIndicator.textContent = '';
});

// Display functions
function displayMessage(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="username">${data.username}</span>
            <span class="timestamp">${data.timestamp}</span>
        </div>
        <div class="message-text">${data.message}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displaySystemMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message system-message';
    messageDiv.textContent = message;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}