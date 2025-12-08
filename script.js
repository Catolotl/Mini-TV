let watchHistory = JSON.parse(localStorage.getItem('miniTV_history') || '[]');
let watchlist = JSON.parse(localStorage.getItem('miniTV_watchlist') || '[]');
let allVideos = [];
let currentFilter = 'all';

// Expanded Video Database with 100+ videos
const videoDatabase = [
  // EDUCATION & SCIENCE
  { id: "aircAruvnKk", title: "But what is a neural network? | Chapter 1", category: "education"},
  { id: "wjZofJX0v4M", title: "How Does The Internet Work? - Glad You Asked", category: "education"},
  { id: "m1s0VQ2N_0o", title: "Black Holes Explained", category: "education"},
  { id: "2bkWcmU8uO0", title: "The History of Earth", category: "education"},
  { id: "9No-FiEInLA", title: "Ancient Civilizations Documentary", category: "education"},
  { id: "h6fcK_fRYaI", title: "Kurzgesagt – In a Nutshell", category: "education"},
  { id: "s0dMTAQM4cw", title: "Planet Earth II - Official Extended Trailer", category: "education"},
  { id: "eBkeQhQz0rY", title: "The History of Japan | Kurzgesagt", category: "education"},
  { id: "X6MtsNPW_Q4", title: "The Entire History of the World", category: "education"},
  { id: "p4g_mQEwQ0c", title: "Is Free Will an Illusion? | Philosophy", category: "education"},
  { id: "CmQvoPQALd4", title: "Philosophy of Religion Discussion", category: "education"},
  { id: "aqWTlUOhowk", title: "Arguments for God's Existence", category: "education"},
  { id: "MkQ5c_OhZGc", title: "How Do Vaccines Work?", category: "education"},
  { id: "QFXHQcKKM0s", title: "The Evolution of Life on Earth", category: "education"},
  { id: "TLpzHHbFrHY", title: "What is Quantum Physics?", category: "education"},
  { id: "IJhgZBn-LHg", title: "The Immune System Explained", category: "education"},
  { id: "QFKtHNFOSbk", title: "String Theory Explained Simply", category: "education"},
  { id: "V0lw3qylVfY", title: "Climate Change - What You Need to Know", category: "education"},
  { id: "xuCn8ux2gbs", title: "How Evolution Works", category: "education"},
  { id: "UyyjU8fzEYU", title: "The Human Brain Explained", category: "education"},
  
  // GAMING
  { id: "vdebCC4YKb0", title: "How to Perform a Scholar's Mate", category: "gaming"},
  { id: "MmB9b5njVbA", title: "Minecraft - Official Trailer", category: "gaming"},
  { id: "2lbKHT1lH8E", title: "Fortnite Battle Royale Gameplay", category: "gaming"},
  { id: "e3Nl_TCQXuw", title: "Zelda: Breath of the Wild Trailer", category: "gaming"},
  { id: "1Roy6uzRlkw", title: "Super Mario Odyssey - Jump Up, Super Star!", category: "gaming"},
  { id: "Z1Najo_8Tvc", title: "Overwatch Animated Short - Recall", category: "gaming"},
  { id: "6SYX4WYvmD0", title: "Pokemon GO - Official Trailer", category: "gaming"},
  { id: "cPJUBQd-PNM", title: "Undertale - Megalovania", category: "gaming"},
  { id: "EbBr3B2tYSw", title: "Fall Guys: Ultimate Knockout Gameplay", category: "gaming"},
  { id: "WCZDtyVN2JQ", title: "Among Us - Best Animation Compilation", category: "gaming"},
  { id: "FyImnkz0Lcg", title: "Rocket League - Epic Goals Compilation", category: "gaming"},
  { id: "8X2kIfS6fb8", title: "Elden Ring - Official Gameplay Trailer", category: "gaming"},
  { id: "nCClxtAfKWE", title: "Stardew Valley - Relaxing Gameplay", category: "gaming"},
  { id: "JGhlnJxoQZE", title: "The Last of Us - Emotional Moments", category: "gaming"},
  { id: "PSKRlNS4c8k", title: "God of War - Best Combat Moves", category: "gaming"},
  { id: "yr3ngmRuGUc", title: "Red Dead Redemption 2 - Cinematic Trailer", category: "gaming"},
  { id: "TcZyiYOzsSw", title: "Valorant - Tips and Tricks", category: "gaming"},
  { id: "FwMo1a_s8Js", title: "League of Legends - Pro Plays", category: "gaming"},
  { id: "P3ALwKeSEYs", title: "Hollow Knight - Beautiful Gameplay", category: "gaming"},
  { id: "4A8HTUHSjIc", title: "Cuphead - Boss Fight Compilation", category: "gaming"},

  // ENTERTAINMENT & MOVIES
  { id: "qT18WJm5CsE", title: "Minecraft Funny Moments", category: "entertainment"},
  { id: "8hP9D6kZseM", title: "Jurassic Park - Welcome Scene", category: "entertainment"},
  { id: "N8Iu4X1sK50", title: "The Lion King - Circle of Life", category: "entertainment"},
  { id: "zSWdZVtXT7E", title: "Star Wars: The Force Awakens Trailer", category: "entertainment"},
  { id: "XyNlqQId-nk", title: "Funny Cat Videos Compilation", category: "entertainment"},
  { id: "K5tVbVu9Mkg", title: "Try Not To Laugh Challenge", category: "entertainment"},
  { id: "J---aiyznGQ", title: "Keyboard Cat - Original", category: "entertainment"},
  { id: "9bZkp7q19f0", title: "Gangnam Style - PSY", category: "entertainment"},
  { id: "kffacxfA7G4", title: "Charlie Bit My Finger", category: "entertainment"},
  { id: "YbJOTdZBX1g", title: "Dramatic Chipmunk", category: "entertainment"},
  { id: "hY7m5jjJ9mM", title: "Cats Being Jerks Compilation", category: "entertainment"},
  { id: "NRIr9MNmCwU", title: "Dogs Being Awesome Compilation", category: "entertainment"},
  { id: "wZZ7oFKsKzY", title: "Baby Shark Dance", category: "entertainment"},
  { id: "OWWu05YYbNI", title: "Evolution of Dance", category: "entertainment"},
  { id: "jNQXAC9IVRw", title: "Me at the Zoo - First YouTube Video", category: "entertainment"},
  
  // MUSIC
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", category: "music"},
  { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", category: "music"},
  { id: "hT_nvWreIhg", title: "Imagine Dragons - Believer", category: "music"},
  { id: "09R8_2nJtjg", title: "Ed Sheeran - Shape of You", category: "music"},
  { id: "Pkh8UtuejGw", title: "Avicii - Wake Me Up", category: "music"},
  { id: "Zi_XLOBDo_Y", title: "Michael Jackson - Billie Jean", category: "music"},
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", category: "music"},
  { id: "RgKAFK5djSk", title: "Wiz Khalifa - See You Again ft. Charlie Puth", category: "music"},
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", category: "music"},
  { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk ft. Bruno Mars", category: "music"},
  { id: "7wtfhZwyrcc", title: "Adele - Someone Like You", category: "music"},
  { id: "YQHsXMglC9A", title: "Adele - Hello", category: "music"},
  { id: "2Vv-BfVoq4g", title: "PSY - Gangnam Style", category: "music"},
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", category: "music"},
  { id: "pRpeEdMmmQ0", title: "Taylor Swift - Shake It Off", category: "music"},
  { id: "lDK9QqIzhwk", title: "Linkin Park - Numb", category: "music"},
  { id: "A_MjCqQoLLA", title: "The Weeknd - Blinding Lights", category: "music"},
  { id: "pt8VYOfr8To", title: "Coldplay - Viva La Vida", category: "music"},
  { id: "SlPhMPnQ58k", title: "Eminem - Lose Yourself", category: "music"},
  { id: "JGwWNGJdvx8", title: "Journey - Don't Stop Believin'", category: "music"},

  // TECH & INNOVATION
  { id: "QPhbyQXJNww", title: "iPhone - The First Introduction", category: "tech"},
  { id: "oBklltKXtDE", title: "Tesla Cybertruck Unveil", category: "tech"},
  { id: "kypQzXn6rYk", title: "How AI Works - Simple Explanation", category: "tech"},
  { id: "4p0fRlz7jwc", title: "SpaceX Starship Launch", category: "tech"},
  { id: "8giWCK0rHjg", title: "Boston Dynamics - Atlas Robot", category: "tech"},
  { id: "P_zLyUZrJKo", title: "The Future of Technology", category: "tech"},
  { id: "mDKTLpPFDVk", title: "How Smartphones Are Made", category: "tech"},
  { id: "n0_Cy5tSbDY", title: "5G Technology Explained", category: "tech"},
  { id: "IgKWPdJWuBQ", title: "Quantum Computing Explained", category: "tech"},
  { id: "RY_2gElt3SA", title: "AI vs Human Intelligence", category: "tech"},

  // NATURE & ANIMALS
  { id: "KlT_6pdn_rM", title: "Amazing Nature Scenes in 4K", category: "nature"},
  { id: "NU9JoFKlaZ0", title: "Earth from Space in 4K", category: "nature"},
  { id: "ajCYQL8ouqw", title: "Jellyfish in 4K - Peaceful", category: "nature"},
  { id: "_WHRWLnVm_M", title: "Planet Earth - Incredible Moments", category: "nature"},
  { id: "3s7h2MHQtxc", title: "Ocean Life in 4K - Relaxing", category: "nature"},
  { id: "xNN7iTA57jM", title: "African Wildlife Documentary", category: "nature"},
  { id: "5Euj9f3gdyM", title: "Birds of Paradise - Beautiful Displays", category: "nature"},
  { id: "oY59wZdCDo0", title: "The Great Migration - Wildlife", category: "nature"},
  { id: "LXb3EKWsInQ", title: "Deep Sea Creatures", category: "nature"},
  { id: "5khTC32p_UU", title: "Arctic Animals - Wildlife Documentary", category: "nature"},

  // ANIME & ANIMATION
  { id: "6ohYYtxfDCg", title: "Studio Ghibli - Music Collection", category: "anime"},
  { id: "1wnE4vF9CQ4", title: "Attack on Titan - Opening 1", category: "anime"},
  { id: "wEWF2xh5E8s", title: "My Hero Academia - Best Moments", category: "anime"},
  { id: "FRivqYxqeKs", title: "Demon Slayer - Epic Scenes", category: "anime"},
  { id: "pmanD_s7G3U", title: "One Piece - Emotional Moments", category: "anime"},
  { id: "D5fYOnwYkj4", title: "Naruto - Best Fights Compilation", category: "anime"},
  { id: "QgpfNScEaLM", title: "Dragon Ball Z - Epic Transformations", category: "anime"},
  { id: "7nG_SKQFkXg", title: "Spirited Away - Behind the Scenes", category: "anime"},
  { id: "js94SXW6a-k", title: "Howl's Moving Castle - Music", category: "anime"},
  { id: "puHyO5JNOE0", title: "Your Name - Beautiful Animation", category: "anime"},
];

function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.innerHTML = `
    <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
    <div class="play-overlay">
      <div class="play-icon"><i class="fas fa-play"></i></div>
    </div>
    <div class="video-info">
      <div class="video-title">${video.title}</div>
      <div class="video-meta">HD • Free</div>
    </div>
  `;
  card.onclick = () => playVideo(video);
  return card;
}

function playVideo(video) {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('video-player');
  const title = document.getElementById('player-title');
  const description = document.getElementById('player-description');
  
  player.src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`;
  
  title.textContent = video.title;
  description.textContent = 'Enjoy this free video content!';
  modal.classList.add('active');
  
  // Remove video if it already exists in history
  watchHistory = watchHistory.filter(v => v.id !== video.id);
  
  // Add to front of history
  watchHistory.unshift(video);
  
  // Keep only last 5 videos
  watchHistory = watchHistory.slice(0, 5);
  
  localStorage.setItem('miniTV_history', JSON.stringify(watchHistory));
  updateContinueWatching();
}

function closePlayer() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('video-player');
  player.src = '';
  modal.classList.remove('active');
}

function playFeatured() {
  playVideo(videoDatabase[0]);
}

function scrollToVideos() {
  document.getElementById('all-videos-section').scrollIntoView({ behavior: 'smooth' });
}

function updateContinueWatching() {
  if (watchHistory.length === 0) {
    document.getElementById('continue-watching').style.display = 'none';
    return;
  }
  
  const section = document.getElementById('continue-watching');
  const carousel = document.getElementById('continue-carousel');
  section.style.display = 'block';
  carousel.innerHTML = '';
  
  // Show only the last 5 watched videos
  watchHistory.forEach(video => {
    const card = createVideoCard(video);
    carousel.appendChild(card);
  });
}

function loadView(view) {
  if (view === 'home') {
    location.reload();
  }
}

function filterByCategory(category) {
  currentFilter = category;
  
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Update nav menu active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const carousel = document.getElementById('all-videos-carousel');
  carousel.innerHTML = '';
  
  const filteredVideos = category === 'all' 
    ? videoDatabase 
    : videoDatabase.filter(v => v.category === category);
  
  filteredVideos.forEach(video => {
    const card = createVideoCard(video);
    carousel.appendChild(card);
  });
  
  document.getElementById('video-count').textContent = `${filteredVideos.length} videos`;
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = e.target.value.toLowerCase();
    if (query) {
      const carousel = document.getElementById('all-videos-carousel');
      carousel.innerHTML = '';
      
      const searchResults = videoDatabase.filter(v => 
        v.title.toLowerCase().includes(query) || v.category.toLowerCase().includes(query)
      );
      
      if (searchResults.length > 0) {
        searchResults.forEach(video => {
          const card = createVideoCard(video);
          carousel.appendChild(card);
        });
        document.getElementById('video-count').textContent = `${searchResults.length} results`;
      } else {
        carousel.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">No videos found. Try another search term.</p>';
      }
    }
  }
});

function loadAllVideos() {
  const carousel = document.getElementById('all-videos-carousel');
  carousel.innerHTML = '';
  
  // Shuffle videos for variety
  const shuffled = [...videoDatabase].sort(() => Math.random() - 0.5);
  
  shuffled.forEach(video => {
    const card = createVideoCard(video);
    carousel.appendChild(card);
  });
  
  document.getElementById('video-count').textContent = `${videoDatabase.length} videos`;
  allVideos = shuffled;
}

// Initialize on page load
loadAllVideos();
updateContinueWatching();
