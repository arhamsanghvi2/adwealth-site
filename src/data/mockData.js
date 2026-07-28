// Mock data for the Adwealth Fintech Platform

export const companyDetails = {
  name: "Adwealth",
  mission: "To eliminate complexity and latency in institutional corporate actions by providing an automated, real-time, error-free processing engine.",
  vision: "To become the global standard routing and processing network for all corporate actions, connecting custodians, brokers, and investment managers seamlessly.",
  values: [
    {
      title: "Zero Tolerance for Error",
      description: "In financial processing, a single decimal point or missed date can cost millions. We design for absolute precision."
    },
    {
      title: "Real-Time Clarity",
      description: "Information should flow instantly. We eradicate the lags inherent in traditional legacy systems."
    },
    {
      title: "Minimalist Execution",
      description: "Complexity is the enemy of security and speed. Our systems and interfaces do exactly what is needed, beautifully."
    }
  ],
  team: [
    {
      id: "t1",
      name: "Aarav Mehta",
      role: "Founder & CEO",
      bio: "Former Head of Quantitative Trading at a global investment bank. 15+ years of fintech architecture design.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "t2",
      name: "Sarah Jenkins",
      role: "Chief Technology Officer",
      bio: "Expert in distributed ledger technology and high-throughput transaction systems. Formerly senior architect at AWS.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "t3",
      name: "Patel Harsh",
      role: "Head of Product",
      bio: "Specializes in clearing, settlement, and asset servicing workflows. Committed to building ultra-clean user experiences.",
      image: "/src/assets/harsh1.png"
    }
  ]
};

export const corporateActionProduct = {
  id: "corporate-action",
  name: "Corporate Actions",
  tagline: "Track and analyze exchange announcements in real-time.",
  description: "Track live corporate action events like dividends, stock splits, bonus issues, buybacks, and mergers. Our platform automatically aggregates, categorizes, and provides AI-powered summaries of official NSE and BSE regulatory filings for rapid decision making.",
  benefits: [
    {
      metric: "100%",
      label: "Real-Time Tracking",
      description: "Direct exchange feeds monitor live NSE and BSE announcements with zero delay."
    },
    {
      metric: "AI",
      label: "Instant Summaries",
      description: "Regulatory PDF filings are automatically summarized into key bullet points."
    },
    {
      metric: "0",
      label: "Missed Events",
      description: "Keep track of ex-dates, record dates, and payment schedules in a unified calendar."
    }
  ],
  features: [
    {
      icon: "ShieldAlert",
      title: "Smart Announcement Detection",
      description: "Aggregates and normalizes structured and unstructured data feeds (SWIFT, PDFs, exchange bulletins) to form a single Golden Record of truth."
    },
    {
      icon: "Cpu",
      title: "Automated Entitlement Calculation",
      description: "Computes precise cash and stock distributions for hundreds of thousands of accounts in real-time, matching internal books with depository records."
    },
    {
      icon: "Layers",
      title: "Multi-Channel Election Routing",
      description: "Collects election responses from beneficial owners and automates downstream transmission to custodians with full audit tracking."
    },
    {
      icon: "Activity",
      title: "Immutable Audit Trail",
      description: "Every parsed document, override, validation step, and transmission is signed and timestamped on a local secure ledger for complete compliance."
    }
  ],
  workflow: [
    {
      step: "01",
      title: "Ingestion & Normalization",
      description: "The engine consumes incoming feeds from SWIFT ISO 15022/20022 messages, exchange APIs, and custodian emails."
    },
    {
      step: "02",
      title: "Deduplication & Verification",
      description: "Machine learning heuristics compare conflicting announcement details, flag variations, and establish a single source of truth."
    },
    {
      step: "03",
      title: "Entitlement Matching",
      description: "Systems map the positions of eligible accounts at the record date to estimate expected payouts or available choices."
    },
    {
      step: "04",
      title: "Downstream Orchestration",
      description: "Final cash payments are initiated, or elections are transmitted before deadline cutoffs with zero manual entry."
    }
  ],
  audience: [
    {
      group: "Global Custodians",
      useCase: "Automate complex asset servicing notifications to institutional clients while tracking election cut-offs."
    },
    {
      group: "Wealth Management Firms",
      useCase: "Deliver timely notifications to retail and high-net-worth accounts, enabling streamlined digital selection."
    },
    {
      group: "Fund Administrators",
      useCase: "Reconcile corporate actions against portfolios to ensure accurate NAV calculations and minimize operational adjustments."
    }
  ]
};

