import { Link, useLocation } from "react-router-dom";
import { Home, Users, BookOpen, MessageSquare, Bell, User } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  const navItems = [
    { id: "campus", icon: Home, label: "Home", path: "/campus" },
    { id: "friends", icon: Users, label: "Requests", path: "/friends" },
    { id: "courses", icon: BookOpen, label: "Courses", path: "/courses" },
    { id: "messages", icon: MessageSquare, label: "Messages", path: "/messages" },
    { id: "notifications", icon: Bell, label: "Notifications", path: "/notifications" },
    { id: "profile", icon: User, label: "Me", path: "/profile" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  // Don't show on public pages or when not authenticated
  if (!user) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[hsl(var(--header-bg))] border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isNotification = item.id === "notifications";

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center px-1 py-1 min-w-[52px] transition-colors ${
                active
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <div className="relative h-5 flex items-center justify-center">
                <Icon className="h-5 w-5" />
                {isNotification && unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-2.5 h-4 min-w-4 flex items-center justify-center p-0 text-[10px] font-medium"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </div>
              <span className={`text-[10px] leading-none mt-1 text-center truncate max-w-full ${active ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
