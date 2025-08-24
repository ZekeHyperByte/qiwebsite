import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="section about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div>
          <p className="about-text">
            Hey there! {':>'} I'm Fiqi, who's all about making cool stuff happen with code. I love diving into projects, whether it's building a full-stack web app from scratch, making a machine learning model, or just writing a random script to automate my life. I'm a big believer that tech should be fun and solve real problems—and I get a kick out of turning complex ideas into simple, working solutions. When I'm not coding, you can probably find me brainstorming my next big project or just chilling with some good music. Hit me up if you want to chat about tech, projects, or anything in between!
          </p>
          
          <div className="contact-section">
            <h3 className="skills-title">Let's Connect</h3>
            <div className="contact-links">
              <a href="mailto:fiqifirmansyah5535@gmail.com" className="contact-link"><FaEnvelope /></a>
              <a href="https://www.linkedin.com/in/fiqifirmansyah" className="contact-link"><FaLinkedin /></a>
              <a href="https://github.com/ZekeHyperByte" className="contact-link"><FaGithub /></a>
              <a href="https://instagram.com/fiqifirmansyahz" className="contact-link"><FaInstagram /></a>
              <a href="https://drive.google.com/file/d/1uatYIDFNAe9PbIP_gnRC8s44PRP2txRx/view?usp=sharing" className="contact-link"><FaFileAlt /></a>
            </div>
          </div>
        </div>
        
        <div className="skills-section">
          <h3 className="skills-title">Technical Skills</h3>
          <div className="skills-grid">
            <div className="skill-item">JavaScript</div>
            <div className="skill-item">React</div>
            <div className="skill-item">Node.js</div>
            <div className="skill-item">Python</div>
            <div className="skill-item">MongoDB</div>
            <div className="skill-item">PostgreSQL</div>
            <div className="skill-item">HTML/CSS</div>
            <div className="skill-item">Git</div>
            <div className="skill-item">AWS</div>
            <div className="skill-item">Docker</div>
            <div className="skill-item">Express</div>
            <div className="skill-item">Vue.js</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
