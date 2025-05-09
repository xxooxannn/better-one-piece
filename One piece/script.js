document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen Animation
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    
    // Create a typing effect for the loading text
    if (loadingText) {
      const text = "SET SAIL TO GRAND LINE...";
      loadingText.textContent = ""; // Clear the text
      
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          loadingText.textContent += text.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    }
    
    // Hide loading screen after content loads
    window.addEventListener('load', () => {
      // Keep loading screen visible for at least 2 seconds for effect
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.classList.add('loading-hidden');
          
          // After transition completes, remove from DOM
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 800); // Match the transition duration
        }
      }, 2000);
    });
    
    // Fallback - if for some reason load event doesn't fire
    setTimeout(() => {
      if (loadingScreen && !loadingScreen.classList.contains('loading-hidden')) {
        loadingScreen.classList.add('loading-hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 800);
      }
    }, 5000); // 5 second fallback
  
    // 🔧 Feather icons init - Handles static icons like hamburger and close 'x'
    feather.replace();
  
    // --- Music Toggle (From Boss) ---
    const audioPlayer    = document.getElementById('background-audio');
    const musicBtn       = document.getElementById('music-toggle-button');
    const playIcon       = document.getElementById('music-playing-icon'); // Animated bars SVG
    const muteIcon       = document.getElementById('music-muted-icon');   // Inline mute SVG
  
    function updateMusicIcons() {
      if (!audioPlayer || !playIcon || !muteIcon) return; // Guard clause
      if (audioPlayer.muted || audioPlayer.paused) {
        playIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
      } else {
        playIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
      }
    }
  
    if (musicBtn && audioPlayer) {
      musicBtn.addEventListener('click', () => {
        audioPlayer.muted = !audioPlayer.muted;
        if (!audioPlayer.muted && audioPlayer.paused) { // If unmuting and it was paused, try to play
          audioPlayer.play().catch(e => console.warn('Play after unmute prevented:', e));
        } else if (audioPlayer.muted && !audioPlayer.paused){ // If muting and it was playing
          // audioPlayer.pause(); // Optional: pause when muting
        }
        updateMusicIcons();
      });
  
      // Initial state handling for audio
      // Attempt to play. updateMusicIcons will be called in both success and failure (catch)
      audioPlayer.play()
        .then(() => {
            // console.log("Audio autoplay successful.");
            updateMusicIcons();
        })
        .catch(e => {
          // console.warn('Initial autoplay prevented:', e);
          // Even if autoplay fails, icons should reflect current (likely paused/muted) state
          updateMusicIcons();
        });
  
      // Keep icons in sync with player state changes
      ['play','pause','volumechange','ended'].forEach(ev =>
        audioPlayer.addEventListener(ev, updateMusicIcons)
      );
    }
  
    // --- Hamburger Menu (From Boss) ---
    const hambBtn = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');
    const closeBtn = document.getElementById('close-menu-button');
    const bodyEl = document.body;
  
    // Check if these elements exist to avoid null reference errors
    if (hambBtn && mainNav && closeBtn) {
      // Log that we found the elements for debugging
      console.log('Menu elements found:', { hambBtn, mainNav, closeBtn });
      
      const openMenu = () => {
        console.log('Opening menu');
        mainNav.classList.add('menu-active');
        bodyEl.classList.add('menu-open-no-scroll');
        
        // Force style changes to take effect immediately
        mainNav.style.transform = 'translateX(0)';
        mainNav.style.webkitTransform = 'translateX(0)';
        mainNav.style.opacity = '1';
        mainNav.style.visibility = 'visible';
        mainNav.style.display = 'flex';
      };
      
      const closeMenu = () => {
        console.log('Closing menu');
        mainNav.classList.remove('menu-active');
        bodyEl.classList.remove('menu-open-no-scroll');
        
        // Reset inline styles
        setTimeout(() => {
          if (!mainNav.classList.contains('menu-active')) {
            mainNav.style.transform = '';
            mainNav.style.webkitTransform = '';
          }
        }, 300); // Match transition duration
      };
      
      // Hamburger button click handler
      hambBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Hamburger button clicked');
        openMenu();
      });
      
      // Also add touch event for mobile
      hambBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log('Hamburger button touched');
        openMenu();
      }, { passive: false });
      
      // Close button click handler
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
      });
      
      // Close button touch handler
      closeBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        closeMenu();
      }, { passive: false });
      
      // Close menu when clicking on internal links
      mainNav.querySelectorAll('a[href^="#"], a[href^="/"]').forEach(link => {
        link.addEventListener('click', () => {
          if (mainNav.classList.contains('menu-active')) closeMenu();
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', e => {
        if (
          mainNav.classList.contains('menu-active') &&
          !e.target.closest('#main-nav') &&
          !e.target.closest('#hamburger-button')
        ) {
          closeMenu();
        }
      });
      
      document.addEventListener('touchstart', e => {
        if (
          mainNav.classList.contains('menu-active') &&
          !e.target.closest('#main-nav') &&
          !e.target.closest('#hamburger-button')
        ) {
          closeMenu();
        }
      }, { passive: false });
    } else {
      console.error('Menu elements not found:', { hambBtn, mainNav, closeBtn });
    }
  
    // --- Character Links & Animations (Your Existing Code) ---
      const characterLinksData = [
          { heading: "Luffy", subheading: "Captain", imgSrc: "./img-video-music/luffy.png", href: "#luffy-bio" },
          { heading: "Zoro", subheading: "Swordsman", imgSrc: "./img-video-music/zoro.jpg", href: "#zoro-bio" },
          { heading: "Nami", subheading: "Navigator", imgSrc: "./img-video-music/nami.jpg", href: "#nami-bio" },
          { heading: "Usopp", subheading: "Sniper", imgSrc: "./img-video-music/usopp.webp", href: "#usopp-bio" },
          { heading: "Sanji", subheading: "Cook", imgSrc: "./img-video-music/sanji.jpg", href: "#sanji-bio" },
          { heading: "Chopper", subheading: "Doctor", imgSrc: "./img-video-music/chopper.png", href: "#chopper-bio" },
          { heading: "Robin", subheading: "Archaeologist", imgSrc: "./img-video-music/robin.jpg", href: "#robin-bio" },
          { heading: "Franky", subheading: "Shipwright", imgSrc: "./img-video-music/franky.png", href: "#franky-bio" },
          { heading: "Brook", subheading: "Musician", imgSrc: "./img-video-music/brook.jpg", href: "#brook-bio" },
          { heading: "Jinbei", subheading: "Helmsman", imgSrc: "./img-video-music/jinbei.jpg", href: "#jinbei-bio" }
      ];
      
      const linksContainer = document.getElementById('links-container');
      
      if (linksContainer) {
          characterLinksData.forEach(linkData => {
              const linkElement = createCharacterLinkElement(linkData);
              linksContainer.appendChild(linkElement);
          });
      }
      
      function createCharacterLinkElement({ heading, subheading, imgSrc, href }) {
          const link = document.createElement('div');
          link.className = 'group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8';
          const contentDiv = document.createElement('div');
          const headingSpan = document.createElement('div');
          headingSpan.className = 'relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl';
          const wordWrapper = document.createElement('span');
          wordWrapper.className = 'inline-block';
          heading.split('').forEach((letter) => {
              const letterSpan = document.createElement('span');
              letterSpan.className = 'letter-span';
              letterSpan.textContent = letter;
              wordWrapper.appendChild(letterSpan);
          });
          headingSpan.appendChild(wordWrapper);
          const subheadingSpan = document.createElement('span');
          subheadingSpan.className = 'relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50';
          subheadingSpan.textContent = subheading;
          contentDiv.appendChild(headingSpan);
          contentDiv.appendChild(subheadingSpan);
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = `Image representing ${heading}`;
          img.className = 'absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64';
          Object.assign(img.style, {
              transform: 'translate(-50%, -50%) rotate(-12.5deg)',
              scale: '0',
              top: '50%',
              left: '50%',
              transition: 'transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1), scale 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)'
          });
          const iconDiv = document.createElement('div');
          iconDiv.className = 'relative z-10 p-4';
          // This dynamically adds a feather icon
          iconDiv.innerHTML = '<i data-feather="star" class="text-5xl text-neutral-50"></i>'; 
          
          Object.assign(iconDiv.style, {
              transform: 'translateX(25%)',
              opacity: '0',
              transition: 'transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1), opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)'
          });
          link.appendChild(contentDiv);
          link.appendChild(img);
          link.appendChild(iconDiv);
          let isHovered = false;
          link.addEventListener('mousemove', (e) => {
              const rect = link.getBoundingClientRect();
              const xPct = (e.clientX - rect.left) / rect.width - 0.5;
              const yPct = (e.clientY - rect.top) / rect.height - 0.5;
              img.style.top = `${50 + (yPct * -10)}%`;
              img.style.left = `${65 + (xPct * 5)}%`;
          });
          link.addEventListener('mouseenter', () => {
              isHovered = true;
              Object.assign(img.style, { scale: '1', transform: 'translate(-50%, -50%) rotate(12.5deg)' });
              Object.assign(iconDiv.style, { transform: 'translateX(0%)', opacity: '1' });
              const letters = headingSpan.querySelectorAll('.letter-span');
              letters.forEach((letter, i) => {
                  clearTimeout(letter.animationTimeout);
                  letter.animationTimeout = setTimeout(() => {
                      if (isHovered) letter.style.transform = 'translateX(10px)';
                  }, i * 50 + 150);
              });
          });
          link.addEventListener('mouseleave', () => {
              isHovered = false;
              Object.assign(img.style, { scale: '0', transform: 'translate(-50%, -50%) rotate(-12.5deg)' });
              Object.assign(iconDiv.style, { transform: 'translateX(25%)', opacity: '0' });
              const letters = headingSpan.querySelectorAll('.letter-span');
              letters.forEach(letter => {
                  clearTimeout(letter.animationTimeout);
                  letter.style.transform = 'translateX(0)';
              });
          });
          const wrapper = document.createElement('a');
          wrapper.href = href;
          wrapper.className = 'block w-full';
          wrapper.appendChild(link);
          return wrapper;
      }
  
    // --- Navbar Link Animations (Your Existing Code) ---
      const navInteractiveLinks = document.querySelectorAll('.nav-link-interactive');
  
      navInteractiveLinks.forEach(link => {
          const originalText = link.textContent.trim();
          if (originalText === "") return; 
          
          link.innerHTML = ''; 
  
          originalText.split('').forEach(char => {
              const span = document.createElement('span');
              span.className = 'letter-span';
              span.textContent = char;
              link.appendChild(span);
          });
  
          let isNavLinkHovered = false;
          const letters = link.querySelectorAll('.letter-span');
  
          link.addEventListener('mouseenter', () => {
              isNavLinkHovered = true;
              letters.forEach((letter, i) => {
                  clearTimeout(letter.animationTimeout);
                  letter.animationTimeout = setTimeout(() => {
                      if (isNavLinkHovered) {
                          letter.style.transform = 'translateY(3px) translateX(1px)';
                      }
                  }, i * 40);
              });
          });
  
          link.addEventListener('mouseleave', () => {
              isNavLinkHovered = false;
              letters.forEach(letter => {
                  clearTimeout(letter.animationTimeout);
                  letter.style.transform = 'translateY(0) translateX(0)';
  });
          });
      });
  
    // 🔧 Feather icons re-init for dynamically added content (like character stars)
    setTimeout(() => feather.replace(), 100); // This is good for the stars
  });