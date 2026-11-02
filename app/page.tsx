"use client";

import { useEffect, useState } from "react";

const profile = {
  resume:
    "https://drive.google.com/file/d/1afbdAlD8k66TfOKepqivcg8QgC_avrLh/view?usp=drive_link",
  email: "tusharmishra6666@gmail.com",
  phone: "+919319390631",
  links: {
    github: "https://github.com/cout-Tushar",
    linkedin: "https://linkedin.com/in/tushar-mishra-1b15701ab",
    leetcode: "#",
    gfg: "#",
  },
};

const interests = [
  "Backend development and REST API design",
  "Real-time systems using WebSockets",
  "AI-powered developer tools",
  "Authentication and access control",
  "Database design and software architecture",
  "Data structures and algorithmic problem-solving",
];

const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "C++", "C", "SQL", "HTML5", "CSS3"],
  Frontend: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Material UI", "Responsive Design"],
  "Backend + APIs": [
    "Node.js",
    "Express.js",
    "REST APIs",
    "Socket.io",
    "WebSockets",
    "JWT Authentication",
    "RBAC",
    "LLM API Integration",
  ],
  Databases: [
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "MariaDB",
    "Prisma ORM",
    "Database Design",
    "Query Optimization",
  ],
  "DevOps + Tools": [
    "Docker",
    "Git",
    "GitHub",
    "npm",
    "Vercel",
    "Postman",
    "VS Code",
    "Cloudinary",
  ],
  "Core Concepts": [
    "Data Structures and Algorithms",
    "OOP",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "SOLID Principles",
    "Design Patterns",
  ],
};

const projects = [
  {
    name: "Hammy CLI",
    category: "01 / AI-powered developer tool",
    tag: "Test, generate, and understand APIs directly from your terminal.",
    tech: ["TypeScript", "Node.js", "REST APIs", "Groq API", "CLI"],
    points: [
      "Developed and published an AI-powered CLI for API testing, request generation, API review, and response explanation.",
      "Implemented HTTP request execution and persistent local storage for saved requests and collections.",
      "Integrated the Groq API to generate and review API requests and explain responses.",
      "Designed a modular TypeScript architecture and published an npm package for global installation.",
    ],
    links: [["GitHub repository", "https://github.com/cout-Tushar/Hammy"]],
    visual: "terminal",
  },
  {
    name: "Co-Op Code",
    category: "02 / Real-time collaborative application",
    tag: "A collaborative coding environment built for synchronized development.",
    tech: ["Next.js", "React", "Express.js", "Socket.io", "MongoDB", "JWT"],
    points: [
      "Real-time collaborative code editing with live code synchronization.",
      "WebSocket architecture supporting 10+ simultaneous users.",
      "Secure JWT authentication, password hashing, session management, login, signup, and password reset.",
      "REST APIs with Express.js and MongoDB for user management and persistent data.",
      "Full-stack deployment on Vercel with sub-200ms response times.",
    ],
    links: [
      ["GitHub repository", "https://github.com/cout-Tushar/CO-OP-Code"],
      ["Live demo", "https://co-op-code.vercel.app/"],
    ],
    visual: "code",
  },
  {
    name: "BuildCore ERP",
    category: "03 / Full-stack business application",
    tag: "Bringing construction-site operations into one connected platform.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma"],
    points: [
      "Role-based access control for administrators, supervisors, and engineers.",
      "Construction site management, workforce and attendance tracking.",
      "Daily progress, work status, inventory, and material request reporting.",
      "Document uploads with cloud storage behind protected backend APIs.",
    ],
    links: [["Live demo", "https://constucton-site-management.vercel.app/"]],
    visual: "dashboard",
  },
];

