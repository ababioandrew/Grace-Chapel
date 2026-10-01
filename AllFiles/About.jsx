import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { IconBalance, IconBuilding, IconDocument } from '../components/Icons';
import { useInView } from '../hooks/useInView';
import './About.css';

const coreServices = [
  {
    icon: <IconBalance size={40} />,
    title: 'Legal Advisory',
    desc: 'Expert legal counsel tailored to every client — from individuals to large corporations. We handle corporate law, contracts, and dispute resolution with precision.',
  },
  {
    icon: <IconBuilding size={40} />,
    title: 'Property Acquisition Support',
    desc: 'Expert guidance through every step of your property acquisition. Due diligence, negotiations, title searches, and closing processes handled seamlessly.',
  },
  {
    icon: <IconDocument size={40} />,
    title: 'Business Registration',
    desc: 'Streamlined business formation and registration services. Entity selection, licensing, and post-incorporation support so you can focus on growing.',
  },
];

const values = [
  { title: 'Integrity',     desc: 'We hold ourselves to the highest ethical standards in every engagement — no exceptions.' },
  { title: 'Expertise',     desc: 'Our team brings specialized knowledge across legal, property, and corporate disciplines.' },
  { title: 'Commitment',    desc: 'We are dedicated to client success, going beyond expectations on every mandate.' },
  { title: 'Transparency',  desc: 'Clear communication at every step — no surprises, no hidden agendas.' },
];

export default function About() {
  const [textRef,     textVisible]     = useInView({ threshold: 0.15 });
  const [imgRef,      imgVisible]      = useInView({ threshold: 0.15 });
  const [servicesRef, servicesVisible] = useInView({ threshold: 0.1  });
  const [valuesRef,   valuesVisible]   = useInView({ threshold: 0.1  });
  const [ctaRef,      ctaVisible]      = useInView({ threshold: 0.2  });

  return (
    <main className="about-page">
      <PageHeader
        label="About Us"
        title="Your Trusted Partner in Legal and Business Consultancy"
        subtitle="Providing professional legal advice, property acquisition support, and business registration services that help your business succeed."
        bg="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
      />

      <div className="about-nav-band">
        <div className="about-nav-inner">
          <span>Prestige Pots & Pebbles</span>
        </div>
      </div>

      {/* ── ABOUT MAIN CONTENT ── */}
      <section className="about-main">
        <div className="about-main-inner">
          <div
            className={`about-text anim-slide-left ${textVisible ? 'visible' : ''}`}
            ref={textRef}
          >
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title">
              Your Trusted Partner in Legal<br />and Business Consultancy
            </h2>
            <span className="gold-rule"></span>
            <p className="about-para">
              Prestige Pots & Pebbles is a full-service legal and business advisory firm dedicated to helping
              individuals and organizations navigate complex legal terrain, acquire property seamlessly,
              and establish strong corporate foundations. Founded on the principles of integrity,
              excellence, and client-focused service, we have grown into one of Ghana's most trusted
              consultancy practices.
            </p>
            <p className="about-para">
              Our team of experienced attorneys and business consultants each brings specialized
              expertise in their respective fields to deliver comprehensive, tailored solutions.
              We understand that every client's situation is unique, and we approach each engagement
              with the care and diligence it deserves.
            </p>
            <p className="about-para">
              We are proud to serve clients across Ghana and the broader West African region with the
              same unwavering standard of excellence on every single engagement.
            </p>
          </div>

          <div
            className={`about-image-col anim-slide-right ${imgVisible ? 'visible' : ''}`}
            ref={imgRef}
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=80"
              alt="Prestige Pots & Pebbles"
              className="about-img"
            />
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES STRIP ── */}
      <section className="about-services">
        <div className="about-services-inner" ref={servicesRef}>
          {coreServices.map((s, i) => (
            <div
              className={`about-service-col anim-fade-up delay-${i + 1} ${servicesVisible ? 'visible' : ''}`}
              key={s.title}
            >
              <div className="about-service-icon">{s.icon}</div>
              <h3 className="about-service-title">{s.title}</h3>
              <p className="about-service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="about-services-cta">
          <Link to="/services" className="btn-gold">View All Services</Link>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="values-section">
        <div className="values-inner">
          <div className={`values-header anim-fade-up ${valuesVisible ? 'visible' : ''}`} ref={valuesRef}>
            <p className="section-eyebrow" style={{ textAlign: 'center' }}>What Drives Us</p>
            <h2 className="section-title" style={{ textAlign: 'center', color: 'var(--white)' }}>Our Core Values</h2>
            <span className="gold-rule centered"></span>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div
                className={`value-card anim-fade-up delay-${i + 1} ${valuesVisible ? 'visible' : ''}`}
                key={v.title}
              >
                <div className="value-number">0{i + 1}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="about-cta">
        <div
          className={`about-cta-inner anim-fade-up ${ctaVisible ? 'visible' : ''}`}
          ref={ctaRef}
        >
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Ready to Get Started?</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--white)', textAlign: 'center', marginTop: 8 }}>
            Let Us Help You Move Forward
          </h2>
          <span className="gold-rule centered"></span>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 520, margin: '20px auto 36px', fontSize: 15, lineHeight: 1.8 }}>
            Whether you need legal advice, property support, or help registering your business,
            our team is ready to provide the guidance you need.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn-gold">Schedule a Consultation</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
