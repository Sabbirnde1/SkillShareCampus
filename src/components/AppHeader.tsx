import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Home, Users, BookOpen, MessageSquare, User, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBadge from "@/components/NotificationBadge";

interface AppHeaderProps {
  currentPage: "campus" | "activity" | "friends" | "messages" | "profile" | "notifications";
}

export const AppHeader = ({ currentPage }: AppHeaderProps) => {
  const { user } = useAuth();

  const navItems = [
    { id: "campus", icon: Home, label: "Home", path: "/campus" },
    { id: "friends", icon: Users, label: "Requests", path: "/friends" },
    { id: "courses", icon: BookOpen, label: "Courses", path: "/campus" },
    { id: "messages", icon: MessageSquare, label: "Messages", path: "/messages" },
  ];

  const isActive = (itemId: string) => {
    if (itemId === "campus" && currentPage === "campus") return true;
    if (itemId === "friends" && currentPage === "friends") return true;
    if (itemId === "messages" && currentPage === "messages") return true;
    if (currentPage === "activity" && itemId === "campus") return false;
    return false;
  };

  return (
    <header className="bg-[hsl(var(--header-bg))] py-3 px-6 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? "/campus" : "/"} className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">
            SkillShare<span className="text-sm align-top">Campus</span>
          </h1>
        </Link>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <Link to="/search">
            <div className="relative cursor-pointer">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search users..." 
                className="pl-10 bg-background/50"
                readOnly
              />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className={`text-xs ${active ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Notifications with Badge */}
          <div className="flex flex-col items-center gap-1">
            <NotificationBadge />
            <span
              className={`text-xs ${
                currentPage === "notifications"
                  ? "font-semibold text-primary"
                  : "text-foreground/70"
              }`}
            >
              Notifications
            </span>
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentPage === "profile" || currentPage === "activity"
                ? "text-primary"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span
              className={`text-xs ${
                currentPage === "profile" || currentPage === "activity"
                  ? "font-semibold"
                  : ""
              }`}
            >
              {currentPage === "activity" ? "Activity" : "Me"}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
