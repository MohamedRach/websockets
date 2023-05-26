const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/admin', (req, res) => {
  res.render('admin');
});
app.get('/client', (req, res) => {
    res.render('client');
});
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log(msg)
        io.emit('chat message', msg);
       
    })
})
server.listen(3000, () => {
  console.log('listening on *:3000');
});