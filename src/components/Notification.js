"use client";

import { createContext, useContext, useState } from "react";

/**
 * Notification Context for global toast notifications
 * Provides a centralized way to show notifications throughout the app
 */
const NotificationContext = createContext(undefined);

/**
 * Notification Provider Component
 * Wraps the app to provide notification functionality to all child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} - Provider component with notification UI
 */
export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  /**
   * Shows a notification toast message
   * Automatically hides after 3 seconds
   * 
   * @param {string} message - The message to display
   * @param {string} type - Notification type (success, error, warning, info)
   */
  const showNotification = (message, type = "info") => {
    // Generate unique ID for this notification
    const id = Date.now();
    
    // Set the notification with message, type, and unique ID
    setNotification({ message, type, id });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification((current) => 
        // Only hide if this is still the current notification
        current?.id === id ? null : current
      );
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Render notification toast if one exists */}
      {notification && (
        <div className="toast toast-bottom toast-end z-[100]">
          <div className={`alert ${getAlertClass(notification.type)}`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

/**
 * Maps notification types to DaisyUI alert classes
 * 
 * @param {string} type - Notification type
 * @returns {string} - Corresponding DaisyUI alert class
 */
function getAlertClass(type) {
  const alertClasses = {
    success: "alert-success",
    error: "alert-error", 
    warning: "alert-warning",
    info: "alert-info"
  };
  
  // Return specific class or default to info
  return alertClasses[type] || "alert-info";
}

/**
 * Hook to access notification functionality
 * Must be used within a NotificationProvider
 * 
 * @returns {Object} - Object containing showNotification function
 * @throws {Error} - When used outside of NotificationProvider
 */
export function useNotification() {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider. " +
      "Wrap your app with <NotificationProvider> to use notifications."
    );
  }
  
  return context;
}
