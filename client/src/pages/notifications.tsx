import { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: Date;
  read: boolean;
  type: "tournament" | "match" | "team" | "system";
}

// Mock notifications for the page
const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Tournament Starting Soon",
    message: "Free Fire Pro League starts in 24 hours. Make sure your team is ready!",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    type: "tournament"
  },
  {
    id: 2,
    title: "New Team Invitation",
    message: "You've been invited to join 'Elite Warriors' team",
    time: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    read: false,
    type: "team"
  },
  {
    id: 3,
    title: "Match Results",
    message: "Your team placed 3rd in Weekend Warriors Cup. +15 points earned!",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    type: "match"
  },
  {
    id: 4,
    title: "Registration Confirmed",
    message: "Your registration for Solo Showdown has been confirmed",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "tournament"
  },
  {
    id: 5,
    title: "System Update",
    message: "Free Fire Tournament app has been updated to v2.1 with new features",
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    type: "system"
  }
];

export default function Notifications() {
  const { currentUser } = useAuth();
  const [_, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  useEffect(() => {
    if (!currentUser) {
      setLocation("/");
    }
  }, [currentUser, setLocation]);

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Format time for display
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  // Get icon for notification type
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "tournament":
        return "ri-trophy-line";
      case "match":
        return "ri-sword-line";
      case "team":
        return "ri-team-line";
      case "system":
        return "ri-information-line";
      default:
        return "ri-notification-3-line";
    }
  };

  // Get background color for notification icon
  const getIconBg = (type: Notification["type"]) => {
    switch (type) {
      case "tournament":
        return "bg-primary";
      case "match":
        return "bg-success";
      case "team":
        return "bg-secondary";
      case "system":
        return "bg-warning";
      default:
        return "bg-dark-lighter";
    }
  };

  if (!currentUser) return null;

  return (
    <div className="notifications-page">
      <header className="bg-dark-surface p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white font-rajdhani">NOTIFICATIONS</h1>
            <button className="bg-dark-lighter text-text-secondary p-2 rounded">
              <i className="ri-check-double-line"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 container mx-auto mb-20">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`bg-dark-surface rounded-xl p-4 ${notification.read ? 'opacity-70' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex">
                  <div className={`w-10 h-10 rounded-full ${getIconBg(notification.type)} flex items-center justify-center mr-3`}>
                    <i className={`${getIcon(notification.type)} text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white">{notification.title}</h3>
                      <p className="text-xs text-text-secondary">{formatTime(notification.time)}</p>
                    </div>
                    <p className="text-text-secondary mt-1">{notification.message}</p>
                  </div>
                </div>
                {!notification.read && (
                  <span className="block w-2 h-2 rounded-full bg-primary absolute top-4 right-4"></span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-dark-surface rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-dark-lighter flex items-center justify-center mx-auto mb-4">
              <i className="ri-notification-3-line text-2xl text-text-secondary"></i>
            </div>
            <h3 className="text-white font-bold mb-1">No Notifications</h3>
            <p className="text-text-secondary">You're all caught up!</p>
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
}