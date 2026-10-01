/* Home.jsx */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';

import BirthdayCelebrants from '../components/BirthdayCelebrants';
import Footer from '../components/Footer';
import {
  IconChurch,
  IconBible,
  IconPray,
  IconPlay,
  IconUsers,
  IconArrowRight,
} from '../components/Icons';
import { useInView, useCountUp } from '../hooks/useInView';
import './Home.css';

/* =====================================================
   STATIC DATA
===================================================== */

const ministries = [
  {
    icon: <IconChurch size={40} />,
    title: 'Worship Services',
    desc: 'Join us for Spirit-filled worship, powerful preaching, and heartfelt praise every Sunday and throughout the week.',
  },
  {
    icon: <IconBible size={40} />,
    title: 'Bible Study',
    desc: 'Dive deep into God\'s Word with our weekly Bible study groups for all ages and levels of spiritual maturity.',
  },
  {
    icon: <IconPray size={40} />,
    title: 'Prayer Ministry',
    desc: 'Experience the power of corporate prayer. Submit requests and join our intercessory prayer teams.',
  },
  {
    icon: <IconUsers size={40} />,
    title: 'Youth & Children',
    desc: 'Nurturing the next generation through engaging programs, mentorship, and fun-filled activities.',
  },
];

const events = [
  {
    id: 1,
    date: 'Every Sunday',
    title: 'Sunday Worship Service',
    time: '8:00 AM & 10:30 AM',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=700&q=80',
    desc: 'Join us for a powerful time of worship, the Word, and fellowship.',
  },
  {
    id: 2,
    date: 'Every Tuesday',
    title: 'Midweek Bible Study',
    time: '6:30 PM',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=700&q=80',
    desc: 'Grow deeper in your understanding of Scripture with our weekly study.',
  },
  {
    id: 3,
    date: 'Every Friday',
    title: 'Prayer & Intercession',
    time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=700&q=80',
    desc: 'Come together to pray for our church, community, and nation.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mensah',
    role: 'Member since 2018',
    text: 'Grace Chapel has been my spiritual home. The warmth of the congregation and the depth of the teaching have transformed my walk with God.',
    avatar: '👩🏾',
  },
  {
    id: 2,
    name: 'Michael Osei',
    role: 'Youth Leader',
    text: 'The youth ministry here is incredible. Our young people are growing in faith and becoming leaders in the community.',
    avatar: '👨🏾',
  },
  {
    id: 3,
    name: 'Grace Adjei',
    role: 'Women\'s Fellowship',
    text: 'I found a family here. The women\'s fellowship has been a source of strength, encouragement, and genuine sisterhood.',
    avatar: '👩🏾‍🦱',
  },
];

const statsData = [
  { number: '500+', label: 'Members' },
  { number: '15+', label: 'Years of Ministry' },
  { number: '20+', label: 'Active Ministries' },
  { number: '10+', label: 'Outreach Programs' },
];

/* =====================================================
   COMMERCIAL VIDEOS
===================================================== */

const commercialVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
];

/* =====================================================
   MEDIA ITEMS
===================================================== */