function ButtonLink({
  children,
  href,
  className = "",
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      className={`button ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "code") {
    return (
      <div className="codebox">
        <div className="code-line"><i>1</i><span><b className="blue">function</b> sync(doc) &#123;</span></div>
        <div className="code-line"><i>2</i><span>&nbsp;&nbsp;socket.emit(<b className="lime">&quot;edit&quot;</b>, doc);</span></div>
        <div className="code-line"><i>3</i><span>&nbsp;&nbsp;<b className="blue">return</b> doc;</span></div>
        <div className="code-line"><i>4</i><span>&#125;</span></div>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="dashboard">
        {[["SITE PROGRESS", "64%"], ["WORK STATUS", "40%"], ["INVENTORY", "78%"], ["ATTENDANCE", "55%"]].map(([label, width]) => (
          <div className="dash-cell" key={label}>
            <strong>{label}</strong><div className="dash-bar"><i style={{ width }} /></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mini-terminal">
      <div className="terminal-bar">hammy:~$ <span>hammy request</span></div>
      <div><b className="orange">✓</b> request sent</div>
      <div>status&nbsp;&nbsp; 200 OK</div>
      <div>saved&nbsp;&nbsp;&nbsp; collection: users-api</div>
      <div><b className="lime">AI</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Explain this response…</div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>("#progress");
    const parallaxItems = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const tiltCards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateProgress = () => {
      if (!progress) return;
      progress.style.transform = `scaleX(${window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)})`;
      if (reduceMotion) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        parallaxItems.forEach((item) => {
          const speed = Number(item.dataset.parallax ?? 0);
          item.style.setProperty("--parallax-offset", `${window.scrollY * speed}px`);
        });
      });
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    const tiltHandlers = [...tiltCards].map((card) => {
      const move = (event: Event) => {
        if (reduceMotion) return;
        const pointer = event as PointerEvent;
        const bounds = card.getBoundingClientRect();
        const x = (pointer.clientX - bounds.left) / bounds.width - 0.5;
        const y = (pointer.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--tilt-x", `${y * -7}deg`);
        card.style.setProperty("--tilt-y", `${x * 9}deg`);
        card.style.setProperty("--lift", "-5px");
      };
      const leave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--lift", "0px");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return { card, move, leave };
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => {
      window.removeEventListener("scroll", updateProgress);
      cancelAnimationFrame(frame);
      tiltHandlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="progress" id="progress" />
      <header>
        <div className="wrap">
          <nav aria-label="Primary navigation">
            <a className="brand" href="#top" aria-label="Tushar Mishra home"><span className="brand-mark">TM</span><span>TUSHAR / MISHRA</span></a>
            <button className="menu" aria-expanded={menuOpen} aria-controls="navLinks" onClick={() => setMenuOpen((open) => !open)}>Menu</button>
            <div className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#projects" onClick={() => setMenuOpen(false)}>Work</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#skills" onClick={() => setMenuOpen(false)}>Stack</a><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Start a conversation ↗</a>
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">Full-stack developer / Delhi, India</div>
              <h1 data-parallax="-0.08">MAKE IT<br /><span>WORK.</span></h1>
              <p className="hero-copy">I build useful software for people who care about the details — from dependable APIs and real-time products to AI tools that make developers faster.</p>
              <div className="hero-actions"><ButtonLink href="#projects" className="primary">See selected work ↓</ButtonLink><ButtonLink href={profile.resume} className="lime" external>Open resume ↗</ButtonLink></div>
              <div className="socials"><a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={`mailto:${profile.email}`}>Email</a><a href={`tel:${profile.phone}`}>Call</a></div>
            </div>
            <div className="hero-side" data-parallax="0.035">
              <div className="stamp"><strong>Available for good work</strong>Open to software engineering opportunities, freelance builds, and interesting technical problems.</div>
              <div className="terminal hero-terminal tilt-card"><div className="terminal-bar">tushar@portfolio:~$ <span>whoami</span></div><div className="green">name&nbsp;&nbsp;&nbsp;&nbsp; Tushar Mishra</div><div>focus&nbsp;&nbsp;&nbsp; backend + real-time systems</div><div>status&nbsp;&nbsp; available for good work</div><br /><div className="green">✓ ready to build something useful</div><span className="cursor" aria-hidden="true" /></div>
            </div>
          </div>
        </section>
        <div className="ticker" aria-hidden="true"><div className="ticker-track"><span>Backend systems</span><span>Real-time applications</span><span>AI developer tools</span><span>Product-minded engineering</span><span>Backend systems</span><span>Real-time applications</span><span>AI developer tools</span><span>Product-minded engineering</span></div></div>

        <div className="stats" aria-label="Highlights"><div className="stat reveal"><b>600+</b><span>DSA problems solved</span></div><div className="stat reveal"><b>8.65</b><span>CGPA / 10 at MAIT</span></div><div className="stat reveal"><b>10+</b><span>simultaneous collaborators supported</span></div></div>

        <section id="about"><div className="wrap"><SectionHead number="01" title={<>THE<br />HUMAN<br />BIT.</>} intro="Backend-minded full-stack developer. B.Tech IT student. Curious about how products hold together when real people start using them." /><div className="about-grid reveal"><div className="about-main"><p>I like the part of a product users never see: the API contracts, data model, access rules, and systems that keep everything consistent.</p><p>I work with React, Next.js, Node.js, Express.js, MongoDB, and PostgreSQL. I’ve shipped a published CLI, a real-time collaborative editor, and a role-based business platform.</p></div><div className="services"><Service title="For teams" text="Ship clean features, untangle backend complexity, and contribute quickly inside an engineering workflow." color="lime" /><Service title="For founders" text="Turn a rough product idea into a working full-stack build with clear architecture and room to grow." color="blue" /><Service title="For humans" text="Communicate clearly, document decisions, and leave codebases easier to understand than I found them." color="orange" /></div></div></div></section>

        <section id="projects"><div className="wrap"><SectionHead number="02" title={<>BUILT.<br />TESTED.<br />SHIPPED.</>} intro="Three projects that show how I think: useful interfaces on top, serious engineering underneath." /><div className="project-list">{projects.map((project) => <article className="project reveal" key={project.name}><div className="project-info"><div className="project-number"><span>{project.category}</span><span>↘</span></div><h3>{project.name}</h3><p className="tag">{project.tag}</p><ul className="chips">{project.tech.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="project-visual tilt-card"><ProjectVisual type={project.visual} /></div><div className="project-details"><details><summary>Engineering contributions</summary><ul className="project-points">{project.points.map((point) => <li key={point}>{point}</li>)}</ul></details><div className="project-links">{project.links.map(([name, url]) => <a href={url} target="_blank" rel="noopener noreferrer" key={url}>{name} ↗</a>)}</div></div></article>)}</div></div></section>

        <section id="experience"><div className="wrap"><SectionHead number="03" title={<>ON THE<br />JOB.</>} intro="Shipping features with a team taught me that good engineering is as much about collaboration as implementation." /><div className="experience-grid reveal"><div className="experience-main"><div className="role"><h3>CommuSync</h3><div className="meta">FULL STACK DEVELOPER INTERN<br />JUN — AUG 2026<br />QUALIFIRE</div></div><ul><li>Built and maintained RESTful APIs for candidate management, profile updates, and resume uploads.</li><li>Implemented secure PDF/DOCX uploads with Cloudinary and database integration.</li><li>Developed backend features with Node.js, Express.js, MongoDB, and TypeScript.</li><li>Worked in a modular route / controller / service architecture.</li><li>Collaborated in Agile ceremonies, code reviews, and API documentation.</li></ul><ul className="chips"><li>Node.js</li><li>Express.js</li><li>MongoDB</li><li>TypeScript</li><li>Cloudinary</li><li>Git</li></ul></div><div className="about-main"><div className="eyebrow">What I keep coming back to</div><ul className="interest-list">{interests.map((interest) => <li key={interest}>{interest}</li>)}</ul></div></div></div></section>

        <section id="skills"><div className="wrap"><SectionHead number="04" title={<>THE<br />STACK.</>} intro="Tools are interchangeable. Strong fundamentals, thoughtful trade-offs, and the ability to learn are the real stack." /><div className="skills-grid reveal">{Object.entries(skills).map(([name, items]) => <div className="skill-group" key={name}><h3 className="skill-title">{name}</h3><ul className="chips">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></div></section>

        <section id="education"><div className="wrap"><SectionHead number="05" title={<>STILL<br />LEARNING.</>} intro="School gave me the theory. Projects and production work keep forcing me to make it useful." /><div className="education-grid reveal"><div className="education-main"><h3>Maharaja Agrasen Institute of Technology (MAIT), GGSIPU</h3><p>B.Tech in Information Technology<br />AUGUST 2023 — JUNE 2027<br />CGPA: 8.65 / 10</p></div><div className="education-side"><div className="eyebrow">Problem solving</div><p className="education-copy">600+ DSA problems solved across LeetCode and GeeksforGeeks.</p></div></div></div></section>

        <section id="contact"><div className="wrap"><div className="eyebrow">06 / your move</div><h2>HAVE A<br /><span>PROBLEM?</span></h2><p className="contact-copy">I’m open to software engineering opportunities, developer tools, and freelance projects where thoughtful engineering can make a visible difference.</p><div className="hero-actions"><ButtonLink href={`mailto:${profile.email}`} className="primary">{profile.email} ↗</ButtonLink><ButtonLink href={`tel:${profile.phone}`}>Call me ↗</ButtonLink><ButtonLink href={profile.resume} external>Resume ↗</ButtonLink></div></div></section>
      </main>
      <footer><div className="wrap"><span>© 2026 Tushar Mishra / Built with intent.</span><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}

function SectionHead({ number, title, intro }: { number: string; title: React.ReactNode; intro: string }) {
  return <div className="section-head"><div><div className="eyebrow">{number} / portfolio</div><h2>{title}</h2></div><div className="section-intro"><p>{intro}</p></div></div>;
}

function Service({ title, text, color }: { title: string; text: string; color: string }) {
  return <div className={`service-card ${color}`}><h3>{title}</h3><p>{text}</p></div>;
}
