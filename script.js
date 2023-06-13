// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let lowVolume = document.getElementById('mute');
let higherVolume = document.getElementById('highvolume');
let shuffleSongs = document.getElementById('shuffle');


let isShuffled = false; // Flag to indicate shuffle mode
let shuffledSongIndices = []; // Array to store shuffled song indices

let songs = [
  { songName: "Oo Antiya mava-Pushpa", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  {songName:"Nenne tanka-Trivikrama", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
  {songName:"halamathi abibo-Beast", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
  {songName:"Nannavale Nannavale", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
  {songName:"Hombisilalli nangyake kandalu-kranthi", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
  {songName:"Junior monalisa", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
  {songName:"Kesariya rangu", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
  {songName:"Singara siriye-Kantara", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
  {songName:"varaha roopam-Kanatara", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
  {songName:"Shrivalli-Pushpa", filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},
  // Add more songs...
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to shuffle the song indices array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to toggle shuffle mode
const toggleShuffle = () => {
  isShuffled = !isShuffled;

  if (isShuffled) {
    // Shuffle the song indices array
    shuffledSongIndices = shuffleArray([...Array(songs.length).keys()]);
    shuffleSongs.classList.add('active');
  } else {
    shuffleSongs.classList.remove('active');
  }
};

// Add event listener to shuffle button
shuffleSongs.addEventListener('click', toggleShuffle);

// Function to get the next song index based on shuffle mode
const getNextSongIndex = () => {
  if (isShuffled) {
    // If in shuffle mode, get the next song index from the shuffled array
    songIndex = shuffledSongIndices[songIndex];
  } else {
    // If not in shuffle mode, increment the song index normally
    songIndex = (songIndex + 1) % songs.length;
  }
  return songIndex;
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
});

// Event listener for the "ended" event
audioElement.addEventListener('ended', () => {
  playNextSong();
});

const playNextSong = () => {
      // Check if the current song is the last song in the list
    if (songIndex === songs.length - 1) {
      // If it is the last song, do not play the next song
      audioElement.pause();
    audioElement.currentTime = 0;
      masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
      return;
      
    }
  
  songIndex = getNextSongIndex();
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');

  // Check if shuffle mode is active and change the color of the shuffle icon
  if (isShuffled) {
    shuffleSongs.classList.add('active');
  } else {
    shuffleSongs.classList.remove('active');
  }
};


// Listen to events
audioElement.addEventListener('timeupdate', () => {
  // Update seekbar
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myprogressBar.value = progress;
});

myprogressBar.addEventListener('change', () => {
  audioElement.currentTime = (myprogressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    const isPlaying = e.target.classList.contains('fa-circle-pause');
    if (isPlaying) {
      // If the song is currently playing, pause it
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.play();
      masterPlay.classList.remove('fa-circle-pause');
      masterPlay.classList.add('fa-circle-play');
    } else {
      // If the song is paused, play it
      currentSongIndex = songIndex;
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    }
  });
});

document.getElementById('next').addEventListener('click', () => {
  songIndex = getNextSongIndex();
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');

  // Check if shuffle mode is active and change the color of the shuffle icon
  if (isShuffled) {
    shuffleSongs.classList.add('active');
  } else {
    shuffleSongs.classList.remove('active');
  }
});

document.getElementById('previous').addEventListener('click', () => {
  if (isShuffled) {
    // If in shuffle mode, get the previous song index from the shuffled array
    const currentIndex = shuffledSongIndices.indexOf(songIndex);
    if (currentIndex === 0) {
      songIndex = shuffledSongIndices[shuffledSongIndices.length - 1];
    } else {
      songIndex = shuffledSongIndices[currentIndex - 1];
    }
  } else {
    // If not in shuffle mode, decrement the song index normally
    songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
  }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  
    // Check if shuffle mode is active and change the color of the shuffle icon
    if (isShuffled) {
        shuffleSongs.classList.add('active');
      } else {
        shuffleSongs.classList.remove('active');
      }
});
let isMuted = false;

let muteIcon = document.getElementById('muteIcon');

function toggleMute() {
  isMuted = !isMuted;
  audioElement.muted = isMuted;
  if (isMuted) {
    muteIcon.classList.remove('fa-volume-up');
    muteIcon.classList.add('fa-volume-mute');
  } else {
    muteIcon.classList.remove('fa-volume-mute');
    muteIcon.classList.add('fa-volume-up');
  }
}