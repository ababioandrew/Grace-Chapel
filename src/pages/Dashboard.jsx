import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  IconUser,
  IconBell,
  IconCalendar,
  IconPray,
  IconSettings,
  IconLogOut,
} from '../components/Icons';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const notification = useNotification();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  if (!user) return null;

  const handleLogout = () => {
    logout();
    notification.info('You have been logged out');
    navigate('/');
  };

  const handleProfileUpdate = () => {
    updateProfile(profileForm);
    setEditing(false);
    notification.success('Profile updated successfully');
  };

  const announcements = [
    { id: 1, title: 'Annual Thanksgiving Service', date: 'December 15, 2024', body: 'Join us for our annual thanksgiving service. Special guest speaker: Rev. Dr. Emmanuel Asante.' },
    { id: 2, title: 'Youth Camp Registration Open', date: 'January 5, 2025', body: 'Registration for our annual youth camp is now open. Space is limited!' },
    { id: 3, title: 'New Members Class', date: 'Every First Sunday', body: 'New members class holds every first Sunday after second service.' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <IconUser size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <IconBell size={18} /> },
    { id: 'events', label: 'My Events', icon: <IconCalendar size={18} /> },
    { id: 'prayers', label: 'My Prayers', icon: <IconPray size={18} /> },
    { id: 'settings', label: 'Settings', icon: <IconSettings size={18} /> },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <div>
            <h1 className="dashboard-title">Welcome, {user.name}</h1>
            <p className="dashboard-subtitle">Member Dashboard</p>
          </div>
          <button className="btn-outline-gold" onClick={handleLogout}>
            <IconLogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="dashboard-container">
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <div className="sidebar-user">
              <span className="sidebar-avatar">{user.avatar}</span>
              <div>
                <p className="sidebar-name">{user.name}</p>
                <p className="sidebar-role">{user.role === 'admin' ? 'Administrator' : 'Member'}</p>
              </div>
            </div>

            <nav className="sidebar-nav">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={`sidebar-tab ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="dashboard-main">
            {activeTab === 'overview' && (
              <div className="dashboard-panel anim-fade-up visible">
                <h2 className="panel-title">Profile Overview</h2>
                <div className="profile-card">
                  <div className="profile-header">
                    <span className="profile-avatar-large">{user.avatar}</span>
                    <div>
                      <h3 className="profile-name">{user.name}</h3>
                      <p className="profile-email">{user.email}</p>
                      <span className="badge badge-gold">{user.role}</span>
                    </div>
                  </div>

                  {editing ? (
                    <div className="profile-edit-form">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          className="form-input"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          className="form-input"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                          className="form-input"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="profile-actions">
                        <button className="btn-gold" onClick={handleProfileUpdate}>Save Changes</button>
                        <button className="btn-outline-gold" onClick={() => setEditing(false)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="profile-details">
                      <div className="profile-detail">
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">{user.phone || 'Not provided'}</span>
                      </div>
                      <div className="profile-detail">
                        <span className="detail-label">Member Since</span>
                        <span className="detail-value">
                          {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <button className="btn-outline-gold" onClick={() => setEditing(true)}>
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="dashboard-panel anim-fade-up visible">
                <h2 className="panel-title">Church Announcements</h2>
                <div className="announcements-list">
                  {announcements.map((a) => (
                    <div key={a.id} className="announcement-item">
                      <h3 className="announcement-title">{a.title}</h3>
                      <p className="announcement-date">{a.date}</p>
                      <p className="announcement-body">{a.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="dashboard-panel anim-fade-up visible">
                <h2 className="panel-title">My Events</h2>
                <div className="empty-state">
                  <IconCalendar size={48} />
                  <p>You haven't registered for any events yet.</p>
                  <Link to="/events" className="btn-gold">Browse Events</Link>
                </div>
              </div>
            )}

            {activeTab === 'prayers' && (
              <div className="dashboard-panel anim-fade-up visible">
                <h2 className="panel-title">My Prayer Requests</h2>
                <div className="empty-state">
                  <IconPray size={48} />
                  <p>You haven't submitted any prayer requests yet.</p>
                  <Link to="/prayer" className="btn-gold">Submit a Prayer Request</Link>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="dashboard-panel anim-fade-up visible">
                <h2 className="panel-title">Account Settings</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive email updates about church events and announcements</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div>
                      <h4>Prayer Chain</h4>
                      <p>Join our prayer chain and receive prayer requests</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div>
                      <h4>Birthday Celebrations</h4>
                      <p>Share your birthday with the church community</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}