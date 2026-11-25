/**
 * AXE FILMS — MASTER FRONTEND ORCHESTRATOR
 * High-performance Lenis smooth scroll, accurate project media & previews,
 * and inertial magnetic physics.
 */

// 1. AUTHENTIC PROJECT DATA STORE — 100% ACCURATE ASSETS & MEDIA
const AXE_PROJECTS = [
  {
    id: 'prestige',
    title: 'Prestige Couture',
    client: 'Prestige Menswear',
    category: 'couture',
    categoryLabel: 'Fashion & Couture Campaign',
    year: '2025',
    thumbnail: 'preview_prestige.jpg',
    orientation: 'vertical',
    previewTag: '9:16 HIGH COUTURE REEL',
    headline: 'Redefining Eastern Bridal Couture with Obsidian & Gold Cinema',
    challenge: 'Prestige required a high-fashion, mood-drenched campaign for their hand-embroidered sherwani collection that elevated the brand from local retail to international editorial stature.',
    pivot: 'Rather than standard flat catalog photography, we built a dramatic Caravaggio-inspired lighting rig with deep obsidian shadows and warm tungsten rim highlights. Every frame was crafted like a high-end period film still.',
    result: '11 viral reels across Instagram, full editorial lookbook utilized for flagship campaign launch.',
    stills: [
      'preview_prestige.jpg',
      'Prestige/Images/IMG_2912.JPG',
      'Prestige/Images/IMG_2915.JPG',
      'Prestige/Images/IMG_2920.JPG',
      'Prestige/Images/IMG_2928.JPG'
    ],
    videoRef: 'Prestige/Reels/Reel 01. Manan Black.mp4'
  },
  {
    id: 'elclassico',
    title: 'El Classico',
    client: 'El Classico Food & Coffee',
    category: 'brand',
    categoryLabel: 'Cinematic Brand Film',
    year: '2024',
    thumbnail: 'preview_elclassico.jpg',
    orientation: 'horizontal',
    previewTag: '4K CINEMATIC BRAND SCENE',
    headline: 'We Turned Down the Brief: Shot a Scene Instead',
    challenge: 'El Classico asked for a standard interior walkthrough of their flagship restaurant and coffee branch to showcase seating and lighting.',
    pivot: 'We refused the walkthrough. Walkthroughs are forgotten in 2 seconds. Instead, we wrote and filmed a moody, atmospheric cinematic scene capturing an authentic evening encounter inside the space. The space became the living backdrop.',
    result: 'Became the most shared hospitality video in the region; transformed the branch into a cultural evening destination.',
    stills: [
      'preview_elclassico.jpg'
    ],
    videoRef: 'Elclassico/elclassico.mp4'
  },
  {
    id: 'fun-forest',
    title: 'Fun Forest Multan',
    client: 'Fun Forest Entertainment',
    category: 'commercials',
    categoryLabel: 'Commercial & Sound Design',
    year: '2024',
    thumbnail: 'preview_funforest.jpg',
    orientation: 'horizontal',
    previewTag: 'POV ACTION · DIEGETIC SOUND',
    headline: 'The Karting Was Not Selling — Sound Over Music',
    challenge: 'Their previous karting promo had no energy, and footfall at the track was declining. The brief asked for another montage over generic upbeat music.',
    pivot: 'We banned the music track completely. We mounted cameras directly onto the go-kart chassis and drove them at race speeds ourselves. The entire film was cut to raw diegetic sound design: tire screech, engine revs, and helmet breathing.',
    result: 'Kart ticket sales spiked within 72 hours; customers walked in explicitly quoting the reel at the ticket counter.',
    stills: [
      'preview_funforest.jpg'
    ],
    videoRef: 'Fun Forest.mp4'
  },
  {
    id: 'aura',
    title: 'AURA Grooming',
    client: 'AURA Studio & Lounge',
    category: 'brand',
    categoryLabel: 'Lifestyle & Social Movement',
    year: '2025',
    thumbnail: 'preview_aura.jpg',
    orientation: 'vertical',
    previewTag: '17 DIGITAL REELS · LUXURY GROOMING',
    headline: 'Visual Identity in Motion for Modern Male Grooming',
    challenge: 'Establishing AURA as Pakistan\'s premier luxury grooming lounge with high-profile celebrity and influencer clientele.',
    pivot: 'A 17-part short-form cinematic series emphasizing tactile craftsmanship: razor glides, steam, precision scissor cuts, and candid character vignettes inside the studio.',
    result: 'Massive organic engagement, driving fully booked VIP chair appointments across Multan and Islamabad.',
    stills: [
      'preview_aura.jpg',
      'AURA_still_2.jpg',
      'AURA_still_3.jpg'
    ],
    videoRef: 'AURA x Groom.mp4'
  },
  {
    id: 'auor',
    title: 'AUOR Supermarket',
    client: 'AUOR Retail Corporation',
    category: 'commercials',
    categoryLabel: 'Commercial Launch Campaign',
    year: '2024',
    thumbnail: 'preview_auor.jpg',
    orientation: 'vertical',
    previewTag: 'GRAND OPENING · DATE NIGHT SERIES',
    headline: 'From Grocery Run to "Date Night with AUOR"',
    challenge: 'Breaking through the noise of discount supermarket advertising with a fresh emotional angle.',
    pivot: 'Conceived the "Date Night with AUOR" narrative series, highlighting late-night culinary adventures, premium gourmet aisles, and human intimacy.',
    result: 'Packed grand opening launch weekend and record brand recall.',
    stills: [
      'preview_auor.jpg',
      'AUOR_still_2.jpg',
      'AUOR_still_3.jpg'
    ],
    videoRef: 'AUOR Supermarket/AUOR Grand Opening Revised.mp4'
  },
  {
    id: 'hashmi',
    title: 'Hashmi Eye Centre',
    client: 'Hashmi Medical & Laser Eye Centre',
    category: 'case',
    categoryLabel: 'Healthcare & Precision Film',
    year: '2024',
    thumbnail: 'preview_hashmi.jpg',
    orientation: 'vertical',
    previewTag: 'OPHTHALMIC MICROSURGERY · HUMAN STORY',
    headline: 'The Science of Vision: Precision Meets Human Vulnerability',
    challenge: 'Medical videos are often clinical, sterile, and intimidating for prospective patients.',
    pivot: 'Framed ophthalmic microsurgery as an art form: ultra-macro optics, warm natural lighting, and Dr. Safdar Hashmi\'s emotional patient journeys before and after sight restoration.',
    result: 'Overwhelming patient trust and widespread institutional recognition.',
    stills: [
      'preview_hashmi.jpg',
      'Hashmi_still_2.jpg',
      'Hashmi_still_3.jpg'
    ],
    videoRef: 'Hashmi Eye Centre.mp4'
  }
];

