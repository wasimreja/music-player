const cover = document.getElementById('cover'),
    disc = document.getElementById('disc'),
    title = document.getElementById('title'),
    artist = document.getElementById('artist'),
    progressContainer = document.getElementById('progress-container'),
    progress = document.getElementById('progress'),
    timer = document.getElementById('timer'),
    duration = document.getElementById('duration'),
    prev = document.getElementById('prev'),
    play = document.getElementById('play'),
    next = document.getElementById('next');

let songIndex = 0;

const songs = [
  {
    title: 'Rangi Saari',
    artist: 'Kavita Seth, Kanishk Seth',
    coverPath: 'img/rangi saari.jpg',
    discPath: 'music/rangi saari.mp3',
    duration: '3:32',
  },
  {
    title: 'Aaftaab',
    artist: 'The Local Train',
    coverPath: 'img/aaftaab.jpg',
    discPath: 'music/aaftaab.mp3',
    duration: '3:54',
  },
  {
    title: 'Teri Tasveer',
    artist: 'Bayaan',
    coverPath: 'img/teri tasveer.jpg',
    discPath: 'music/teri tasveer.mp3',
    duration: '4:58',
  },
  {
    title: 'Na Kehna Tum',
    artist: 'Dream Note',
    coverPath: 'img/na kehna tum.jpg',
    discPath: 'music/na kehna tum.mp3',
    duration: '4:25',
  },
  {
    title: 'Riha',
    artist: 'Anuv Jain',
    coverPath: 'img/riha.jpg',
    discPath: 'music/riha.mp3',
    duration: '4:53',
  },
  {
    title: 'Sun Lo Na (Raw)',
    artist: 'Suzonn',
    coverPath: 'img/sun lo na (raw).jpg',
    discPath: 'music/sun lo na (raw).mp3',
    duration: '2:54',
  },
  {
    title: 'Kya Pata',
    artist: 'Osho Jain',
    coverPath: 'img/kya pata.jpg',
    discPath: 'music/kya pata.mp3',
    duration: '3:27',
  },
  {
    title: 'cold/mess',
    artist: 'Prateek Kuhad',
    coverPath: 'img/cold mess.jpg',
    discPath: 'music/cold mess.mp3',
    duration: '4:41',
  },
  {
    title: 'Kahaani',
    artist: 'When Chai Met Toast',
    coverPath: 'img/kahaani.jpg',
    discPath: 'music/kahaani.mp3',
    duration: '3:35',
  },
];

loadSong(songs[songIndex]);

function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

play.addEventListener('click', playPauseMedia);

disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

prev.addEventListener('click', gotoPreviousSong);

next.addEventListener('click', gotoNextSong.bind(null, false));

progressContainer.addEventListener('click', setProgress);