const mediaItems = [
  /* ---------- IMAGES ---------- */
  { type: 'image', src: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80', alt: 'Worship service', title: 'Worship Service' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80', alt: 'Bible study', title: 'Bible Study' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=1200&q=80', alt: 'Prayer gathering', title: 'Prayer Gathering' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1445445290350-fe1b4b0f5cd8?w=1200&q=80', alt: 'Church community', title: 'Church Community' },

  /* ---------- YOUTUBE VIDEOS ---------- */
  {
    type: 'video',
    src: 'https://youtube.com/shorts/dbqnn792Y7M',
    embedUrl: 'https://www.youtube.com/embed/dbqnn792Y7M',
    isYouTube: true,
    alt: 'Sunday Sermon',
    title: 'Sunday Sermon',
  },
  {
    type: 'video',
    src: 'https://youtube.com/shorts/A7usTs1ds5k',
    embedUrl: 'https://www.youtube.com/embed/A7usTs1ds5k',
    isYouTube: true,
    alt: 'Commanding Your Week',
    title: 'Commanding Your Week',
  },
  {
    type: 'video',
    src: 'https://youtube.com/watch?v=Z5QRcyom9bw',
    embedUrl: 'https://www.youtube.com/embed/Z5QRcyom9bw',
    isYouTube: true,
    alt: 'Community Outreach',
    title: 'Community Outreach',
  },

  /* ---------- LOCAL AUDIO (uncomment when file exists) ---------- */
  // {
  //   type: 'audio',
  //   src: require('../assets/audios/audioSermon1.mp3'),
  //   title: 'Audio Sermon 1',
  //   alt: 'Church Audio 1',
  //   fileName: 'audioSermon1.mp3',
  //   local: true,
  // },

  /* ---------- COMMANDING YOUR WEEK PLAYLIST ---------- */
  {
    type: 'commandingWeek',
    title: 'Commanding Your Week Videos',
    alt: 'Commanding Your Week Videos',
    videos: [
      {
        type: 'video',
        src: 'https://youtube.com/shorts/A7usTs1ds5k',
        embedUrl: 'https://www.youtube.com/embed/A7usTs1ds5k',
        isYouTube: true,
        title: 'Commanding Your Week - Part 1',
        alt: 'Commanding Your Week - Part 1',
      },
      {
        type: 'video',
        src: 'https://youtube.com/shorts/dbqnn792Y7M',
        embedUrl: 'https://www.youtube.com/embed/dbqnn792Y7M',
        isYouTube: true,
        title: 'Commanding Your Week - Part 2',
        alt: 'Commanding Your Week - Part 2',
      },
    ],
  },
];

/* =====================================================
   MARQUEE MESSAGES
===================================================== */

const marqueeMessages = [
  '✨ Welcome to Grace Chapel — A Place of Faith, Hope & Love ✨',
  '🙏 Join Us This Sunday • 8:00 AM & 10:30 AM • Midweek Bible Study Wednesdays 6:30 PM 🙏',
  '🎉 Annual Thanksgiving Service — December 15th • All Are Welcome 🎉',
  '📖 Grow in the Word • Join Our Weekly Bible Study • New Members Welcome 📖',
];

/* =====================================================
   YOUTUBE CHANNEL LINKS
===================================================== */

const youtubeChannels = [
  {
    id: 'main',
    name: 'Grace Chapel Main Channel',
    handle: '@GraceChapelGH',
    url: 'https://www.youtube.com/@GraceChapelGH',
    subscribers: '2.5K subscribers',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff" />
      </svg>
    ),
  },
  {
    id: 'shorts',
    name: 'Grace Chapel Shorts',
    handle: '@GraceChapelShorts',
    url: 'https://www.youtube.com/@GraceChapelShorts',
    subscribers: '1.2K subscribers',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 0 0-3.5-6.62L6 6.94a3.74 3.74 0 0 0 .23 6.74l1.2.49L6 14.93a3.75 3.75 0 0 0 3.5 6.63l8.5-4.5a3.74 3.74 0 0 0-.23-6.74z" />
        <polygon points="10 14.65 15 12 10 9.35 10 14.65" fill="#fff" />
      </svg>
    ),
  },
];

/* =====================================================
   FEATURED YOUTUBE VIDEOS
===================================================== */

