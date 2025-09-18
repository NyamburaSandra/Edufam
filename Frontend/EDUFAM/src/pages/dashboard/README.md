# Admin Dashboard Components

This directory contains the admin dashboard components for the EDUFAM application.

## Components

### AdminView.tsx
The main admin dashboard view component that displays:
- School statistics (students, teachers, classes, revenue)
- Quick action buttons
- System status information
- Pending approvals
- Recent activity
- School performance metrics
- Fee summary
- Upcoming events
- System alerts

### AdminDashboard.tsx
A wrapper component that combines the AdminView with the Sidebar navigation. Features:
- Toggleable sidebar navigation
- Responsive design with mobile backdrop
- Smooth transitions
- Fixed positioning for optimal UX

### Sidebar Component (`/src/components/Sidebar.tsx`)
A reusable sidebar navigation component that:
- Accepts an array of navigation items
- Supports icons using Bootstrap Icons
- Has smooth open/close animations
- Uses React Router for navigation

## Usage

### Basic Admin View
```tsx
import { AdminView } from './pages/dashboard';

function App() {
  return <AdminView />;
}
```

### Admin Dashboard with Sidebar
```tsx
import { AdminDashboard } from './pages/dashboard';

function App() {
  return <AdminDashboard />;
}
```

### Custom Sidebar Navigation
```tsx
import Sidebar from './components/Sidebar';
import { adminNavItems } from './config/adminNavigation';

function MyComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <Sidebar 
      navItems={adminNavItems} 
      isOpen={sidebarOpen} 
    />
  );
}
```

## Configuration

### Navigation Items
Admin navigation items are configured in `/src/config/adminNavigation.ts`. Each item has:
- `path`: Router path
- `label`: Display text
- `icon`: Bootstrap Icon class (optional)

### Styling
- Sidebar styles are in `/src/components/Sidebar.css`
- AdminView uses Bootstrap components with custom inline styles
- Color scheme follows EDUFAM branding (#1e0a3c, #6c63ff)

## Dependencies

Required packages:
- `react-bootstrap`: UI components
- `react-router-dom`: Navigation
- `bootstrap-icons`: Icons (ensure CSS is imported)

## Features

### Responsive Design
- Desktop: Sidebar pushes content
- Mobile: Sidebar overlays with backdrop
- Smooth transitions for all screen sizes

### Data Integration
- Uses localStorage for demo data
- Easily replaceable with API calls
- Type-safe component interfaces

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## Customization

### Adding New Navigation Items
Edit `/src/config/adminNavigation.ts`:
```tsx
export const adminNavItems: NavItem[] = [
  // existing items...
  {
    path: '/admin/new-feature',
    label: 'New Feature',
    icon: 'bi bi-plus-circle'
  }
];
```

### Modifying Admin View
The AdminView component can be customized by:
- Updating the mock data structure
- Adding new cards/sections
- Integrating with real APIs
- Customizing the styling

### Theme Customization
Update colors and styling in:
- Inline styles in AdminView.tsx
- Sidebar.css for navigation styling
- Bootstrap theme variables
