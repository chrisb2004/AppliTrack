import { useState, useMemo } from 'react';
import Topbar from '../components/Topbar';
import ApplicationList from '../components/ApplicationList';
import ApplicationPanel from '../components/ApplicationPanel';
import { MOCK_APPLICATIONS } from '../data/mockApplications';
import './Dashboard.css';

export default function Dashboard() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [panelApplicationId, setPanelApplicationId] = useState(null);

  const filteredApplications = useMemo(() => {
    const query = search.toLowerCase().trim();
    return applications.filter((app) => {
      const matchesSearch =
        !query ||
        app.position.toLowerCase().includes(query) ||
        app.company.toLowerCase().includes(query) ||
        app.industry.toLowerCase().includes(query);

      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(app.status);

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilters]);

  const panelApplication = applications.find((app) => app.id === panelApplicationId) ?? null;

  const handleSelectAll = () => {
    const visibleIds = filteredApplications.map((app) => app.id);
    const allVisibleSelected = visibleIds.every((id) => selectedIds.includes(id));
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleUpdateApplication = (id, updates) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
  };

  const handleAddApplication = () => {
    const newId = Math.max(0, ...applications.map((app) => app.id)) + 1;
    const newApp = {
      id: newId,
      position: 'New Position',
      company: 'Company Name',
      industry: '',
      status: 'Applied',
      interviewDate: '',
      dateApplied: new Date().toISOString().slice(0, 10),
      link: '',
      notes: '',
    };
    setApplications((prev) => [newApp, ...prev]);
    setPanelApplicationId(newId);
  };

  return (
    <div className="dashboard">
      <Topbar search={search} onSearchChange={setSearch} />
      <ApplicationList
        applications={filteredApplications}
        selectedIds={selectedIds}
        statusFilters={statusFilters}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onStatusFiltersChange={setStatusFilters}
        onRowClick={setPanelApplicationId}
        onStatusChange={handleStatusChange}
        onAddApplication={handleAddApplication}
      />
      <ApplicationPanel
        application={panelApplication}
        onClose={() => setPanelApplicationId(null)}
        onUpdate={handleUpdateApplication}
      />
    </div>
  );
}
