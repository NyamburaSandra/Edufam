

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import seedData from '../data/seed_data.json';
import { FeedbackContext } from './FeedbackContextObject';
import type { Feedback } from './FeedbackContextObject';

function isFeedbackArray(arr: unknown): arr is Feedback[] {
  return Array.isArray(arr) && arr.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as Feedback).concernType === 'string' &&
      typeof (item as Feedback).message === 'string' &&
      typeof (item as Feedback).requestCallback === 'boolean' &&
      typeof (item as Feedback).scheduleMeeting === 'boolean'
  );
}




export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Load feedbacks from localStorage or seed data on mount

  // Helper to load feedbacks from localStorage or seed
  const loadFeedbacks = () => {
    const local = localStorage.getItem('edufam_feedbacks');
    let loaded: Feedback[] = [];
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (isFeedbackArray(parsed)) {
          loaded = parsed;
        }
      } catch {
        // Ignore JSON parse errors and fallback to seed data
      }
    }
    // If nothing loaded from localStorage, use seed data
    if (!loaded.length && isFeedbackArray((seedData as { feedback?: unknown }).feedback)) {
      loaded = (seedData as { feedback: Feedback[] }).feedback;
      localStorage.setItem('edufam_feedbacks', JSON.stringify(loaded));
    }
    setFeedbacks(loaded);
  };

  useEffect(() => {
    loadFeedbacks();

    // Listen for localStorage changes (cross-tab and in-app)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'edufam_feedbacks') {
        loadFeedbacks();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Poll localStorage every second to ensure feedbacks are always up to date
  useEffect(() => {
    const interval = setInterval(() => {
      loadFeedbacks();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save feedbacks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('edufam_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const addFeedback = (feedback: Feedback) => {
    console.log('[EDUFAM] addFeedback called with:', feedback);
    setFeedbacks(prev => {
      const updated = [...prev, feedback];
      console.log('[EDUFAM] feedbacks state updated:', updated);
      return updated;
    });
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};



