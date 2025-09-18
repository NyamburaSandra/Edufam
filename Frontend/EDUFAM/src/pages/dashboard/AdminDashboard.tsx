import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import AdminView from './AdminView';
import { adminNavItems } from '../../config/adminNavigation';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Toggle Button */}
      <Button
        variant="outline-primary"
        className="mb-3 ms-3"
        onClick={toggleSidebar}
        style={{ position: 'fixed', top: '70px', left: '10px', zIndex: 1025 }}
      >
        <i className="bi bi-list"></i> Menu
      </Button>

      {/* Sidebar */}
      <Sidebar navItems={adminNavItems} isOpen={sidebarOpen} />

      {/* Main Content */}
      <div 
        className={`admin-content ${sidebarOpen ? 'sidebar-open' : ''}`}
        style={{
          marginLeft: sidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
          padding: '20px',
          paddingTop: '100px' // Account for fixed toggle button
        }}
      >
        <Container fluid>
          <AdminView />
        </Container>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1019,
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
