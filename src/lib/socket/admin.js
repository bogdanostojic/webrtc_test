import io from 'socket.io-client/dist/socket.io.slim';
let adminID = Math.round(Math.random()*10);
console.log(adminID)
const socket = io('http://localhost:3300/admin', {
    reconnection: true,
    reconnectionDelay: 15000,
    query: {
        role: 'admin',
        userAgent: navigator.userAgent,
        adminID: adminID
    }
});

socket.on('online-visitors', data => {
    console.log('onlineVisitors')

    console.log(data)
})
socket.on('connect', client => { 
    console.log(socket)
})
socket.on('audio-call', data => {
    console.log(data)
})

socket.on('video-call', data => {
    console.log(data)
})
socket.on('check-online-visitors', data => {
    console.log(`Visitors`)
    console.log(data)
})

function sendVideo() {
    console.log(socket)
    socket.emit('video-call',{message: 'hey'})
    
}
socket.on('error', data => {

    console.log(`Connection failed ${parseJson(data)}`)
})

function parseJson(data, space = 2) {
    return JSON.stringify(data, null,space);
} 

function checkOnline() {
    socket.emit('check-online-visitors', {what: 'asd'})
}

export {
    sendVideo,
    socket,
    checkOnline
}