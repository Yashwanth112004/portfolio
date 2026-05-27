// Web Audio API synthesizer for retro-futuristic sounds

class AudioManager {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;
  private volume: number = 0.2; // overall volume slider
  private muted: boolean = true;

  constructor() {
    // Audio Context is initialized lazily upon first user interaction due to browser autoplay policies
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    this.initContext();
    if (muted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
  }

  public isMuted() {
    return this.muted;
  }

  // Play standard UI console click
  public playClick() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

    gain.gain.setValueAtTime(this.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Play keyboard diagnostic typing sound
  public playType() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);

    gain.gain.setValueAtTime(this.volume * 0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // Play sci-fi hover chirp
  public playChirp() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(2400, now + 0.12);

    gain.gain.setValueAtTime(this.volume * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Play command terminal success notification
  public playSuccess() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volume * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    gain.connect(this.ctx.destination);

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major)
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      osc.connect(gain);
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.25);
    });
  }

  // Play console error alert
  public playError() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "sawtooth";

    osc1.frequency.setValueAtTime(130, now);
    osc2.frequency.setValueAtTime(133, now); // Detuned dissonance

    gain.gain.setValueAtTime(this.volume * 0.35, now);
    gain.gain.setValueAtTime(this.volume * 0.35, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
  }

  // Start the low-frequency spaceship core background hum
  public startAmbient() {
    if (this.muted || this.isAmbientPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Create Oscillators for deep reactor beat
    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientGain = this.ctx.createGain();
    
    // Low frequencies detuned to create a beat frequency
    this.ambientOsc1.type = "sine";
    this.ambientOsc1.frequency.setValueAtTime(55, now); // A1

    this.ambientOsc2.type = "triangle";
    this.ambientOsc2.frequency.setValueAtTime(55.6, now); // Detuned

    // Low pass filter to keep it deep and warm
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(150, now);

    // LFO to slowly sweep the gain/filter cutoff for life
    this.lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(0.15, now); // 0.15 Hz sweep
    lfoGain.gain.setValueAtTime(30, now); // filter cutoff sweep depth

    this.lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Connecting components
    this.ambientGain.gain.setValueAtTime(0, now);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.6, now + 2.0); // smooth fade-in

    this.ambientOsc1.connect(filter);
    this.ambientOsc2.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    this.ambientOsc1.start(now);
    this.ambientOsc2.start(now);
    this.lfo.start(now);

    this.isAmbientPlaying = true;
  }

  // Stop background reactor hum
  public stopAmbient() {
    if (!this.isAmbientPlaying) return;

    const now = this.ctx ? this.ctx.currentTime : 0;
    if (this.ctx && this.ambientGain) {
      try {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
        this.ambientGain.gain.linearRampToValueAtTime(0, now + 0.5); // fade out
      } catch(e) {}
    }

    setTimeout(() => {
      try {
        if (this.ambientOsc1) this.ambientOsc1.stop();
        if (this.ambientOsc2) this.ambientOsc2.stop();
        if (this.lfo) this.lfo.stop();
      } catch(e) {}

      this.ambientOsc1 = null;
      this.ambientOsc2 = null;
      this.lfo = null;
      this.ambientGain = null;
      this.isAmbientPlaying = false;
    }, 550);
  }
}

// Export singleton instance
export const audio = new AudioManager();
