// Web Audio API Synthesizer & Audio Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isBgmPlaying = false;
    this.audioElement = null;
    this.musicBoxTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft gentle music-box chime for taps
  playChime(freq = 659.25) { // E5 default
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch (e) {
      console.warn("Chime audio issue", e);
    }
  }

  // Balloon Pop Sound
  playPop() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);

      // Gentle high bell chime right after pop
      setTimeout(() => this.playChime(880), 50); // A5
    } catch (e) {
      console.warn("Pop audio issue", e);
    }
  }

  // Blowout Whoosh Sound for candle
  playBlowout() {
    if (this.isMuted) return;
    this.init();
    try {
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      console.warn("Blowout audio issue", e);
    }
  }

  // Fanfare for celebration
  playFanfare() {
    if (this.isMuted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 E5 G5 C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq), idx * 100);
    });
  }

  // Toggle Background Music
  toggleBgm(customUrl = "") {
    this.init();
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm(customUrl);
      return true;
    }
  }

  startBgm(customUrl = "") {
    this.init();
    this.isBgmPlaying = true;

    if (customUrl) {
      try {
        if (!this.audioElement) {
          this.audioElement = new Audio(customUrl);
          this.audioElement.loop = true;
          this.audioElement.volume = 0.45;
        }
        this.audioElement.play().catch(err => {
          console.warn("Audio URL play blocked, playing Music Box synth", err);
          this.startMusicBoxSynth();
        });
        return;
      } catch (e) {
        console.warn("Audio element error", e);
      }
    }

    this.startMusicBoxSynth();
  }

  // Pure gentle Music Box melody synth (No low fan noise!)
  startMusicBoxSynth() {
    if (this.musicBoxTimer) return;

    // Sweet romantic melody notes (C Major 9 / F Major 7)
    const melody = [
      523.25, 659.25, 783.99, 987.77, 1046.50, // C5 E5 G5 B5 C6
      880.00, 659.25, 783.99, 523.25, 587.33,  // A5 E5 G5 C5 D5
      659.25, 783.99, 987.77, 1174.66          // E5 G5 B5 D6
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying) return;
      const freq = melody[noteIdx % melody.length];
      noteIdx++;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine'; // Soft pure music box sine tone
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Soft bell envelope
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 1.2);
      } catch(e){}

      // Schedule next note every 450ms
      this.musicBoxTimer = setTimeout(playNextNote, 450);
    };

    playNextNote();
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.musicBoxTimer) {
      clearTimeout(this.musicBoxTimer);
      this.musicBoxTimer = null;
    }
  }
}

export const soundEngine = new SoundEngine();
