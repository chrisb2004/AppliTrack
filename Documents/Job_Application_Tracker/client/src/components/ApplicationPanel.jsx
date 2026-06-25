import { X } from 'lucide-react';
import { STATUSES } from '../constants/statuses';
import './ApplicationPanel.css';

export default function ApplicationPanel({ application, onClose, onUpdate }) {
  if (!application) return null;

  const handleChange = (field, value) => {
    onUpdate(application.id, { [field]: value });
  };

  return (
    <>
      <div className="app-panel__backdrop" onClick={onClose} />
      <aside className="app-panel">
        <div className="app-panel__header">
          <h2 className="app-panel__title">Application Details</h2>
          <button type="button" className="app-panel__close" onClick={onClose} aria-label="Close panel">
            <X size={20} />
          </button>
        </div>

        <div className="app-panel__body">
          <div className="app-panel__field">
            <label htmlFor="panel-position">Position</label>
            <input
              id="panel-position"
              type="text"
              value={application.position}
              onChange={(e) => handleChange('position', e.target.value)}
            />
          </div>

          <div className="app-panel__field">
            <label htmlFor="panel-company">Company</label>
            <input
              id="panel-company"
              type="text"
              value={application.company}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>

          <div className="app-panel__field">
            <label htmlFor="panel-industry">Industry</label>
            <input
              id="panel-industry"
              type="text"
              value={application.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
            />
          </div>

          <div className="app-panel__field">
            <label htmlFor="panel-status">Application Status</label>
            <select
              id="panel-status"
              value={application.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="app-panel__field">
            <label htmlFor="panel-link">Application Link</label>
            <input
              id="panel-link"
              type="url"
              value={application.link}
              onChange={(e) => handleChange('link', e.target.value)}
              placeholder="https://"
            />
          </div>

          <div className="app-panel__field">
            <label htmlFor="panel-interview">Interview Date</label>
            <input
              id="panel-interview"
              type="date"
              value={application.interviewDate}
              onChange={(e) => handleChange('interviewDate', e.target.value)}
            />
          </div>

          <div className="app-panel__field">
            <label htmlFor="panel-notes">Notes</label>
            <textarea
              id="panel-notes"
              rows={4}
              value={application.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add notes about this application..."
            />
          </div>

          <div className="app-panel__field">
            <label htmlFor="panel-applied">Date Applied</label>
            <input
              id="panel-applied"
              type="date"
              value={application.dateApplied}
              onChange={(e) => handleChange('dateApplied', e.target.value)}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
