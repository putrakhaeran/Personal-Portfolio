import { type ReactNode, useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  Code2,
  ExternalLink,
  FileBadge,
  Github,
  Globe2,
  Mail,
  Menu,
  MonitorCog,
  Search,
  X,
} from 'lucide-react';

const navigation = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Skills', 'skills'],
  ['Experience', 'experience'],
  ['Certificates', 'certificates'],
  ['Contact', 'contact'],
] as const;

const projects = [
  {
    title: 'Kedai Rakjat',
    category: 'Web Development',
    description: 'A modern e-commerce website concept designed to provide a simple and convenient online shopping experience.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    motif: 'A considered storefront concept',
    slug: 'kedai-rakjat',
  },
  {
    title: 'TVS Sparepart Management System',
    category: 'Information System',
    description: 'A web-based sparepart management system designed to monitor inventory, incoming goods, outgoing goods, suppliers, and stock information.',
    technologies: ['PHP', 'MySQL', 'Bootstrap'],
    motif: 'Inventory, made legible',
    slug: 'tvs-sparepart-management',
  },
  {
    title: 'AI Sign Language Recognition',
    category: 'Artificial Intelligence',
    description: 'A computer vision project for recognizing Indonesian sign language using image classification and deep learning.',
    technologies: ['Python', 'TensorFlow', 'CNN'],
    motif: 'Computer vision exploration',
    slug: 'ai-sign-language-recognition',
  },
  {
    title: 'EEG-Based Brain Computer Interface',
    category: 'AI Research',
    description: 'A research project exploring EEG-based classification of motor imagery, emotion, and focus using deep learning.',
    technologies: ['Python', 'Deep Learning', 'EEG', 'BCI'],
    motif: 'Signals, patterns, possibility',
    slug: 'eeg-brain-computer-interface',
  },
];

const skillGroups = [
  { title: 'Programming', items: ['Python', 'Java', 'JavaScript', 'PHP', 'HTML', 'CSS'] },
  { title: 'Web Development', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
  { title: 'Database', items: ['MySQL'] },
  { title: 'Artificial Intelligence', items: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'TensorFlow'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'XAMPP'] },
  { title: 'Research', items: ['EEG', 'Brain Computer Interface', 'Data Analysis'] },
];

const certificates = [
  { id: 'certificate-01', title: 'Certificate title to be added', issuer: 'Issuer to be added', year: 'Year to be added' },
  { id: 'certificate-02', title: 'Certificate title to be added', issuer: 'Issuer to be added', year: 'Year to be added' },
  { id: 'certificate-03', title: 'Certificate title to be added', issuer: 'Issuer to be added', year: 'Year to be added' },
  { id: 'certificate-04', title: 'Certificate title to be added', issuer: 'Issuer to be added', year: 'Year to be added' },
];

function PlaceholderLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" data-testid="link-placeholder">
      {children}
    </a>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach((el) => revealObserver.observe(el));
      return () => revealObserver.disconnect();
    }
    return undefined;
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    navigation.forEach(([, id]) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedCertificate) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCertificate(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCertificate]);

  const closeMenu = () => setMenuOpen(false);
  const selectedCert = certificates.find((certificate) => certificate.id === selectedCertificate);

  return (
    <div className="site-shell">
      <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 10, height: 78, borderBottom: '1px solid #dce5ea', background: 'rgba(248,250,251,.96)', backdropFilter: 'blur(12px)' }}>
        <div className="wrap" style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#home" onClick={closeMenu} aria-label="Khaeran home" style={{ color: 'var(--brand-navy)', textDecoration: 'none', fontFamily: 'var(--app-font-display)', fontWeight: 800, fontSize: 21, letterSpacing: '-.06em' }} data-testid="link-home">
            khaeran<span style={{ color: 'var(--brand-red)' }}>.</span>
          </a>
          <nav id="main-navigation" className={`desktop-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: 25 }}>
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link${activeSection === id ? ' active' : ''}`}
                aria-current={activeSection === id ? 'location' : undefined}
                onClick={closeMenu}
                data-testid={`nav-${id}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker">Hello, I'm</div>
              <h1>Khaeran<span style={{ color: 'var(--brand-red)' }}>.</span></h1>
              <p className="hero-title">Information Technology Student</p>
              <p className="hero-description">Exploring technology through software development, artificial intelligence, and research.</p>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary" data-testid="link-view-projects">View My Projects <ArrowDownRight size={16} /></a>
                <a href={`${import.meta.env.BASE_URL}assets/Khaeran-CV.pdf`} className="button button-outline" download data-testid="link-download-cv">Download CV <ExternalLink size={15} /></a>
              </div>
              <div className="hero-note"><span /> Currently learning by building</div>
            </div>
            <div className="portrait-stage">
              <div className="portrait-frame">
                <img src={`${import.meta.env.BASE_URL}assets/images/khaeran-portrait.jpeg`} alt="Portrait of Khaeran" data-testid="img-khaeran-portrait" />
              </div>
              <div className="portrait-caption">
                <div className="caption-mark">K.</div>
                <div className="caption-text"><strong>Curious by nature.</strong><small>IT · software · research</small></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="wrap">
            <div className="about-top reveal">
              <div>
                <span className="eyebrow">A little about me</span>
                <h2 className="section-heading about-title">About Me</h2>
                <h3 style={{ margin: '16px 0 0', color: '#39769a', font: '600 clamp(1.1rem, 2vw, 1.45rem)/1.4 var(--app-font-display)', letterSpacing: '-.035em' }}>Turning curiosity into technology.</h3>
              </div>
              <div className="about-copy">
                <p>I’m an Information Technology student interested in software development, artificial intelligence, and technology research. I enjoy turning ideas into practical digital solutions while continuously learning and exploring new technologies.</p>
              </div>
            </div>
            <div className="stat-row reveal delay-1" aria-label="Highlights">
              {[['IT Student', 'Learning in practice'], ['5+ Projects', 'Exploring by doing'], ['AI & Research', 'Areas of interest'], ['Continuous Learner', 'Always curious']].map(([title, caption]) => (
                <div className="stat" key={title}><strong>{title}</strong><span>{caption}</span></div>
              ))}
            </div>
            <div className="specialty-head reveal">
              <div><span className="eyebrow">Areas of curiosity</span><h2 className="section-heading">What I Do</h2></div>
              <div className="specialty-note">A few ways I like to turn ideas into useful things.</div>
            </div>
            <div className="specialty-grid reveal delay-1">
              <article className="specialty">
                <div className="icon-tile"><Globe2 size={19} /></div>
                <h3>Web Development</h3><p>Building responsive and interactive web applications.</p>
              </article>
              <article className="specialty">
                <div className="icon-tile"><BrainCircuit size={19} /></div>
                <h3>Artificial Intelligence</h3><p>Exploring machine learning, computer vision, and intelligent systems.</p>
              </article>
              <article className="specialty">
                <div className="icon-tile"><Search size={19} /></div>
                <h3>Technology Research</h3><p>Exploring research-oriented projects involving emerging technologies and data.</p>
              </article>
              <article className="specialty">
                <div className="icon-tile"><Code2 size={19} /></div>
                <h3>Software Development</h3><p>Developing practical software solutions through structured programming and problem solving.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="section project-section">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">Selected explorations</span>
              <h2 className="section-heading">Projects</h2>
              <p className="section-intro">A collection of things I’ve explored across web, information systems, and artificial intelligence. Project previews and destination links are ready to be replaced with live work.</p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className={`project-card reveal delay-${index % 2 + 1}`} key={project.slug} data-testid={`card-project-${project.slug}`}>
                  <div className="project-visual" aria-label={`Replaceable visual placeholder for ${project.title}`}>
                    <span className="project-number">0{index + 1} / PROJECT</span>
                    <div className="project-art">
                      <span>{project.category}</span>
                      <strong>{project.motif}</strong>
                      <i /><i style={{ width: '48%' }} />
                    </div>
                  </div>
                  <div className="project-body">
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tag-row">{project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
                    <div className="project-links">
                      <PlaceholderLink href={`https://example.com/replace-with-${project.slug}`} className="text-link">View Project <ArrowRight size={14} /></PlaceholderLink>
                      <PlaceholderLink href={`https://github.com/your-github-username/${project.slug}`} className="text-link"><Github size={14} /> GitHub</PlaceholderLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="wrap skills-layout">
            <div className="skills-lead reveal">
              <span className="eyebrow">A growing toolkit</span>
              <h2 className="section-heading">Technical Skills</h2>
              <p className="section-intro">Tools and topics I’ve been learning through coursework, personal exploration, and project work.</p>
            </div>
            <div className="skill-list reveal delay-1">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="skill-tags">{group.items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">Learning through doing</span>
              <h2 className="section-heading">Experience &amp; Activities</h2>
              <p className="section-intro">A timeline of areas explored through academic and independent project work.</p>
            </div>
            <div className="timeline">
              <article className="timeline-item reveal">
                <div><h3>Academic Projects</h3><p>Information Technology</p></div>
                <time className="timeline-date">2024–Present</time>
              </article>
              <article className="timeline-item reveal delay-1">
                <div><h3>AI &amp; Research Projects</h3><p>Artificial Intelligence / EEG / BCI</p></div>
                <time className="timeline-date">2025–Present</time>
              </article>
              <article className="timeline-item reveal delay-2">
                <div><h3>Technology Development</h3><p>Web Development &amp; Software Projects</p></div>
                <time className="timeline-date">2024–Present</time>
              </article>
            </div>
          </div>
        </section>

        <section id="certificates" className="section cert-section">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">Credentials</span>
              <h2 className="section-heading">Certificates</h2>
              <p className="section-intro">This gallery is prepared for certificates when files and details are available. No credentials are listed yet.</p>
            </div>
            <div className="cert-grid">
              {certificates.map((certificate, index) => (
                <article className={`cert-card reveal delay-${index % 3 + 1}`} key={certificate.id}>
                  <div className="cert-art" aria-label="Replaceable certificate image placeholder">
                    <div className="cert-paper"><FileBadge size={22} /><span>Certificate file</span></div>
                  </div>
                  <div className="cert-body">
                    <h3>{certificate.title}</h3>
                    <div className="cert-meta">{certificate.issuer}<br />{certificate.year}</div>
                    <button className="cert-action" type="button" onClick={() => setSelectedCertificate(certificate.id)} data-testid={`button-view-${certificate.id}`}>
                      View Certificate <ArrowRight size={13} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="wrap">
            <div className="contact-inner">
              <div className="reveal">
                <span className="eyebrow">Say hello</span>
                <h2 className="section-heading">Let's build something meaningful.</h2>
                <p className="section-intro">I'm always open to learning, collaborating, and exploring new opportunities in technology.</p>
              </div>
              <div className="contact-links reveal delay-1">
                <PlaceholderLink href="https://github.com/your-github-username" className="contact-link"><span><Github size={18} /> GitHub</span><ArrowRight size={16} /></PlaceholderLink>
                <PlaceholderLink href="https://www.linkedin.com/in/your-linkedin-profile" className="contact-link"><span><MonitorCog size={18} /> LinkedIn</span><ArrowRight size={16} /></PlaceholderLink>
                <PlaceholderLink href="mailto:your.email@example.com" className="contact-link"><span><Mail size={18} /> Email</span><ArrowRight size={16} /></PlaceholderLink>
              </div>
            </div>
            <footer className="footer">
              <div><span className="footer-name">Khaeran</span><span className="footer-role">Information Technology Student</span></div>
              <div className="footer-copy">© 2026 Khaeran. Built with HTML, CSS &amp; JavaScript.</div>
            </footer>
          </div>
        </section>
      </main>

      {selectedCert && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCertificate(null); }}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="certificate-dialog-title">
            <div className="modal-header">
              <span className="eyebrow">Certificate file</span>
              <button className="modal-close" type="button" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate details" data-testid="button-close-certificate"><X size={18} /></button>
            </div>
            <h2 id="certificate-dialog-title">{selectedCert?.title}</h2>
            <p>This certificate is not available yet. Add the real certificate image and its verified title, issuer, and year before publishing.</p>
            <code className="modal-path">public/assets/certificates/{selectedCert?.id}.jpg</code>
            <button className="button button-primary" type="button" onClick={() => setSelectedCertificate(null)}>Close</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;