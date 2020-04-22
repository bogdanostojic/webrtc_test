const express = require('express');
//const app = express();
const path = require('path')
const port = 3000;
const io = require('socket.io')({
    origins: "http://localhost:3000"
});
let online = {
    admins: [],
    visitors: []
}
global.offlineUsers = []
// app.use(helmet())
console.log(__dirname)
app.use(express.static('public'))
// app.use(helmet())
let adminID =Math.round(Math.random()*10).toString();
console.log(adminID)
app.get('/visitor', (req, res) => {
    console.log(req.fresh)
    res.sendFile(path.resolve(__dirname+ '/public/visitor.html'))
});

app.get('/admin', (req, res) => {
    console.log(req.fresh)
    res.sendFile(path.resolve(__dirname+ '/public/admin.html'))
});

app.get('/', (req, res) => {
    
    res.send(path.resolve(__dirname + '/public/index.html'))
})
app.listen(port, () => console.log(`Listening on port ${port}`))

io.on('connection', socket => {
    socket.on('video-call', data => {
        console.log(data)
        io.emit('video-call', data);
    })

    socket.on('send-ice', data => {
        console.log(data);
        io.emit('send-ice', data);
    })

    socket.on('send-offer', data => {
        console.log(data);
        io.to(visitors[0]).emit('send-offer', data);
    })

    socket.on('disconnect', data => {
        offlineUsers.push(socket)
        online.admins = online.admins.filter( admin => admin.connected);


    
        console.log(`disconnected ${data}`);
    })

    socket.on('call', data => {
        io.to(`${socket.id}`).emit('s-call',data);
    })
})

let admins = io.of('/admin').on('connect', s => {
    
    s.on('check-online-visitors', data => {
        console.log(online.visitors)

    })
    console.log('wasap admin')
})

let visitors = io.of('/visitor').on('connect', socket => {

    admins.emit('check-online-visitors', {visitor: online.visitors});
    socket.on('disconnect', () => {

        console.log(socket.connected)
        let index = online.visitors.findIndex( visitor => visitor.id === socket.id && socket.connected)
        online.visitors.splice(index,1);
        console.log(online.visitors);
        admins.emit('check-online-visitors', {visitor: online.visitors});

    })
})


io.use((socket, next) =>{
    if (socket.handshake.query.role === 'admin'){
        if(online.admins.find( admin => admin.handshake.query.adminID === adminID)) {
            console.log('already signed in fellow admin')
            
        } else {
            online.admins.push(socket)

            console.log('hello admin')
        }
    } else if (socket.handshake.query.role === 'visitor') {
        console.log('hello visitor')        
        online.visitors.push({id: socket.id})        
    }
    return next();

})

global.callArray = []
let connectRoom = io
    .of('/call')
    .on('connection', socket => {
        callArray.push(socket)
        console.log('wasap, you are calling')
    })
    .on('disconnect', socket => {
        console.log(`dc ${socket}`)
        callArray =  callArray.filter( x => x.conn.id !== socket)
    })
io.listen(3300)
global.io = io;
global.connectRoom = connectRoom;

