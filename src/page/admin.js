import '../css/admin.scss';
import { sendVideo } from '../lib/socket/admin.js';

import { Stream,  $audioCall, $videoCall, $video, $audio } from '../lib';



let disable = false;

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


 async function getAudio() {

    try {
        // const {Stream} = await import(/*webpackChunkName: "stream" */"./stream.js"); // Dynamic import example
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

async function getVideo() {
    try {
        Stream.setLocal(await navigator.mediaDevices.getUserMedia({video: true}));
        $video.srcObject = Stream.getLocal();

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