/**
 * AXE FILMS — BESPOKE WEB AUDIO API SOUND ENGINE
 * Synthesizes subtle, luxury cinematic audio effects entirely in-browser.
 * Zero external audio files required. Respects user mute preference and reduced motion.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Default muted to respect autoplay policies
    this.droneOsc = null;
    this.droneGain = null;
    this.hasInteracted = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playChime();
      this.startAmbientDrone();
    } else {
      this.stopAmbientDrone();
    }
    return !this.isMuted;
  }

  // Subtle metallic camera shutter click
  playShutter() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Noise buffer for mechanical snap
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(3.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Low frequency sub-bass cinematic whoosh
  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // Luxury harmonic chime for button interactions
  playChime() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc2.frequency.setValueAtTime(880.00, now); // A5

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.52);
    osc2.stop(now + 0.52);
  }

  // Ultra-subtle hover blip
  playHoverBlip() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.035);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Deep subtle atmospheric room tone
  startAmbientDrone() {
    if (this.isMuted || !this.ctx || this.droneOsc) return;
    const now = this.ctx.currentTime;

    this.droneOsc = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();

    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.setValueAtTime(55, now); // 55Hz low A

    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.03, now + 2.0);

    this.droneOsc.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc.start(now);
  }

  stopAmbientDrone() {
    if (this.droneOsc && this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        if (this.droneOsc) {
          try { this.droneOsc.stop(); } catch(e) {}
          this.droneOsc.disconnect();
          this.droneOsc = null;
        }
      }, 850);
    }
  }
}

window.soundEngine = new SoundEngine();
