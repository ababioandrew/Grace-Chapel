import { Link } from 'react-router-dom';
import {
  IconChurch,
  IconPhone,
  IconMail,
  IconLocation,
  IconFacebook,
  IconYouTube,
  IconInstagram,
  IconWhatsApp,
} from './Icons';
import './Footer.css';

export default function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Ministries' },
    { to: '/events', label: 'Events' },
    { to: '/media', label: 'Sermons' },
    { to: '/prayer', label: 'Prayer Requests' },
    { to: '/contact', label: 'Contact' },
  ];

  const ministries = [
    'Children\'s Ministry',
    'Youth Ministry',
    'Women\'s Fellowship',
    'Men\'s Fellowship',
    'Worship Team',
    'Outreach & Missions',
  ];

  const serviceTimes = [
    { day: 'Sunday', time: '8:00 AM & 10:30 AM' },
    { day: 'Wednesday', time: '6:30 PM' },
    { day: 'Friday', time: '7:00 PM' },
  ];

  const socials = [
    { icon: <IconFacebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <IconYouTube size={18} />, href: '#', label: 'YouTube' },
    { icon: <IconInstagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <IconWhatsApp size={18} />, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-inner">
          {/* Column 1: Brand */}
          <div className="footer-col footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-mark">
                <IconChurch size={32} />
              </div>
              <div className="footer-logo-text">
                <span className="footer-brand-name">GRACE CHAPEL</span>
                <span className="footer-tagline">Faith • Hope • Love</span>
              </div>
            </Link>
            <p className="footer-desc">
              A place of worship, community, and spiritual growth. 
              Join us as we grow together in faith and service.
            </p>
            <div className="footer-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-link"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ministries */}
          <div className="footer-col">
            <h4 className="footer-heading">Ministries</h4>
            <ul className="footer-links">
              {ministries.map((m) => (
                <li key={m}>
                  <Link to="/services" className="footer-link">{m}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Service Times</h4>
            <ul className="footer-service-times">
              {serviceTimes.map((s) => (
                <li key={s.day}>
                  <span className="service-day">{s.day}</span>
                  <span className="service-time">{s.time}</span>
                </li>
              ))}
            </ul>

            <h4 className="footer-heading" style={{ marginTop: 24 }}>Contact</h4>
            <div className="footer-contact">
              <a href="tel:+233501195737" className="footer-contact-item">
                <IconPhone size={14} />
                <span>(+233) 50 119 5737</span>
              </a>
              <a href="mailto:info@gracechapel.com" className="footer-contact-item">
                <IconMail size={14} />
                <span>info@gracechapel.com</span>
              </a>
              <div className="footer-contact-item">
                <IconLocation size={14} />
                <span>Tema, Ghana</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} Grace Chapel. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}