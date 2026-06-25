import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import './Topbar.css';

export default function Topbar({ search, onSearchChange, userName = 'Chris' }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  const initial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar__search">
        <Search size={20} className="topbar__search-icon" />
        <input
          type="text"
          className="topbar__search-input"
          placeholder="Search applications"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="topbar__profile" ref={menuRef}>
        <button
          type="button"
          className="topbar__avatar"
          onClick={() => setShowProfileMenu((prev) => !prev)}
          aria-label="Account menu"
        >
          {initial}
        </button>

        {showProfileMenu && (
          <div className="topbar__dropdown">
            <button type="button" className="topbar__dropdown-item">
              Manage Account
            </button>
            <button type="button" className="topbar__dropdown-item">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
