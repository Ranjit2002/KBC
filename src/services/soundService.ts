// High fidelity synthesized audio engine using HTML5 Web Audio API
// 100% offline, zero CORS/CDN dependencies, zero latency

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private suspenseOsc1: OscillatorNode | null = null;
  private suspenseOsc2: OscillatorNode | null = null;
  private suspenseGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSuspense();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Suspense Tension Drone during question
  public startSuspense() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.suspenseGain) return; // already playing

      const now = this.ctx.currentTime;
      this.suspenseGain = this.ctx.createGain();
      this.suspenseGain.gain.setValueAtTime(0.01, now);
      this.suspenseGain.gain.exponentialRampToValueAtTime(0.08, now + 1.5);

      this.suspenseOsc1 = this.ctx.createOscillator();
      this.suspenseOsc2 = this.ctx.createOscillator();

      this.suspenseOsc1.type = 'sawtooth';
      this.suspenseOsc1.frequency.setValueAtTime(65.41, now); // C2

      this.suspenseOsc2.type = 'sine';
      this.suspenseOsc2.frequency.setValueAtTime(98.0, now); // G2

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      this.suspenseOsc1.connect(filter);
      this.suspenseOsc2.connect(filter);
      filter.connect(this.suspenseGain);
      this.suspenseGain.connect(this.ctx.destination);

      this.suspenseOsc1.start(now);
      this.suspenseOsc2.start(now);
    } catch (e) {
      console.warn('Suspense audio could not start', e);
    }
  }

  public stopSuspense() {
    if (!this.ctx || !this.suspenseGain) return;
    try {
      const now = this.ctx.currentTime;
      this.suspenseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      setTimeout(() => {
        try {
          this.suspenseOsc1?.stop();
          this.suspenseOsc2?.stop();
          this.suspenseOsc1?.disconnect();
          this.suspenseOsc2?.disconnect();
          this.suspenseGain?.disconnect();
        } catch {
          // ignore
        }
        this.suspenseGain = null;
        this.suspenseOsc1 = null;
        this.suspenseOsc2 = null;
      }, 350);
    } catch {
      this.suspenseGain = null;
    }
  }

  // Option Lock Sound (Lock Kar Diya Jaye!)
  public playOptionLock() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.45);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  // Clock Tick (Ghadighadi babu)
  public playTick(isUrgent: boolean = false) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isUrgent ? 'sawtooth' : 'sine';
    const freq = isUrgent ? 880 : 520;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.05);

    gain.gain.setValueAtTime(isUrgent ? 0.25 : 0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Correct Answer Fanfare (Sahi Jawab!)
  public playCorrect() {
    if (this.isMuted) return;
    this.stopSuspense();
    this.initContext();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C major arpeggio
    notes.forEach((freq, idx) => {
      const startTime = this.ctx!.currentTime + idx * 0.09;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }

  // Wrong Answer Tone (Galat Jawab)
  public playWrong() {
    if (this.isMuted) return;
    this.stopSuspense();
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    // Dissonant minor second crash
    osc1.frequency.setValueAtTime(196, now); // G3
    osc1.frequency.exponentialRampToValueAtTime(98, now + 0.8);

    osc2.frequency.setValueAtTime(207.65, now); // G#3 (clash)
    osc2.frequency.exponentialRampToValueAtTime(103.8, now + 0.8);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.9);
    osc2.stop(now + 0.9);
  }

  // Lifeline Jingle
  public playLifeline() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const tones = [587.33, 739.99, 880.0, 1174.66]; // D-F#-A-D sparkle
    tones.forEach((freq, idx) => {
      const startTime = this.ctx!.currentTime + idx * 0.08;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  // Grand Jackpot ₹7 Crore Victory
  public playJackpot() {
    if (this.isMuted) return;
    this.stopSuspense();
    this.initContext();
    if (!this.ctx) return;

    const chords = [
      [261.63, 329.63, 392.0], // C
      [329.63, 392.0, 523.25], // C/E
      [392.0, 493.88, 587.33], // G
      [523.25, 659.25, 783.99, 1046.5], // C octave
    ];

    chords.forEach((chord, chordIdx) => {
      const chordTime = this.ctx!.currentTime + chordIdx * 0.35;
      chord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, chordTime);

        gain.gain.setValueAtTime(0.22, chordTime);
        gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(chordTime);
        osc.stop(chordTime + 0.75);
      });
    });
  }
}

export const soundService = new SoundEngine();
