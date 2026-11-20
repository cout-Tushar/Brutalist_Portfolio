export const profile = {
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

export const interests = [
  "Backend development and REST API design",
  "Real-time systems using WebSockets",
  "AI-powered developer tools",
  "Authentication and access control",
  "Database design and software architecture",
  "Data structures and algorithmic problem-solving",
];

export const skills = {
  Languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "C++",
    "C",
    "SQL",
    "HTML5",
    "CSS3",
  ],
  Frontend: [
    "React.js",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Material UI",
    "Responsive Design",
  ],
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
  "DevOps and Infrastructure": ["Docker", "Vercel", "Cloudinary"],
  Tools: ["Git", "GitHub", "npm", "Postman", "VS Code"],
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

export const projects = [
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
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    points: [
      "Role-based access control for administrators, supervisors, and engineers.",
      "Construction site management, workforce and attendance tracking.",
      "Daily progress, work status, inventory, and material request reporting.",
      "Document uploads with cloud storage behind protected backend APIs.",
    ],
    links: [["Live demo", "https://constucton-site-management.vercel.app/"]],
    visual: "dashboard",
  },
  {
    name: "Distributed Task Scheduler & Job Queue Engine",
    category: "04 / Distributed systems",
    tag: "A browser console for submitting jobs, inspecting attempt history, and replaying dead-lettered jobs.",
    tech: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "BullMQ", "Docker Compose"],
    points: [
      "Built an asynchronous job processing system with independently scalable workers for PDF generation, email processing, and video transcoding. Created a browser console to submit jobs, inspect attempt history, and replay dead-lettered jobs.",
      "Designed a PostgreSQL transactional outbox to preserve accepted jobs during Redis outages. Added idempotency keys so concurrent submissions with the same key and payload return one job ID.",
      "Implemented exponential backoff with jitter and a circuit breaker that preserves retry budgets. Verified recovery through integration tests that stopped Redis, restarted the API, and killed a worker after a mock email provider accepted a message.",
    ],
    links: [],
    visual: "queue",
  },
];