export const careersData = {
  perks: [
    {
      title: "Work from Anywhere",
      description: "Fully remote or hybrid workspaces. Choose where you are most productive."
    },
    {
      title: "Premium Hardware",
      description: "Top-tier MacBook Pro, external 4K monitors, and an ergonomic home office budget."
    },
    {
      title: "Comprehensive Health",
      description: "100% covered premium medical, dental, and mental health subscriptions for you and dependents."
    },
    {
      title: "Growth Stipend",
      description: "$2,000 annual learning budget for courses, books, conferences, or professional coaching."
    }
  ],
  jobs: [
    {
      id: "j1",
      title: "Lead Frontend Engineer",
      department: "Engineering",
      location: "Mumbai, India / Remote",
      type: "Full-Time",
      experience: "5+ Years",
      salary: "Competitive Equity + Top-tier Compensation",
      summary: "We are seeking a senior React developer to spearhead our interface engineering. You will own the core architecture of our fintech dashboards, ensuring security, performance, and pixel-perfect design.",
      requirements: [
        "Expert knowledge of modern React (v18/19), Hooks, and state management strategies.",
        "Deep familiarity with Tailwind CSS, Framer Motion, and building smooth, micro-animated client UIs.",
        "Experience optimizing bundle sizes, Web Vitals, and implementing security best practices (CORS, XSS prevention).",
        "Understanding of financial charting components and high-throughput real-time WebSocket feeds is a plus."
      ]
    },
    {
      id: "j2",
      title: "Senior Product Designer",
      department: "Product Design",
      location: "Remote (Global)",
      type: "Full-Time",
      experience: "4+ Years",
      salary: "Competitive Compensation + Equity",
      summary: "You will collaborate closely with engineering and product heads to shape the design language of our core products. We value hyper-minimalism, high information density without clutter, and sleek dark modes.",
      requirements: [
        "A strong portfolio showing complex system dashboards, transaction logs, or trading software.",
        "Mastery of Figma, component libraries, and creating responsive layout specs.",
        "Ability to code interactive prototypes in HTML/CSS/React is highly valued.",
        "A philosophy aligned with minimalist, high-contrast typography and clean visual hierarchies."
      ]
    },
    {
      id: "j3",
      title: "Quantitative Systems Engineer",
      department: "Engineering / Infrastructure",
      location: "Mumbai, India (Hybrid)",
      type: "Full-Time",
      experience: "3+ Years",
      salary: "Competitive",
      summary: "Help build the processing pipelines that ingest and normalize custodian data. You will work on robust parser microservices, concurrency handling, and ledger databases.",
      requirements: [
        "Proficiency with Python (FastAPI), C++ or Rust.",
        "Experience working with SWIFT (MT564/MT568, MX camt.053) or ISO 20022 message parsing.",
        "Strong understanding of relational databases (PostgreSQL/SQLite) and distributed streaming tools (Kafka, Redis).",
        "Rigorous testing discipline: writing deterministic integrations and performance stress-testing."
      ]
    }
  ]
};

export const contactDetails = {
  email: "operations@adwealth.co",
  phone: "+91 22 8974 5500",
  address: "Level 14, Platina Tower, Bandra Kurla Complex, Mumbai, MH, 400051",
  workingHours: "Monday - Friday, 9:00 AM - 6:00 PM IST"
};
