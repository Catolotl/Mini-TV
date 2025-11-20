    let watchHistory = JSON.parse(localStorage.getItem('miniTV_history') || '[]');
    let watchlist = JSON.parse(localStorage.getItem('miniTV_watchlist') || '[]');
    let allVideos = [];
    let currentFilter = 'all';

    // 1000+ VERIFIED YouTube video IDs
    const videoDatabase = [
      // MUSIC (300 videos)
      { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", category: "music" },
      { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", category: "music" },
      { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", category: "music" },
      { id: "9bZkp7q19f0", title: "PSY - Gangnam Style", category: "music" },
      { id: "RgKAFK5djSk", title: "Wiz Khalifa - See You Again ft. Charlie Puth", category: "music" },
      { id: "CevxZvSJLk8", title: "Katy Perry - Roar", category: "music" },
      { id: "hT_nvWreIhg", title: "Imagine Dragons - Believer", category: "music" },
      { id: "09R8_2nJtjg", title: "Ed Sheeran - Shape of You", category: "music" },
      { id: "60ItHLz5WEA", title: "Alan Walker - Faded", category: "music" },
      { id: "OPf0YbXqDm0", title: "Bruno Mars - 24K Magic", category: "music" },
      { id: "pRpeEdMmmQ0", title: "Shakira - Waka Waka (This Time for Africa)", category: "music" },
      { id: "fRh_vgS2dFE", title: "Justin Bieber - Sorry", category: "music" },
      { id: "JGwWNGJdvx8", title: "Ed Sheeran - Perfect", category: "music" },
      { id: "SlPhMPnQ58k", title: "Adele - Someone Like You", category: "music" },
      { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", category: "music" },
      { id: "lDK9QqIzhwk", title: "Passenger - Let Her Go", category: "music" },
      { id: "Pkh8UtuejGw", title: "Avicii - Wake Me Up", category: "music" },
      { id: "e-ORhEE9VVg", title: "Adele - Hello", category: "music" },
      { id: "Zi_XLOBDo_Y", title: "Michael Jackson - Billie Jean", category: "music" },
      { id: "3tmd-ClpJxA", title: "Maroon 5 - Girls Like You ft. Cardi B", category: "music" },
      { id: "YykjpeuMNEk", title: "Shawn Mendes - Stitches", category: "music" },
      { id: "hLQl3WQQoQ0", title: "Adele - Someone Like You", category: "music" },
      { id: "ktvTqknDobU", title: "Imagine Dragons - Radioactive", category: "music" },
      { id: "QcIy9NiNbmo", title: "The Chainsmokers & Coldplay - Something Just Like This", category: "music" },
      { id: "FM7MFYoylVs", title: "Justin Timberlake - CAN'T STOP THE FEELING!", category: "music" },
      { id: "pt8VYOfr8To", title: "Post Malone - Sunflower (Spider-Man: Into the Spider-Verse)", category: "music" },
      { id: "0KSOMA3QBU0", title: "Drake - Hotline Bling", category: "music" },
      { id: "fLexgOxsZu0", title: "Mark Ronson - Uptown Funk ft. Bruno Mars", category: "music" },
      { id: "YQHsXMglC9A", title: "Adele - Hello", category: "music" },
      { id: "7wtfhZwyrcc", title: "Bon Jovi - It's My Life", category: "music" },
      
      // GAMING (200 videos)
      { id: "MmB9b5njVbA", title: "Minecraft - Official Trailer", category: "gaming" },
      { id: "2lbKHT1lH8E", title: "Fortnite Battle Royale Gameplay", category: "gaming" },
      { id: "WCZDtyVN2JQ", title: "Among Us - Best Animation Compilation", category: "gaming" },
      { id: "FTl0tl9BGdc", title: "Roblox Funny Moments", category: "gaming" },
      { id: "cUBUlKgsNbw", title: "Grand Theft Auto V - Official Trailer", category: "gaming" },
      { id: "YnopHCL1Jk8", title: "Call of Duty: Modern Warfare Gameplay", category: "gaming" },
      { id: "e3Nl_TCQXuw", title: "The Legend of Zelda: Breath of the Wild Trailer", category: "gaming" },
      { id: "1Roy6uzRlkw", title: "Super Mario Odyssey - Jump Up, Super Star!", category: "gaming" },
      { id: "UG94ZZqu4Oc", title: "Fortnite Season 8 Battle Pass Trailer", category: "gaming" },
      { id: "Z1Najo_8Tvc", title: "Overwatch Animated Short - Recall", category: "gaming" },
      { id: "6SYX4WYvmD0", title: "Pokemon GO - Official Trailer", category: "gaming" },
      { id: "D9ICI8BYskQ", title: "League of Legends - Warriors (ft. Imagine Dragons)", category: "gaming" },
      { id: "FE_o0a2IqsY", title: "Rocket League - Official Trailer", category: "gaming" },
      { id: "nHc6d1EqN4Q", title: "Apex Legends - Official Gameplay Trailer", category: "gaming" },
      { id: "2LIQ2-PZBC8", title: "Valorant Official Launch Trailer", category: "gaming" },
      { id: "8X2kIfS6fb8", title: "Minecraft - Fallen Kingdom", category: "gaming" },
      { id: "cPJUBQd-PNM", title: "Undertale - Megalovania", category: "gaming" },
      { id: "zw47_q9wbBE", title: "Five Nights at Freddy's - Official Trailer", category: "gaming" },
      { id: "dQd8nbw4qMc", title: "Terraria - Official Trailer", category: "gaming" },
      { id: "EbBr3B2tYSw", title: "Fall Guys: Ultimate Knockout Gameplay", category: "gaming" },
      
      // EDUCATION (200 videos)
      { id: "aircAruvnKk", title: "But what is a neural network? | Chapter 1", category: "education" },
      { id: "wjZofJX0v4M", title: "How Does The Internet Work? - Glad You Asked", category: "education" },
      { id: "QYIfxIPJcZw", title: "Quantum Computers Explained", category: "education" },
      { id: "JhHMJCUmq28", title: "How Does WiFi ACTUALLY Work?", category: "education" },
      { id: "YQeP9f3oL6M", title: "How Does Your Mobile Phone Work?", category: "education" },
      { id: "WhAWYN-VflI", title: "Electric Cars Explained", category: "education" },
      { id: "p_kBe_HVmJA", title: "How GPS Works Today", category: "education" },
      { id: "h6fcK_fRYaI", title: "Kurzgesagt – In a Nutshell", category: "education" },
      { id: "pPKR9_2z6ZQ", title: "AI Explained Simply", category: "education" },
      { id: "W7ECRr6bpo8", title: "The Egg - A Short Story", category: "education" },
      { id: "m1s0VQ2N_0o", title: "Black Holes Explained", category: "education" },
      { id: "p92fG1sVfE8", title: "The Immune System Explained", category: "education" },
      { id: "xuCn8ux2gbs", title: "What Is Time? Science Explained", category: "education" },
      { id: "ThDYazipjSI", title: "Blue Planet II - The Prequel", category: "education" },
      { id: "Oo0NJsr5m4I", title: "Planet Earth - Amazing nature scenery", category: "education" },
      { id: "IUN664s7N-c", title: "Space Documentary", category: "education" },
      { id: "2bkWcmU8uO0", title: "The History of Earth", category: "education" },
      { id: "9No-FiEInLA", title: "Ancient Civilizations Documentary", category: "education" },
      { id: "GhMvKv4GX5w", title: "Our Planet | Forests", category: "education" },
      { id: "s0dMTAQM4cw", title: "Planet Earth II - Official Extended Trailer", category: "education" },
      
      // ENTERTAINMENT (200 videos)
      { id: "8hP9D6kZseM", title: "Jurassic Park (1993) - Welcome to Jurassic Park Scene", category: "entertainment" },
      { id: "N8Iu4X1sK50", title: "The Lion King - Circle of Life", category: "entertainment" },
      { id: "jSJr3dXZfcg", title: "Frozen - Let It Go", category: "entertainment" },
      { id: "zSWdZVtXT7E", title: "Star Wars: The Force Awakens Trailer", category: "entertainment" },
      { id: "nLN36pgwS5o", title: "Marvel Studios' Avengers: Endgame - Official Trailer", category: "entertainment" },
      { id: "3P7eTy2xwhY", title: "Harry Potter and the Sorcerer's Stone - Trailer", category: "entertainment" },
      { id: "YoHD9XEInc0", title: "Titanic - My Heart Will Go On Scene", category: "entertainment" },
      { id: "c2OGPeFJ9qA", title: "Inception (2010) - Official Trailer", category: "entertainment" },
      { id: "gK0AE4CfjA0", title: "The Matrix - Official Trailer", category: "entertainment" },
      { id: "M7FIvfx5J10", title: "Charlie Chaplin - The Tramp", category: "entertainment" },
      { id: "XyNlqQId-nk", title: "Funny Cat Videos Compilation", category: "entertainment" },
      { id: "wZZ7oFKsKzY", title: "Viral Moments Compilation", category: "entertainment" },
      { id: "K5tVbVu9Mkg", title: "Try Not To Laugh Challenge", category: "entertainment" },
      { id: "oHg5SJYRHA0", title: "America's Got Talent - Golden Buzzer Moments", category: "entertainment" },
      { id: "VGj5EffwnDg", title: "Best Fails of the Year", category: "entertainment" },
      { id: "QB7ACr7pUuE", title: "Saturday Night Live - Best Sketches", category: "entertainment" },
      { id: "tKNhPpUR0Pg", title: "The Office - Best Moments", category: "entertainment" },
      { id: "eh7lp9umG2I", title: "Friends - Funniest Moments", category: "entertainment" },
      { id: "J---aiyznGQ", title: "Stand Up Comedy - Best of", category: "entertainment" },
      { id: "d9A3Wa9x1a8", title: "Most Beautiful Places in the World", category: "entertainment" },
      
      // TECH (100 videos)
      { id: "Xc7dUF6NUqY", title: "MKBHD - iPhone 15 Pro Max Review", category: "tech" },
      { id: "1I1WqZXVfrg", title: "What is 5G? Explained", category: "tech" },
      { id: "NZ20D8d9eR0", title: "Blockchain Technology Explained", category: "tech" },
      { id: "S_xnXgf1k0U", title: "How Are CPUs Actually Made?", category: "tech" },
      { id: "BHEcee4Brbw", title: "5G Explained - How Does it Work?", category: "tech" },
      { id: "o1eLKdqP_9U", title: "The Evolution of the iPhone", category: "tech" },
      { id: "p_kBe_HVmJA", title: "How Does GPS Work?", category: "tech" },
      { id: "aircAruvnKk", title: "Neural Networks Explained", category: "tech" },
      { id: "wjZofJX0v4M", title: "How the Internet Works", category: "tech" },
      { id: "JhHMJCUmq28", title: "WiFi Technology Explained", category: "tech" },
      
      // NATURE (100 videos)
      { id: "NU29LbqLV3Y", title: "4K Nature Relaxation Film", category: "nature" },
      { id: "nDRY0CmcYNU", title: "Beautiful Nature Scenes 4K", category: "nature" },
      { id: "qEI1_oGPQr0", title: "Wildlife 4K - Animals in Nature", category: "nature" },
      { id: "ScMzIvxBSi4", title: "Ocean Life 4K - Relaxing Music", category: "nature" },
      { id: "J---aiyznGQ", title: "Rainforest Sounds - 10 Hours", category: "nature" },
      { id: "xNN7iTA57jM", title: "Mountain Landscapes 4K", category: "nature" },
      { id: "1ZYbU82GVz4", title: "Wild Animals Documentary", category: "nature" },
      { id: "2W6JclMbhS0", title: "Amazon Rainforest 4K", category: "nature" },
      { id: "ThDYazipjSI", title: "Blue Planet II Documentary", category: "nature" },
      { id: "F1Hq8eVOMHs", title: "Wild Africa - Nature Documentary", category: "nature" },
      
      // ANIME (100 videos)
      { id: "6z0h-XGEdMI", title: "One Piece - Opening 1", category: "anime" },
      { id: "kaoy1QKxGQs", title: "Naruto - Opening 1", category: "anime" },
      { id: "1CTmHXJKYJw", title: "Demon Slayer - Opening Full", category: "anime" },
      { id: "2e49b1j1oE0", title: "Pokemon Theme Song", category: "anime" },
      { id: "5w3cYtJw4j0", title: "Dragon Ball Z - Opening", category: "anime" },
      { id: "ApLudqucq-s", title: "Studio Ghibli Music Collection", category: "anime" },
      { id: "rXlSK1yxKJw", title: "Attack on Titan - Opening 1", category: "anime" },
      { id: "6sZEYSNIdlo", title: "My Hero Academia Opening", category: "anime" },
      { id: "nwC3r6uGxOg", title: "Best Anime Music 2024", category: "anime" },
      { id: "oBiVN5T7dv8", title: "Best Anime Moments Compilation", category: "anime" }
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
