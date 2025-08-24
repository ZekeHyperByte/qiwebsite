import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div>
          <p className="about-text">
            Hello! I'm a passionate full-stack developer with a love for creating 
            innovative digital solutions. My journey in software development started 
            [X years ago], and since then, I've been dedicated to writing clean, 
            efficient code and building applications that make a difference.
          </p>
          <p className="about-text">
            I enjoy tackling complex problems and turning ideas into reality through 
            code. Whether it's building responsive web applications, developing robust 
            backend systems, or creating intuitive user interfaces, I approach each 
            project with creativity and attention to detail.
          </p>
          <p className="about-text">
            When I'm not coding, you can find me [your hobbies/interests], always 
            eager to learn new technologies and improve my craft.
          </p>
          
          <div className="contact-section">
            <h3 className="skills-title">Let's Connect</h3>
            <div className="contact-links">
              <a href="mailto:your.email@example.com" className="contact-link">📧 Email</a>
              <a href="https://linkedin.com/in/yourprofile" className="contact-link">💼 LinkedIn</a>
              <a href="https://github.com/yourusername" className="contact-link">🔗 GitHub</a>
              <a href="#" className="contact-link">📄 Resume</a>
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
