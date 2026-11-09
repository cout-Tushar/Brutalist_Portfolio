import HammyInstall from "./components/hammy-install";
import {
  Navigation,
  MotionLayer,
  HeroCore,
  Architecture,
  ProjectDemo,
  SkillExplorer,
} from "./components/experience";
import { profile, skills, interests, projects } from "./content";

function Link({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      className={primary ? "button primary" : "button"}
      href={href}
      {...(href.startsWith("https")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      data-magnetic
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
function SectionLabel({
  n,
  children,
}: {
  n: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label mono">
      <span className="accent">[ {n} ]</span>
      {children}
    </div>
  );
}
export default function Home() {
  const ordered = [projects[2], projects[1], projects[0]];
  const stories = [
    {
      slug: "buildcore",
      title: "Complex operations.\nClear control.",
      challenge:
        "Keeping construction workflows and access rules organized across different roles.",
      solution:
        "Role-based access for administrators, supervisors, and engineers, with protected APIs for site operations, inventory, attendance, and documents.",
    },
    {
      slug: "coop",
      title: "Different places.\nThe same workspace.",
      challenge:
        "Keeping a shared coding environment synchronized as collaborators edit.",
      solution:
        "Socket.io-based live code synchronization, backed by Express APIs, JWT authentication, and persistent MongoDB storage.",
    },
    {
      slug: "hammy",
      title: "Your next API call.\nA little smarter.",
      challenge:
        "Moving between API execution, saved requests, and AI-assisted explanations.",
      solution:
        "A modular TypeScript CLI brings HTTP requests, persistent collections, and Groq-powered review into a terminal workflow.",
    },
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <MotionLayer />
      <Navigation />
      <main id="main">
        <section className="hero shell" id="top">
          <div className="hero-top mono">
            <span>TUSHAR MISHRA / DELHI, INDIA</span>
            <span>
              <i className="status-dot" /> OPEN TO OPPORTUNITIES
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="role-label">Backend / Full-Stack Developer</p>
              <h1>
                Built to work.
                <br />
                <span>Engineered</span>
                <br />
                to <em>connect.</em>
              </h1>
              <p className="intro">
                I build the systems behind the experience.
                <br />
                Dependable APIs, real-time applications, and tools that make
                developers faster.
              </p>
              <div className="hero-actions">
                <Link href="#work" primary>
                  Explore my work
                </Link>
                <Link href={profile.resume}>View resume</Link>
              </div>
            </div>
            <HeroCore />
          </div>
          <div className="hero-bottom mono">
            <a href="#work">
              <span className="scroll-icon">↓</span> SCROLL TO EXPLORE
            </a>
            <span>THOUGHTFUL INTERFACES. SERIOUS ENGINEERING.</span>
            <span>PORTFOLIO / 2026</span>
          </div>
        </section>
        <div className="discipline-strip mono">
          <span>BACKEND ENGINEERING</span>
          <i>✳</i>
          <span>REAL-TIME SYSTEMS</span>
          <i>✳</i>
          <span>DEVELOPER TOOLS</span>
          <i>✳</i>
          <span>FULL-STACK PRODUCTS</span>
        </div>
        <section id="work" className="work-section shell section-space">
          <SectionLabel n="01">
            SELECTED WORK / THREE DIFFERENT CHALLENGES
          </SectionLabel>
          <div className="section-heading reveal">
            <h2>
              Ideas are good.
              <br />
              <span>Working software is better.</span>
            </h2>
            <p>
              From construction sites to shared code editors.
              <br />A selection of things I have built.
            </p>
          </div>
          {ordered.map((project, i) => (
            <article
              className={"project project-" + stories[i].slug}
              key={project.name}
            >
              <div className="project-heading">
                <span className="mono muted">
                  0{i + 1} /{" "}
                  {i === 0
                    ? "FLAGSHIP PROJECT"
                    : i === 1
                      ? "REAL-TIME COLLABORATION"
                      : "DEVELOPER TOOLING"}
                </span>
                <h3>{project.name}</h3>
                <span className="project-type mono">
                  {i === 0
                    ? "BUSINESS SYSTEMS"
                    : i === 1
                      ? "CONNECTED EXPERIENCES"
                      : "AI + PRODUCTIVITY"}
                </span>
              </div>
              <div className="project-grid">
                <div className="project-story reveal">
                  <h4>
                    {stories[i].title.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h4>
                  <p>{project.tag}</p>
                  <ul className="tech-list">
                    {project.tech.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="contribution">
                    <span className="mono">THE CHALLENGE</span>
                    <p>{stories[i].challenge}</p>
                    <span className="mono">MY CONTRIBUTION</span>
                    <p>{stories[i].solution}</p>
                  </div>
                  <details>
                    <summary>
                      Explore engineering details <span>+</span>
                    </summary>
                    <ul>
                      {project.points
                        .filter(
                          (point) =>
                            !point.includes("sub-200") &&
                            !point.includes("10+"),
                        )
                        .map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                    </ul>
                  </details>
                  <div className="project-links">
                    {project.links.map(([name, url]) => (
                      <Link href={url} key={url}>
                        {name === "GitHub repository" ? "Source code" : name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="project-visual-stack">
                  <ProjectDemo type={stories[i].slug} />
                  {i === 2 && <HammyInstall />}
                </div>
              </div>
            </article>
          ))}
        </section>
        <section id="approach" className="approach-section section-space">
          <div className="shell">
            <SectionLabel n="02">BEHIND THE INTERFACE</SectionLabel>
            <div className="section-heading reveal">
              <h2>
                A good interface.
                <br />
                <span>A better system underneath.</span>
              </h2>
              <p>
                I care about the part you don’t see:
                <br />
                contracts, access rules, and consistent data.
              </p>
            </div>
            <Architecture />
          </div>
        </section>
        <section id="about" className="about-section shell section-space">
          <SectionLabel n="03">THE HUMAN IN THE LOOP</SectionLabel>
          <div className="about-grid">
            <div className="about-heading reveal">
              <h2>
                Curious by default.
                <br />
                <span>Engineer by practice.</span>
              </h2>
              <div className="identity-mark" aria-hidden="true">
                t<span>m</span>
                <small>BASED IN DELHI, INDIA ↗</small>
              </div>
            </div>
            <div className="about-copy">
              <p className="large-copy">
                I’m Tushar. I like turning complicated problems into software
                people can actually use.
              </p>
              <p>
                I’m a B.Tech Information Technology student at MAIT, GGSIPU. My
                work spans React and Next.js interfaces, Node.js services,
                real-time applications, and AI-powered developer tools.
              </p>
              <p>
                For teams, I bring clear communication and a willingness to
                untangle backend complexity. For founders, I bring an interest
                in turning a rough idea into a working product with a thoughtful
                foundation.
              </p>
              <div className="achievement-row">
                <div>
                  <strong>
                    600<span>+</span>
                  </strong>
                  <p>
                    DSA problems solved
                    <br />
                    LeetCode & GeeksforGeeks
                  </p>
                </div>
                <div>
                  <strong>
                    8.65<span>/10</span>
                  </strong>
                  <p>
                    CGPA
                    <br />
                    MAIT, GGSIPU
                  </p>
                </div>
              </div>
              <details>
                <summary>
                  What keeps me curious <span>+</span>
                </summary>
                <ul>
                  {interests.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-title">
              <span className="mono accent">EXPERIENCE & EDUCATION</span>
              <h3>Learning by building.</h3>
            </div>
            <div className="timeline-items">
              <article className="timeline-item reveal">
                <span className="mono muted">JUN — AUG 2026</span>
                <h4>Full Stack Developer Intern</h4>
                <p className="employer">CommuSync / Qualifire</p>
                <p>
                  Built and maintained RESTful APIs for candidate management,
                  profile updates, and resume uploads. Implemented PDF/DOCX
                  uploads with Cloudinary and database integration.
                </p>
                <p>
                  Worked with Node.js, Express.js, MongoDB, and TypeScript in a
                  modular route / controller / service architecture,
                  contributing through Agile ceremonies, code reviews, and API
                  documentation.
                </p>
              </article>
              <article className="timeline-item reveal">
                <span className="mono muted">AUG 2023 — JUN 2027</span>
                <h4>B.Tech, Information Technology</h4>
                <p className="employer">
                  Maharaja Agrasen Institute of Technology
                </p>
                <p>
                  GGSIPU · CGPA 8.65 / 10. Developing foundations in data
                  structures, algorithms, databases, operating systems, and
                  computer networks.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section id="skills" className="skills-section shell section-space">
          <SectionLabel n="04">TOOLS WITH A PURPOSE</SectionLabel>
          <div className="section-heading reveal">
            <h2>
              The right tool.
              <br />
              <span>For the real problem.</span>
            </h2>
            <p>
              Frameworks evolve.
              <br />
              Good engineering fundamentals stay.
            </p>
          </div>
          <SkillExplorer groups={skills} />
        </section>
        <section id="contact" className="contact-section section-space">
          <div className="shell">
            <SectionLabel n="05">NEXT, LET’S BUILD SOMETHING</SectionLabel>
            <p className="contact-availability">
              <i className="status-dot" /> Open to engineering roles, freelance
              projects, and interesting technical problems.
            </p>
            <h2>
              Have a good
              <br />
              <em>problem?</em>
              <span className="contact-arrow" aria-hidden="true">
                ↗
              </span>
            </h2>
            <a className="email-link" href={"mailto:" + profile.email}>
              {profile.email}
              <span>↗</span>
            </a>
            <div className="contact-bottom">
              <p>Let’s talk through it.</p>
              <div className="social-links">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume ↗
                </a>
                <a href={"tel:" + profile.phone}>Call ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell mono">
        <span>© 2026 TUSHAR MISHRA</span>
        <span>BUILT WITH INTENT.</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
