import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import { useNotification } from '../context/NotificationContext';
import { IconPray, IconHeart, IconCheck, IconUsers } from '../components/Icons';
import './Prayer.css';

const categories = [
  { id: 'healing', label: 'Healing', emoji: '💚' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { id: 'financial', label: 'Financial', emoji: '💰' },
  { id: 'salvation', label: 'Salvation', emoji: '✝️' },
  { id: 'thanksgiving', label: 'Thanksgiving', emoji: '🙏' },
  { id: 'other', label: 'Other', emoji: '💭' },
];

const promises = [
  {
    verse: '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."',
    ref: 'Philippians 4:6',
  },
  {
    verse: '"Call to me and I will answer you and tell you great and unsearchable things you do not know."',
    ref: 'Jeremiah 33:3',
  },
  {
    verse: '"Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours."',
    ref: 'Mark 11:24',
  },
];

export default function Prayer() {
  const notification = useNotification();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'healing',
    request: '',
    anonymous: false,
    subscribe: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [introRef, introVisible] = useInView({ threshold: 0.2 });
  const [formRef, formVisible] = useInView({ threshold: 0.15 });
  const [promisesRef, promisesVisible] = useInView({ threshold: 0.15 });

  const validate = () => {
    const errs = {};
    if (!form.anonymous && !form.name.trim()) {
      errs.name = 'Name is required (or select anonymous)';
    }
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Invalid email format';
    }
    if (!form.request.trim()) {
      errs.request = 'Please share your prayer request';
    } else if (form.request.trim().length < 10) {
      errs.request = 'Please provide more detail (at least 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      notification.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
    notification.success('Your prayer request has been received. We are praying with you!');
  };

  return (
    <main className="prayer-page">
      <PageHeader
        label="We're Here For You"
        title="Prayer Requests"
        subtitle="Our prayer team is committed to standing with you in faith. Submit your request and let us pray with you."
        bg="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=1600&q=80"
      />

      {/* Intro */}
      <section className="prayer-intro">
        <div
          className={`prayer-intro-inner anim-fade-up ${introVisible ? 'visible' : ''}`}
          ref={introRef}
        >
          <IconPray size={56} />
          <p className="section-eyebrow" style={{ textAlign: 'center', marginTop: 20 }}>Standing in Faith</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Let Us Pray With You</h2>
          <span className="gold-rule centered"></span>
          <p className="prayer-intro-text">
            We believe in the power of prayer. Whatever you're facing — healing, family struggles,
            financial need, or a heart of thanksgiving — our intercessory team is ready to lift
            your request before the Lord.
          </p>
          <div className="prayer-stats">
            <div className="prayer-stat">
              <span className="prayer-stat-number">24/7</span>
              <span className="prayer-stat-label">Prayer Line</span>
            </div>
            <div className="prayer-stat">
              <span className="prayer-stat-number">50+</span>
              <span className="prayer-stat-label">Intercessors</span>
            </div>
            <div className="prayer-stat">
              <span className="prayer-stat-number">1000+</span>
              <span className="prayer-stat-label">Prayers Lifted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="prayer-form-section">
        <div className="prayer-form-inner">
          <div
            className={`prayer-form-card anim-slide-left ${formVisible ? 'visible' : ''}`}
            ref={formRef}
          >
            {submitted ? (
              <div className="prayer-success">
                <div className="prayer-success-icon">
                  <IconCheck size={32} />
                </div>
                <h3>Prayer Request Received</h3>
                <p>
                  Thank you for sharing your heart with us. Our prayer team will be lifting
                  your request before the Lord. You are not alone — we are standing with you in faith.
                </p>
                <button
                  className="btn-outline-gold"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      email: '',
                      phone: '',
                      category: 'healing',
                      request: '',
                      anonymous: false,
                      subscribe: true,
                    });
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="prayer-form-header">
                  <h3>Submit Your Prayer Request</h3>
                  <p>All requests are kept confidential and shared only with our prayer team.</p>
                </div>

                <form className="prayer-form" onSubmit={handleSubmit}>
                  {/* Category */}
                  <div className="form-group">
                    <label className="form-label">Prayer Category</label>
                    <div className="category-picker">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          className={`category-btn ${form.category === cat.id ? 'active' : ''}`}
                          onClick={() => setForm({ ...form, category: cat.id })}
                        >
                          <span className="category-emoji">{cat.emoji}</span>
                          <span className="category-label">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name / Email */}
                  <div className="prayer-form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="prayer-name">Your Name</label>
                      <input
                        id="prayer-name"
                        type="text"
                        className="form-input"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={form.anonymous}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="prayer-email">Email (optional)</label>
                      <input
                        id="prayer-email"
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="prayer-phone">Phone (optional)</label>
                    <input
                      id="prayer-phone"
                      type="tel"
                      className="form-input"
                      placeholder="+233 XX XXX XXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="prayer-request">
                      Your Prayer Request
                    </label>
                    <textarea
                      id="prayer-request"
                      className="form-textarea"
                      placeholder="Share what's on your heart..."
                      value={form.request}
                      onChange={(e) => setForm({ ...form, request: e.target.value })}
                      rows={6}
                    />
                    {errors.request && <span className="form-error">{errors.request}</span>}
                  </div>

                  <div className="prayer-checkboxes">
                    <label className="prayer-checkbox">
                      <input
                        type="checkbox"
                        checked={form.anonymous}
                        onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                      />
                      <span>Submit anonymously</span>
                    </label>

                    <label className="prayer-checkbox">
                      <input
                        type="checkbox"
                        checked={form.subscribe}
                        onChange={(e) => setForm({ ...form, subscribe: e.target.checked })}
                      />
                      <span>Send me prayer updates and encouragement</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold prayer-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner-small" /> Submitting...
                      </>
                    ) : (
                      <>
                        <IconPray size={16} /> Submit Prayer Request
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="prayer-sidebar">
            <div className="prayer-sidebar-card">
              <IconHeart size={32} />
              <h4>Prayer Line</h4>
              <p>Call us 24/7 to speak with a prayer partner.</p>
              <a href="tel:+233501195737" className="prayer-phone">
                (+233) 50 119 5737
              </a>
            </div>

            <div className="prayer-sidebar-card">
              <IconUsers size={32} />
              <h4>Join Our Prayer Team</h4>
              <p>Become an intercessor and stand in the gap for others.</p>
              <Link to="/contact" className="prayer-sidebar-link">
                Learn More →
              </Link>
            </div>

            <div className="prayer-sidebar-card prayer-sidebar-quote">
              <p className="prayer-sidebar-verse">
                "The prayer of a righteous person is powerful and effective."
              </p>
              <span className="prayer-sidebar-ref">— James 5:16</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Promises */}
      <section className="prayer-promises-section">
        <div
          className={`prayer-promises-inner anim-fade-up ${promisesVisible ? 'visible' : ''}`}
          ref={promisesRef}
        >
          <p className="section-eyebrow" style={{ textAlign: 'center', color: 'var(--gold)' }}>God's Promises</p>
          <h2 className="section-title" style={{ textAlign: 'center', color: 'var(--white)' }}>
            Scriptures to Stand On
          </h2>
          <span className="gold-rule centered"></span>

          <div className="promises-grid">
            {promises.map((p, i) => (
              <div key={i} className="promise-card">
                <p className="promise-verse">{p.verse}</p>
                <span className="promise-ref">{p.ref}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}