import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { IconBalance, IconBuilding, IconDocument, IconCompliance, IconContract, IconDueDiligence } from '../components/Icons';
import { useInView } from '../hooks/useInView';
import './Services.css';

const services = [
  {
    icon: <IconBalance size={44} />,
    title: 'Legal Advisory',
    desc: 'Expert legal counsel for individuals and businesses across Ghana. We handle corporate law, contract disputes, regulatory filings, employment law, and civil litigation. Our attorneys combine practical experience with in-depth legal knowledge to deliver results-driven advice.',
    features: ['Corporate Law', 'Contract Disputes', 'Employment Law', 'Civil Litigation'],
  },
  {
    icon: <IconBuilding size={44} />,
    title: 'Property Acquisition Support',
    desc: 'End-to-end guidance through every stage of property transactions. From initial due diligence and negotiations to title searches and post-closing support, we ensure your property acquisition is smooth, secure, and legally sound.',
    features: ['Due Diligence', 'Title Searches', 'Negotiation Support', 'Post-Closing'],
  },
  {
    icon: <IconDocument size={44} />,
    title: 'Business Registration',
    desc: 'Complete business formation services for entrepreneurs and established companies entering new markets. We handle entity selection, Registrar General filings, tax registration, licensing, and post-incorporation compliance.',
    features: ['Entity Formation', 'RGD Filings', 'Tax Registration', 'Licensing'],
  },
  {
    icon: <IconCompliance size={44} />,
    title: 'Corporate Compliance',
    desc: 'Ongoing compliance monitoring and reporting to keep your business fully compliant with Ghanaian law. We track statutory deadlines, prepare annual filings, and advise on regulatory changes that could affect your operations.',
    features: ['Statutory Filings', 'Compliance Audits', 'Regulatory Advice', 'Annual Returns'],
  },
  {
    icon: <IconContract size={44} />,
    title: 'Contract Drafting & Review',
    desc: 'Precision-drafted contracts and thorough review services to protect your interests in every business agreement. From NDAs and service agreements to complex joint-venture documentation, we ensure your contracts are enforceable and fair.',
    features: ['Contract Drafting', 'Agreement Reviews', 'NDA Preparation', 'JV Documentation'],
  },
  {
    icon: <IconDueDiligence size={44} />,
    title: 'Due Diligence',
    desc: 'Comprehensive due diligence for mergers, acquisitions, and investments. We examine financial records, legal liabilities, regulatory compliance, and operational risks to give you a complete picture before you commit.',
    features: ['M&A Due Diligence', 'Legal Risk Review', 'Financial Analysis', 'Investment Reports'],
  },
];

function ServiceRow({ service, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.12 });
  const isAlt = index % 2 === 1;
  return (
    <div
      ref={ref}
      className={`service-row ${isAlt ? 'service-row--alt' : ''} anim-fade-up ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: '0.05s' }}
    >
      <div className="service-row-icon">{service.icon}</div>
      <div className="service-row-content">
        <h3 className="service-row-title">{service.title}</h3>
        <span className="gold-rule" style={{ marginBottom: 16 }}></span>
        <p className="service-row-desc">{service.desc}</p>
        <ul className="service-features">
          {service.features.map((f) => (
            <li key={f}>
              <span className="feature-dot"></span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="service-row-cta">
        <Link to="/contact" className="btn-outline-gold">Enquire Now</Link>
      </div>
    </div>
  );
}

export default function Services() {
  const [introRef,   introVisible]   = useInView({ threshold: 0.2 });
  const [processRef, processVisible] = useInView({ threshold: 0.1 });
  const [ctaRef,     ctaVisible]     = useInView({ threshold: 0.2 });

  return (
    <main className="services-page">
      <PageHeader
        label="What We Offer"
        title="Our Services"
        subtitle="A comprehensive suite of legal and business consultancy services — built around your needs."
        bg="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=1600&q=80"
      />

      <section className="services-intro">
        <div
          className={`services-intro-inner anim-fade-up ${introVisible ? 'visible' : ''}`}
          ref={introRef}
        >
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Tailored Expertise</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Comprehensive Legal & Business Solutions
          </h2>
          <span className="gold-rule centered"></span>
          <p className="services-intro-text">
            Whether you're an entrepreneur launching your first venture, an established company
            navigating a complex transaction, or an individual seeking legal protection — Prestige Pots & Pebbles
            has the expertise and dedication to deliver the outcomes you need.
          </p>
        </div>
      </section>

      <section className="services-list">
        <div className="services-list-inner">
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <div className="process-inner">
          <div className={`anim-fade-up ${processVisible ? 'visible' : ''}`} ref={processRef}>
            <p className="section-eyebrow" style={{ textAlign: 'center', color: 'var(--gold)' }}>How We Work</p>
            <h2 className="section-title" style={{ textAlign: 'center', color: 'var(--white)' }}>Our Process</h2>
            <span className="gold-rule centered"></span>
          </div>

          <div className="process-steps">
            {[
              { step: '01', title: 'Initial Consultation', desc: 'We listen carefully to understand your specific needs, goals, and circumstances before recommending any course of action.' },
              { step: '02', title: 'Strategy & Planning',  desc: 'Our team develops a tailored strategy with clear timelines, milestones, and transparent pricing aligned with your objectives.' },
              { step: '03', title: 'Execution',            desc: 'We handle every detail with precision — from document preparation to regulatory filings to negotiations on your behalf.' },
              { step: '04', title: 'Follow-Through',       desc: 'We remain your partner beyond project completion, providing ongoing support and advice as your needs evolve.' },
            ].map((p, i) => (
              <div
                className={`process-step anim-fade-up delay-${i + 1} ${processVisible ? 'visible' : ''}`}
                key={p.step}
              >
                <div className="process-step-number">{p.step}</div>
                <h3 className="process-step-title">{p.title}</h3>
                <p className="process-step-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta-section">
        <div
          className={`anim-fade-up ${ctaVisible ? 'visible' : ''}`}
          ref={ctaRef}
          style={{ textAlign: 'center' }}
        >
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Start Today</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--navy)', textAlign: 'center', margin: '8px 0 16px' }}>
            Ready to Take the Next Step?
          </h2>
          <span className="gold-rule centered" style={{ marginBottom: 20 }}></span>
          <p style={{ color: 'var(--gray)', maxWidth: 500, margin: '0 auto 32px', fontSize: 15, lineHeight: 1.8 }}>
            Contact us today to schedule a consultation and discover how Prestige Pots & Pebbles can help you achieve your goals.
          </p>
          <Link to="/contact" className="btn-gold">Schedule a Consultation</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
