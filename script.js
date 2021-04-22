let previous = document.querySelector('#previous');
let play = document.querySelector('#play');
let next = document.querySelector('#next');

let title = document.querySelector('#title');
let artist = document.querySelector('#artist');
let contribute = document.querySelector('#contributor')

let recent_volume = document.querySelector('#volume');
let show_volume = document.querySelector('#show_volume');

let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');

let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');

let present = document.querySelector('#current');
let total = document.querySelector('#total');

let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;
let isMuted = false;


// creating audio element
let track = document.createElement('audio');

// list of all songs
let all_songs = [
    {
        name: "Kabira",
        path: "songs/kabira.mp3",
        img: "images/kabira.jpg",
        singer: "Arijit Singh",
        contributor: "Contributed By Sanmit"
    },
    {
        name: "2 soon",
        path: "songs/2soon.mp3",
        img: "images/i_2soon.jpg",
        singer: "keshi",
        contributor: "Contributed By Anirban"
    },
    {
        name: "always",
        path: "songs/always.mp3",
        img: "images/i_always.jpg",
        singer: "keshi",
        contributor: "Contributed ByAnirban"
    },
    {
        name: "skeletons",
        path: "songs/skeletons.mp3",
        img: "images/i_skeletons.jpg",
        singer: "keshi",
        contributor: "Contributed By Anirban"
    }
];



// functions

// to load the track
function load_track(index_no){
    clearInterval(timer);
    resetSlider();
    track.src = all_songs[index_no].path;
    title.innerHTML = all_songs[index_no].name;
    track_image.src = all_songs[index_no].img;
    artist.innerHTML = all_songs[index_no].singer;
    contribute.innerHTML = all_songs[index_no].contributor
    track.load();

    total.innerHTML = all_songs.length;
    present.innerHTML = index_no + 1;

    timer = setInterval(rangeSlider, 1000);
}

load_track(index_no);


// reset slider position
function resetSlider(){
    slider.value = 0;
}

// to check if the song is playing or not
function playButton(){
    if(playing_song == false){
        playSong();
    }
    else{
        pauseSong();
    }
}

// play song
function playSong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

// pause song
function pauseSong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>'
}

// next song
function nextSong(){
    // playing_song = false;
    if(index_no < all_songs.length - 1){
        index_no++;
        load_track(index_no);
        playButton();
    }
    else{
        index_no = 0;
        load_track(index_no);
        playButton();
    }
}

// previous song
function previousSong(){
    // playing_song = false;
    if(index_no < 0){
        index_no = all_songs.length;
        load_track(index_no);
        playButton();
    }
    else{
        index_no--;
        load_track(index_no);
        playButton();
    }
}

// change volume
function changeVolume(){
    show_volume.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// change duration slider
function changeDuration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

// autoplay function
function autoPlaySwitch(){
    if(autoplay == 1){
        autoplay = 0;
        auto_play.style.background = "rgba(255, 255, 255, 0.2)";
    }
    else{
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}


// mute volume
function muteSound(){
    let current_volume = recent_volume.value;
    if(isMuted){
        volume.value = temp;
        show_volume.innerHTML = temp;
        track.volume = temp / 100;
        isMuted = false;
        recent_volume.value = temp;
    }
    else{
        track.volume = 0;
        volume.value = 0;
        show_volume.innerHTML = 0;
        isMuted = true;
    }
}

function rangeSlider(){
    if(!isNaN(track.duration)){
        slider.value = track.currentTime * (100 / track.duration);  
    }

    if(track.ended){
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if(autoplay == 1){
            index_no++;
            load_track(index_no);
            playSong();
        }
    }

}

