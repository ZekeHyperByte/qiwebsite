import React from 'react';
import seltronik1 from '../assets/images/seltronik1.png';
import seltronik2 from '../assets/images/seltronik2.png';
import seltronik3 from '../assets/images/seltronik3.png';

const projectsData = [
  {
    id: 'project-1',
    title: 'PT. Sinyal Elektro Mekanik',
    description: 'A company website for a business focused on traffic lights, CCTV, street speakers, and solar cells.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://seltronik-website.vercel.app/',
    githubUrl: 'https://github.com/ZekeHyperByte/seltronik-website',
    imageUrl: seltronik1,
    status: 'live',
  },
  {
    id: 'project-2',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce solution with payment integration, inventory management, and admin dashboard.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    liveUrl: null,
    githubUrl: null,
    imageUrl: 'https://via.placeholder.com/1920x1080/1E293B/FFFFFF?text=Project+2',
    status: 'coming soon',
  },
  {
    id: 'project-3',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and productivity analytics.',
    tech: ['Vue.js', 'Socket.io', 'Redis'],
    liveUrl: null,
    githubUrl: null,
    imageUrl: 'https://via.placeholder.com/1920x1080/1A1A2E/FFFFFF?text=Project+3',
    status: 'coming soon',
  },
  {
    id: 'project-4',
    title: 'Weather Dashboard',
    description: 'An interactive weather dashboard with data visualization, forecasting, and location-based weather alerts.',
    tech: ['React', 'D3.js', 'Weather API'],
    liveUrl: null,
    githubUrl: null,
    imageUrl: 'https://via.placeholder.com/1920x1080/1E293B/FFFFFF?text=Project+4',
    status: 'coming soon',
  },
  {
    id: 'project-5',
    title: 'Social Media Analytics',
    description: 'A comprehensive analytics platform for social media performance tracking with AI-powered insights and recommendations.',
    tech: ['Python', 'Flask', 'TensorFlow'],
    liveUrl: null,
    githubUrl: null,
    imageUrl: 'https://via.placeholder.com/1920x1080/1A1A2E/FFFFFF?text=Project+5',
    status: 'coming soon',
  },
];

const Projects = () => {
  return (
    <div id="projects">
      <section className="section scroll-section">
        <h2 className="section-title">Featured Projects</h2>
      </section>
      {projectsData.map((project) => (
        <section
          key={project.id}
          id={project.id}
          className="project-section"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        >
          <div className="project-overlay"></div>
          <div className="project-content-full">
            <h3 className="project-title-full">{project.title}</h3>
            <p className="project-description-full">{project.description}</p>
            <div className="tech-stack">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links-full">
              {project.liveUrl ? (
                <a href={project.liveUrl} className="project-link-full" target="_blank" rel="noopener noreferrer">
                  🔗 Live Demo
                </a>
              ) : (
                <span className="project-link-full disabled">🔗 Live Demo (Coming Soon)</span>
              )}
              {project.githubUrl ? (
                <a href={project.githubUrl} className="project-link-full" target="_blank" rel="noopener noreferrer">
                  📁 GitHub
                </a>
              ) : (
                <span className="project-link-full disabled">📁 GitHub (Coming Soon)</span>
              )}
            </div>
          </div>
          {project.status === 'coming soon' && (
            <div className="coming-soon-overlay">
              <div className="coming-soon-box">Coming Soon</div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default Projects;
