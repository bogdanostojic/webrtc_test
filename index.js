const express = require('express');
const app = express();
const path = require('path')
const port = 3000;
const io = require('socket.io')({
    origins: "http://localhost:3000"
});

global.admins = [];
global.visitors = [];
global.onlineUsers = [];
// app.use(helmet())
console.log(__dirname)
app.use(express.static('public'))
// app.use(helmet())

app.get('/visitor', (req, res) => {
    console.log(req.fresh)
    res.sendFile(path.resolve(__dirname+ '/public/visitor.html'))
});

app.get('/admin', (req, res) => {
    console.log(req.fresh)
    res.sendFile(path.resolve(__dirname+ '/public/admin.html'))
});

app.listen(port, () => console.log(`Listening on port ${port}`))

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('video-call', data => {
        console.log(data)
        io.emit('video-call', data);
    })
})

io.use((socket, next) =>{
    if (socket.handshake.query.role === 'admin'){
        admins.push(socket)
        console.log('hello admin')
    } else if (socket.handshake.query.role === 'visitor') {
        visitors.push(socket)        
    }
    onlineUsers.push(socket)
    return next();

})

io.listen(3300)