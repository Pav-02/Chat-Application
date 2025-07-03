const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users
let users = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('userJoined', username);
    io.emit('updateUsers', Object.values(users));
  });

  // Handle chat messages
  socket.on('chatMessage', (data) => {
    io.emit('message', {
      username: users[socket.id],
      message: data.message,
      timestamp: new Date().toLocaleTimeString()
    });
  });

  // Handle typing indicator
  socket.on('typing', () => {
    socket.broadcast.emit('userTyping', users[socket.id]);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('userStoppedTyping');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      socket.broadcast.emit('userLeft', username);
      delete users[socket.id];
      io.emit('updateUsers', Object.values(users));
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});