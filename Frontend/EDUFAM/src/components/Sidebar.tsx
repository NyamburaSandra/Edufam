import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

// URL for the logo image - update this with your actual logo path
const LOGO_URL = '/src/assets/edufam-logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={LOGO_URL} alt="EduFam Logo" className="sidebar-logo" />
        <h3>EduFam</h3>
      </div>
      
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/parent" className="sidebar-link">
            <i className="bi bi-house"></i>
            <span>Parent Dashboard</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/teacher" className="sidebar-link">
            <i className="bi bi-mortarboard"></i>
            <span>Teacher Dashboard</span>
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link as={Link} to="/profile" className="sidebar-link">
            <i className="bi bi-person"></i>
            <span>Child Profile</span>
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link 
            href="https://wa.me/+1234567890" // TODO: Replace with actual teacher's WhatsApp number
            target="_blank" 
            rel="noopener noreferrer"
            className="sidebar-link"
          >
            <i className="bi bi-whatsapp"></i>
            <span>Chat with Teacher</span>
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link as={Link} to="/calendar" className="sidebar-link">
            <i className="bi bi-calendar-event"></i>
            <span>School Calendar</span>
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link as={Link} to="/fees" className="sidebar-link">
            <i className="bi bi-wallet2"></i>
            <span>Fee Status</span>
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link as={Link} to="/feedback" className="sidebar-link">
            <i className="bi bi-chat-dots"></i>
            <span>Feedback</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link 
            href="https://chat.whatsapp.com/invite-code" // TODO: Replace with actual WhatsApp group invite link
            target="_blank" 
            rel="noopener noreferrer"
            className="sidebar-link"
          >
            <i className="bi bi-people"></i>
            <span>Parents Group</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="sidebar-footer">
        <Nav.Link as={Link} to="/settings" className="sidebar-link">
          <i className="bi bi-gear"></i>
          <span>Settings</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/help" className="sidebar-link">
          <i className="bi bi-question-circle"></i>
          <span>Help</span>
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
