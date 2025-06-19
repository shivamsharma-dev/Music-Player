const audio = document.getElementById("audio");
const playBtn = document.getElementById("playPause");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let songs = [
  {
    name: "song1",
    title: "Timeless The Weekend",
    artist: "Playboi",
  },
  {
    name: "song2",
    title: "Chery Chery Lady",
    artist: "Modern Talking",
  },
  {
    name: "song3",
    title: "Funk Universo",
    artist: "Irokz",
  },
];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `music/${song.name}.weba`;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸️";
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸️";
}

audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function setVolume(val) {
  audio.volume = val;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

audio.addEventListener("ended", nextSong);

function buildPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `${s.title} - ${s.artist}`;
    li.onclick = () => {
      songIndex = i;
      loadSong(songs[songIndex]);
      audio.play();
      playBtn.textContent = "⏸️";
    };
    playlistEl.appendChild(li);
  });
}

loadSong(songs[songIndex]);
buildPlaylist();
