import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import { IconPlay, IconSearch } from '../components/Icons';
import './Media.css';

const sermons = [
  {
    id: 1,
    title: 'Walking in Faith',
    speaker: 'Rev. Dr. Emmanuel Asante',
    date: 'December 1, 2024',
    duration: '45:32',
    series: 'Faith Foundations',
    thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80',
    featured: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    speaker: 'Pastor Grace Mensah',
    date: 'November 24, 2024',
    duration: '38:15',
    series: 'Prayer Life',
    thumbnail: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=800&q=80',
    featured: false,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 3,
    title: 'God\'s Unfailing Love',
    speaker: 'Rev. Dr. Emmanuel Asante',
    date: 'November 17, 2024',
    duration: '42:08',
    series: 'Faith Foundations',
    thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80',
    featured: false,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 4,
    title: 'Living with Purpose',
    speaker: 'Pastor Kofi Boateng',
    date: 'November 10, 2024',
    duration: '40:22',
    series: 'Purpose Driven',
    thumbnail: 'https://images.unsplash.com/photo-1445445290350-fe1b4b0f5cd8?w=800&q=80',
    featured: false,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 5,
    title: 'The Heart of Worship',
    speaker: 'Pastor Grace Mensah',
    date: 'November 3, 2024',
    duration: '36:45',
    series: 'Worship Series',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    featured: false,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 6,
    title: 'Building Strong Families',
    speaker: 'Rev. Dr. Emmanuel Asante',
    date: 'October 27, 2024',
    duration: '48:12',
    series: 'Family Life',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    featured: false,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

const series = ['All', 'Faith Foundations', 'Prayer Life', 'Purpose Driven', 'Worship Series', 'Family Life'];

function SermonCard({ sermon, onPlay, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.12 });

  return (
    <article
      className={`sermon-card anim-fade-up delay-${(index % 4) + 1} ${isVisible ? 'visible' : ''}`}
      ref={ref}
      onClick={() => onPlay(sermon)}
    >
      <div className="sermon-thumb">
        <img src={sermon.thumbnail} alt={sermon.title} loading="lazy" />
        <div className="sermon-play">
          <IconPlay size={48} />
        </div>
        <span className="sermon-duration">{sermon.duration}</span>
      </div>
      <div className="sermon-body">
        <span className="sermon-series">{sermon.series}</span>
        <h3 className="sermon-title">{sermon.title}</h3>
        <p className="sermon-speaker">{sermon.speaker}</p>
        <p className="sermon-date">{sermon.date}</p>
      </div>
    </article>
  );
}

function VideoModal({ sermon, onClose }) {
  if (!sermon) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>✕</button>
        <div className="video-modal-player">
          <video controls autoPlay style={{ width: '100%', display: 'block' }}>
            <source src={sermon.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="video-modal-info">
          <span className="sermon-series">{sermon.series}</span>
          <h2 className="video-modal-title">{sermon.title}</h2>
          <p className="video-modal-speaker">{sermon.speaker} • {sermon.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function Media() {
  const [activeSeries, setActiveSeries] = useState('All');
  const [search, setSearch] = useState('');
  const [currentSermon, setCurrentSermon] = useState(null);
  const [introRef, introVisible] = useInView({ threshold: 0.2 });

  const featured = sermons.find(s => s.featured) || sermons[0];

  const filtered = sermons.filter(s => {
    const matchesSeries = activeSeries === 'All' || s.series === activeSeries;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase());
    return matchesSeries && matchesSearch;
  });

  return (
    <main className="media-page">
      <PageHeader
        label="Watch & Listen"
        title="Sermons & Media"
        subtitle="Catch up on past sermons, watch live services, and grow in your faith anytime, anywhere."
        bg="https://images.unsplash.com/photo-1445445290350-fe1b4b0f5cd8?w=1600&q=80"
      />

      {/* Featured Sermon */}
      <section className="featured-sermon-section">
        <div className="featured-sermon-inner">
          <div className="featured-sermon-label anim-fade-up visible">
            <p className="section-eyebrow">Featured Sermon</p>
          </div>
          <div className="featured-sermon-content anim-fade-up visible">
            <div
              className="featured-sermon-video"
              onClick={() => setCurrentSermon(featured)}
            >
              <img src={featured.thumbnail} alt={featured.title} />
              <div className="featured-sermon-overlay">
                <IconPlay size={64} />
                <span>Watch Now</span>
              </div>
            </div>
            <div className="featured-sermon-info">
              <span className="sermon-series">{featured.series}</span>
              <h2 className="featured-sermon-title">{featured.title}</h2>
              <p className="featured-sermon-speaker">{featured.speaker}</p>
              <p className="featured-sermon-date">{featured.date} • {featured.duration}</p>
              <button
                className="btn-gold featured-sermon-btn"
                onClick={() => setCurrentSermon(featured)}
              >
                <IconPlay size={16} /> Watch Sermon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="media-filter-section">
        <div
          className={`media-filter-inner anim-fade-up ${introVisible ? 'visible' : ''}`}
          ref={introRef}
        >
          <div className="media-search">
            <IconSearch size={18} />
            <input
              type="text"
              placeholder="Search sermons by title or speaker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="media-series-filter">
            {series.map(s => (
              <button
                key={s}
                className={`filter-btn ${activeSeries === s ? 'active' : ''}`}
                onClick={() => setActiveSeries(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="sermons-section">
        <div className="sermons-inner">
          <div className="sermons-header">
            <h2 className="section-title" style={{ fontSize: 24 }}>All Sermons</h2>
            <span className="sermons-count">{filtered.length} sermons</span>
          </div>

          {filtered.length > 0 ? (
            <div className="sermons-grid">
              {filtered.map((s, i) => (
                <SermonCard key={s.id} sermon={s} onPlay={setCurrentSermon} index={i} />
              ))}
            </div>
          ) : (
            <p className="sermons-empty">No sermons found matching your search.</p>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal sermon={currentSermon} onClose={() => setCurrentSermon(null)} />

      <Footer />
    </main>
  );
}