class AxeFilmsApp {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.loaderCount = document.querySelector('.loader-count');
    this.loaderBarFill = document.querySelector('.loader-bar-fill');
    this.cursorDot = document.querySelector('.cursor-dot');
    this.cursorFollower = document.querySelector('.cursor-follower');
    this.worksContainer = document.getElementById('works-list-container');
    this.hoverPreview = document.querySelector('.hover-preview-card');
    this.theaterModal = document.getElementById('theater-modal');
    this.theaterVideo = document.getElementById('theater-video-element');
    this.theaterVideoSource = document.getElementById('theater-video-source');
    this.theaterTitleText = document.getElementById('theater-title-text');
    this.projectDrawerModal = document.getElementById('project-drawer-modal');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.fstopSlider = document.getElementById('fstop-slider');
    this.fstopReadout = document.getElementById('fstop-readout');
    this.heroBgVideo = document.querySelector('.hero-bg-video');

    // Smooth Cursor Physics
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.prevMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.cursorVelocity = { x: 0, y: 0 };

    this.lenis = null;
    this.init();
  }

  init() {
    this.setupLenisSmoothScroll();
    this.startAssetLoadingSequence();
    this.setupMagneticCursor();
    this.renderWorksList(AXE_PROJECTS);
    this.setupWorksFilter();
    this.setupInteractiveHoverPreview();
    this.setupApertureSimulator();
    this.setupInlineCaseStudyVideos();
    this.setupVerticalReelHoverPreview();
    this.setupInertialLookbookScroll();
    this.setupTheaterModal();
    this.setupSoundToggle();
    this.setupCommissionForm();
    this.setupHeaderScroll();
    this.startLiveStudioClock();
  }

  // A. LENIS BUTTERY SMOOTH SCROLL (SYNCED TO THREE.JS & GPU PAUSE)
  setupLenisSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0
      });

      // Synchronize Lenis scroll with Three.js and Hero background video
      this.lenis.on('scroll', (e) => {
        if (window.axeThree) {
          window.axeThree.setScrollProgress(e.progress);
        }

        // Pause hero background video when scrolled offscreen to conserve CPU/GPU
        if (this.heroBgVideo) {
          if (e.scroll > window.innerHeight * 1.1) {
            if (!this.heroBgVideo.paused) this.heroBgVideo.pause();
          } else {
            if (this.heroBgVideo.paused) this.heroBgVideo.play().catch(() => {});
          }
        }
      });

      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  // B. ASSET LOADING SEQUENCE & 3D APERTURE REVEAL
  startAssetLoadingSequence() {
    const criticalAssets = [
      'preview_aura.jpg',
      'preview_auor.jpg',
      'preview_hashmi.jpg',
      'preview_funforest.jpg',
      'preview_elclassico.jpg',
      'preview_prestige.jpg'
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length + 2;
    let displayProgress = 0;

    const progressInterval = setInterval(() => {
      const targetProgress = Math.min(Math.round((loadedCount / totalAssets) * 100), 100);
      
      if (displayProgress < targetProgress) {
        displayProgress += 1;
        if (this.loaderCount) this.loaderCount.textContent = String(displayProgress).padStart(2, '0');
        if (this.loaderBarFill) this.loaderBarFill.style.width = `${displayProgress}%`;
      }

      if (displayProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => this.revealWebsite(), 300);
      }
    }, 16);

    criticalAssets.forEach((src) => {
      const img = new Image();
      img.onload = () => { loadedCount++; };
      img.onerror = () => { loadedCount++; };
      img.src = src;
    });

    if (document.fonts) {
      document.fonts.ready.then(() => { loadedCount++; }).catch(() => { loadedCount++; });
    } else {
      loadedCount++;
    }

    setTimeout(() => { loadedCount++; }, 300);
    setTimeout(() => { loadedCount = totalAssets; }, 2800);
  }

  revealWebsite() {
    if (window.soundEngine) window.soundEngine.playWhoosh();
    if (window.axeThree) window.axeThree.triggerOpeningSequence();
    if (this.preloader) this.preloader.classList.add('loaded');

    const heroElements = document.querySelectorAll('.hero-badge, .hero-title .title-row, .hero-footer-row');
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translate3d(0, 30px, 0)';
      el.style.transition = `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${0.12 + index * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translate3d(0, 0, 0)';
      }, 50);
    });
  }

  // C. HIGH-PERFORMANCE INERTIAL MAGNETIC CURSOR
  setupMagneticCursor() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
      }
    }, { passive: true });

    const updateCursorFollower = () => {
      this.cursorVelocity.x = this.mouse.x - this.prevMouse.x;
      this.cursorVelocity.y = this.mouse.y - this.prevMouse.y;
      this.prevMouse.x = this.mouse.x;
      this.prevMouse.y = this.mouse.y;

      const speed = Math.hypot(this.cursorVelocity.x, this.cursorVelocity.y);
      const angle = Math.atan2(this.cursorVelocity.y, this.cursorVelocity.x);

      this.cursor.x += (this.mouse.x - this.cursor.x) * 0.2;
      this.cursor.y += (this.mouse.y - this.cursor.y) * 0.2;

      if (this.cursorFollower) {
        const scaleX = 1 + Math.min(speed * 0.012, 0.45);
        const scaleY = 1 - Math.min(speed * 0.01, 0.3);
        this.cursorFollower.style.transform = `translate3d(${this.cursor.x}px, ${this.cursor.y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
      }

      requestAnimationFrame(updateCursorFollower);
    };
    requestAnimationFrame(updateCursorFollower);

    // Magnetic Attraction
    const magneticElements = document.querySelectorAll('.hero-play-reel-btn, .cta-header-btn, .filter-btn, .submit-commission-btn, .case-play-btn, .sound-toggle-btn');
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.25;
        const dy = (e.clientY - centerY) * 0.25;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }, { passive: true });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0, 0, 0)';
      });
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .work-row, .lookbook-photo-card, .reel-card, .scope-pill, .case-video-box');
      if (target) {
        if (target.classList.contains('work-row') || target.classList.contains('lookbook-photo-card')) {
          this.cursorFollower.classList.add('hover-interactive');
          this.cursorFollower.textContent = 'EXPLORE';
        } else if (target.classList.contains('hero-play-reel-btn') || target.classList.contains('case-video-box') || target.classList.contains('reel-card')) {
          this.cursorFollower.classList.add('hover-interactive');
          this.cursorFollower.textContent = 'PLAY';
        } else {
          this.cursorFollower.classList.add('hover-link');
          this.cursorFollower.textContent = '';
        }
        if (window.soundEngine) window.soundEngine.playHoverBlip();
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, .work-row, .lookbook-photo-card, .reel-card, .scope-pill, .case-video-box');
      if (target && this.cursorFollower) {
        this.cursorFollower.classList.remove('hover-interactive', 'hover-link');
        this.cursorFollower.textContent = '';
      }
    });
  }

  // D. RENDER WORKS LIST & FILTER
  renderWorksList(projects) {
    if (!this.worksContainer) return;
    this.worksContainer.innerHTML = '';

    projects.forEach((proj, idx) => {
      const row = document.createElement('div');
      row.className = 'work-row';
      row.dataset.id = proj.id;
      row.dataset.category = proj.category;
      row.dataset.thumbnail = proj.thumbnail;
      row.dataset.video = proj.videoRef;
      row.dataset.orientation = proj.orientation || 'horizontal';
      row.dataset.tag = proj.previewTag;

      row.innerHTML = `
        <span class="work-index">0${idx + 1}</span>
        <h3 class="work-name">${proj.title}</h3>
        <span class="work-category">${proj.categoryLabel}</span>
        <span class="work-meta-tag">${proj.year}</span>
        <div class="work-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      `;

      row.addEventListener('click', () => {
        this.openProjectDrawer(proj);
      });

      this.worksContainer.appendChild(row);
    });
  }

  setupWorksFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        if (filter === 'all') {
          this.renderWorksList(AXE_PROJECTS);
        } else {
          const filtered = AXE_PROJECTS.filter((p) => p.category === filter);
          this.renderWorksList(filtered);
        }

        if (window.soundEngine) window.soundEngine.playShutter();
      });
    });
  }

  // E. MELON.STUDIO SIGNATURE FLOATING HOVER PREVIEW (VIDEO + KEYFRAME REVEAL)
  setupInteractiveHoverPreview() {
    if (!this.hoverPreview) return;
    const previewImg = this.hoverPreview.querySelector('img');
    const previewVideo = this.hoverPreview.querySelector('video');
    const previewTag = this.hoverPreview.querySelector('.preview-tag');

    let previewPos = { x: 0, y: 0 };
    let currentVideoSrc = '';

    document.addEventListener('mousemove', (e) => {
      previewPos.x += (e.clientX + 30 - previewPos.x) * 0.25;
      previewPos.y += (e.clientY - 120 - previewPos.y) * 0.25;

      this.hoverPreview.style.transform = `translate3d(${previewPos.x}px, ${previewPos.y}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    document.addEventListener('mouseover', (e) => {
      const row = e.target.closest('.work-row');
      if (row && this.hoverPreview) {
        const thumb = row.dataset.thumbnail;
        const video = row.dataset.video;
        const tag = row.dataset.tag;
        const orientation = row.dataset.orientation;

        // Adaptive Aspect Ratio: 9:16 vertical reel vs 16:9 cinema
        if (orientation === 'vertical') {
          this.hoverPreview.classList.add('format-vertical');
        } else {
          this.hoverPreview.classList.remove('format-vertical');
        }

        if (previewImg && thumb) {
          previewImg.src = thumb;
        }
        if (previewTag && tag) {
          previewTag.textContent = tag;
        }

        if (previewVideo && video) {
          if (currentVideoSrc !== video) {
            currentVideoSrc = video;
            previewVideo.src = video;
          }
          previewVideo.currentTime = 0;
          previewVideo.play()
            .then(() => {
              previewVideo.classList.add('is-playing');
            })
            .catch(() => {});
        }

        this.hoverPreview.classList.add('visible');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const row = e.target.closest('.work-row');
      if (row && this.hoverPreview) {
        if (previewVideo) {
          previewVideo.pause();
          previewVideo.classList.remove('is-playing');
        }
        this.hoverPreview.classList.remove('visible');
      }
    });

    const worksSec = document.querySelector('.works-section');
    if (worksSec) {
      worksSec.addEventListener('mouseleave', () => {
        if (previewVideo) {
          previewVideo.pause();
          previewVideo.classList.remove('is-playing');
        }
        this.hoverPreview.classList.remove('visible');
      });
    }
  }

  // F. ACCURATE INLINE VIDEO PLAYERS FOR CASE STUDIES
  setupInlineCaseStudyVideos() {
    const caseBoxes = document.querySelectorAll('.case-video-box');
    caseBoxes.forEach((box) => {
      const video = box.querySelector('video');
      const trigger = box.querySelector('.case-video-overlay-trigger');

      if (video && trigger) {
        trigger.addEventListener('click', () => {
          if (video.paused) {
            document.querySelectorAll('video').forEach((v) => {
              if (v !== video && !v.classList.contains('hero-bg-video')) v.pause();
            });
            video.play().catch(() => {});
            box.classList.add('playing');
            if (window.soundEngine) window.soundEngine.playShutter();
          } else {
            video.pause();
            box.classList.remove('playing');
          }
        });

        video.addEventListener('ended', () => {
          box.classList.remove('playing');
        });
      }
    });
  }

  // G. VERTICAL 9:16 REEL HOVER PREVIEWS
  setupVerticalReelHoverPreview() {
    const reelCards = document.querySelectorAll('.reel-card');
    reelCards.forEach((card) => {
      const video = card.querySelector('.reel-video');
      if (!video) return;

      card.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
      });

      card.addEventListener('click', () => {
        const videoSrc = card.dataset.video;
        const title = card.querySelector('.reel-title')?.textContent || 'PRESTIGE COUTURE REEL';
        this.openTheaterWithFilm(videoSrc, title);
      });
    });
  }

  // H. INERTIAL HORIZONTAL DRAG-TO-SCROLL LOOKBOOK
  setupInertialLookbookScroll() {
    const container = document.getElementById('lookbook-strip-container');
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('is-dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('is-dragging');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('is-dragging');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.8;
      container.scrollLeft = scrollLeft - walk;
    });
  }

  // I. THEATER SHOWREEL MODAL & MULTI-FILM SWITCHER
  setupTheaterModal() {
    const playBtns = document.querySelectorAll('.hero-play-reel-btn, .open-showreel-action');
    const closeBtn = document.getElementById('theater-close-btn');

    playBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openTheaterWithFilm('Fun Forest.mp4', 'FUN FOREST MULTAN · COMMERCIAL SOUND DESIGN');
      });
    });

    const channelBtns = document.querySelectorAll('.playlist-channel-btn');
    channelBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        channelBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const src = btn.dataset.src;
        const title = btn.dataset.title;
        this.switchTheaterVideo(src, title);
      });
    });

    const closeModal = () => {
      if (this.theaterModal) {
        this.theaterModal.classList.remove('active');
        document.body.style.overflow = '';
        if (this.theaterVideo) this.theaterVideo.pause();
        if (window.soundEngine) window.soundEngine.playShutter();
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        this.closeProjectDrawer();
      }
    });
  }

  openTheaterWithFilm(src, title) {
    if (!this.theaterModal) return;
    this.switchTheaterVideo(src, title);
    this.theaterModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.soundEngine) window.soundEngine.playWhoosh();
  }

  switchTheaterVideo(src, title) {
    if (this.theaterTitleText) this.theaterTitleText.textContent = `AXE FILMS · ${title}`;
    if (this.theaterVideoSource && this.theaterVideo) {
      this.theaterVideoSource.src = src;
      this.theaterVideo.load();
      this.theaterVideo.play().catch(() => {});
    }
  }

  // J. PROJECT DETAIL DRAWER WITH EMBEDDED CINEMA VIDEO
  openProjectDrawer(proj) {
    if (!this.projectDrawerModal) return;
    if (window.soundEngine) window.soundEngine.playWhoosh();

    const drawerBody = this.projectDrawerModal.querySelector('.drawer-body-content');
    if (drawerBody) {
      drawerBody.innerHTML = `
        <div class="drawer-header-row" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2.5rem; border-bottom:1px solid var(--color-border); padding-bottom:1.5rem;">
          <div>
            <span class="case-subtitle">${proj.client} · ${proj.year}</span>
            <h2 class="case-headline" style="font-size:2.8rem; margin-bottom:0.5rem;">${proj.title}</h2>
            <p style="font-family:var(--font-accent); color:var(--color-crimson-bright); font-size:1.1rem;">"${proj.headline}"</p>
          </div>
          <button class="theater-close-btn" id="close-drawer-btn" style="font-size:1rem; cursor:pointer;">✕ CLOSE</button>
        </div>

        <!-- Embedded Video Player -->
        <div style="position:relative; width:100%; aspect-ratio:16/9; background:#000; border-radius:10px; overflow:hidden; margin-bottom:3rem; border:1px solid var(--color-border); box-shadow:0 25px 60px rgba(0,0,0,0.8);">
          <video controls playsinline style="width:100%; height:100%; object-fit:contain;" poster="${proj.thumbnail}">
            <source src="${proj.videoRef}" type="video/mp4">
            Your browser does not support video playback.
          </video>
        </div>

        <div class="drawer-text-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:3rem; margin-bottom:3rem;">
          <div>
            <h4 style="font-family:var(--font-mono); color:var(--color-crimson-bright); font-size:0.85rem; text-transform:uppercase; margin-bottom:0.75rem;">01. THE BRIEF & CHALLENGE</h4>
            <p style="color:rgba(242,242,242,0.8); line-height:1.7;">${proj.challenge}</p>
          </div>
          <div>
            <h4 style="font-family:var(--font-mono); color:var(--color-crimson-bright); font-size:0.85rem; text-transform:uppercase; margin-bottom:0.75rem;">02. THE AXE PIVOT</h4>
            <p style="color:rgba(242,242,242,0.8); line-height:1.7;">${proj.pivot}</p>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--color-border); padding:2rem; border-radius:10px; margin-bottom:3rem;">
          <h4 style="font-family:var(--font-mono); color:var(--color-crimson-bright); font-size:0.8rem; text-transform:uppercase; margin-bottom:0.5rem;">MEASURABLE IMPACT</h4>
          <p style="font-family:var(--font-accent); font-size:1.35rem; color:#fff;">"${proj.result}"</p>
        </div>

        ${proj.stills.length > 1 ? `
          <h4 style="font-family:var(--font-mono); color:var(--color-muted); font-size:0.8rem; text-transform:uppercase; margin-bottom:1rem;">PRODUCTION STILLS & COLOR PASS</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
            ${proj.stills.map(s => `<img src="${s}" style="width:100%; height:260px; object-fit:cover; border-radius:8px; border:1px solid var(--color-border);">`).join('')}
          </div>
        ` : ''}
      `;

      const closeBtn = document.getElementById('close-drawer-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeProjectDrawer());
      }
    }

    this.projectDrawerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeProjectDrawer() {
    if (this.projectDrawerModal) {
      const video = this.projectDrawerModal.querySelector('video');
      if (video) video.pause();
      this.projectDrawerModal.classList.remove('active');
      document.body.style.overflow = '';
      if (window.soundEngine) window.soundEngine.playShutter();
    }
  }

  // K. INTERACTIVE LENS APERTURE SIMULATOR
  setupApertureSimulator() {
    if (!this.fstopSlider) return;
    const fstopValues = [1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11.0, 16.0, 22.0];
    const irisBladeCenter = document.querySelector('.iris-blade-center');

    this.fstopSlider.addEventListener('input', (e) => {
      const idx = parseInt(e.target.value, 10);
      const fstop = fstopValues[idx];

      if (this.fstopReadout) {
        this.fstopReadout.innerHTML = `<span>f/${fstop.toFixed(1)}</span><span>${fstop <= 2.8 ? 'SHALLOW DEPTH OF FIELD' : fstop >= 11 ? 'DEEP EXPANDED FOCUS' : 'BALANCED CINEMA'}</span>`;
      }

      if (irisBladeCenter) {
        const scale = 1.3 - (idx / fstopValues.length) * 0.85;
        irisBladeCenter.style.transform = `scale(${scale})`;
      }

      if (window.axeThree) {
        window.axeThree.setApertureFStop(fstop);
      }

      if (window.soundEngine) {
        window.soundEngine.playShutter();
      }
    });
  }

  // L. SOUND TOGGLE BUTTON
  setupSoundToggle() {
    if (!this.soundToggleBtn) return;

    this.soundToggleBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const active = window.soundEngine.toggleMute();
        const soundLabel = this.soundToggleBtn.querySelector('.sound-label');
        if (active) {
          this.soundToggleBtn.classList.remove('sound-muted');
          this.soundToggleBtn.classList.add('sound-active');
          if (soundLabel) soundLabel.textContent = 'SOUND ON';
        } else {
          this.soundToggleBtn.classList.remove('sound-active');
          this.soundToggleBtn.classList.add('sound-muted');
          if (soundLabel) soundLabel.textContent = 'SOUND OFF';
        }
      }
    });
  }

  // M. COMMISSION BOOKING FORM
  setupCommissionForm() {
    const scopePills = document.querySelectorAll('.scope-pill');
    scopePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('selected');
        if (window.soundEngine) window.soundEngine.playHoverBlip();
      });
    });

    const form = document.getElementById('commission-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-commission-btn');
        if (btn) {
          btn.textContent = 'TRANSMITTING BRIEF...';
          btn.style.opacity = '0.7';
          btn.disabled = true;
        }

        if (window.soundEngine) window.soundEngine.playChime();

        setTimeout(() => {
          if (btn) {
            btn.textContent = 'BRIEF RECEIVED · WE WILL CONTACT YOU';
            btn.style.background = '#27ae60';
            btn.style.opacity = '1';
          }
          alert('Thank you. Shakir Ajmal and the Axe Films team will review your brief and respond within 24 hours.');
        }, 1200);
      });
    }
  }

  // N. HEADER SCROLL STATE
  setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // O. LIVE PKT STUDIO CLOCK
  startLiveStudioClock() {
    const clockEl = document.getElementById('live-studio-time');
    if (!clockEl) return;

    const updateClock = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const pktTime = new Date(utc + (3600000 * 5));

      const hours = String(pktTime.getHours()).padStart(2, '0');
      const minutes = String(pktTime.getMinutes()).padStart(2, '0');
      const seconds = String(pktTime.getSeconds()).padStart(2, '0');

      clockEl.textContent = `${hours}:${minutes}:${seconds} PKT (LAHORE / MULTAN)`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.axeApp = new AxeFilmsApp();
});
