import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';

export interface TeacherNavItem {
  path: string;
  label: string;
  icon?: string;
  dropdown?: boolean;
  dropdownOptions?: Array<{ value: string; label: string }>;
}

interface TeacherSidebarProps {
  navItems: TeacherNavItem[];
  isOpen: boolean;
  onClassSelect?: (classValue: string) => void;
  selectedClass?: string;
  title?: string;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ 
  navItems, 
  isOpen, 
  onClassSelect, 
  selectedClass, 
  title = "EDUFAM Teacher" 
}) => {
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-section">
          <i className="bi bi-person-badge-fill me-2"></i>
          <h4 className="mb-0">{title}</h4>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <li key={item.path} className="nav-item">
                  <div className="dropdown-nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `nav-link ${isActive ? 'active' : ''}`
                      }
                      end={item.path === '/teacher'}
                    >
                      <span className="nav-icon">
                        {item.icon && <i className={item.icon}></i>}
                      </span>
                      <span className="nav-text">{item.label}</span>
                    </NavLink>
                    <button
                      className="dropdown-toggle-btn"
                      type="button"
                      onClick={() => setDashboardDropdownOpen((open) => !open)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.8)',
                        padding: '0.5rem',
                        marginLeft: 'auto',
                        cursor: 'pointer'
                      }}
                    >
                      <i className={`bi bi-chevron-${dashboardDropdownOpen ? 'up' : 'down'}`}></i>
                    </button>
                  </div>
                  {dashboardDropdownOpen && (
                    <ul className="dropdown-submenu">
                      {item.dropdownOptions && item.dropdownOptions.map((opt) => (
                        <li key={opt.value}>
                          <button
                            className={`submenu-item ${selectedClass === opt.value ? 'active' : ''}`}
                            onClick={() => {
                              setDashboardDropdownOpen(false);
                              if (onClassSelect) onClassSelect(opt.value);
                            }}
                            style={{
                              width: '100%',
                              background: selectedClass === opt.value ? 'rgba(108, 99, 255, 0.2)' : 'none',
                              border: 'none',
                              color: 'rgba(255, 255, 255, 0.8)',
                              padding: '0.5rem 2rem',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            } else {
              return (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    end={item.path === '/teacher'}
                  >
                    <span className="nav-icon">
                      {item.icon && <i className={item.icon}></i>}
                    </span>
                    <span className="nav-text">{item.label}</span>
                  </NavLink>
                </li>
              );
            }
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="footer-content">
          <small className="text-white">
            <i className="bi bi-mortarboard me-1"></i>
            Teacher Portal v1.0
          </small>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
