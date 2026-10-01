import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  IconUsers,
  IconCalendar,
  IconPray,
  IconMail,
  IconSettings,
  IconLogOut,
  IconBell,
  IconPlay,
  IconCheck,
  IconClose,
} from '../components/Icons';
import './AdminDashboard.css';

const initialMembers = [
  { id: 1, name: 'Sarah Mensah', email: 'sarah@email.com', phone: '+233 24 123 4567', role: 'member', status: 'active', joined: '2023-01-15' },
  { id: 2, name: 'Michael Osei', email: 'michael@email.com', phone: '+233 20 987 6543', role: 'member', status: 'active', joined: '2023-03-22' },
  { id: 3, name: 'Grace Adjei', email: 'grace@email.com', phone: '+233 55 456 7890', role: 'leader', status: 'active', joined: '2022-11-08' },
  { id: 4, name: 'Kwame Asante', email: 'kwame@email.com', phone: '+233 27 111 2222', role: 'member', status: 'inactive', joined: '2023-06-30' },
];

const initialPrayers = [
  { id: 1, name: 'Anonymous', category: 'Healing', request: 'Please pray for my mother who is in the hospital.', date: '2024-12-01', status: 'pending' },
  { id: 2, name: 'John Mensah', category: 'Financial', request: 'Praying for God\'s provision for my business.', date: '2024-11-28', status: 'prayed' },
  { id: 3, name: 'Mary Owusu', category: 'Family', request: 'Praying for restoration in my family.', date: '2024-11-25', status: 'pending' },
];

const initialEvents = [
  { id: 1, title: 'Annual Thanksgiving Service', date: '2024-12-15', time: '10:00 AM', location: 'Main Sanctuary', status: 'upcoming' },
  { id: 2, title: 'Youth Camp', date: '2025-01-05', time: '9:00 AM', location: 'Camp Grounds', status: 'upcoming' },
  { id: 3, title: 'Christmas Carol Night', date: '2024-12-24', time: '7:00 PM', location: 'Main Sanctuary', status: 'upcoming' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const notification = useNotification();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [members, setMembers] = useState(initialMembers);
  const [prayers, setPrayers] = useState(initialPrayers);
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || user.role !== 'admin') return null;

  const handleLogout = () => {
    logout();
    notification.info('Logged out successfully');
    navigate('/');
  };

  const toggleMemberStatus = (id) => {
    setMembers(prev =>
      prev.map(m =>
        m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
      )
    );
    notification.success('Member status updated');
  };

  const markPrayerPrayed = (id) => {
    setPrayers(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'prayed' } : p))
    );
    notification.success('Prayer marked as prayed');
  };

  const deletePrayer = (id) => {
    setPrayers(prev => prev.filter(p => p.id !== id));
    notification.success('Prayer request removed');
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <IconSettings size={18} /> },
    { id: 'members', label: 'Members', icon: <IconUsers size={18} /> },
    { id: 'prayers', label: 'Prayer Requests', icon: <IconPray size={18} /> },
    { id: 'events', label: 'Events', icon: <IconCalendar size={18} /> },
    { id: 'media', label: 'Media', icon: <IconPlay size={18} /> },
    { id: 'messages', label: 'Messages', icon: <IconMail size={18} /> },
  ];

  const stats = [
    { label: 'Total Members', value: members.length, icon: '👥', color: 'var(--gold)' },
    { label: 'Prayer Requests', value: prayers.length, icon: '🙏', color: 'var(--church-blue)' },
    { label: 'Upcoming Events', value: events.length, icon: '📅', color: 'var(--success)' },
    { label: 'Active Members', value: members.filter(m => m.status === 'active').length, icon: '✅', color: 'var(--navy)' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand">
            <span className="admin-badge">Admin</span>
            <h1 className="admin-title">Grace Chapel Dashboard</h1>
          </div>
          <div className="admin-user">
            <span className="admin-user-name">{user.name}</span>
            <button className="admin-logout" onClick={handleLogout}>
              <IconLogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-body">
        <div className="admin-container">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <nav className="admin-nav">
              {tabs.map(t => (
                <button
                  key={t.id}
                  className={`admin-tab ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="admin-main">
            {activeTab === 'overview' && (
              <div className="admin-panel anim-fade-up visible">
                <h2 className="admin-panel-title">Overview</h2>
                <div className="admin-stats-grid">
                  {stats.map(s => (
                    <div key={s.label} className="admin-stat-card">
                      <span className="admin-stat-icon">{s.icon}</span>
                      <div>
                        <p className="admin-stat-value" style={{ color: s.color }}>{s.value}</p>
                        <p className="admin-stat-label">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="admin-panel anim-fade-up visible">
                <div className="admin-panel-header">
                  <h2 className="admin-panel-title">Member Management</h2>
                  <input
                    type="text"
                    className="admin-search"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map(m => (
                        <tr key={m.id}>
                          <td className="td-name">{m.name}</td>
                          <td>{m.email}</td>
                          <td>{m.phone}</td>
                          <td><span className="badge badge-navy">{m.role}</span></td>
                          <td>
                            <span className={`badge ${m.status === 'active' ? 'badge-success' : 'badge'}`}>
                              {m.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="table-action"
                              onClick={() => toggleMemberStatus(m.id)}
                            >
                              {m.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'prayers' && (
              <div className="admin-panel anim-fade-up visible">
                <h2 className="admin-panel-title">Prayer Requests</h2>
                <div className="admin-prayers-list">
                  {prayers.map(p => (
                    <div key={p.id} className={`admin-prayer-item ${p.status === 'prayed' ? 'prayed' : ''}`}>
                      <div className="prayer-item-header">
                        <div>
                          <span className="prayer-item-name">{p.name}</span>
                          <span className="prayer-item-category">{p.category}</span>
                        </div>
                        <span className="prayer-item-date">{p.date}</span>
                      </div>
                      <p className="prayer-item-text">{p.request}</p>
                      <div className="prayer-item-actions">
                        {p.status === 'pending' ? (
                          <button className="btn-gold btn-sm" onClick={() => markPrayerPrayed(p.id)}>
                            <IconCheck size={14} /> Mark as Prayed
                          </button>
                        ) : (
                          <span className="prayer-prayed-tag">✓ Prayed</span>
                        )}
                        <button className="btn-outline-gold btn-sm" onClick={() => deletePrayer(p.id)}>
                          <IconClose size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {prayers.length === 0 && (
                    <p className="admin-empty">No prayer requests at this time.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="admin-panel anim-fade-up visible">
                <h2 className="admin-panel-title">Event Management</h2>
                <div className="admin-events-list">
                  {events.map(e => (
                    <div key={e.id} className="admin-event-item">
                      <div>
                        <h3 className="admin-event-title">{e.title}</h3>
                        <p className="admin-event-meta">{e.date} • {e.time} • {e.location}</p>
                      </div>
                      <span className={`badge ${e.status === 'upcoming' ? 'badge-gold' : 'badge-success'}`}>
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="admin-panel anim-fade-up visible">
                <h2 className="admin-panel-title">Media Library</h2>
                <div className="admin-empty-state">
                  <IconPlay size={48} />
                  <p>Media management coming soon.</p>
                  <p className="admin-empty-sub">Upload and manage sermons, videos, and audio files.</p>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="admin-panel anim-fade-up visible">
                <h2 className="admin-panel-title">Contact Messages</h2>
                <div className="admin-empty-state">
                  <IconMail size={48} />
                  <p>No new messages.</p>
                  <p className="admin-empty-sub">Contact form submissions will appear here.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}