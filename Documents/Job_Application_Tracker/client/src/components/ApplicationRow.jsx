import { STATUSES, STATUS_COLORS } from '../constants/statuses';
import './ApplicationRow.css';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ApplicationRow({
  application,
  isSelected,
  onSelect,
  onRowClick,
  onStatusChange,
}) {
  const colors = STATUS_COLORS[application.status] || STATUS_COLORS.Applied;

  return (
    <div
      className={`app-row ${isSelected ? 'app-row--selected' : ''}`}
      onClick={() => onRowClick(application.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onRowClick(application.id)}
    >
      <div className="app-row__checkbox" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(application.id)}
          aria-label={`Select ${application.position} at ${application.company}`}
        />
      </div>

      <div className="app-row__cell app-row__cell--position">{application.position}</div>
      <div className="app-row__cell app-row__cell--company">{application.company}</div>
      <div className="app-row__cell app-row__cell--industry">{application.industry}</div>

      <div className="app-row__cell app-row__cell--status" onClick={(e) => e.stopPropagation()}>
        <select
          className="app-row__status-select"
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="app-row__cell app-row__cell--date">{formatDate(application.interviewDate)}</div>
      <div className="app-row__cell app-row__cell--date">{formatDate(application.dateApplied)}</div>
    </div>
  );
}
