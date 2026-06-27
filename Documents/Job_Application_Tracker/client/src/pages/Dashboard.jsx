import { useState, useMemo, useCallback } from 'react';
import Navigator from '../components/Navigator';
import Topbar from '../components/Topbar';
import ApplicationList from '../components/ApplicationList';
import ApplicationPanel from '../components/ApplicationPanel';
import AccountPanel from '../components/AccountPanel';
import { MOCK_APPLICATIONS } from '../data/mockApplications';
import './Dashboard.css';

export default function Dashboard() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [panelApplicationId, setPanelApplicationId] = useState(null);
  const [isCreatingApplication, setIsCreatingApplication] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

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

  const handleOpenCreatePanel = useCallback(() => {
    setPanelApplicationId(null);
    setIsCreatingApplication(true);
  }, []);

  const handleCommitNewApplication = (newApp) => {
    const newId = Math.max(0, ...applications.map((app) => app.id)) + 1;
    setApplications((prev) => [{ ...newApp, id: newId }, ...prev]);
    setIsCreatingApplication(false);
  };

  const handleDeleteSelected = () => {
    setApplications((prev) => prev.filter((app) => !selectedIds.includes(app.id)));
    setSelectedIds([]);
  };

  const handleRowClick = (id) => {
    setIsCreatingApplication(false);
    setPanelApplicationId(id);
  };

  const handlePanelClose = () => {
    setPanelApplicationId(null);
    setIsCreatingApplication(false);
  };

  return (
    <div className="dashboard">
      <Navigator applications={applications} onNewApplication={handleOpenCreatePanel} />

      <div className="dashboard__main">
        <Topbar
          search={search}
          onSearchChange={setSearch}
          onManageAccount={() => setShowAccountPanel(true)}
        />
        <ApplicationList
          applications={filteredApplications}
          selectedIds={selectedIds}
          statusFilters={statusFilters}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onStatusFiltersChange={setStatusFilters}
          onRowClick={handleRowClick}
          onStatusChange={handleStatusChange}
          showFilterMenu={showFilterMenu}
          onToggleFilterMenu={() => setShowFilterMenu(prev => !prev)}
        />
      </div>

      <ApplicationPanel
        key={isCreatingApplication ? 'create' : panelApplicationId}
        mode={isCreatingApplication ? 'create' : 'edit'}
        application={panelApplication}
        onClose={handlePanelClose}
        onUpdate={handleUpdateApplication}
        onCreate={handleCommitNewApplication}
      />

      <AccountPanel
        open={showAccountPanel}
        onClose={() => setShowAccountPanel(false)}
        
      />
    </div>
  );
}
