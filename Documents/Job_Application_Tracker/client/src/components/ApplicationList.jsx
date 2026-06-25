import { useState, useRef, useEffect } from 'react';
import { Pencil, ChevronDown } from 'lucide-react';
import { STATUSES } from '../constants/statuses';
import ApplicationRow from './ApplicationRow';
import './ApplicationList.css';

export default function ApplicationList({
  applications,
  selectedIds,
  statusFilters,
  onSelectAll,
  onSelectOne,
  onStatusFiltersChange,
  onRowClick,
  onStatusChange,
  onAddApplication,
}) {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterRef = useRef(null);

  const allSelected = applications.length > 0 && applications.every((app) => selectedIds.includes(app.id));
  const someSelected = applications.some((app) => selectedIds.includes(app.id));

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleStatusFilter = (status) => {
    if (statusFilters.includes(status)) {
      onStatusFiltersChange(statusFilters.filter((s) => s !== status));
    } else {
      onStatusFiltersChange([...statusFilters, status]);
    }
  };

  const filterLabel =
    statusFilters.length === 0
      ? 'Filter'
      : statusFilters.length === 1
        ? statusFilters[0]
        : `${statusFilters.length} statuses`;

  return (
    <div className="app-list">
      <div className="app-list__toolbar">
        <div className="app-list__toolbar-left">
          <label className="app-list__checkbox-label">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected && !allSelected;
              }}
              onChange={onSelectAll}
              aria-label="Select all applications"
            />
          </label>

          <div className="app-list__filter" ref={filterRef}>
            <button
              type="button"
              className={`app-list__filter-btn ${statusFilters.length > 0 ? 'app-list__filter-btn--active' : ''}`}
              onClick={() => setShowFilterMenu((prev) => !prev)}
            >
              {filterLabel}
              <ChevronDown size={16} />
            </button>

            {showFilterMenu && (
              <div className="app-list__filter-menu">
                {STATUSES.map((status) => (
                  <label key={status} className="app-list__filter-option">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes(status)}
                      onChange={() => toggleStatusFilter(status)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="app-list__add-btn"
          onClick={onAddApplication}
          aria-label="Add application"
        >
          <Pencil size={20} />
        </button>
      </div>

      <div className="app-list__header">
        <div className="app-list__header-spacer" />
        <div className="app-list__header-cell">Position</div>
        <div className="app-list__header-cell">Company</div>
        <div className="app-list__header-cell">Industry</div>
        <div className="app-list__header-cell">Status</div>
        <div className="app-list__header-cell">Interview Date</div>
        <div className="app-list__header-cell">Date Applied</div>
      </div>

      <div className="app-list__rows">
        {applications.length === 0 ? (
          <div className="app-list__empty">No applications match your filters.</div>
        ) : (
          applications.map((app) => (
            <ApplicationRow
              key={app.id}
              application={app}
              isSelected={selectedIds.includes(app.id)}
              onSelect={onSelectOne}
              onRowClick={onRowClick}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
