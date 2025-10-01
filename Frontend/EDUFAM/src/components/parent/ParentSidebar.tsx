import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';

export interface ParentNavItem {
  path: string;
  label: string;
  icon?: string;
}

interface ParentSidebarProps {
  navItems: ParentNavItem[];
  isOpen: boolean;
  title?: string;
}

const ParentSidebar: React.FC<ParentSidebarProps> = ({ 
  navItems, 
  isOpen, 
  title = "EDUFAM Parent" 
}) => {
  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-section">
          <i className="bi bi-people-fill me-2"></i>
          <h4 className="mb-0">{title}</h4>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                end={item.path === '/parent'}
              >
                <span className="nav-icon">
                  {item.icon && <i className={item.icon}></i>}
                </span>
                <span className="nav-text">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="footer-content">
          <small className="text-white">
            <i className="bi bi-house-heart me-1"></i>
            Parent Portal v1.0
          </small>
        </div>
      </div>
    </div>
  );
};

export default ParentSidebar;