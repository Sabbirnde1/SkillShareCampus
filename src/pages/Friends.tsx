import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useFriends } from "@/hooks/useFriends";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNotifications } from "@/hooks/useNotifications";
import OnlineStatus from "@/components/OnlineStatus";
import { FriendsSkeleton } from "@/components/FriendsSkeleton";

const Friends = () => {
  const { friends, isLoading } = useFriends();
  const { unreadCount } = useNotifications();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="bg-white border-b px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-primary">
                SkillShare<span className="text-sm align-top">Campus</span>
              </h1>
            </Link>
          </div>
        </header>
        <main className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Catch up with my friends</h2>
            </div>
            <FriendsSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-primary">
              SkillShare<span className="text-sm align-top">Campus</span>
            </h1>
          </Link>
          
          <div className="flex-1 max-w-md mx-8">
            <Link to="/search">
              <div className="relative cursor-pointer">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10 bg-gray-50"
                  readOnly
                />
              </div>
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/campus" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link to="/friends" className="flex flex-col items-center gap-1 text-primary">
              <Users className="h-5 w-5" />
              <span className="text-xs font-medium">Requests</span>
            </Link>
            <Link to="/courses" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Courses</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Messages</span>
            </Link>
            <Link to="/notifications" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <div className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs">Notifications</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
              <span className="text-xs">Me</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Catch up with my friends</h2>
            <div className="flex gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Friends
              </Button>
              <Link to="/pending-requests">
                <Button variant="outline">
                  Pending Requests
                </Button>
              </Link>
            </div>
          </div>

          {/* Friends Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {friends.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No friends yet. Start connecting with people!</p>
              </div>
            ) : (
              friends.map((friend) => (
                <Card key={friend.id} className="overflow-hidden">
                  <div className="relative h-24 bg-gradient-to-r from-blue-600 to-blue-800">
                    <div className="absolute inset-0 opacity-30" 
                      style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                      }}
                    />
                  </div>
                  
                  <div className="p-4 relative">
                    <Link to={`/user/${friend.profile.id}`} className="absolute -top-8 left-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 border-4 border-white">
                          <AvatarImage src={friend.profile.avatar_url || ""} />
                          <AvatarFallback>
                            <User className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>
                        <OnlineStatus 
                          userId={friend.profile.id}
                          lastSeenAt={friend.profile.last_seen_at}
                          showText={false}
                          className="absolute bottom-0 right-0"
                        />
                      </div>
                    </Link>
                    
                    <div className="mt-10">
                      <Link to={`/user/${friend.profile.id}`}>
                        <h3 className="font-semibold text-foreground mb-1 hover:text-primary">
                          {friend.profile.full_name || "Unknown User"}
                        </h3>
                      </Link>
                      <OnlineStatus 
                        userId={friend.profile.id}
                        lastSeenAt={friend.profile.last_seen_at}
                        showDot={false}
                        className="mb-1"
                      />
                      <p className="text-xs text-muted-foreground mb-1">{friend.profile.bio || "No bio"}</p>
                      <p className="text-xs text-muted-foreground mb-1">{friend.profile.location || "No location"}</p>
                      <p className="text-xs text-muted-foreground">{friend.profile.company || "No company"}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-100 py-6 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg font-semibold text-primary">
              SkillShare<span className="text-sm align-top">Campus</span>
            </span>
          </div>
          <p className="text-sm text-foreground/80">
            © 2025 SkillShareCampus. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Friends;