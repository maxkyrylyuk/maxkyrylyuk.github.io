import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Github,
  GraduationCap,
  Linkedin,
  Link as LinkIcon,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
  UserRound,
  Info,
  Folder,
  Briefcase,
  FileText,
  BookOpen,
  Home,
  ClipboardCheck,
  LineChart,
  Globe,
  Scale,
  CloudSun,
  PlugZap,
} from "lucide-react";

function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}
function CardHeader({ className = "", children }) {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
function CardTitle({ className = "", children }) {
  return <div className={`font-semibold ${className}`}>{children}</div>;
}

function Button({ variant, className = "", style, children, asChild = false, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition leading-none";
  const solid = "text-white";
  const outline = "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50";

  const finalClassName = `${base} ${variant === "outline" ? outline : solid} ${className}`;

  // If asChild=true, clone the child (usually <a>) and apply button styling to it.
  if (asChild && React.isValidElement(children)) {
    const child = children;
    return React.cloneElement(child, {
      ...props,
      className: `${finalClassName} ${child.props.className || ""}`,
      style: { ...(child.props.style || {}), ...(style || {}) },
    });
  }

  return (
    <button {...props} className={finalClassName} style={style} type={props.type || "button"}>
      {children}
    </button>
  );
}

function Separator({ orientation = "horizontal", className = "" }) {
  if (orientation === "vertical") return <div className={`w-px bg-zinc-200 ${className}`} />;
  return <div className={`h-px w-full bg-zinc-200 ${className}`} />;
}

/**
 * White page, black/grey minimalism, bright blue accent (#0052FE).
 */

const ACCENT_HEX = "#0052fe";
const PHOTO_URL = "/max.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/maxkyrylyuk/";
const GITHUB_URL = "https://github.com/maxk2107"; // keep for Links section
const EMAIL = "maxkyrylyuk06@gmail.com";
const CV_URL = "https://drive.google.com/file/d/1IrIUCMElBuT97yMOxf4VuMMRNTkLOs9L/view";

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-sm text-zinc-600 hover:text-zinc-950 transition">
      {children}
    </a>
  );
}

function PrimaryButton({ children, ...props }) {
  return (
    <Button
      {...props}
      className={`rounded-xl text-white hover:opacity-95 ${props.className || ""}`}
      style={{ backgroundColor: ACCENT_HEX }}
    >
      {children}
    </Button>
  );
}

function OutlineButton({ children, ...props }) {
  return (
    <Button
      {...props}
      variant="outline"
      className={`rounded-xl border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 ${props.className || ""}`}
    >
      {children}
    </Button>
  );
}

function Section({ id, tone = "white", children }) {
  const bg = tone === "soft" ? "bg-zinc-50" : "bg-white";
  return (
    <section id={id} className={`scroll-mt-24 ${bg} py-14 sm:py-16`}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

function Divider() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px w-full bg-zinc-200" />
      </div>
    </div>
  );
}

function ProjectCard({ p, onExpand }) {
  return (
    <Card className="flex h-full flex-col rounded-2xl border-zinc-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-zinc-950">{p.title}</div>
            <div className="mt-1 text-sm text-zinc-600">{p.oneLiner}</div>
          </div>
          <div className="shrink-0 rounded-xl border border-zinc-200 bg-white p-2">
            <p.icon className="h-5 w-5" style={{ color: ACCENT_HEX }} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex-1 text-sm leading-relaxed text-zinc-600">{p.blurb}</div>

        {/* Footer: status + primary CTA anchored to bottom */}
        <div className="mt-auto space-y-3 pt-1">
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700"
              >
                {t}
              </span>
            ))}
          </div>

          <PrimaryButton
            className="w-full rounded-xl"
            onClick={() => onExpand(p)}
          >
            Expand <ArrowRight className="ml-2 h-4 w-4" />
          </PrimaryButton>
        </div>
      </CardContent>
    </Card>
  );
}

