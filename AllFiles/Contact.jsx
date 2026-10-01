import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { IconPhone, IconMail, IconMapPin } from '../components/Icons';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [headingRef, headingVisible] = useInView({ threshold: 0.2 });
  const [infoRef,    infoVisible]    = useInView({ threshold: 0.15 });
  const [formRef,    formVisible]    = useInView({ threshold: 0.15 });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <PageHeader
        label="Get In Touch"
        title="Contact Us"
        subtitle="We're ready to help. Reach out to schedule a consultation or ask any questions."
        bg="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80"
      />

      {/* Top band */}
      <div className="contact-band">
        <div className="contact-band-inner">
          <div className="contact-band-item">
            <span className="band-icon"><IconPhone size={14} /></span>
            <span>(+233) 501195737</span>
          </div>
          <div className="contact-band-item">
            <span className="band-icon"><IconMail size={14} /></span>
            <span>Prestige Pots & Pebblescon@gmail.com</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTACT SECTION ── */}
      <section className="contact-main">
        <div className="contact-main-inner">

          {/* Section heading */}
          <div
            className={`contact-heading anim-fade-up ${headingVisible ? 'visible' : ''}`}
            ref={headingRef}
          >
            <p className="section-eyebrow" style={{ textAlign: 'center' }}>Contact Us</p>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Get in Touch with Prestige Pots & Pebbles
            </h2>
            <span className="gold-rule centered"></span>
            <p className="contact-intro">
              When contacting Prestige Pots & Pebbles, please provide as much detail as possible
              about your inquiry so our team can prepare to serve you best.
            </p>
          </div>

          {/* Grid */}
          <div className="contact-grid">
            {/* LEFT: Info + map */}
            <div
              className={`contact-info anim-slide-left ${infoVisible ? 'visible' : ''}`}
              ref={infoRef}
            >
              <div className="contact-info-item">
                <div className="ci-icon"><IconMapPin size={18} /></div>
                <div>
                  <p className="ci-label">Address</p>
                  <p className="ci-value">
                    No. 5 Bert Mensah Street,<br />
                    Matahako, Tema<br />
                    +233 501195737
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="ci-icon"><IconPhone size={18} /></div>
                <div>
                  <p className="ci-label">Phone</p>
                  <p className="ci-value">(+233) 501195737</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="ci-icon"><IconMail size={18} /></div>
                <div>
                  <p className="ci-label">Email</p>
                  <p className="ci-value">Prestige Pots & Pebblescon@gmail.com</p>
                </div>
              </div>

              {/* Map embed */}
              <div className="map-container">
                <iframe
                  title="Prestige Pots & Pebbles Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31755.94!2d-0.0166!3d5.6698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2d34a3f%3A0xd3a6a6b4c5d36f0!2sTema%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://goo.gl/maps/tema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold map-btn"
                >
                  Visit Prestige Pots & Pebbles
                </a>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div
              className={`contact-form-col anim-slide-right ${formVisible ? 'visible' : ''}`}
              ref={formRef}
            >
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon">✓</div>
                  <h3>Message Received</h3>
                  <p>Thank you for contacting Prestige Pots & Pebbles. A member of our team will be in touch with you shortly.</p>
                  <button className="btn-gold" style={{ marginTop: 24 }} onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      placeholder="Your full name" required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      placeholder="Your email address" required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message" name="message"
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      required
                    />
                  </div>

                  <button type="submit" className="btn-gold form-submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
