import $ from 'jquery';

let $popup = $('.popup');
let $video = document.querySelector('.video');
let $audio = document.querySelector('.audio');
let $audioCall = $('.call-a');
let $videoCall = $('.call-v');
let $call = $('.call')
let $joinCall = $(".join-call");
let $replaceVideoTrack = $(".replace-video-track");


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