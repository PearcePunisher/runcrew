import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

import logo from './assets/asset_0.png';
import appStoreBadge from './assets/AppleDownload.svg';
import googlePlayBadge from './assets/GooglePlayBadge.svg';
import heroPhoneImg from './assets/asset_3.jpeg';
import feature1 from './assets/asset_4.jpeg';
import feature2 from './assets/asset_5.jpeg';
import feature3 from './assets/asset_6.jpeg';
import feature4 from './assets/asset_7.jpeg';
import feature5 from './assets/asset_8.jpeg';
import feature6 from './assets/asset_9.jpeg';
import screen1 from './assets/asset_10.jpeg';
import screen2 from './assets/asset_11.jpeg';
import screen3 from './assets/asset_12.jpeg';
import screen4 from './assets/asset_13.jpeg';
import screen5 from './assets/asset_14.jpeg';
import screen6 from './assets/asset_15.jpeg';
import garminLogo from './assets/asset_16.png';
import appleHealthLogo from './assets/AppleHealth.png';
import stravaLogo from './assets/Strava.png';
import downloadPhoneImg from './assets/asset_21.jpeg';
import cycle1 from './assets/asset_24.jpeg';
import cycle2 from './assets/asset_25.jpeg';
import cycle3 from './assets/asset_26.jpeg';
import cycle4 from './assets/asset_27.jpeg';
import cycle5 from './assets/asset_28.jpeg';
import RunIcon from './assets/RunIcon.svg';
import ChatIcon from './assets/ChatIcon.svg';
import CalendarIcon from './assets/CalendarIcon.svg';
import CelebrateIcon from './assets/CelebrateIcon.svg';
import GroupIcon from './assets/GroupIcon.svg';

interface NavLink {
  href: string;
  label: string;
  cta?: boolean;
}

interface Feature {
  img: string;
  alt: string;
  name: string;
  desc: string;
}

interface Integration {
  img: string;
  alt: string;
  name: string;
  desc: string;
}

interface CommunityItem {
  icon: string;
  title: string;
  desc: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '#features', label: 'Features' },
  { href: '#screenshots', label: 'Gallery' },
  { href: '#community', label: 'Community' },
  { href: '#integrations', label: 'Integrations' },
  { href: '#download', label: 'Download Free', cta: true },
];

const MARQUEE_ITEMS: string[] = [
  'Find Your Crew', 'Track Workouts', 'Discover Races', 'Join Groups',
  'Create Events', 'Group Chat', 'Garmin Sync', 'Strava Connect', 'Apple Health',
];

const FEATURES: Feature[] = [
  { img: feature1, alt: 'Find Your Community', name: 'Find Your Community', desc: "Running isn't just a sport — it's a community. Find a Run Crew near you and connect with like-minded athletes." },
  { img: feature2, alt: 'Discover Races', name: 'Discover Races', desc: 'Browse upcoming local and global races and register directly in the app — no extra steps.' },
  { img: feature3, alt: 'Track Workouts', name: 'Track Workouts', desc: 'Log runs, monitor progress, and stay motivated with detailed personal stats and activity history.' },
  { img: feature4, alt: 'Join Groups', name: 'Join Groups', desc: 'Form crews with runners at your level. Share your journey, compare paces, and push each other further.' },
  { img: feature5, alt: 'Create Events', name: 'Create Events', desc: 'Organize meetups, training sessions, or group runs in just a few taps. KML/KMZ route import supported.' },
  { img: feature6, alt: 'Group Chat', name: 'Group Chat', desc: 'Stay connected with your crew, celebrate milestones, and plan your next run — all in one place.' },
];

const SCREENS: string[] = [screen1, screen2, screen3, screen4, screen5, screen6];

const CYCLE_SCREENSHOTS: string[] = [cycle1, cycle2, cycle3, cycle4, cycle5];

const INTEGRATIONS: Integration[] = [
  { img: garminLogo, alt: 'Garmin logo', name: 'Garmin', desc: 'Wearable sync' },
  { img: appleHealthLogo, alt: 'Apple Health logo', name: 'Apple Health', desc: 'Health data' },
  { img: stravaLogo, alt: 'Strava logo', name: 'Strava', desc: 'Activity import' },
];

const COMMUNITY_ITEMS: CommunityItem[] = [
  { icon: RunIcon, title: 'Find Local Runners', desc: 'Discover run crews near you and connect with athletes who match your pace and goals.' },
  { icon: CalendarIcon, title: 'Organize Group Runs', desc: 'Create events in seconds — set your route, time, and pace category. Manage RSVPs and chat with attendees before race day.' },
  { icon: CelebrateIcon, title: 'Celebrate Together', desc: 'Share milestones, cheer each other on, and build the kind of accountability that actually keeps you lacing up.' },
];