const featuredYouTubeVideos = [
  {
    id: 'yt-1',
    title: 'Sunday Sermon — Walking in Faith',
    embedUrl: 'https://www.youtube.com/embed/dbqnn792Y7M',
    watchUrl: 'https://youtube.com/shorts/dbqnn792Y7M',
    duration: '12:45',
    thumbnail: 'https://img.youtube.com/vi/dbqnn792Y7M/maxresdefault.jpg',
  },
  {
    id: 'yt-2',
    title: 'Commanding Your Week',
    embedUrl: 'https://www.youtube.com/embed/A7usTs1ds5k',
    watchUrl: 'https://youtube.com/shorts/A7usTs1ds5k',
    duration: '8:20',
    thumbnail: 'https://img.youtube.com/vi/A7usTs1ds5k/maxresdefault.jpg',
  },
  {
    id: 'yt-3',
    title: 'Community Outreach Highlights',
    embedUrl: 'https://www.youtube.com/embed/mbcNqd7bJGs',
    watchUrl: 'https://youtube.com/shorts/mbcNqd7bJGs',
    duration: '6:12',
    thumbnail: 'https://img.youtube.com/vi/mbcNqd7bJGs/maxresdefault.jpg',
  },
  {
    id: 'yt-4',
    title: 'Sunday Worship Service',
    embedUrl: 'https://www.youtube.com/embed/Z5QRcyom9bw',
    watchUrl: 'https://www.youtube.com/watch?v=Z5QRcyom9bw',
    duration: '15:08',
    thumbnail: 'https://img.youtube.com/vi/Z5QRcyom9bw/maxresdefault.jpg',
  },
];

/* =====================================================
   STAT COMPONENT
===================================================== */

