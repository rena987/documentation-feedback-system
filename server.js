const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', (docId) => {
    socket.join(docId);
  });

  socket.on('code-change', (data) => {
    socket.to(data.docId).emit('code-update', data.code);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});