/** Runs the fade-in/stagger reveal behavior for all `.reveal` elements inside `root`. */
function useScrollReveal(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const reveals = Array.from(container.querySelectorAll<HTMLElement>('.reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const siblings = parent ? Array.from(parent.querySelectorAll<HTMLElement>('.reveal')) : [];
            const idx = siblings.indexOf(entry.target as HTMLElement);
            window.setTimeout(() => {
              entry.target.classList.add('visible');
            }, idx * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [root]);
}

const App: React.FC = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const tickingRef = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const [heroImgSrc, setHeroImgSrc] = useState(heroPhoneImg);
  const [heroImgOpacity, setHeroImgOpacity] = useState(1);
  const cycleIdxRef = useRef(0);

  const screensScrollRef = useRef<HTMLDivElement>(null);
  const [screensAtStart, setScreensAtStart] = useState(true);
  const [screensAtEnd, setScreensAtEnd] = useState(false);

  useScrollReveal(mainRef);

  const closeMobileNav = useCallback(() => {
    setNavOpen(false);
    document.body.style.overflow = '';
  }, []);

  const openMobileNav = useCallback(() => {
    setNavOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    function handleNavScroll() {
      const y = window.scrollY;
      setNavScrolled(y > 40);
      setNavOpen((currentOpen) => {
        if (!currentOpen) {
          if (y > lastScrollY.current && y > 120) {
            setNavHidden(true);
          } else {
            setNavHidden(false);
          }
        }
        return currentOpen;
      });
      lastScrollY.current = y;
      tickingRef.current = false;
    }

    function onScroll() {
      if (!tickingRef.current) {
        window.requestAnimationFrame(handleNavScroll);
        tickingRef.current = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMobileNav();
    }
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [closeMobileNav]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = window.setInterval(() => {
      if (prefersReducedMotion) return;
      setHeroImgOpacity(0);
      window.setTimeout(() => {
        cycleIdxRef.current = (cycleIdxRef.current + 1) % CYCLE_SCREENSHOTS.length;
        setHeroImgSrc(CYCLE_SCREENSHOTS[cycleIdxRef.current]);
        setHeroImgOpacity(1);
      }, 400);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = screensScrollRef.current;
    if (!el) return;

    function updateScreensScrollState() {
      if (!el) return;
      setScreensAtStart(el.scrollLeft <= 0);
      setScreensAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    }

    updateScreensScrollState();
    el.addEventListener('scroll', updateScreensScrollState, { passive: true });
    window.addEventListener('resize', updateScreensScrollState);
    return () => {
      el.removeEventListener('scroll', updateScreensScrollState);
      window.removeEventListener('resize', updateScreensScrollState);
    };
  }, []);

  const scrollScreens = useCallback((direction: 1 | -1) => {
    const el = screensScrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.screen-item');
    const step = card ? card.offsetWidth + 20 : 220;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ═══════════════════════════════════════ NAV */}
      <nav
        aria-label="Main navigation"
        className={[navScrolled && 'nav-scrolled', navHidden && 'nav-hidden'].filter(Boolean).join(' ')}
      >
        <div className="nav-logo">
          <img src={logo} alt="Run Crew - The running community app" />
          <span className="nav-wordmark">RUN CREW</span>
        </div>
        <ul className={`nav-links${navOpen ? ' open' : ''}`} id="navLinks">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={link.cta ? 'nav-cta' : undefined}
                onClick={closeMobileNav}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`nav-toggle${navOpen ? ' open' : ''}`}
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          aria-controls="navLinks"
          onClick={() => (navOpen ? closeMobileNav() : openMobileNav())}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`nav-overlay${navOpen ? ' open' : ''}`} onClick={closeMobileNav}></div>

      {/* ═══════════════════════════════════════ HERO */}
      <main id="main-content" ref={mainRef}>
        <header className="hero">
          <div className="hero-bg"></div>

          <div className="hero-left">
            <p className="hero-eyebrow">The Running Community App</p>
            <h1 className="hero-title">Run.<br /><span>Race.</span><br />Connect.</h1>
            <p className="hero-desc">
              Run Crew is the ultimate running companion for athletes of all levels.
              Whether you&apos;re a beginner training for your first 5K or a seasoned marathoner,
              Run Crew brings the global running community to your fingertips.
            </p>

            <div className="hero-buttons">
              <a href="https://apps.apple.com/us/app/run-crew/id6752634081" target="_blank" rel="noopener" className="btn-store btn-ios" aria-label="Download Run Crew on the Apple App Store">
                <img src={appStoreBadge} alt="Download on the App Store" style={{ height: 52, width: 'auto', display: 'block' }} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.credorun" target="_blank" rel="noopener" className="btn-store btn-android" aria-label="Download Run Crew on Google Play Store">
                <img src={googlePlayBadge} alt="Get it on Google Play" style={{ height: 52, width: 'auto', display: 'block' }} />
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">FREE</span>
                <span className="stat-label">To Download</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">iOS + Android</span>
                <span className="stat-label">Platform</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">3+</span>
                <span className="stat-label">Age Rating</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="phone-wrap">
              <div className="phone-frame">
                <img
                  src={heroImgSrc}
                  alt="Run Crew app screenshot"
                  style={{ aspectRatio: '9/16', opacity: heroImgOpacity, transition: 'opacity 0.4s' }}
                />
              </div>
              <div className="phone-glow"></div>

              <div className="phone-badge">
                <div className="phone-badge-icon"><img src={RunIcon} alt="" /></div>
                <div className="phone-badge-text">
                  <span className="phone-badge-label">Today&apos;s Run</span>
                  <span className="phone-badge-value">5.3 KM</span>
                </div>
              </div>

              <div className="phone-badge2">
                <div className="phone-badge-icon"><img src={GroupIcon} alt="" /></div>
                <div className="phone-badge-text">
                  <span className="phone-badge-label">Crews Active</span>
                  <span className="phone-badge-value">13,564</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════ MARQUEE */}
        <div className="marquee-wrap" aria-label="Scrolling feature list">
          <div className="marquee-track" role="presentation">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div className="marquee-item" key={i}><span>●</span> {item}</div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════ FEATURES */}
        <section className="features" id="features">
          <div className="features-inner">
            <div>
              <p className="section-eyebrow reveal">Everything You Need</p>
              <h2 className="section-title reveal">BUILT FOR<br />RUNNERS</h2>
              <p className="section-sub reveal">
                Running is more than just exercise — it&apos;s community, motivation, and achievement.
                Run Crew gives you every tool you need to go further, together.
              </p>
            </div>

            <div className="features-grid reveal">
              {FEATURES.map((f) => (
                <div className="feature-card" key={f.name}>
                  <div className="feature-image">
                    <img src={f.img} alt={f.alt} />
                    <div className="feature-overlay">
                      <div className="feature-name">{f.name}</div>
                      <p className="feature-desc">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ SCREENSHOTS */}
        <section className="screenshots" id="screenshots">
          <div className="screenshots-inner">
            <div className="screenshots-header">
              <div>
                <p className="section-eyebrow reveal">See It In Action</p>
                <h2 className="section-title reveal">APP<br />GALLERY</h2>
              </div>
              <p className="section-sub reveal" style={{ marginTop: 0 }}>
                A clean, intuitive interface designed to get out of your way so you can focus on the run.
                Available on iOS and Android.
              </p>
            </div>

            <div className="screens-scroll-wrap">
              <button
                type="button"
                className="screens-arrow screens-arrow-left"
                onClick={() => scrollScreens(-1)}
                disabled={screensAtStart}
                aria-label="Scroll gallery left"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                className="screens-scroll reveal"
                tabIndex={0}
                role="region"
                aria-label="App screenshot gallery"
                ref={screensScrollRef}
              >
                {SCREENS.map((src, i) => (
                  <div className="screen-item" key={i}>
                    <img src={src} alt={`Run Crew app screen ${i + 1}`} />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="screens-arrow screens-arrow-right"
                onClick={() => scrollScreens(1)}
                disabled={screensAtEnd}
                aria-label="Scroll gallery right"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ COMMUNITY */}
        <section className="community" id="community">
          <div className="community-inner">
            <div className="community-visual reveal">
              <div className="comm-card" style={{ gridColumn: 'span 2', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <div className="comm-avatar" style={{ background: 'rgba(240,78,47,0.15)' }}><img src={RunIcon} alt="" /></div>
                <div className="comm-info" style={{ flex: 1 }}>
                  <span className="comm-name">Morning Miles Crew · NYC</span>
                  <span className="comm-detail">142 members · Event this Saturday</span>
                  <div className="comm-progress-bar" style={{ marginTop: 8 }}>
                    <div className="comm-progress-fill" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              <div className="comm-card">
                <div className="comm-stat">5K</div>
                <div className="comm-label">Today&apos;s Race</div>
                <div className="comm-detail" style={{ marginTop: 4, fontSize: 12 }}>3 registered near you</div>
              </div>
              <div className="comm-card">
                <div className="comm-stat">12</div>
                <div className="comm-label">Active Crews</div>
                <div className="comm-detail" style={{ marginTop: 4, fontSize: 12 }}>In your area</div>
              </div>
              <div className="comm-card" style={{ gridColumn: 'span 2', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <div className="comm-avatar" style={{ background: 'rgba(240,78,47,0.08)', fontSize: 18 }}><img src={ChatIcon} alt="" /></div>
                <div className="comm-info" style={{ flex: 1 }}>
                  <span className="comm-name">Group Chat</span>
                  <span className="comm-detail" style={{ fontSize: 12 }}>&quot;See everyone at the park at 6am!&quot; — Coach Mike</span>
                </div>
              </div>
            </div>

            <div>
              <p className="section-eyebrow reveal">Built Around People</p>
              <h2 className="section-title reveal">YOUR CREW<br />AWAITS</h2>
              <p className="section-sub reveal">
                Running is better together. Run Crew connects you with athletes who share your pace,
                your ambition, and your love of the sport — whether you&apos;re chasing a PR or your first mile.
              </p>

              <div className="community-list">
                {COMMUNITY_ITEMS.map((item) => (
                  <div className="comm-item reveal" key={item.title}>
                    <div className="comm-item-icon"><img src={item.icon} alt="" /></div>
                    <div className="comm-item-text">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ INTEGRATIONS */}
        <section className="integrations" id="integrations">
          <div className="integrations-inner">
            <p className="section-eyebrow reveal">Connects With Your Gear</p>
            <h2 className="section-title reveal">SEAMLESS<br />INTEGRATIONS</h2>
            <p className="section-sub integrations-subtitle reveal">
              Sync your data from the devices and platforms you already use.
              Run Crew works with your ecosystem so nothing is left behind.
            </p>

            <div className="integrations-grid reveal">
              {INTEGRATIONS.map((it) => (
                <div className="integration-tile" key={it.name}>
                  <div className="integration-icon"><img src={it.img} alt={it.alt} /></div>
                  <div className="integration-name">{it.name}</div>
                  <p className="integration-desc">{it.desc}</p>
                </div>
              ))}
            </div>

            <p className="reveal" style={{ marginTop: 28, fontSize: 13, color: 'var(--muted)', letterSpacing: 0.5, textWrap: 'pretty' }}>
              Heart rate · Calories · Routes · Pace · Distance — all in one place.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════ DOWNLOAD CTA */}
        <section className="download" id="download">
          <div className="download-inner">
            <div>
              <h2>LACE UP &amp;<br />START TODAY</h2>
              <p>
                Run Crew is free to download on iOS and Android.
                Join the global running community, find your crew, and go further — together.
              </p>
              <div className="download-buttons">
                <a href="https://apps.apple.com/us/app/run-crew/id6752634081" target="_blank" rel="noopener" className="btn-store btn-dl-ios" aria-label="Download Run Crew on the Apple App Store">
                  <img src={appStoreBadge} alt="Download on the App Store" style={{ height: 52, width: 'auto', display: 'block' }} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.credorun" target="_blank" rel="noopener" className="btn-store btn-dl-android" aria-label="Download Run Crew on Google Play Store">
                  <img src={googlePlayBadge} alt="Get it on Google Play" style={{ height: 52, width: 'auto', display: 'block' }} />
                </a>
              </div>
              <p className="download-disclaimer">Free · iOS 15.1+ · Android · Health &amp; Fitness</p>
            </div>

            <div className="download-right">
              <div className="download-phone">
                <img src={downloadPhoneImg} alt="Run Crew app" style={{ aspectRatio: '9/16' }} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════ FOOTER */}
      <footer role="contentinfo">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>RUN CREW</h3>
              <p>
                The ultimate running companion for athletes of all levels.
                Community, motivation, and achievement — all in one free app.
                Running is more than exercise. It&apos;s a crew.
              </p>
              <div className="footer-contact">
                <a href="mailto:info@runcrew.com">info@runcrew.com</a>
              </div>
            </div>

            <div className="footer-col">
              <h3>App</h3>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#screenshots">Gallery</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#integrations">Integrations</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Download</h3>
              <ul>
                <li><a href="https://apps.apple.com/us/app/run-crew/id6752634081" target="_blank" rel="noopener">iOS App Store</a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.credorun" target="_blank" rel="noopener">Google Play</a></li>
                <li><a href="https://manage.credotri.com/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 CREDORUN. Developed by Eskcan, LLC. Fort Lauderdale, FL.</p>
            <div className="footer-badge">
              <a href="https://apps.apple.com/us/app/run-crew/id6752634081" target="_blank" rel="noopener" className="store-badge-sm" aria-label="Download on the App Store">
                <img src={appStoreBadge} alt="Download on the App Store" width={140} height={42} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.credorun" target="_blank" rel="noopener" className="store-badge-sm" aria-label="Get it on Google Play">
                <img src={googlePlayBadge} alt="Get it on Google Play" width={140} height={42} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
