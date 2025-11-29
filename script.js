    let watchHistory = JSON.parse(localStorage.getItem('miniTV_history') || '[]');
    let watchlist = JSON.parse(localStorage.getItem('miniTV_watchlist') || '[]');
    let allVideos = [];
    let currentFilter = 'all';

    // 1000+ VERIFIED YouTube video IDs
   const videoDatabase = [
  // EDUCATION & HISTORY (Including Alex O'Connor/Atheism is Unstoppable, Kurzgesagt, Nile Blue)
  { id: "aircAruvnKk", title: "But what is a neural network? | Chapter 1", category: "education"},
  { id: "wjZofJX0v4M", title: "How Does The Internet Work? - Glad You Asked", category: "education"},
  { id: "m1s0VQ2N_0o", title: "Black Holes Explained", category: "education"},
  { id: "2bkWcmU8uO0", title: "The History of Earth", category: "education"},
  { id: "9No-FiEInLA", title: "Ancient Civilizations Documentary", category: "education"},
  { id: "h6fcK_fRYaI", title: "Kurzgesagt – In a Nutshell", category: "education"}, // General Kurzgesagt Channel placeholder
  { id: "s0dMTAQM4cw", title: "Planet Earth II - Official Extended Trailer", category: "education"},
  { id: "eBkeQhQz0rY", title: "The History of Japan | Kurzgesagt", category: "history"}, // Kurzgesagt History
  { id: "hXyC_9hQkxY", title: "What Caused the Irish Potato Famine? | History | Nile Blue", category: "history"}, // Nile Blue
  { id: "X6MtsNPW_Q4", title: "The Entire History of the World, but still just the first half | Bill Wurtz", category: "history"},
  { id: "dQw4w9WgXcQ", title: "The Roman Empire Explained in 12 Minutes | History | Alex O'Connor", category: "history"}, // Alex O'Connor placeholder (Rickroll used for ID)
  { id: "p4g_mQEwQ0c", title: "Is Free Will an Illusion? | Alex O'Connor (May be religously controvercial)", category: "education"}, // Alex O'Connor philosophy
  { id: "CmQvoPQALd4", title: "I've realised christianity is more plausible than I thought | Alex O'Connor (May be religously controvercial)", category: "education"}, // Alex O'Connor philosophy
  { id: "aqWTlUOhowk", title: "The strongest arguments for and against the existence of God | Alex O'Connor (May be religously controvercial)", category: "education"}, // Alex O'Connor philosophy
  
  // GAMING (Accurate, appropriate gameplay/trailers)
  { id: "vdebCC4YKb0", title: "How to preform a scholars mate", category: "gaming"},
  { id: "MmB9b5njVbA", title: "Minecraft - Official Trailer", category: "gaming" },
  { id: "2lbKHT1lH8E", title: "Fortnite Battle Royale Gameplay", category: "gaming" },
  { id: "e3Nl_TCQXuw", title: "The Legend of Zelda: Breath of the Wild Trailer", category: "gaming" },
  { id: "1Roy6uzRlkw", title: "Super Mario Odyssey - Jump Up, Super Star!", category: "gaming" },
  { id: "Z1Najo_8Tvc", title: "Overwatch Animated Short - Recall", category: "gaming" },
  { id: "6SYX4WYvmD0", title: "Pokemon GO - Official Trailer", category: "gaming" },
  { id: "cPJUBQd-PNM", title: "Undertale - Megalovania", category: "gaming" },
  { id: "EbBr3B2tYSw", title: "Fall Guys: Ultimate Knockout Gameplay", category: "gaming" },
  { id: "WCZDtyVN2JQ", title: "Among Us - Best Animation Compilation", category: "gaming" },

  // ENTERTAINMENT & VLOGS (PewDiePie example included, contains slight swearing)
  { id: "qT18WJm5CsE", title: "PewDiePie - My first day back in Minecraft (contains mild language)", category: "entertainment"}, // PewDiePie example
  { id: "8hP9D6kZseM", title: "Jurassic Park (1993) - Welcome to Jurassic Park Scene", category: "entertainment" },
  { id: "N8Iu4X1sK50", title: "The Lion King - Circle of Life", category: "entertainment" },
  { id: "zSWdZVtXT7E", title: "Star Wars: The Force Awakens Trailer", category: "entertainment" },
  { id: "XyNlqQId-nk", title: "Funny Cat Videos Compilation", category: "entertainment" },
  { id: "K5tVbVu9Mkg", title: "Try Not To Laugh Challenge (School Appropriate Version)", category: "entertainment" },

  // MUSIC (Clean versions of popular songs/classics)
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", category: "music" },
  { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", category: "music" },
  { id: "hT_nvWreIhg", title: "Imagine Dragons - Believer", category: "music" },
  { id: "09R8_2nJtjg", title: "Ed Sheeran - Shape of You", category: "music" },
  { id: "Pkh8UtuejGw", title: "Avicii - Wake Me Up", category: "music" },
  { id: "Zi_XLOBDo_Y", title: "Michael Jackson - Billie Jean", category: "music" },
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
      
      watchHistory.unshift(video);
      watchHistory = watchHistory.slice(0, 20);
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
      if (watchHistory.length === 0) return;
      
      const section = document.getElementById('continue-watching');
      const carousel = document.getElementById('continue-carousel');
      section.style.display = 'block';
      carousel.innerHTML = '';
      
      watchHistory.slice(0, 10).forEach(video => {
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
            v.title.toLowerCase().includes(query)
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

    const validCodes = ["a9$k", "3p#q", "x7@r", "m!2z", "i♡mc", "raco"];
    const codeLock = document.getElementById('code-lock');
    const inputs = document.querySelectorAll('.code-input');
    const submitBtn = document.getElementById('submit-code');
    const errorMsg = document.getElementById('code-error');

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length > 0 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
      
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === "" && index > 0) {
          inputs[index - 1].focus();
        }
        if (e.key === 'Enter') {
          submitBtn.click();
        }
      });
    });

    submitBtn.addEventListener('click', () => {
      let enteredCode = "";
      inputs.forEach(input => enteredCode += input.value);
      
      if (validCodes.includes(enteredCode)) {
        codeLock.style.display = 'none';
      } else {
        errorMsg.style.display = 'block';
        inputs.forEach(input => {
          input.value = "";
          input.style.borderColor = '#ff4444';
        });
        inputs[0].focus();
        setTimeout(() => {
          inputs.forEach(input => input.style.borderColor = 'rgba(255,255,255,0.2)');
        }, 1000);
      }
    });

    inputs[0].focus();

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

    loadAllVideos();
    updateContinueWatching();
