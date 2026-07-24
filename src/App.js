import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, useCallback } from 'react';
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
const NAV_LINKS = [
    { href: '#features', label: 'Features' },
    { href: '#screenshots', label: 'Gallery' },
    { href: '#community', label: 'Community' },
    { href: '#integrations', label: 'Integrations' },
    { href: '#download', label: 'Download Free', cta: true },
];
const MARQUEE_ITEMS = [
    'Find Your Crew', 'Track Workouts', 'Discover Races', 'Join Groups',
    'Create Events', 'Group Chat', 'Garmin Sync', 'Strava Connect', 'Apple Health',
];
const FEATURES = [
    { img: feature1, alt: 'Find Your Community', name: 'Find Your Community', desc: "Running isn't just a sport — it's a community. Find a Run Crew near you and connect with like-minded athletes." },
    { img: feature2, alt: 'Discover Races', name: 'Discover Races', desc: 'Browse upcoming local and global races and register directly in the app — no extra steps.' },
    { img: feature3, alt: 'Track Workouts', name: 'Track Workouts', desc: 'Log runs, monitor progress, and stay motivated with detailed personal stats and activity history.' },
    { img: feature4, alt: 'Join Groups', name: 'Join Groups', desc: 'Form crews with runners at your level. Share your journey, compare paces, and push each other further.' },
    { img: feature5, alt: 'Create Events', name: 'Create Events', desc: 'Organize meetups, training sessions, or group runs in just a few taps. KML/KMZ route import supported.' },
    { img: feature6, alt: 'Group Chat', name: 'Group Chat', desc: 'Stay connected with your crew, celebrate milestones, and plan your next run — all in one place.' },
];
const SCREENS = [screen1, screen2, screen3, screen4, screen5, screen6];
const CYCLE_SCREENSHOTS = [cycle1, cycle2, cycle3, cycle4, cycle5];
const INTEGRATIONS = [
    { img: garminLogo, alt: 'Garmin logo', name: 'Garmin', desc: 'Wearable sync' },
    { img: appleHealthLogo, alt: 'Apple Health logo', name: 'Apple Health', desc: 'Health data' },
    { img: stravaLogo, alt: 'Strava logo', name: 'Strava', desc: 'Activity import' },
];
const COMMUNITY_ITEMS = [
    { icon: RunIcon, title: 'Find Local Runners', desc: 'Discover run crews near you and connect with athletes who match your pace and goals.' },
    { icon: CalendarIcon, title: 'Organize Group Runs', desc: 'Create events in seconds — set your route, time, and pace category. Manage RSVPs and chat with attendees before race day.' },
    { icon: CelebrateIcon, title: 'Celebrate Together', desc: 'Share milestones, cheer each other on, and build the kind of accountability that actually keeps you lacing up.' },
];
/** Runs the fade-in/stagger reveal behavior for all `.reveal` elements inside `root`. */
function useScrollReveal(root) {
    useEffect(() => {
        const container = root.current;
        if (!container)
            return;
        const reveals = Array.from(container.querySelectorAll('.reveal'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const parent = entry.target.parentElement;
                    const siblings = parent ? Array.from(parent.querySelectorAll('.reveal')) : [];
                    const idx = siblings.indexOf(entry.target);
                    window.setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, idx * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [root]);
}
const App = () => {
    const [navScrolled, setNavScrolled] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
    const tickingRef = useRef(false);
    const mainRef = useRef(null);
    const [heroImgSrc, setHeroImgSrc] = useState(heroPhoneImg);
    const [heroImgOpacity, setHeroImgOpacity] = useState(1);
    const cycleIdxRef = useRef(0);
    const screensScrollRef = useRef(null);
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
                    }
                    else {
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
        function onKeydown(e) {
            if (e.key === 'Escape')
                closeMobileNav();
        }
        window.addEventListener('keydown', onKeydown);
        return () => window.removeEventListener('keydown', onKeydown);
    }, [closeMobileNav]);
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const interval = window.setInterval(() => {
            if (prefersReducedMotion)
                return;
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
        if (!el)
            return;
        function updateScreensScrollState() {
            if (!el)
                return;
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
    const scrollScreens = useCallback((direction) => {
        const el = screensScrollRef.current;
        if (!el)
            return;
        const card = el.querySelector('.screen-item');
        const step = card ? card.offsetWidth + 20 : 220;
        el.scrollBy({ left: direction * step, behavior: 'smooth' });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("a", { href: "#main-content", className: "skip-link", children: "Skip to main content" }), _jsxs("nav", { "aria-label": "Main navigation", className: [navScrolled && 'nav-scrolled', navHidden && 'nav-hidden'].filter(Boolean).join(' '), children: [_jsxs("div", { className: "nav-logo", children: [_jsx("img", { src: logo, alt: "Run Crew - The running community app" }), _jsx("span", { className: "nav-wordmark", children: "RUN CREW" })] }), _jsx("ul", { className: `nav-links${navOpen ? ' open' : ''}`, id: "navLinks", children: NAV_LINKS.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: link.cta ? 'nav-cta' : undefined, onClick: closeMobileNav, children: link.label }) }, link.href))) }), _jsxs("button", { className: `nav-toggle${navOpen ? ' open' : ''}`, id: "navToggle", "aria-label": "Toggle menu", "aria-expanded": navOpen, "aria-controls": "navLinks", onClick: () => (navOpen ? closeMobileNav() : openMobileNav()), children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] })] }), _jsx("div", { className: `nav-overlay${navOpen ? ' open' : ''}`, onClick: closeMobileNav }), _jsxs("main", { id: "main-content", ref: mainRef, children: [_jsxs("header", { className: "hero", children: [_jsx("div", { className: "hero-bg" }), _jsxs("div", { className: "hero-left", children: [_jsx("p", { className: "hero-eyebrow", children: "The Running Community App" }), _jsxs("h1", { className: "hero-title", children: ["Run.", _jsx("br", {}), _jsx("span", { children: "Race." }), _jsx("br", {}), "Connect."] }), _jsx("p", { className: "hero-desc", children: "Run Crew is the ultimate running companion for athletes of all levels. Whether you're a beginner training for your first 5K or a seasoned marathoner, Run Crew brings the global running community to your fingertips." }), _jsxs("div", { className: "hero-buttons", children: [_jsx("a", { href: "https://apps.apple.com/us/app/run-crew/id6752634081", target: "_blank", rel: "noopener", className: "btn-store btn-ios", "aria-label": "Download Run Crew on the Apple App Store", children: _jsx("img", { src: appStoreBadge, alt: "Download on the App Store", style: { height: 52, width: 'auto', display: 'block' } }) }), _jsx("a", { href: "https://play.google.com/store/apps/details?id=com.credorun", target: "_blank", rel: "noopener", className: "btn-store btn-android", "aria-label": "Download Run Crew on Google Play Store", children: _jsx("img", { src: googlePlayBadge, alt: "Get it on Google Play", style: { height: 52, width: 'auto', display: 'block' } }) })] }), _jsxs("div", { className: "hero-stats", children: [_jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-num", children: "FREE" }), _jsx("span", { className: "stat-label", children: "To Download" })] }), _jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-num", children: "iOS + Android" }), _jsx("span", { className: "stat-label", children: "Platform" })] }), _jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-num", children: "3+" }), _jsx("span", { className: "stat-label", children: "Age Rating" })] })] })] }), _jsx("div", { className: "hero-right", children: _jsxs("div", { className: "phone-wrap", children: [_jsx("div", { className: "phone-frame", children: _jsx("img", { src: heroImgSrc, alt: "Run Crew app screenshot", style: { aspectRatio: '9/16', opacity: heroImgOpacity, transition: 'opacity 0.4s' } }) }), _jsx("div", { className: "phone-glow" }), _jsxs("div", { className: "phone-badge", children: [_jsx("div", { className: "phone-badge-icon", children: _jsx("img", { src: RunIcon, alt: "" }) }), _jsxs("div", { className: "phone-badge-text", children: [_jsx("span", { className: "phone-badge-label", children: "Today's Run" }), _jsx("span", { className: "phone-badge-value", children: "5.3 KM" })] })] }), _jsxs("div", { className: "phone-badge2", children: [_jsx("div", { className: "phone-badge-icon", children: _jsx("img", { src: GroupIcon, alt: "" }) }), _jsxs("div", { className: "phone-badge-text", children: [_jsx("span", { className: "phone-badge-label", children: "Crews Active" }), _jsx("span", { className: "phone-badge-value", children: "13,564" })] })] })] }) })] }), _jsx("div", { className: "marquee-wrap", "aria-label": "Scrolling feature list", children: _jsx("div", { className: "marquee-track", role: "presentation", children: [...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (_jsxs("div", { className: "marquee-item", children: [_jsx("span", { children: "\u25CF" }), " ", item] }, i))) }) }), _jsx("section", { className: "features", id: "features", children: _jsxs("div", { className: "features-inner", children: [_jsxs("div", { children: [_jsx("p", { className: "section-eyebrow reveal", children: "Everything You Need" }), _jsxs("h2", { className: "section-title reveal", children: ["BUILT FOR", _jsx("br", {}), "RUNNERS"] }), _jsx("p", { className: "section-sub reveal", children: "Running is more than just exercise \u2014 it's community, motivation, and achievement. Run Crew gives you every tool you need to go further, together." })] }), _jsx("div", { className: "features-grid reveal", children: FEATURES.map((f) => (_jsx("div", { className: "feature-card", children: _jsxs("div", { className: "feature-image", children: [_jsx("img", { src: f.img, alt: f.alt }), _jsxs("div", { className: "feature-overlay", children: [_jsx("div", { className: "feature-name", children: f.name }), _jsx("p", { className: "feature-desc", children: f.desc })] })] }) }, f.name))) })] }) }), _jsx("section", { className: "screenshots", id: "screenshots", children: _jsxs("div", { className: "screenshots-inner", children: [_jsxs("div", { className: "screenshots-header", children: [_jsxs("div", { children: [_jsx("p", { className: "section-eyebrow reveal", children: "See It In Action" }), _jsxs("h2", { className: "section-title reveal", children: ["APP", _jsx("br", {}), "GALLERY"] })] }), _jsx("p", { className: "section-sub reveal", style: { marginTop: 0 }, children: "A clean, intuitive interface designed to get out of your way so you can focus on the run. Available on iOS and Android." })] }), _jsxs("div", { className: "screens-scroll-wrap", children: [_jsx("button", { type: "button", className: "screens-arrow screens-arrow-left", onClick: () => scrollScreens(-1), disabled: screensAtStart, "aria-label": "Scroll gallery left", children: _jsx("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M15 18l-6-6 6-6" }) }) }), _jsx("div", { className: "screens-scroll reveal", tabIndex: 0, role: "region", "aria-label": "App screenshot gallery", ref: screensScrollRef, children: SCREENS.map((src, i) => (_jsx("div", { className: "screen-item", children: _jsx("img", { src: src, alt: `Run Crew app screen ${i + 1}` }) }, i))) }), _jsx("button", { type: "button", className: "screens-arrow screens-arrow-right", onClick: () => scrollScreens(1), disabled: screensAtEnd, "aria-label": "Scroll gallery right", children: _jsx("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M9 18l6-6-6-6" }) }) })] })] }) }), _jsx("section", { className: "community", id: "community", children: _jsxs("div", { className: "community-inner", children: [_jsxs("div", { className: "community-visual reveal", children: [_jsxs("div", { className: "comm-card", style: { gridColumn: 'span 2', flexDirection: 'row', alignItems: 'center', gap: 16 }, children: [_jsx("div", { className: "comm-avatar", style: { background: 'rgba(240,78,47,0.15)' }, children: _jsx("img", { src: RunIcon, alt: "" }) }), _jsxs("div", { className: "comm-info", style: { flex: 1 }, children: [_jsx("span", { className: "comm-name", children: "Morning Miles Crew \u00B7 NYC" }), _jsx("span", { className: "comm-detail", children: "142 members \u00B7 Event this Saturday" }), _jsx("div", { className: "comm-progress-bar", style: { marginTop: 8 }, children: _jsx("div", { className: "comm-progress-fill", style: { width: '78%' } }) })] })] }), _jsxs("div", { className: "comm-card", children: [_jsx("div", { className: "comm-stat", children: "5K" }), _jsx("div", { className: "comm-label", children: "Today's Race" }), _jsx("div", { className: "comm-detail", style: { marginTop: 4, fontSize: 12 }, children: "3 registered near you" })] }), _jsxs("div", { className: "comm-card", children: [_jsx("div", { className: "comm-stat", children: "12" }), _jsx("div", { className: "comm-label", children: "Active Crews" }), _jsx("div", { className: "comm-detail", style: { marginTop: 4, fontSize: 12 }, children: "In your area" })] }), _jsxs("div", { className: "comm-card", style: { gridColumn: 'span 2', flexDirection: 'row', alignItems: 'center', gap: 12 }, children: [_jsx("div", { className: "comm-avatar", style: { background: 'rgba(240,78,47,0.08)', fontSize: 18 }, children: _jsx("img", { src: ChatIcon, alt: "" }) }), _jsxs("div", { className: "comm-info", style: { flex: 1 }, children: [_jsx("span", { className: "comm-name", children: "Group Chat" }), _jsx("span", { className: "comm-detail", style: { fontSize: 12 }, children: "\"See everyone at the park at 6am!\" \u2014 Coach Mike" })] })] })] }), _jsxs("div", { children: [_jsx("p", { className: "section-eyebrow reveal", children: "Built Around People" }), _jsxs("h2", { className: "section-title reveal", children: ["YOUR CREW", _jsx("br", {}), "AWAITS"] }), _jsx("p", { className: "section-sub reveal", children: "Running is better together. Run Crew connects you with athletes who share your pace, your ambition, and your love of the sport \u2014 whether you're chasing a PR or your first mile." }), _jsx("div", { className: "community-list", children: COMMUNITY_ITEMS.map((item) => (_jsxs("div", { className: "comm-item reveal", children: [_jsx("div", { className: "comm-item-icon", children: _jsx("img", { src: item.icon, alt: "" }) }), _jsxs("div", { className: "comm-item-text", children: [_jsx("h3", { children: item.title }), _jsx("p", { children: item.desc })] })] }, item.title))) })] })] }) }), _jsx("section", { className: "integrations", id: "integrations", children: _jsxs("div", { className: "integrations-inner", children: [_jsx("p", { className: "section-eyebrow reveal", children: "Connects With Your Gear" }), _jsxs("h2", { className: "section-title reveal", children: ["SEAMLESS", _jsx("br", {}), "INTEGRATIONS"] }), _jsx("p", { className: "section-sub integrations-subtitle reveal", children: "Sync your data from the devices and platforms you already use. Run Crew works with your ecosystem so nothing is left behind." }), _jsx("div", { className: "integrations-grid reveal", children: INTEGRATIONS.map((it) => (_jsxs("div", { className: "integration-tile", children: [_jsx("div", { className: "integration-icon", children: _jsx("img", { src: it.img, alt: it.alt }) }), _jsx("div", { className: "integration-name", children: it.name }), _jsx("p", { className: "integration-desc", children: it.desc })] }, it.name))) }), _jsx("p", { className: "reveal", style: { marginTop: 28, fontSize: 13, color: 'var(--muted)', letterSpacing: 0.5, textWrap: 'pretty' }, children: "Heart rate \u00B7 Calories \u00B7 Routes \u00B7 Pace \u00B7 Distance \u2014 all in one place." })] }) }), _jsx("section", { className: "download", id: "download", children: _jsxs("div", { className: "download-inner", children: [_jsxs("div", { children: [_jsxs("h2", { children: ["LACE UP &", _jsx("br", {}), "START TODAY"] }), _jsx("p", { children: "Run Crew is free to download on iOS and Android. Join the global running community, find your crew, and go further \u2014 together." }), _jsxs("div", { className: "download-buttons", children: [_jsx("a", { href: "https://apps.apple.com/us/app/run-crew/id6752634081", target: "_blank", rel: "noopener", className: "btn-store btn-dl-ios", "aria-label": "Download Run Crew on the Apple App Store", children: _jsx("img", { src: appStoreBadge, alt: "Download on the App Store", style: { height: 52, width: 'auto', display: 'block' } }) }), _jsx("a", { href: "https://play.google.com/store/apps/details?id=com.credorun", target: "_blank", rel: "noopener", className: "btn-store btn-dl-android", "aria-label": "Download Run Crew on Google Play Store", children: _jsx("img", { src: googlePlayBadge, alt: "Get it on Google Play", style: { height: 52, width: 'auto', display: 'block' } }) })] }), _jsx("p", { className: "download-disclaimer", children: "Free \u00B7 iOS 15.1+ \u00B7 Android \u00B7 Health & Fitness" })] }), _jsx("div", { className: "download-right", children: _jsx("div", { className: "download-phone", children: _jsx("img", { src: downloadPhoneImg, alt: "Run Crew app", style: { aspectRatio: '9/16' } }) }) })] }) })] }), _jsx("footer", { role: "contentinfo", children: _jsxs("div", { className: "footer-inner", children: [_jsxs("div", { className: "footer-top", children: [_jsxs("div", { className: "footer-brand", children: [_jsx("h3", { children: "RUN CREW" }), _jsx("p", { children: "The ultimate running companion for athletes of all levels. Community, motivation, and achievement \u2014 all in one free app. Running is more than exercise. It's a crew." }), _jsx("div", { className: "footer-contact", children: _jsx("a", { href: "mailto:info@runcrew.com", children: "info@runcrew.com" }) })] }), _jsxs("div", { className: "footer-col", children: [_jsx("h3", { children: "App" }), _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "#features", children: "Features" }) }), _jsx("li", { children: _jsx("a", { href: "#screenshots", children: "Gallery" }) }), _jsx("li", { children: _jsx("a", { href: "#community", children: "Community" }) }), _jsx("li", { children: _jsx("a", { href: "#integrations", children: "Integrations" }) })] })] }), _jsxs("div", { className: "footer-col", children: [_jsx("h3", { children: "Download" }), _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "https://apps.apple.com/us/app/run-crew/id6752634081", target: "_blank", rel: "noopener", children: "iOS App Store" }) }), _jsx("li", { children: _jsx("a", { href: "https://play.google.com/store/apps/details?id=com.credorun", target: "_blank", rel: "noopener", children: "Google Play" }) }), _jsx("li", { children: _jsx("a", { href: "https://manage.credotri.com/privacy-policy", target: "_blank", rel: "noopener", children: "Privacy Policy" }) })] })] })] }), _jsxs("div", { className: "footer-bottom", children: [_jsx("p", { children: "\u00A9 2025 CREDORUN. Developed by Eskcan, LLC. Fort Lauderdale, FL." }), _jsxs("div", { className: "footer-badge", children: [_jsx("a", { href: "https://apps.apple.com/us/app/run-crew/id6752634081", target: "_blank", rel: "noopener", className: "store-badge-sm", "aria-label": "Download on the App Store", children: _jsx("img", { src: appStoreBadge, alt: "Download on the App Store", width: 140, height: 42 }) }), _jsx("a", { href: "https://play.google.com/store/apps/details?id=com.credorun", target: "_blank", rel: "noopener", className: "store-badge-sm", "aria-label": "Get it on Google Play", children: _jsx("img", { src: googlePlayBadge, alt: "Get it on Google Play", width: 140, height: 42 }) })] })] })] }) })] }));
};
export default App;
