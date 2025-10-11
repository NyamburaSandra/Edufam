import { useEvents } from '../../context/useEvents';
import { useAuth } from '../../context/useAuth';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import CustomNavbar from '../Navbar';
import ParentSidebar from './ParentSidebar';
import { useResults } from '../../context/ResultsContextHook';
import { useAttendance } from '../../context/AttendanceContextHook';
import { ParentMainDashboard, ChildInformationView, EventCalendarView } from '.';
import './ParentResponsive.css';

const ParentDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { results } = useResults();
  const { attendance } = useAttendance();
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-close sidebar on mobile/tablet
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    // Set initial state based on screen size
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Use logged-in parent's email from AuthContext
  const { user } = useAuth();
  const loggedInParentEmail = user?.email || '';

    // Track selected child and force re-render when it changes
    const [selectedChildId, setSelectedChildId] = useState(localStorage.getItem('selected_child_id') || '');

    useEffect(() => {
      const handler = () => {
        setSelectedChildId(localStorage.getItem('selected_child_id') || '');
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }, []);

    // Also update on click in same tab (localStorage set but no storage event)
    useEffect(() => {
      const interval = setInterval(() => {
        const current = localStorage.getItem('selected_child_id') || '';
        setSelectedChildId(prev => (prev !== current ? current : prev));
      }, 300);
      return () => clearInterval(interval);
    }, []);

    // Filter results and attendance for this parent and selected child
    const parentResults = results.filter(r => r.parentEmail === loggedInParentEmail && (!selectedChildId || r.studentId === selectedChildId));
    const parentAttendance = attendance.filter(a => a.parentEmail === loggedInParentEmail && (!selectedChildId || a.studentId === selectedChildId));

    // Show the latest uploaded result and attendance for selected child
    const latestResult = parentResults.length > 0 ? parentResults[parentResults.length - 1] : null;
    const latestAttendance = parentAttendance.length > 0 ? parentAttendance[parentAttendance.length - 1] : null;
    const childData = latestResult ? {
      studentName: latestResult.studentName,
      studentId: latestResult.studentId,
      studentClass: latestResult.studentClass,
      term: latestResult.term,
      fileName: latestResult.fileName,
      fileDataUrl: latestResult.fileDataUrl,
      attendance: latestAttendance ? latestAttendance.attendancePercent : 0,
    } : latestAttendance ? {
      studentName: latestAttendance.studentName,
      studentId: latestAttendance.studentId,
      studentClass: latestAttendance.studentClass,
      term: latestAttendance.term,
      fileName: '',
      fileDataUrl: '',
      attendance: latestAttendance.attendancePercent,
    } : {
      studentName: 'Jane Doe',
      studentId: '12A',
      studentClass: 'Class 1',
      term: '',
      fileName: '',
      fileDataUrl: '',
      attendance: 0,
    };

  // Parent navigation items
  const parentNavItems = [
    { path: '/parent', label: 'Dashboard', icon: 'bi bi-house' },
    { path: '/parent/child-info', label: 'Child Information', icon: 'bi bi-person-circle' },
    { path: '/parent/event-calendar', label: 'Event Calendar', icon: 'bi bi-calendar-event' },
  ];

  // Use events from context
  const { events } = useEvents();
  const now = new Date();
  type Notification = {
    id: number;
    message: string;
    date: string;
    event: string;
    description: string;
    extra: string;
    start: string;
    end: string;
    photo: string;
  };
  const notifications: Notification[] = events
    .filter((e) => e.start > now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 5)
    .map((e) => ({
      id: e.id,
      message: e.title,
      date: e.start.toLocaleDateString(),
      event: e.title,
      description: e.description,
      extra: '',
      start: e.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      end: e.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      photo: '',
    }));

  // Component for the main dashboard content
  // Moved to separate file: ./parent/ParentMainDashboard.tsx

  // Placeholder components for other sidebar routes
  // Moved to separate file: ./parent/ChildInformationView.tsx



  // Moved to separate file: ./parent/FeedbackView.tsx

  return (
    <>
      {/* Add Navbar with notifications for parent */}
      <CustomNavbar notifications={notifications} toggleSidebar={toggleSidebar} />

      <div className="parent-dashboard">
        {/* Mobile Sidebar Toggle Button */}
        {/* <Button
          variant="primary"
          className="toggle-sidebar-btn d-md-none"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
        </Button> */}
        
        {/* Sidebar Toggle Button for Desktop */}
        {/* <Button
          variant="outline-primary"
          className="mb-3 ms-3 d-none d-md-block"
          onClick={toggleSidebar}
          style={{ position: 'fixed', top: '70px', left: '10px', zIndex: 1025 }}
        >
          {sidebarOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
        </Button> */}

        {/* Sidebar */}
        <ParentSidebar 
          navItems={parentNavItems} 
          isOpen={sidebarOpen} 
        />

        {/* Main Content */}
        <div 
          className={`parent-content ${sidebarOpen ? 'sidebar-open' : ''}`}
          style={{
            marginLeft: windowWidth > 1024 ? (sidebarOpen ? '250px' : '0') : '0',
            transition: 'margin-left 0.3s ease-in-out',
            padding: windowWidth <= 480 ? '8px' : windowWidth <= 768 ? '10px' : windowWidth <= 1024 ? '15px' : '20px',
            paddingTop: windowWidth <= 480 ? '70px' : windowWidth <= 768 ? '80px' : windowWidth <= 1024 ? '90px' : '100px'
          }}
        >
          <Container fluid>
            <Routes>
              <Route path="/" element={<ParentMainDashboard childData={childData} events={events} />} />
              <Route path="/child-info" element={<ChildInformationView />} />
              <Route path="/event-calendar" element={<EventCalendarView events={events} />} />
            </Routes>
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
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1010,
              display: windowWidth <= 1024 ? 'block' : 'none'
            }}
          />
        )}
      </div>
    </>
  );
};

export default ParentDashboard;