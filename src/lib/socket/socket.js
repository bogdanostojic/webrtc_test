import io from 'socket.io-client/dist/socket.io.slim';
const socket = io('http://localhost:3300', {
    reconnection: true,
    reconnectionDelay: 15000,
    query: {
        role: 'admin',
        userAgent: navigator.userAgent
    }
});
socket.on('connect', client => { 
    console.log(socket)
})
socket.on('audio-call', data => {
    console.log(data)
})

socket.on('video-call', data => {
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

export {
    sendVideo
}