function ExperienceItem({ role, org, meta, bullets }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="font-semibold text-zinc-950">{role}</div>
        <div className="text-sm text-zinc-600">{meta}</div>
      </div>
      <div className="mt-1 text-sm text-zinc-600">{org}</div>
      <ul className="mt-4 space-y-2 text-sm text-zinc-600">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-xl border border-zinc-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-start justify-between gap-4 p-6 border-b border-zinc-200">
          <div className="min-w-0">
            <div className="text-xl font-semibold text-zinc-950">{project.title}</div>
            <div className="mt-1 text-sm text-zinc-600">{project.oneLiner}</div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            type="button"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {project.details ? (
            <div className="space-y-3 text-sm leading-relaxed text-zinc-600">
              {project.details.split("\n\n").map((block, i) => {
                const headings = [
                  "Overview",
                  "How it works",
                  "Features",
                  "Roadmap",
                  "Why it matters",
                  "Testing",
                  "Outputs",
                ];

                const matchedHeading = headings.find((h) => block.startsWith(h));

                if (matchedHeading) {
                  const content = block.replace(matchedHeading, "").trim();

                  return (
                    <div key={i} className="space-y-1">
                      <div className="font-semibold text-zinc-950">{matchedHeading}</div>
                      {content && <p className="text-zinc-600">{content}</p>}
                    </div>
                  );
                }

                return <p key={i}>{block}</p>;
              })}
            </div>
          ) : null}

          {project.image ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-3">
              <img
                src={project.image}
                alt={`${project.title} example output`}
                className="w-full max-h-[380px] object-contain rounded-xl bg-zinc-50"
              />
              <div className="mt-2 text-xs text-zinc-500">Output from the {project.title}.</div>
            </div>
          ) : null}

          {project.highlights?.length ? (
            <div>
              <div className="text-sm font-medium text-zinc-950">Highlights</div>
              <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.stack?.length ? (
            <div>
              <div className="text-sm font-medium text-zinc-950">Stack</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {project.links?.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.links.map((l) => (
                <Button
                  key={l.label}
                  variant="outline"
                  className="rounded-xl border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
                  onClick={() => window.open(l.href, "_blank")}
                >
                  {l.label} <ArrowRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#links", label: "Resume" },
    ],
    []
  );

  const books = useMemo(
    () => [
      {
        title: "Thinking, Fast and Slow",
        cover: "/books/fast-slow.png",
      },
      {
        title: "The Psychology of Money",
        cover: "/books/psychology-money.png",
      },
      {
        title: "Sapiens",
        cover: "/books/sapiens.png",
      },
      {
        title: "Think Again",
        cover: "/books/think-again.png",
      },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "Regulatory Controls Mapper",
        oneLiner: "Control mapping at speed.",
        blurb:
          "Automates the mapping of internal controls to evolving regulatory frameworks, using LLM-assisted clause analysis to identify best-fit controls, surface gaps, and quantify compliance across jurisdictions.",
        tags: ["Built"],
        icon: ClipboardCheck,
        image: "/regmap.png",

        details:
          "Overview\nDeveloped during my summer internship at Coinbase, this tool streamlines how internal controls are mapped to evolving regulatory frameworks. The goal was to reduce manual review effort, minimise mapping errors, and improve consistency across multi-jurisdictional requirements such as MiCA.\n\nHow it works\nThe system integrates a Python-based application with Gemini API calls to interpret and structure regulatory text. Internal controls are ingested from a central controls database, while regulatory frameworks are provided as importable datasets. When a new or revised regulation is introduced, the tool parses regulatory clauses and compares them against existing controls to surface the best-fit mappings.\n\nOutputs\nProduces mapping reports with traceable rationale, highlights unmapped areas, and quantifies coverage using a compliance score to support audit readiness and remediation prioritisation.",
        highlights: [
          "LLM-assisted clause parsing and requirement structuring (Gemini API)",
          "Maps internal controls to requirements with traceable rationale",
          "Generates coverage scores and flags unmapped or low-coverage areas",
        ],
        stack: ["Python", "API keys", "Automation design", "Control mapping", "Gap analysis"],
        links: [],
      },
      {
        title: "Algorithmic Trading System",
        oneLiner: "Operate across all market regimes.",
        blurb:
          "A multi-asset algorithmic trading system built in MQL5 for MetaTrader 5, automating trade execution, risk management, and position sizing across currencies, indices, equities, and crypto markets.",
        tags: ["Built"],
        icon: LineChart,
        image: "/algo.png",
        details:
          "Overview\nDeveloped independently, this project focuses on building a multi-asset algorithmic trading system in MQL5 for deployment in MetaTrader 5. The objective was to automate trade execution while enforcing consistent risk management across currencies, indices, equities, and crypto markets.\n\nHow it works\nThe system is structured as a modular trading framework rather than a single rigid strategy. Custom indicators capture momentum and volatility conditions, while a dynamic risk engine adjusts position sizing based on drawdown, volatility, and exposure limits. Temporal logic controls when trades can be entered and exited to reflect global trading sessions and liquidity conditions. Execution protocols are optimised to reduce slippage, particularly around high-impact macroeconomic events.\n\nTesting\nThe model was evaluated using MetaTrader 5’s Strategy Tester, with backtests spanning up to 20 years per asset class to assess robustness across different market regimes.",
        highlights: [
          "Custom momentum and volatility indicators",
          "Dynamic risk engine with adaptive position sizing and drawdown control",
          "Session-aware temporal trade logic",
          "Optimised execution rules to reduce slippage",
        ],
        stack: ["MQL5", "Quantitative Modelling", "Strategy Development", "Statistical Analysis", "Risk Management"],
        links: [],
      },
      {
        title: "Macro Economic Intelligence",
        oneLiner: "Instant macro comparisons.",
        blurb:
          "A lightweight macro scanner that scrapes public data sources (no paid APIs) to standardise key indicators and enable fast, side-by-side country/asset comparisons. Designed to evolve into scoring and forward-looking regime/strength modelling.",
        tags: ["Prototype"],
        icon: Globe,
        image: "/macro.png",
        details:
          "Overview\nMacro Economic Intelligence is a web-scraper driven dashboard built for fast decision-making without relying on paid data APIs. It pulls key economic indicators for major countries/regions, cleans inconsistent formats, and presents a standardised view you can compare instantly.\n\nHow it works\nThe tool ingests public releases and structured pages, then normalises units, frequencies, and naming so indicators can be compared like-for-like across assets/countries. A comparison view allows selecting two regions (e.g., EUR vs USD) and instantly seeing the latest values, changes vs previous, and release metadata.\n\nFeatures\n- Side-by-side comparisons across countries/regions and their linked assets\n- Standardised tables (Current / Previous / Δ / Expected / Surprise)\n- Release context (published date, next release when available)\n- Extensible indicator set (unemployment, inflation, rates, retail sales, PMIs, PPI, GDP)\n\nRoadmap\nNext iterations add computed layers on top of the data:\n- Strength scoring (inflation vs growth vs labour + rate differentials)\n- Regime classification (risk-on / risk-off) using explainable rules\n- Forecast helpers and scenario tables to model potential forward behaviour\n\nWhy it’s valuable\nMacro is usually slow because the data is messy and scattered. This tool makes macro comparison instant and repeatable, reducing prep time and enabling quicker, more consistent market context for trading and allocation decisions.",
        highlights: [
          "Scrapes and standardises macro indicators without paid APIs",
          "Comparison view for rapid EUR vs USD (or any pair) analysis",
          "Designed for computed strength/regime layers and future forecasting",
        ],
        stack: [
          "Python",
          "Web scraping",
          "Data normalisation",
          "Tables & dashboards",
          "Extensible indicator library",
        ],
        links: [],
      },
      {
        title: "Portfolio Risk Rater",
        oneLiner: "Quantifying portfolio risk at a glance.",
        blurb:
          "A rules-based rating system that scores portfolios across volatility, drawdown, concentration, and exposure metrics, translating complex risk profiles into a single interpretable risk grade.",
        tags: ["In Development"],
        icon: Scale,

        details:
          "Overview\nPortfolio Risk Rater summarises portfolio risk into a clear, comparable score. It focuses on risk characteristics rather than returns, enabling faster oversight and cleaner decision-making.\n\nHow it works\nThe model evaluates portfolios across volatility, drawdowns, concentration, and exposure. Each metric is normalised and combined into a proprietary scoring framework that outputs an overall risk rating with supporting breakdowns.\n\nWhy it matters\nRisk is often understood too late or too subjectively. This tool makes portfolio risk explicit, repeatable, and comparable across strategies or time periods.",
        highlights: [
          "Multi-factor risk scoring (volatility, drawdown, concentration)",
          "Single interpretable risk rating with transparent components",
          "Built for monitoring, review, and portfolio comparison",
        ],
        stack: ["Risk metrics", "Scoring logic", "Portfolio analytics"],
        links: [],
      },
      {
        title: "Valuation Model",
        oneLiner: "Value through fundamentals.",
        blurb:
          "Integrated financial model linking the three statements to forecast cash flows and estimate intrinsic value using discounted cash flow analysis.",
        tags: ["In Development"],
        icon: BarChart3,

        details:
          "Overview\nThe Valuation Model is a fundamentals-driven framework used to estimate intrinsic value through cash-flow analysis. It prioritises clarity and internal consistency over complexity.\n\nHow it works\nThe model links the income statement, balance sheet, and cash flow statement to forecast free cash flows. Key assumptions remain explicit, enabling sensitivity and scenario analysis across growth, margins, and discount rates.\n\nWhy it matters\nValuation is only meaningful if cash flows are internally consistent. This model provides a structured way to assess value and compare scenarios with confidence.",
        highlights: [
          "Fully linked three-statement financial model",
          "DCF-based intrinsic value estimation",
          "Scenario and sensitivity-driven valuation analysis",
        ],
        stack: ["Financial modelling", "DCF analysis", "Forecasting logic"],
        links: [],
      },
      {
        title: "Tax Cash Flow Model",
        oneLiner: "When tax actually hits cash.",
        blurb:
          "Separates accounting tax expense from cash tax paid and models the timing of deferred tax reversals to improve cash flow and valuation accuracy.",
        tags: ["In Development"],
        icon: FileText,

        details:
          "Overview\nThe Tax Cash Flow Model focuses on when tax actually impacts cash, rather than when it appears on the income statement.\n\nHow it works\nThe model separates accounting tax expense from cash tax paid and tracks deferred tax assets and liabilities. It explicitly models the timing of reversals to align tax with real cash flows.\n\nWhy it matters\nTax timing materially affects liquidity and valuation. This model improves cash-flow accuracy and avoids misrepresenting economic performance.",
        highlights: [
          "Clear separation of accounting vs cash tax",
          "Explicit modelling of deferred tax reversals",
          "Improved cash flow and valuation accuracy",
        ],
        stack: ["Tax modelling", "Cash flow analysis", "Financial statements"],
        links: [],
      },
    ],
    []
  );

  const experience = useMemo(
    () => [
      {
        role: "Investment Analyst Intern",
        org: "TET Capital",
        meta: "Sep 2025 – Present",
        bullets: [
          "Analysed unemployment, interest rates, and inflation to assess macro risk conditions across FX, futures, crypto, oil, and precious metals.",
          "Translated macro signals into daily investment inputs to support positioning and risk management decisions.",
        ],
      },
      {
        role: "Internal Audit Intern",
        org: "Coinbase",
        meta: "May 2025 – Aug 2025",
        bullets: [
          "Built automation to map internal controls to MiCA, ESMA, SOX, and CBI frameworks, enabling real-time gap analysis.",
          "Supported delivery of payments fraud and DORA audits using Snowflake, Databricks, and Datadog for testing and evidence analysis.",
          "Created audit workpapers and evidence packs with EMEA and US teams across five Coinbase entities.",
        ],
      },
      {
        role: "Proprietary Trader",
        org: "E8 Markets",
        meta: "Jan 2025 – May 2025",
        bullets: [
          "Designed and executed rule-based trading strategies across FX and crypto with predefined entry, exit, and risk parameters.",
          "Achieved ~3% average monthly returns while operating within strict drawdown and leverage constraints.",
          "Reviewed performance weekly to iterate on rules, risk limits, and execution quality.",
        ],
      },
      {
        role: "Sales Executive",
        org: "DID Electrical",
        meta: "Sep 2024 – Jan 2025",
        bullets: [
          "Generated €100k+ in sales within three months through customer consultation and product guidance.",
          "Managed payments, invoicing, and after-sales support in a high-volume retail environment.",
        ],
      },
    ],
    []
  );

  const showGithub = GITHUB_URL && GITHUB_URL !== "#";

  function openProject(p) {
    setActiveProject(p);
    document.body.style.overflow = "hidden";
  }
  function closeProject() {
    setActiveProject(null);
    document.body.style.overflow = "";
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") closeProject();
    }
    if (activeProject) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      {/* Project modal */}
      <ProjectModal project={activeProject} onClose={closeProject} />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Left group: logo + nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Mini logo Home icon */}
            <a
              href="#"
              aria-label="Home"
              className="grid h-9 w-9 place-items-center rounded-2xl border border-zinc-200 bg-white shadow-sm pointer-events-auto"
            >
              <Home className="h-5 w-5" style={{ color: ACCENT_HEX }} />
            </a>

            <nav className="flex items-center gap-6">
              {navLinks.map((l) => (
                <NavLink key={l.href} href={l.href}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>



          {/* Mobile: Home icon */}
          <a
            href="#"
            aria-label="Home"
            className="md:hidden grid h-9 w-9 place-items-center rounded-2xl border border-zinc-200 bg-white shadow-sm pointer-events-auto"
          >
            <Home className="h-5 w-5" style={{ color: ACCENT_HEX }} />
          </a>

          {/* Mobile */}
          <div className="md:hidden">
            <OutlineButton onClick={() => setMenuOpen((v) => !v)}>Menu</OutlineButton>
          </div>
        </div>

        {menuOpen ? (
          <div className="md:hidden border-t border-zinc-200">
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-zinc-600 hover:text-zinc-950 pointer-events-auto"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {/* Hero */}
      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="text-zinc-950">Systems for finance + risk,</span>
                  <br />
                  <span className="text-zinc-600">executed with analytics and automation.</span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600">
                  I design tools and systems that make better decisions inevitable.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryButton asChild>
                    <a href="#projects" className="pointer-events-auto">
                      Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </PrimaryButton>
                  <OutlineButton asChild>
                    <a href="#experience" className="pointer-events-auto">
                      Experience
                    </a>
                  </OutlineButton>
                </div>

              </div>

              {/* Profile card */}
              <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                      <img
                        src={PHOTO_URL}
                        alt="Max profile"
                        className="h-full w-full object-cover"
                        style={{ imageRendering: "auto" }}
                        decoding="async"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Max Kyrylyuk</div>
                      <div className="text-sm text-zinc-600">Risk / Finance</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-start gap-2 text-sm leading-snug text-zinc-700">
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT_HEX }} />
                      <span>Dublin, IE • Open to grad & intern roles</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <div className="text-sm font-medium text-zinc-950">Currently</div>
                    <div className="mt-1 text-sm text-zinc-600">Investment Analyst Intern — TET Capital</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Macro Research", "Risk Analysis"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <PrimaryButton className="w-full" asChild>
                    <a href={`mailto:${EMAIL}`} className="pointer-events-auto">
                      Contact <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </PrimaryButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        {/* About */}
        <Section id="about" tone="soft">
          <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-zinc-950">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white">
                  <Info className="h-5 w-5" style={{ color: ACCENT_HEX }} />
                </div>
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-zinc-600">
              <p>
                I’m Max, an Accounting & Finance student with a systems mindset. I’m interested in how markets, businesses, and
                incentives interact, and I like turning messy information into clear, usable decisions.
              </p>
              <p className="mt-4">
                I build practical tools across macro research, risk analysis, and automation - from decision tables and dashboards
                to repeatable workflows that reduce noise and improve consistency.
              </p>
            </CardContent>
          </Card>
        </Section>

        <Divider />

        {/* Projects */}
        <Section id="projects" tone="white">
          <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-zinc-950">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white">
                  <Folder className="h-5 w-5" style={{ color: ACCENT_HEX }} />
                </div>
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <div key={p.title}>
                    <ProjectCard p={p} onExpand={openProject} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        <Divider />

        {/* Experience + Education */}
        <Section id="experience" tone="soft">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-zinc-950">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white">
                    <Briefcase className="h-5 w-5" style={{ color: ACCENT_HEX }} />
                  </div>
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-600">
                {experience.map((e) => (
                  <ExperienceItem key={`${e.role}-${e.org}`} {...e} />
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-zinc-950">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white">
                    <GraduationCap className="h-5 w-5" style={{ color: ACCENT_HEX }} />
                  </div>
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-600">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <div className="font-semibold text-zinc-950">Dublin City University</div>
                  <div className="mt-1">Bachelor's — Accounting and Finance</div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Financial Accounting", "Corporate Finance", "Econometrics"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-zinc-500">Sep 2023 – May 2026</div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <div className="font-semibold text-zinc-950">Kingswood College</div>
                  <div className="mt-1">Leaving Certificate Established</div>
                  <div className="mt-1 text-xs text-zinc-500">Sep 2018 – Jun 2023</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Divider />

        {/* BOOKS (new) */}
        <Section id="books" tone="white">
          <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-zinc-950">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white">
                  <BookOpen className="h-5 w-5" style={{ color: ACCENT_HEX }} />
                </div>
                Books I’m Reading
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mt-0 text-sm leading-relaxed text-zinc-600">
                Learning is an ongoing experiment. These books help refine how I think about systems, strategy, and human behaviour.
              </p>


              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {books.map((b, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
                    style={{ aspectRatio: "3 / 4" }}
                    title={b.title}
                  >
                    {b.cover ? (
                      <img
                        src={b.cover}
                        alt={b.title}
                        className="h-full w-full object-cover object-center scale-[1.03]"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-xs text-zinc-500">
                        Cover {idx + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        <Divider />

        {/* Links (separate from Education) */}
        <Section id="links" tone="soft">
          <Card className="rounded-2xl border-zinc-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-zinc-950">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white">
                  <LinkIcon className="h-5 w-5" style={{ color: ACCENT_HEX }} />
                </div>
                Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-zinc-600">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 hover:bg-zinc-50 transition pointer-events-auto"
              >
                <span className="inline-flex items-center gap-2">
                  <Linkedin className="h-4 w-4 shrink-0 translate-y-[1px]" style={{ color: ACCENT_HEX }} /> LinkedIn
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 hover:bg-zinc-50 transition pointer-events-auto"
              >
                <span className="inline-flex items-center gap-2">
                  <Github className="h-4 w-4 shrink-0 translate-y-[1px]" style={{ color: ACCENT_HEX }} /> GitHub
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 hover:bg-zinc-50 transition pointer-events-auto"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" style={{ color: ACCENT_HEX }} /> Email
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 hover:bg-zinc-50 transition pointer-events-auto"
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" style={{ color: ACCENT_HEX }} /> Download Resume
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        </Section>

        {/* Minimal footer */}
        <footer className="border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600">
            <div className="text-center">© {new Date().getFullYear()} Max Kyrylyuk</div>
          </div>
        </footer>
      </main>
    </div>
  );

  function openProject(p) {
    setActiveProject(p);
    document.body.style.overflow = "hidden";
  }
  function closeProject() {
    setActiveProject(null);
    document.body.style.overflow = "";
  }
}
