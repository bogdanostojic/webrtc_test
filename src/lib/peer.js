import { socket } from './socket/admin';


let pc;
let servers = {
    iceServers: [
        {
            urls: 'stun:numb.viagenie.ca:3478'
        }
    ]
}
class Peer {
    constructor() {}

    static create() {
        pc = new RTCPeerConnection(servers);
        pc.onicecandidate = this.sendIce;
        pc.onnegotiationneeded = this.createOffer;
        console.warn(pc)
    }

    static async  sendIce(event) {
        console.log(event.candidate)
        if(event.candidate) {
            socket.emit('send-ice', event.candidate);
        }
    }

    static replaceTrack(stream) {
        let videoTrack = stream.getVideoTracks()[0];
        let sender = pc.getSenders().find( s => s.track.kind === videoTrack.kind)
        sender.replaceTrack(videoTrack)
    }

    static async  createOffer() {
        console.log(pc)
        let config = {
            offerToReceiveVideo: true
        }
        // let offer = await pc.setLoclDescription(await pc.createOffer());
        await pc.setLocalDescription(await pc.createOffer(config));
        socket.emit('send-offer', pc.localDescription);
    }

    static async addStream(stream) {
        stream.getTracks().forEach( track => pc.addTrack(track, stream));
    }

    static async addTrackVideo() {
        let stream = await navigator.mediaDevices.getUserMedia({audio: true});
        let audioTracks = [];
        stream.getAudioTracks().forEach( track => audioTracks.push(track));
        pc.addTrack(videoTracks[0], stream);
    }

    static getPC() {
        return pc;
    }
}

export { Peer }