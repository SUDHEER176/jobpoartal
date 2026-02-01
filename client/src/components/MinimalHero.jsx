import React, { useEffect, useRef } from "react";
import { FlowButton } from "@/components/ui/FlowButton";
import { Briefcase, Building2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function MinimalHero({
  badge = "Job Portal",
  title1 = "Find Your Next",
  title2 = "Dream Career",
  children
}) {
  const canvasRef = useRef(null);
  const { user, dbUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    let particles = [];
    let raf = 0;

    const count = () => Math.floor((canvas.width * canvas.height) / 7000);

    const make = () => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1,
        opacity: 0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const reset = (p) => {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.speed = Math.random() / 5 + 0.1;
      p.opacity = 0.7;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count(); i++) particles.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.008;
          if (p.opacity <= 0) reset(p);
        }
        ctx.fillStyle = `rgba(150, 150, 150, ${p.opacity})`; // Slightly darkened for visibility on light/dark
        ctx.fillRect(p.x, p.y, 1, Math.random() * 2 + 1);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="minimal-root relative w-full min-h-screen bg-black text-[#fafafa] font-sans">
      <style>{`
@import url('https://fonts.cdnfonts.com/css/hubot-sans');

.minimal-root {
  --border: #27272a;
  --muted: #a1a1aa;
}

/* hero center */
.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 100px 20px 160px; /* Increased bottom padding for stats/dropdown */
}

.kicker {
  font-size: 14px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 20px;
  border: 1px solid var(--border);
  padding: 6px 16px;
  border-radius: 99px;
  background: rgba(255,255,255,0.03);
}

.title-display {
  font-weight: 700;
  font-size: clamp(40px, 8vw, 88px);
  line-height: 1;
  margin: 0;
  margin-bottom: 24px;
  text-shadow: none;
  color: #ffffff;
}

.title-accent {
  color: #3b82f6; 
  /* Optional: keeping a slight gradient for just the blue part makes it pop more, but user asked for specific "some text white some blue" */
  background: linear-gradient(to right, #60a5fa, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: clamp(16px, 2vw, 18px);
  color: var(--muted);
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;
}

/* accent lines container */
.accent-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* base line visuals */
.hline, .vline {
  position: absolute;
  background: var(--border);
  opacity: .4;
}

/* horizontal lines */
.hline {
  height: 1px; left: 0; right: 0;
  transform-origin: 50% 50%;
}
.hline:nth-child(1){ top: 20%; animation: drawX 1.5s ease-out forwards; }
.hline:nth-child(2){ top: 50%; animation: drawX 1.5s ease-out 0.2s forwards; }
.hline:nth-child(3){ top: 80%; animation: drawX 1.5s ease-out 0.4s forwards; }

/* vertical lines */
.vline {
  width: 1px; top: 0; bottom: 0;
  transform-origin: 50% 0%;
}
.vline:nth-child(4){ left: 20%; animation: drawY 1.5s ease-out 0.3s forwards; }
.vline:nth-child(5){ left: 50%; animation: drawY 1.5s ease-out 0.5s forwards; }
.vline:nth-child(6){ left: 80%; animation: drawY 1.5s ease-out 0.7s forwards; }

@keyframes drawX {
  0% { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: .4; }
}
@keyframes drawY {
  0% { transform: scaleY(0); opacity: 0; }
  100% { transform: scaleY(1); opacity: .4; }
}

/* canvas */
.particleCanvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: .5;
}

/* Fade overlay at bottom to blend with next section */
.fade-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 150px;
  background: linear-gradient(to top, #0a0a0a, transparent);
  pointer-events: none;
}
      `}</style>

      {/* Particles */}
      <canvas ref={canvasRef} className="particleCanvas" />

      {/* Accent Lines */}
      <div className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      {/* Main Content */}
      <main className="hero-content">
        <div className="kicker">{badge}</div>
        <h1 className="title-display">
          {title1}<br />
          <span className="title-accent">{title2}</span>
        </h1>
        <p className="subtitle">
          Connect with forward-thinking companies. We simplify the hiring process so you can focus on what matters.
        </p>

        {/* Children (SearchBar) */}
        <div className="w-full max-w-5xl relative z-20">
          {children}
        </div>

        {/* Role Selection CTAs - Only show for non-authenticated users */}
        {!user && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl">
            <FlowButton
              text="I'm a Job Seeker"
              onClick={() => navigate('/for-jobseekers')}
            />

            <FlowButton
              text="I'm a Recruiter"
              onClick={() => navigate('/for-recruiters')}
            />
          </div>
        )}
      </main>

      <div className="fade-overlay" />
    </section>
  );
}
