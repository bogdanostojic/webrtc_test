import $ from 'jquery';

let $popup = $('.popup');
let $video = document.querySelector('.video');
let $audio = document.querySelector('.audio');
let $audioCall = $('.call-a');
let $videoCall = $('.call-v');
let $call = $('.call')
let $joinCall = $(".join-call");
let $replaceVideoTrack = $(".replace-video-track");


console.log($audio)
$audio.onplaying = function (e) {
    console.log(`${JSON.stringify(e,null,2)} it is playing`);
}

export  {
    $popup,
    $audioCall,
    $videoCall,
    $call,
    $video,
    $audio,
    $joinCall,
    $replaceVideoTrack
}