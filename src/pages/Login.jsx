import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { IconChurch, IconMail } from '../components/Icons';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();
  const notification = useNotification();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      notification.success(`Welcome back!`);
      navigate(result.profile?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      notification.error(result.error || 'Login failed');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      notification.error('Enter a valid email');
      return;
    }
    const res = await resetPassword(resetEmail);
    if (res.success) {
      notification.success('Password reset link sent — check your email');
      setShowReset(false);
    } else {
      notification.error(res.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo"><IconChurch size={40} /></div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your Grace Chapel account</p>
          </div>

          {showReset ? (
            <form className="auth-form" onSubmit={handleReset}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <IconMail size={18} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary auth-submit">
                Send Reset Link
              </button>

              <p className="auth-switch" style={{ marginTop: 16 }}>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setShowReset(false)}
                >
                  ← Back to Sign In
                </button>
              </p>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <IconMail size={18} />
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="auth-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setShowReset(true)}
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                {loading ? <span className="loading-spinner-small" /> : 'Sign In'}
              </button>
            </form>
          )}

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Join Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}