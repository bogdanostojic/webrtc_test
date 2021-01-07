import '../css/admin.scss';
import { sendVideo, checkOnline } from '../lib/socket/admin.js';

import { Stream,  $audioCall, $videoCall, $video, $audio,$replaceVideoTrack } from '../lib';

// import { Peer } from '../lib/peer.js';


let disable = false;
// Peer.create();

function disableCallButtons() {

    if(disable) return;
    disable = true;
    $audioCall.attr('disabled', true);
    $videoCall.attr('disabled', true);

}

function enableCallButtons() {
    disable = false;
    $audioCall.attr('disabled', false);
    $videoCall.attr('disabled', false);

}

$replaceVideoTrack.on('click', async () => {
        Stream.setLocal(await navigator.mediaDevices.getUserMedia({video: true}));
        $video.srcObject = Stream.getLocal();

        Peer.replaceTrack(Stream.getLocal())
        checkOnline();
})
 async function getAudio() {

    try {
        const {Stream} = await import(/*webpackChunkName: "stream" */"./stream.js"); // Dynamic import example
        console.log(Stream)
        Stream.setLocal(await navigator.mediaDevices.getUserMedia({audio: true}));
        $audio.srcObject = Stream.getLocal();
        // Stream.getLocal().getTracks().forEach( track => track.enabled = false);
        $audio.onloadedmetadata = function(e) {
            $audio.play();
            console.log(window)
            // enableCallButtons()
          }
    }
    catch (e) {
        console.log(e)
    }
}

let black = ({width = 20, height = 20} = {}) => {
    let canvas = Object.assign(document.createElement('canvas'), {width, height});
    canvas.getContext('2d').fillRect(0,0, width, height);
    let stream = canvas.captureStream('1');
    return Object.assign(stream.getVideoTracks()[0], {enabled: false});
}
let blackSilence = () => new MediaStream([black()])
async function getVideo() {
    try {
        let stream = blackSilence();
        $video.srcObject = stream; 

        // Stream.setLocal(await navigator.mediaDevices.getUserMedia({video: true}));
        // $video.srcObject = Stream.getLocal();
        Peer.addStream(stream);
        $video.onloadedmetadata = function(e) {
            $video.play();
            sendVideo()

          }

    }
    catch (e) {
        console.log(e)
    }

}

$video.onclick = e => {
    // $.video.requestFullscreen();
};
$audioCall.on('click', e => {
    disableCallButtons()
    getAudio()
})
$videoCall.on('click', e => {
    disableCallButtons()
    getVideo()
})
var wait = function(){ return new Promise (function (resolve, reject) {
    setTimeout(function(){
        console.log('wait')
        $audioCall.html('wait')
        resolve()
    }, 1000)
})}
 function runName() {
    wait().then();
}
runName()

// export  {
//     Peer
// }