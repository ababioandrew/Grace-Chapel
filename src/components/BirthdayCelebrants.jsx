import { useInView } from '../hooks/useInView';
import './BirthdayCelebrants.css';

const celebrants = [
  { name: 'Sarah Mensah', date: 'Dec 3', avatar: '👩🏾' },
  { name: 'Michael Osei', date: 'Dec 5', avatar: '👨🏾' },
  { name: 'Grace Adjei', date: 'Dec 8', avatar: '👩🏾‍🦱' },
  { name: 'Kwame Asante', date: 'Dec 12', avatar: '🧑🏾' },
];

export default function BirthdayCelebrants() {
  const [ref, isVisible] = useInView({ threshold: 0.15 });

  return (
    <section className={`birthday-section anim-fade-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="birthday-inner">
        <div className="birthday-header">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Celebrating Our Family</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>🎂 Birthdays This Week</h2>
          <span className="gold-rule centered"></span>
        </div>

        <div className="birthday-grid">
          {celebrants.map((c) => (
            <div key={c.name} className="birthday-card">
              <span className="birthday-avatar">{c.avatar}</span>
              <p className="birthday-name">{c.name}</p>
              <p className="birthday-date">{c.date}</p>
            </div>
          ))}
        </div>

        <p className="birthday-note">
          Join us in wishing our brothers and sisters a blessed birthday! 🎉
        </p>
      </div>
    </section>
  );
}