function StatItem({ number, label }) {
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const count = useCountUp(number, 1800, isVisible);

  return (
    <div className="stat-item" ref={ref}>
      <span className={`stat-number ${isVisible ? 'visible' : ''}`}>{count}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* =====================================================
   EVENT CARD
===================================================== */

function EventCard({ event }) {
  const [ref, isVisible] = useInView({ threshold: 0.15 });

  return (
    <div className={`event-card anim-fade-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="event-image">
        <img src={event.image} alt={event.title} loading="lazy" />
        <div className="event-date-badge">{event.date}</div>
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-time">{event.time}</p>
        <p className="event-desc">{event.desc}</p>
        <Link to="/events" className="event-link">
          Learn More <IconArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/* =====================================================
   HOME PAGE
===================================================== */

export default function Home() {
  /* ---------- IN-VIEW HOOKS ---------- */
  const [ministriesRef, ministriesVisible] = useInView({ threshold: 0.1 });
  const [eventsRef, eventsVisible] = useInView({ threshold: 0.1 });
  const [testimonialsRef, testimonialsVisible] = useInView({ threshold: 0.1 });
  const [welcomeRef, welcomeVisible] = useInView({ threshold: 0.15 });

  /* ---------- IMAGE SLIDER ---------- */
  const images = mediaItems.filter((item) => item.type === 'image');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return undefined;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  /* ---------- MEDIA PLAYER ---------- */
  const videoItems = mediaItems.filter((item) => item.type === 'video');
  const audioItems = mediaItems.filter((item) => item.type === 'audio');
  const commandingWeekItem = mediaItems.find((item) => item.type === 'commandingWeek');

  const [selectedVideoIndex, setSelectedVideoIndex] = useState('');
  const [selectedAudioIndex, setSelectedAudioIndex] = useState('');
  const [selectedCommandingWeekIndex, setSelectedCommandingWeekIndex] = useState('');

  const selectedVideo = selectedVideoIndex !== '' ? videoItems[selectedVideoIndex] : null;
  const selectedAudio = selectedAudioIndex !== '' ? audioItems[selectedAudioIndex] : null;

  /* ---------- YOUTUBE PLAYER ---------- */
  const [activeYouTube, setActiveYouTube] = useState(featuredYouTubeVideos[0]);
  // const [activeMediaTab, setActiveMediaTab] = useState('video'); // 'video' | 'audio' | 'picture'
  const [activeMediaTab, setActiveMediaTab] = useState('picture');

  /* ---------- COMMERCIAL OVERLAY ---------- */
  const [showCommercial, setShowCommercial] = useState(false);
  const [commercialUrl, setCommercialUrl] = useState(null);
  const commercialVideoRef = useRef(null);
  const commercialTimeoutRef = useRef(null);
  const commercialShowingRef = useRef(false);

  const closeCommercial = () => {
    commercialShowingRef.current = false;
    if (commercialTimeoutRef.current) {
      clearTimeout(commercialTimeoutRef.current);
      commercialTimeoutRef.current = null;
    }
    if (commercialVideoRef.current) {
      commercialVideoRef.current.pause();
      commercialVideoRef.current.currentTime = 0;
    }
    setShowCommercial(false);
    setCommercialUrl(null);
  };

  // Keep a ref so the effect can call the latest version without listing it as a dep
  const startCommercialRef = useRef(() => { });

  startCommercialRef.current = () => {
    if (commercialShowingRef.current) return;
    if (!commercialVideos || commercialVideos.length === 0) return;

    commercialShowingRef.current = true;
    const randomIndex = Math.floor(Math.random() * commercialVideos.length);
    setCommercialUrl(commercialVideos[randomIndex]);
    setShowCommercial(true);

    commercialTimeoutRef.current = setTimeout(() => {
      closeCommercial();
    }, 10000);
  };

  useEffect(() => {
    const triggerTimes = [5000, 10000, 15000];
    const timers = triggerTimes.map((time) =>
      setTimeout(() => startCommercialRef.current(), time)
    );
    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (commercialTimeoutRef.current) clearTimeout(commercialTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showCommercial || !commercialUrl || !commercialVideoRef.current) return;
    const video = commercialVideoRef.current;
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1.0;
    video.play().catch((err) => console.warn('Commercial autoplay blocked:', err));
  }, [showCommercial, commercialUrl]);

  /* ---------- RANDOM MARQUEE ---------- */
  const [randomMessage] = useState(() => {
    return marqueeMessages[Math.floor(Math.random() * marqueeMessages.length)];
  });

  /* Safe index for the image slider */
  const safeImageIndex = images.length > 0 && currentIndex >= images.length ? 0 : currentIndex;

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <>
      {/* ============== COMMERCIAL OVERLAY ============== */}
      {showCommercial && commercialUrl && (
        <div className="commercial-overlay" role="dialog" aria-label="Advertisement">
          <video
            ref={commercialVideoRef}
            className="commercial-video"
            src={commercialUrl}
            autoPlay
            playsInline
            preload="auto"
            controls={false}
            onEnded={closeCommercial}
          />
          <div className="commercial-timer">Advertisement</div>
        </div>
      )}

      <main className="home">
        {/* ============== ANNOUNCEMENT MARQUEE ============== */}
        <div className="announcement-bar" aria-label="Church announcements">
          <div className="announcement-marquee">
            <span>{randomMessage}</span>
            <span>{randomMessage}</span>
          </div>
        </div>

        {/* ============== HERO ============== */}
        <section className="hero">
          <div className="hero-glow hero-glow-one" aria-hidden="true"></div>
          <div className="hero-glow hero-glow-two" aria-hidden="true"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="section-eyebrow hero-anim-eyebrow">Welcome to Grace Chapel</p>
            <h1 className="hero-title hero-anim-title">
              A Place of Faith,<br />Hope & Love
            </h1>
            <p className="hero-desc hero-anim-desc">
              Join us as we worship God, grow in faith, and serve our community.
              Whether you're new to church or have been walking with Christ for years,
              you belong here.
            </p>
            <div className="hero-buttons hero-anim-btn">
              <Link to="/services" className="btn-gold">Plan Your Visit</Link>
              <Link to="/media" className="btn-outline-white">
                <IconPlay size={16} /> Watch Sermons
              </Link>
            </div>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="hero-scroll-line"></div>
          </div>
        </section>

        {/* ============== BIRTHDAY CELEBRANTS ============== */}
        <BirthdayCelebrants />

        {/* ============== YOUTUBE CHANNELS ============== */}
        <section className="youtube-channels-section">
          <div className="section-header anim-fade-up visible">
            <p className="section-eyebrow">Follow Us</p>
            <h2 className="section-title">Our YouTube Channels</h2>
            <span className="gold-rule centered"></span>
          </div>

          <div className="youtube-channels-grid">
            {youtubeChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-channel-card"
              >
                <div className="youtube-channel-icon">{channel.icon}</div>
                <div className="youtube-channel-info">
                  <h3 className="youtube-channel-name">{channel.name}</h3>
                  <p className="youtube-channel-handle">{channel.handle}</p>
                  <span className="youtube-channel-subs">{channel.subscribers}</span>
                </div>
                <span className="youtube-channel-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* ============== FEATURED YOUTUBE VIDEOS ============== */}
        <section className="youtube-featured-section">
          <div className="section-header anim-fade-up visible">
            <p className="section-eyebrow">Watch Now</p>
            <h2 className="section-title">Featured Videos</h2>
            <span className="gold-rule centered"></span>
          </div>

          <div className="youtube-featured-grid">
            {/* Big player on the left */}
            <div className="youtube-main-player">
              <div className="youtube-embed-wrapper">
                <iframe
                  key={activeYouTube.id}
                  width="100%"
                  height="100%"
                  src={`${activeYouTube.embedUrl}?autoplay=0&rel=0`}
                  title={activeYouTube.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="youtube-main-info">
                <h3 className="youtube-main-title">{activeYouTube.title}</h3>
                <a
                  href={activeYouTube.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-watch-link"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>

            {/* Clickable thumbnails on the right */}
            <div className="youtube-thumbnails">
              {featuredYouTubeVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  className={`youtube-thumb-card ${activeYouTube.id === video.id ? 'active' : ''
                    }`}
                  onClick={() => setActiveYouTube(video)}
                  aria-label={`Play ${video.title}`}
                >
                  <div className="youtube-thumb-image">
                    <img src={video.thumbnail} alt={video.title} loading="lazy" />
                    <span className="youtube-thumb-play">▶</span>
                    <span className="youtube-thumb-duration">{video.duration}</span>
                  </div>
                  <div className="youtube-thumb-info">
                    <p className="youtube-thumb-title">{video.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============== SERMONS, MEDIA & WELCOME (fused) ============== */}

        {/* ============== WELCOME HOME ============== */}
        <section className="welcome-section">
          <div className="welcome-inner" ref={welcomeRef}>

            {/* LEFT: welcome text */}
            <div className={`welcome-text anim-slide-left ${welcomeVisible ? 'visible' : ''}`}>
              <p className="section-eyebrow">Who We Are</p>
              <h2 className="section-title">Welcome Home</h2>
              <span className="gold-rule"></span>

              <p className="welcome-para">
                Grace Chapel is a vibrant, Christ-centered community of believers committed to worshiping God, growing in His Word, and serving our community with love. We are a welcoming family where people from all walks of life can come together to experience God’s presence, build meaningful relationships, and grow in faith.

                We believe that every person matters to God, and we are dedicated to helping you discover your purpose, develop your gifts, and deepen your relationship with Jesus Christ. Through powerful worship, biblical teaching, prayer, fellowship, and opportunities to serve, we encourage every believer to live out their faith and make a positive difference in the lives of others.

                Whether you are searching for a church home, taking your first steps in faith, or looking for a place to grow and serve, Grace Chapel welcomes you. Our desire is to create an environment where families, young people, and individuals can encounter God, find hope, experience His love, and become all that He has called them to be..

                We are passionate about building a strong community where faith, friendship, and fellowship come together. Through our ministries, outreach programs, and prayer gatherings, we seek to share the love of Christ and bring hope to those around us. We invite you to join us, grow with us, and be part of what God is doing through Grace Chapel.

              </p>

              <p className="welcome-para">
                We believe that every person matters to God, and we are dedicated
                to helping you discover your purpose, develop your gifts, and
                deepen your relationship with Jesus Christ.
              </p>

              <div className="welcome-actions">
                <Link to="/about" className="btn-primary">Learn More</Link>
                <Link to="/contact" className="btn-outline-gold">Get In Touch</Link>
              </div>
            </div>

            {/* RIGHT: welcome image + picture slider (slider only on Pictures tab) */}
            <div className={`welcome-media-right anim-slide-right ${welcomeVisible ? 'visible' : ''}`}>
              <div className="welcome-image">
                <img
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=700&q=80"
                  alt="Church congregation"
                />
              </div>

              {activeMediaTab === 'picture' && (
                <div className="image-slider">
                  {images.length > 0 && (
                    <img src={images[safeImageIndex].src} alt={images[safeImageIndex].alt} />
                  )}
                  <div className="image-slider-caption">
                    <span>{images[safeImageIndex]?.title || 'Church'}</span>
                    <span className="image-slider-counter">
                      {safeImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ============== MEDIA PLAYER (comes FIRST) ============== */}
        <section className="media-section">
          <div className="section-header anim-fade-up visible">
            <p className="section-eyebrow">Sermons &amp; Media</p>
            <h2 className="section-title">Watch &amp; Listen</h2>
            <span className="gold-rule centered"></span>
          </div>

          <div className="media-player-wrap">
            <div className="welcome-media-player">
              <div className="media-player-shine" aria-hidden="true"></div>

              {/* LOGO / MEDIA-TYPE SELECTOR */}
              <div className="media-logo-tabs" role="tablist" aria-label="Media type">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMediaTab === 'video'}
                  className={`media-logo-tab ${activeMediaTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveMediaTab('video')}
                  title="Videos"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polygon points="10 8 16 12 10 16" fill="currentColor" />
                  </svg>
                  <span>Videos</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMediaTab === 'audio'}
                  className={`media-logo-tab ${activeMediaTab === 'audio' ? 'active' : ''}`}
                  onClick={() => setActiveMediaTab('audio')}
                  title="Audio"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V6l10-2v12" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="16" cy="16" r="3" />
                  </svg>
                  <span>Audio</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMediaTab === 'picture'}
                  className={`media-logo-tab ${activeMediaTab === 'picture' ? 'active' : ''}`}
                  onClick={() => setActiveMediaTab('picture')}
                  title="Pictures"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Pictures</span>
                </button>
              </div>

              <h3 className="media-selector-title">
                {activeMediaTab === 'video' && 'Video Player'}
                {activeMediaTab === 'audio' && 'Audio Player'}
                {activeMediaTab === 'picture' && 'Picture Gallery'}
              </h3>

              {/* PICTURES TAB */}
              {activeMediaTab === 'picture' && (
                <div className="media-control-group">
                  <label>🖼️ Select Picture</label>
                  <div className="picture-selection-grid">
                    {images.map((image, index) => (
                      <button
                        key={`${image.src}-${index}`}
                        type="button"
                        className={`picture-thumb ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`View ${image.title || `picture ${index + 1}`}`}
                        title={image.title || `Picture ${index + 1}`}
                      >
                        <img src={image.src} alt={image.alt || image.title} loading="lazy" />
                        <span className="picture-thumb-overlay">
                          <span className="picture-thumb-play">▶</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* VIDEOS TAB */}
              {activeMediaTab === 'video' && (
                <>
                  <div className="media-control-group">
                    <label htmlFor="video-select">🎬 Select Video</label>
                    <select
                      id="video-select"
                      value={selectedVideoIndex}
                      onChange={(e) =>
                        setSelectedVideoIndex(e.target.value === '' ? '' : Number(e.target.value))
                      }
                    >
                      <option value="">Select a video</option>
                      {videoItems.map((item, index) => (
                        <option key={`${item.src}-${index}`} value={index}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedVideo && (
                    <div className="selected-video">
                      {selectedVideo.isYouTube ? (
                        <iframe
                          width="100%"
                          height="315"
                          src={selectedVideo.embedUrl}
                          title={selectedVideo.alt}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video key={selectedVideo.src} width="100%" controls preload="metadata">
                          <source src={selectedVideo.src} />
                          Your browser does not support video playback.
                        </video>
                      )}
                    </div>
                  )}

                  {commandingWeekItem && (
                    <div className="media-control-group commanding-week-selector">
                      <label htmlFor="commanding-week-select">🎬 Commanding Your Week</label>
                      <select
                        id="commanding-week-select"
                        value={selectedCommandingWeekIndex}
                        onChange={(e) =>
                          setSelectedCommandingWeekIndex(
                            e.target.value === '' ? '' : Number(e.target.value)
                          )
                        }
                      >
                        <option value="">Select Commanding Your Week Video</option>
                        {commandingWeekItem.videos?.map((video, index) => (
                          <option key={`${video.src}-${index}`} value={index}>
                            {video.title}
                          </option>
                        ))}
                      </select>

                      {selectedCommandingWeekIndex !== '' &&
                        commandingWeekItem.videos?.[selectedCommandingWeekIndex] && (
                          <div className="selected-video commanding-week-video">
                            {commandingWeekItem.videos[selectedCommandingWeekIndex].isYouTube ? (
                              <iframe
                                width="100%"
                                height="315"
                                src={commandingWeekItem.videos[selectedCommandingWeekIndex].embedUrl}
                                title={commandingWeekItem.videos[selectedCommandingWeekIndex].title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video width="100%" controls preload="metadata">
                                <source
                                  src={commandingWeekItem.videos[selectedCommandingWeekIndex].src}
                                />
                                Your browser does not support video playback.
                              </video>
                            )}
                          </div>
                        )}
                    </div>
                  )}
                </>
              )}

              {/* AUDIO TAB */}
              {activeMediaTab === 'audio' && (
                <>
                  {audioItems.length === 0 ? (
                    <p className="media-empty">No audio sermons available yet. Check back soon.</p>
                  ) : (
                    <>
                      <div className="media-control-group">
                        <label htmlFor="audio-select">🎵 Select Audio</label>
                        <select
                          id="audio-select"
                          value={selectedAudioIndex}
                          onChange={(e) =>
                            setSelectedAudioIndex(e.target.value === '' ? '' : Number(e.target.value))
                          }
                        >
                          <option value="">Select an audio</option>
                          {audioItems.map((item, index) => (
                            <option key={`${item.src}-${index}`} value={index}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedAudio && (
                        <div className="selected-audio">
                          <p>{selectedAudio.title}</p>
                          <audio key={selectedAudio.src} controls preload="metadata" style={{ width: '100%' }}>
                            <source src={selectedAudio.src} />
                            Your browser does not support audio playback.
                          </audio>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

            </div>
          </div>
        </section>

        {/* ============== FEATURED VIDEOS (comes AFTER Media Player, only on Videos tab) ============== */}
        {activeMediaTab === 'video' && (
          <section className="youtube-featured-section">
            <div className="section-header anim-fade-up visible">
              <p className="section-eyebrow">Watch Now</p>
              <h2 className="section-title">Featured Videos</h2>
              <span className="gold-rule centered"></span>
            </div>

            <div className="youtube-featured-grid">
              <div className="youtube-main-player">
                <div className="youtube-embed-wrapper">
                  <iframe
                    key={activeYouTube.id}
                    width="100%"
                    height="100%"
                    src={`${activeYouTube.embedUrl}?autoplay=0&rel=0`}
                    title={activeYouTube.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="youtube-main-info">
                  <h3 className="youtube-main-title">{activeYouTube.title}</h3>
                  <a
                    href={activeYouTube.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-watch-link"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </div>

              <div className="youtube-thumbnails">
                {featuredYouTubeVideos.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    className={`youtube-thumb-card ${activeYouTube.id === video.id ? 'active' : ''
                      }`}
                    onClick={() => setActiveYouTube(video)}
                    aria-label={`Play ${video.title}`}
                  >
                    <div className="youtube-thumb-image">
                      <img src={video.thumbnail} alt={video.title} loading="lazy" />
                      <span className="youtube-thumb-play">▶</span>
                      <span className="youtube-thumb-duration">{video.duration}</span>
                    </div>
                    <div className="youtube-thumb-info">
                      <p className="youtube-thumb-title">{video.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============== YOUTUBE CHANNELS ============== */}
        <section className="youtube-channels-section">
          <div className="section-header anim-fade-up visible">
            <p className="section-eyebrow">Follow Us</p>
            <h2 className="section-title">Our YouTube Channels</h2>
            <span className="gold-rule centered"></span>
          </div>

          <div className="youtube-channels-grid">
            {youtubeChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-channel-card"
              >
                <div className="youtube-channel-icon">{channel.icon}</div>
                <div className="youtube-channel-info">
                  <h3 className="youtube-channel-name">{channel.name}</h3>
                  <p className="youtube-channel-handle">{channel.handle}</p>
                  <span className="youtube-channel-subs">{channel.subscribers}</span>
                </div>
                <span className="youtube-channel-arrow">→</span>
              </a>
            ))}
          </div>
        </section>


        {/* ============== MINISTRIES ============== */}
        <section className="ministries-section">
          <div className="section-header anim-fade-up visible">
            <p className="section-eyebrow">What We Do</p>
            <h2 className="section-title">Our Ministries</h2>
            <span className="gold-rule centered"></span>
          </div>
          <div className="ministries-grid" ref={ministriesRef}>
            {ministries.map((m, i) => (
              <div
                key={m.title}
                className={`ministry-card anim-fade-up delay-${i + 1} ${ministriesVisible ? 'visible' : ''}`}
              >
                <div className="ministry-icon">{m.icon}</div>
                <h3 className="ministry-title">{m.title}</h3>
                <p className="ministry-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============== EVENTS ============== */}
        <section className="events-section">
          <div className="section-header anim-fade-up visible">
            <p className="section-eyebrow">Join Us</p>
            <h2 className="section-title">Upcoming Events</h2>
            <span className="gold-rule centered"></span>
          </div>
          <div className="events-grid" ref={eventsRef}>
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          <div className="events-cta">
            <Link to="/events" className="btn-primary">
              View All Events <IconArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ============== PRAYER CTA ============== */}
        <section className="prayer-cta-section">
          <div className="prayer-orb prayer-orb-one" aria-hidden="true"></div>
          <div className="prayer-orb prayer-orb-two" aria-hidden="true"></div>
          <div className="prayer-cta-inner anim-fade-up visible">
            <IconPray size={56} />
            <h2>Need Prayer?</h2>
            <p>
              Our prayer team is here for you. Submit your prayer request
              and we will stand with you in faith.
            </p>
            <Link to="/prayer" className="btn-gold">Request Prayer</Link>
          </div>
        </section>

        {/* ============== TESTIMONIALS ============== */}
        <section className="testimonials-section">
          <div className="section-header anim-fade-up visible">
            <p className="section-eyebrow">Stories of Faith</p>
            <h2 className="section-title">What Our Members Say</h2>
            <span className="gold-rule centered"></span>
          </div>
          <div className="testimonials-grid" ref={testimonialsRef}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`testimonial-card anim-fade-up delay-${i + 1} ${testimonialsVisible ? 'visible' : ''}`}
              >
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar">{t.avatar}</span>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============== STATS ============== */}
        <section className="stats">
          {statsData.map((stat) => (
            <StatItem key={stat.label} number={stat.number} label={stat.label} />
          ))}
        </section>

        {/* ============== FOOTER ============== */}
        <Footer />

        {/* ============== CHATBOT ICON ============== */}
        <Link to="/contact" className="chatbot-icon" aria-label="Chat with Grace Chapel">
          <FaComments className="chatbot-icon-symbol" />
          <span>Chat With Us</span>
        </Link>
      </main>
    </>
  );
}
