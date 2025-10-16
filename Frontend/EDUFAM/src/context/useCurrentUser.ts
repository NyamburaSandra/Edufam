import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import type { UserType } from './NotificationsContext';

interface CurrentUser {
  type: UserType;
  email: string;
  name: string;
  id: number;
}

export const useCurrentUser = (): CurrentUser | null => {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    // Debug: Log Clerk user info
    console.log('useCurrentUser - Clerk user:', user);
    
    // First try to get data from Clerk
    const clerkEmail = user?.primaryEmailAddress?.emailAddress;
    const clerkName = (user?.fullName || user?.firstName || '').trim();

    // Get users from localStorage
    type StoredUser = {
      email?: string;
      type?: UserType;
      name?: string;
      id?: number;
    };
    const users = JSON.parse(localStorage.getItem('edufam_users') || '[]') as StoredUser[];

    // If Clerk provides an email, try to find a matching local user
    const foundUser = clerkEmail
      ? users.find((u: StoredUser) => u.email && u.email.toLowerCase() === clerkEmail.toLowerCase())
      : null;

    // If we found a local user record, prefer that (preserves type/id)
    if (foundUser) {
      setCurrentUser({
        type: (foundUser.type || 'parent') as UserType,
        email: foundUser.email || clerkEmail || 'unknown@example.com',
        name: foundUser.name || clerkName || foundUser.email || 'User',
        id: typeof foundUser.id === 'number' ? foundUser.id : -1
      });
      return;
    }

    // If Clerk gave us a name (even without a local match), prefer it so deployed users see their real name
    if (clerkName) {
      setCurrentUser({
        type: 'parent', // default type when we can't infer a stored type
        email: clerkEmail || 'unknown@example.com',
        name: clerkName,
        id: -1
      });
      return;
    }
    
    // Fallback: Determine user type from current URL path
    const currentPath = window.location.pathname;
    console.log('useCurrentUser - Current path:', currentPath);
    
    if (currentPath.includes('/teacher')) {
      setCurrentUser({
        type: 'teacher',
        email: 'teacher@example.com',
        name: 'Current Teacher',
        id: 999
      });
    } else if (currentPath.includes('/admin')) {
      setCurrentUser({
        type: 'admin',
        email: 'admin@example.com',
        name: 'Current Admin',
        id: 998
      });
    } else if (currentPath.includes('/parent')) {
      setCurrentUser({
        type: 'parent',
        email: 'parent@example.com',
        name: 'Current Parent',
        id: 997
      });
    } else {
      // Default to parent if no specific path
      setCurrentUser({
        type: 'parent',
        email: 'default@example.com',
        name: 'Default User',
        id: 996
      });
    }
  }, [user]);

  return currentUser;
};
