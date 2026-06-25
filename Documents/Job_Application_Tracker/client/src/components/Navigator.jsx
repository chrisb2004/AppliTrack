import { useState, useMemo } from 'react';
import { PlusCircle, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { STATUSES, STATUS_COLORS } from '../constants/statuses';
import './Navigator.css';

export default function Navigator({ applications, onNewApplication }) {
  const [showChart, setShowChart] = useState(false);

  const chartData = useMemo(() => {
    return STATUSES.map((status) => ({
      status,
      count: applications.filter((app) => app.status === status).length,
    })).filter((item) => item.count > 0);
  }, [applications]);

  const total = applications.length;

  return (
    <aside className="navigator">
      <h2 className="navigator__title">Navigator</h2>

      <nav className="navigator__actions">
        <button type="button" className="navigator__btn" onClick={onNewApplication}>
          <PlusCircle size={18} />
          New Application
        </button>

        <button
          type="button"
          className={`navigator__btn ${showChart ? 'navigator__btn--active' : ''}`}
          onClick={() => setShowChart((prev) => !prev)}
        >
          <PieChartIcon size={18} />
          Chart
        </button>
      </nav>

      {showChart && (
        <div className="navigator__chart-section">
          <div className="navigator__chart-wrapper">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.status} fill={STATUS_COLORS[entry.status].text} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="navigator__chart-center">
              <span className="navigator__chart-total">{total}</span>
              <span className="navigator__chart-label">Total</span>
            </div>
          </div>

          {chartData.length === 0 ? (
            <p className="navigator__chart-empty">No applications yet.</p>
          ) : (
            <ul className="navigator__legend">
              {chartData.map((item) => (
                <li key={item.status} className="navigator__legend-item">
                  <span
                    className="navigator__legend-dot"
                    style={{ backgroundColor: STATUS_COLORS[item.status].text }}
                  />
                  <span className="navigator__legend-label">{item.status}</span>
                  <span className="navigator__legend-count">{item.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </aside>
  );
}
