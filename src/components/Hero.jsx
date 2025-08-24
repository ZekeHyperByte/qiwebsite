import React from 'react';
import WaterRippleEffect from './WaterRippleEffect';

const Hero = () => {
  return (
    <section id="hero" className="hero scroll-section">
      <WaterRippleEffect />
      <div className="hero-content">
        <h1 className="hero-title">Muhammad Fiqi Firmansyah</h1>
        <h2 className="hero-subtitle">Full-Stack Developer & AI Engineer</h2>
        <p className="hero-description">
          Passionate about creating innovative web applications and software solutions 
          that solve real-world problems. Specializing in modern technologies and clean, 
          efficient code.
        </p>
        <a href="#projects" className="cta-button">View My Work</a>
      </div>
      <div className="scroll-hint">↓ Scroll to explore</div>
    </section>
  );
};

export default Hero;
