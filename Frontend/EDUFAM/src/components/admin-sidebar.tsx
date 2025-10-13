import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Define the shape of a navigation item
export interface NavItem {
  path: string;
  label: string;
  icon?: string; // Optional icon class (e.g., 'bi bi-house')
}

// Define the props for the AdminSidebar component
interface AdminSidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  title?: string; // Optional title for the sidebar
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ navItems, isOpen, title = "EDUFAM Admin" }) => {
  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-section">
          <i className="bi bi-mortarboard-fill me-2"></i>
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
                end={item.path === '/admin'}
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
            <i className="bi bi-shield-check me-1"></i>
            Admin Panel v1.0
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;