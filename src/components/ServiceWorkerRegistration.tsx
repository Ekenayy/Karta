'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully:', registration);
          
          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
                  console.log('New content is available; please refresh.');
                }
              });
            }
          });
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      // Register service worker after page load
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerServiceWorker);
      } else {
        registerServiceWorker();
      }
    }
  }, []);

  return null; // This component doesn't render anything
} 