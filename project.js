const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Listen for incoming connections on port 8080
server.listen(8081, () => {
    console.log('Server is listening on port 8080');
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newuser', (username) => {
        socket.broadcast.emit('update', username + ' joined the conversation');
    });

    socket.on('exituser', (username) => {
        socket.broadcast.emit('update', username + ' left the conversation');
    });

    socket.on('chat', (message) => {
        socket.broadcast.emit('chat', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});