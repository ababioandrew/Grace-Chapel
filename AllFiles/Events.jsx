import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import { IconCalendar, IconLocation, IconArrowRight } from '../components/Icons';
import './Events.css';

const allEvents = [
  {
    id: 1,
    title: 'Annual Thanksgiving Service',
    date: 'December 15, 2024',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    category: 'Service',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80',
    desc: 'Join us for our annual thanksgiving service as we give thanks to God for His faithfulness throughout the year. Special guest speaker: Rev. Dr. Emmanuel Asante.',
    featured: true,
  },
  {
    id: 2,
    title: 'Christmas Carol Night',
    date: 'December 24, 2024',
    time: '7:00 PM',
    location: 'Main Sanctuary',
    category: 'Special',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    desc: 'Celebrate the birth of our Savior with an evening of beautiful carols, Scripture readings, and fellowship.',
    featured: true,
  },
  {
    id: 3,
    title: 'Youth Camp 2025',
    date: 'January 5-10, 2025',
    time: 'All Week',
    location: 'Camp Grounds',
    category: 'Youth',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    desc: 'A week of spiritual growth, fun activities, and lasting friendships for our young people.',
    featured: false,
  },
  {
    id: 4,
    title: 'Women\'s Fellowship Breakfast',
    date: 'January 18, 2025',
    time: '9:00 AM',
    location: 'Fellowship Hall',
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
    desc: 'A morning of encouragement, testimony, and sisterhood for the women of Grace Chapel.',
    featured: false,
  },
  {
    id: 5,
    title: 'Men\'s Prayer Breakfast',
    date: 'January 25, 2025',
    time: '7:30 AM',
    location: 'Fellowship Hall',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    desc: 'Men, join us for a powerful time of prayer, breakfast, and brotherhood.',
    featured: false,
  },
  {
    id: 6,
    title: 'Community Outreach Day',
    date: 'February 8, 2025',
    time: '8:00 AM',
    location: 'Tema Community',
    category: 'Outreach',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    desc: 'Serving our community with love through food distribution, medical outreach, and prayer.',
    featured: false,
  },
];

const categories = ['All', 'Service', 'Special', 'Youth', 'Women', 'Men', 'Outreach'];

function EventCard({ event, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.12 });

  return (
    <article
      className={`event-card-full anim-fade-up delay-${(index % 4) + 1} ${isVisible ? 'visible' : ''}`}
      ref={ref}
    >
      <div className="event-card-image">
        <img src={event.image} alt={event.title} loading="lazy" />
        <span className="event-category">{event.category}</span>
        {event.featured && <span className="event-featured">Featured</span>}
      </div>
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <div className="event-meta">
          <span className="event-meta-item">
            <IconCalendar size={14} />
            {event.date}
          </span>
          <span className="event-meta-item">
            <IconLocation size={14} />
            {event.location}
          </span>
        </div>
        <p className="event-card-desc">{event.desc}</p>
        <div className="event-card-footer">
          <span className="event-time">{event.time}</span>
          <Link to="/contact" className="event-register">
            Register <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [introRef, introVisible] = useInView({ threshold: 0.2 });

  const filteredEvents = activeCategory === 'All'
    ? allEvents
    : allEvents.filter(e => e.category === activeCategory);

  return (
    <main className="events-page">
      <PageHeader
        label="Join Us"
        title="Church Events"
        subtitle="Stay connected with everything happening at Grace Chapel — services, special events, and community gatherings."
        bg="https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1600&q=80"
      />

      <section className="events-intro">
        <div
          className={`events-intro-inner anim-fade-up ${introVisible ? 'visible' : ''}`}
          ref={introRef}
        >
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>What's Happening</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Upcoming Events</h2>
          <span className="gold-rule centered"></span>
          <p className="events-intro-text">
            There's always something happening at Grace Chapel. Browse our upcoming events,
            mark your calendar, and join us as we grow together in faith and fellowship.
          </p>
        </div>
      </section>

      <section className="events-filter-section">
        <div className="events-filter-inner">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="events-list-section">
        <div className="events-list-inner">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))
          ) : (
            <p className="events-empty">No events found in this category.</p>
          )}
        </div>
      </section>

      <section className="events-cta-section">
        <div className="events-cta-inner anim-fade-up visible">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Never Miss Out</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--white)', textAlign: 'center', margin: '8px 0 16px' }}>
            Want to Receive Event Updates?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: 520, margin: '0 auto 32px', fontSize: 15, lineHeight: 1.8 }}>
            Subscribe to our newsletter and be the first to know about upcoming events, services, and announcements.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn-gold">Subscribe Now</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}