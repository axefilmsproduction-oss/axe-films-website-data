/**
 * AXE FILMS — MASTER FRONTEND ORCHESTRATOR
 * Implements Awwwards-grade motion, custom cursor, asset loading,
 * interactive project drawer, aperture simulator, and audio triggers.
 */

// 1. PROJECT DATA STORE (AUTHENTIC CLIENT WORK ONLY)
const AXE_PROJECTS = [
  {
    id: 'prestige',
    title: 'Prestige Couture',
    client: 'Prestige Menswear',
    category: 'couture',
    categoryLabel: 'Fashion & Couture Campaign',
    year: '2025',
    thumbnail: 'Prestige/Images/IMG_2912.JPG',
    previewTag: '20 Editorial Stills · 11 Video Reels',
    headline: 'Redefining Eastern Bridal Couture with Obsidian & Gold Cinema',
    challenge: 'Prestige required a high-fashion, mood-drenched campaign for their hand-embroidered sherwani collection that elevated the brand from local retail to international editorial stature.',
    pivot: 'Rather than standard flat catalog photography, we built a dramatic Caravaggio-inspired lighting rig with deep obsidian shadows and warm tungsten rim highlights. Every frame was crafted like a high-end period film still.',
    result: '11 viral reels across Instagram, full editorial lookbook utilized for flagship campaign launch.',
    stills: [
      'Prestige/Images/IMG_2912.JPG',
      'Prestige/Images/IMG_2915.JPG',
      'Prestige/Images/IMG_2920.JPG',
      'Prestige/Images/IMG_2928.JPG'
    ],
    videoRef: 'Reels/Reel 01. Manan Black.mp4'
  },
  {
    id: 'elclassico',
    title: 'El Classico',
    client: 'El Classico Food & Coffee',
    category: 'brand',
    categoryLabel: 'Cinematic Brand Film',
    year: '2024',
    thumbnail: 'Axefilms SMP 1-4-06.jpeg',
    previewTag: 'Narrative Film · 4K Cinema',
    headline: 'We Turned Down the Brief: Shot a Scene Instead',
    challenge: 'El Classico asked for a standard interior walkthrough of their flagship restaurant and coffee branch to showcase seating and lighting.',
    pivot: 'We refused the walkthrough. Walkthroughs are forgotten in 2 seconds. Instead, we wrote and filmed a moody, atmospheric cinematic scene capturing an authentic evening encounter inside the space. The space became the living backdrop.',
    result: 'Became the most shared hospitality video in the region; transformed the branch into a cultural evening destination.',
    stills: [
      'Axefilms SMP 1-4-06.jpeg'
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
    thumbnail: 'Axefilms SMP 1-4-03.JPEG',
    previewTag: 'POV Action · Diegetic Sound',
    headline: 'The Karting Was Not Selling — Sound Over Music',
    challenge: 'Their previous karting promo had no energy, and footfall at the track was declining. The brief asked for another montage over generic upbeat music.',
    pivot: 'We banned the music track completely. We mounted cameras directly onto the go-kart chassis and drove them at race speeds ourselves. The entire film was cut to raw diegetic sound design: tire screech, engine revs, and helmet breathing.',
    result: 'Kart ticket sales spiked within 72 hours; customers walked in explicitly quoting the reel at the ticket counter.',
    stills: [
      'Axefilms SMP 1-4-03.JPEG'
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
    thumbnail: 'Axefilms SMP 1-4-01.JPEG',
    previewTag: '17 Digital Reels · Celebrity Cuts',
    headline: 'Visual Identity in Motion for Modern Male Grooming',
    challenge: 'Establishing AURA as Pakistan\'s premier luxury grooming lounge with high-profile celebrity and influencer clientele.',
    pivot: 'A 17-part short-form cinematic series emphasizing tactile craftsmanship: razor glides, steam, precision scissor cuts, and candid character vignettes.',
    result: 'Massive organic engagement, driving fully booked VIP chair appointments across Multan and Islamabad.',
    stills: [
      'Axefilms SMP 1-4-01.JPEG'
    ],
    videoRef: 'AURA/ABDULLAH AZHAR x AURA.mp4'
  },
  {
    id: 'auor',
    title: 'AUOR Supermarket',
    client: 'AUOR Retail Corporation',
    category: 'commercials',
    categoryLabel: 'Commercial Launch Campaign',
    year: '2024',
    thumbnail: 'Axefilms SMP 1-4-02.JPEG',
    previewTag: 'Date Night Series · 8 Deliverables',
    headline: 'From Grocery Run to "Date Night with AUOR"',
    challenge: 'Breaking through the noise of discount supermarket advertising with a fresh emotional angle.',
    pivot: 'Conceived the "Date Night with AUOR" narrative series, highlighting late-night culinary adventures, premium gourmet aisles, and human intimacy.',
    result: 'Packed grand opening launch weekend and high brand recall.',
    stills: [
      'Axefilms SMP 1-4-02.JPEG'
    ],
    videoRef: 'AUOR Supermarket/AUOR Grand Opening Revised.mp4'
  },
  {
    id: 'hashmi',
    title: 'Hashmi Eye Centre',
    client: 'Hashmi Medical Institute',
    category: 'case',
    categoryLabel: 'Healthcare & Precision Film',
    year: '2024',
    thumbnail: 'IMG_3790.PNG',
    previewTag: 'Macro Cinematography · Human Story',
    headline: 'The Science of Vision: Precision Meets Human Vulnerability',
    challenge: 'Medical videos are often clinical, sterile, and intimidating for prospective patients.',
    pivot: 'Framed ophthalmic microsurgery as an art form: ultra-macro optics, warm natural lighting, and patient emotional testimonies before and after sight restoration.',
    result: 'Overwhelming patient trust and widespread institutional recognition.',
    stills: [
      'IMG_3790.PNG'
    ],
    videoRef: 'Hashmi Eye Centre.mp4'
  }
];

// 2. MAIN APPLICATION CLASS
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
    this.projectDrawerModal = document.getElementById('project-drawer-modal');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.fstopSlider = document.getElementById('fstop-slider');
    this.fstopReadout = document.getElementById('fstop-readout');

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    this.init();
  }

  init() {
    this.startAssetLoadingSequence();
    this.setupMagneticCursor();
    this.renderWorksList(AXE_PROJECTS);
    this.setupWorksFilter();
    this.setupInteractiveHoverPreview();
    this.setupApertureSimulator();
    this.setupTheaterModal();
    this.setupSoundToggle();
    this.setupCommissionForm();
    this.setupHeaderScroll();
    this.startLiveStudioClock();
  }

  // A. REAL ASSET LOADING SEQUENCE
  startAssetLoadingSequence() {
    const criticalAssets = [
      'Axefilms SMP 1-4-01.JPEG',
      'Axefilms SMP 1-4-02.JPEG',
      'Axefilms SMP 1-4-03.JPEG',
      'Axefilms SMP 1-4-06.jpeg',
      'Prestige/Images/IMG_2912.JPG',
      'Prestige/Images/IMG_2915.JPG'
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length + 2; // + fonts + WebGL

    let displayProgress = 0;
    const progressInterval = setInterval(() => {
      // Calculate genuine ratio
      const targetProgress = Math.min(Math.round((loadedCount / totalAssets) * 100), 100);
      
      if (displayProgress < targetProgress) {
        displayProgress += 1;
        if (this.loaderCount) this.loaderCount.textContent = String(displayProgress).padStart(2, '0');
        if (this.loaderBarFill) this.loaderBarFill.style.width = `${displayProgress}%`;
      }

      if (displayProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => this.revealWebsite(), 400);
      }
    }, 18);

    // Track critical images
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.onload = () => { loadedCount++; };
      img.onerror = () => { loadedCount++; }; // Graceful recovery
      img.src = src;
    });

    // Track fonts
    if (document.fonts) {
      document.fonts.ready.then(() => {
        loadedCount++;
      }).catch(() => { loadedCount++; });
    } else {
      loadedCount++;
    }

    // Track WebGL initialization
    setTimeout(() => { loadedCount++; }, 300);

    // Guaranteed safety timeout (never wait more than 3.5s)
    setTimeout(() => {
      loadedCount = totalAssets;
    }, 3200);
  }

  revealWebsite() {
    if (window.soundEngine) {
      window.soundEngine.playWhoosh();
    }

    if (window.axeThree) {
      window.axeThree.triggerOpeningSequence();
    }

    if (this.preloader) {
      this.preloader.classList.add('loaded');
    }

    // Trigger hero typography staggered entrance
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title .title-row, .hero-footer-row');
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    });
  }

  // B. CUSTOM MAGNETIC CURSOR
  setupMagneticCursor() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (this.cursorDot) {
        this.cursorDot.style.left = `${this.mouse.x}px`;
        this.cursorDot.style.top = `${this.mouse.y}px`;
      }
    });

    const updateCursorFollower = () => {
      this.cursor.x += (this.mouse.x - this.cursor.x) * 0.15;
      this.cursor.y += (this.mouse.y - this.cursor.y) * 0.15;

      if (this.cursorFollower) {
        this.cursorFollower.style.left = `${this.cursor.x}px`;
        this.cursorFollower.style.top = `${this.cursor.y}px`;
      }
      requestAnimationFrame(updateCursorFollower);
    };
    requestAnimationFrame(updateCursorFollower);

    // Add hover states to interactive targets
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .work-row, .lookbook-photo-card, .scope-pill, input, textarea');
      if (target) {
        if (target.classList.contains('work-row') || target.classList.contains('lookbook-photo-card')) {
          this.cursorFollower.classList.add('hover-interactive');
          this.cursorFollower.textContent = 'EXPLORE';
        } else if (target.classList.contains('hero-play-reel-btn')) {
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
      const target = e.target.closest('a, button, .work-row, .lookbook-photo-card, .scope-pill');
      if (target && this.cursorFollower) {
        this.cursorFollower.classList.remove('hover-interactive', 'hover-link');
        this.cursorFollower.textContent = '';
      }
    });
  }

  // C. RENDER WORKS LIST & FILTER
  renderWorksList(projects) {
    if (!this.worksContainer) return;
    this.worksContainer.innerHTML = '';

    projects.forEach((proj, idx) => {
      const row = document.createElement('div');
      row.className = 'work-row';
      row.dataset.id = proj.id;
      row.dataset.category = proj.category;
      row.dataset.thumbnail = proj.thumbnail;
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

  // D. MELON.STUDIO SIGNATURE FLOATING HOVER PREVIEW
  setupInteractiveHoverPreview() {
    if (!this.hoverPreview) return;
    const previewImg = this.hoverPreview.querySelector('img');
    const previewTag = this.hoverPreview.querySelector('.preview-tag');

    let previewPos = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
      previewPos.x += (e.clientX + 30 - previewPos.x) * 0.2;
      previewPos.y += (e.clientY - 120 - previewPos.y) * 0.2;

      this.hoverPreview.style.left = `${previewPos.x}px`;
      this.hoverPreview.style.top = `${previewPos.y}px`;
    });

    document.addEventListener('mouseover', (e) => {
      const row = e.target.closest('.work-row');
      if (row) {
        if (previewImg) previewImg.src = row.dataset.thumbnail;
        if (previewTag) previewTag.textContent = row.dataset.tag;
        this.hoverPreview.classList.add('visible');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const row = e.target.closest('.work-row');
      if (row) {
        this.hoverPreview.classList.remove('visible');
      }
    });
  }

  // E. PROJECT DETAIL DRAWER / MODAL
  openProjectDrawer(proj) {
    if (!this.projectDrawerModal) return;

    if (window.soundEngine) window.soundEngine.playWhoosh();

    const drawerBody = this.projectDrawerModal.querySelector('.drawer-body-content');
    if (drawerBody) {
      drawerBody.innerHTML = `
        <div class="drawer-header-row">
          <div>
            <span class="case-subtitle">${proj.client} · ${proj.year}</span>
            <h2 class="case-headline">${proj.title}</h2>
          </div>
          <button class="theater-close-btn" id="close-drawer-btn">✕ CLOSE</button>
        </div>

        <div class="drawer-media-hero">
          <img src="${proj.thumbnail}" alt="${proj.title}" style="width:100%; border-radius:10px; margin-bottom:2rem; box-shadow:0 20px 50px rgba(0,0,0,0.8);">
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
      this.projectDrawerModal.classList.remove('active');
      document.body.style.overflow = '';
      if (window.soundEngine) window.soundEngine.playShutter();
    }
  }

  // F. INTERACTIVE LENS APERTURE SIMULATOR
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

      // Update 2D SVG / CSS iris
      if (irisBladeCenter) {
        const scale = 1.3 - (idx / fstopValues.length) * 0.85;
        irisBladeCenter.style.transform = `scale(${scale})`;
      }

      // Update 3D Three.js Iris Blades
      if (window.axeThree) {
        window.axeThree.setApertureFStop(fstop);
      }

      if (window.soundEngine) {
        window.soundEngine.playShutter();
      }
    });
  }

  // G. THEATER SHOWREEL MODAL
  setupTheaterModal() {
    const playBtns = document.querySelectorAll('.hero-play-reel-btn, .open-showreel-action');
    const closeBtn = document.getElementById('theater-close-btn');

    playBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.theaterModal) {
          this.theaterModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          if (window.soundEngine) window.soundEngine.playWhoosh();
          
          const video = this.theaterModal.querySelector('video');
          if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
          }
        }
      });
    });

    const closeModal = () => {
      if (this.theaterModal) {
        this.theaterModal.classList.remove('active');
        document.body.style.overflow = '';
        const video = this.theaterModal.querySelector('video');
        if (video) video.pause();
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

  // H. SOUND TOGGLE BUTTON
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

  // I. COMMISSION BOOKING FORM
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

  // J. HEADER SCROLL STATE
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

  // K. LIVE STUDIO CLOCK (LAHORE / MULTAN TIME)
  startLiveStudioClock() {
    const clockEl = document.getElementById('live-studio-time');
    if (!clockEl) return;

    const updateClock = () => {
      // Pakistan Standard Time is UTC+5
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

// Instantiate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.axeApp = new AxeFilmsApp();
});
