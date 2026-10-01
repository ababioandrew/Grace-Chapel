import { useNotification } from '../context/NotificationContext';
import { IconCheck, IconClose } from './Icons';
import './Notification.css';

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  const icons = {
    success: <IconCheck size={18} />,
    error: <IconClose size={18} />,
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className="notification-container">
      {notifications.map((n) => (
        <div key={n.id} className={`notification notification-${n.type}`}>
          <span className="notification-icon">{icons[n.type]}</span>
          <span className="notification-message">{n.message}</span>
          <button
            className="notification-close"
            onClick={() => removeNotification(n.id)}
            aria-label="Dismiss"
          >
            <IconClose size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}