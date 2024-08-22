const mySongs = [
  {
    title: "jaymikee_e-se-o-baba-gloria-bamiloye",
    artist: "Jay Mike",
    duration: 3.36,
    path: "assets/jaymikee_e-se-o-baba-gloria-bamiloye.mp3",
  },
  {
    title: "jaymikee_like-a-tree",
    artist: "Jay Mike",
    duration: 5.28,
    path: "assets/jaymikee_like-a-tree.mp3",
  },
  {
    title: "jaymikee_times-of-old-chant",
    artist: "Jay Mike",
    duration: 2.53,
    path: "assets/jaymikee_times-of-old-chant.mp3",
  },

  {
    title: "jaymikee_oh-my-child",
    artist: "Jay Mike",
    duration: 4.53,
    path: "assets/jaymikee_oh-my-child.mp3",
  },
  {
    title: "jaymikee_we-need-the-fire",
    artist: "Jay Mike",
    duration: 4.23,
    path: "assets/jaymikee_we-need-the-fire.mp3",
  },
  {
    title:
      "Kim Burrell - I Believe In You And Me - Live Bet Honors Whitney Houston Tribute - Feb 1 2010 (192  kbps) (imp3juices.com)",
    artist: "Kim Burrell",
    duration: 4.37,
    path: "assets/Kim Burrell - I Believe In You And Me - Live Bet Honors Whitney Houston Tribute - Feb 1 2010 (192  kbps) (imp3juices.com).mp3",
  },
  {
    title: "Look up child.mp3",
    artist: "Unknown",
    duration: 3.03,
    path: "assets/Look up child.mp3",
  },
  {
    title: "Losing My Religion.mp3",
    artist: "Unknown",
    duration: 3.3,
    path: "assets/Losing My Religion.mp3",
  },
];

const firstSong = mySongs.shift();
const heroBtn = document.getElementById("hero-button");
heroBtn.addEventListener("click", function () {
  if (document.getElementById("main-player").paused) {
    document.getElementById("main-player").play();
  } else {
    document.getElementById("main-player").pause();
  }
  document.getElementById("hero-button").classList.toggle("active");
});
const songList = document.querySelector(".songs");
const listItem = document.querySelector(".song-meta");
const audio = new Audio();

// first song
const firstSongBtn = listItem.children[0].children[0].children[0];

firstSongBtn.setAttribute("id", firstSong.title);

const firstSongData = listItem.children[0].children[0].children[1];
firstSongData.children[0].textContent = firstSong.title;
firstSongData.children[1].textContent = firstSong.artist;
firstSongData.children[0].setAttribute("title", firstSong.title);
const firstSongDuration = listItem.children[0].children[1].children[0];
firstSongDuration.textContent = parseFloat(firstSong.duration).toFixed(2);
listItem.setAttribute("data-id", 1);

firstSongBtn.addEventListener("click", playAndPause);

// array of seven
mySongs.forEach(function (item, index) {
  const clonedListItem = listItem.cloneNode(true);

  const clonedPlayBtn = clonedListItem.children[0].children[0].children[0];
  clonedPlayBtn.setAttribute("id", item.title);
  clonedPlayBtn.addEventListener("click", playAndPause);

  const clonedSongData = clonedListItem.children[0].children[0].children[1];
  clonedSongData.children[0].textContent = item.title;
  clonedSongData.children[1].textContent = item.artist;
  clonedSongData.children[0].setAttribute("title", item.title);
  const songDuration = clonedListItem.children[0].children[1].children[0];
  songDuration.textContent = parseFloat(item.duration).toFixed(2);

  clonedListItem.setAttribute("data-id", index + 2);
  songList.appendChild(clonedListItem);
});

function playAndPause(event) {
  const targetSong = event.target.getAttribute("id");
  const prevSong = audio.getAttribute("title");
  const isTheSameSong = prevSong === targetSong;
  let filteredSong = [];
  // first song

  if (firstSong.title === targetSong) {
    filteredSong = [{ ...firstSong }];
  } else {
    // remaining seven
    filteredSong = mySongs.filter(function (item) {
      const isSong = item.title === targetSong;
      return isSong;
    });
  }

  const songPath = filteredSong[0].path;
  if (audio.paused && !isTheSameSong) {
    audio.src = songPath;
    audio.setAttribute("title", targetSong);
    audio.play();
    event.target.src = "assets/pause-svgrepo-com.svg";
  } else if (!audio.paused && isTheSameSong) {
    audio.pause();
    event.target.src = "assets/playlist-btn.svg";
  } else if (!audio.paused && !isTheSameSong) {
    audio.pause();
    const newBtnState = document.getElementById(prevSong);
    newBtnState.src = "assets/playlist-btn.svg";
    audio.src = songPath;
    audio.setAttribute("title", targetSong);
    audio.play();
    event.target.src = "assets/pause-svgrepo-com.svg";
  } else if (audio.paused && isTheSameSong) {
    audio.play();
    event.target.src = "assets/pause-svgrepo-com.svg";
  }
}
