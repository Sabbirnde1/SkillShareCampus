import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useFriends } from "@/hooks/useFriends";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users, isLoading } = useUserSearch(searchQuery);
  const { sendFriendRequest } = useFriends();

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-10 bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
            <Link to="/campus" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Courses</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Messages</span>
            </Link>
            <Link to="/notifications" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
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
          <h2 className="text-2xl font-semibold text-foreground mb-6">Find People</h2>

          {/* Search Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchQuery.length < 2 ? (
              <div className="col-span-full text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Enter at least 2 characters to search for users</p>
              </div>
            ) : isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Searching...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No users found</p>
              </div>
            ) : (
              users.map((user) => (
                <Card key={user.id} className="p-6 bg-white">
                  <div className="flex items-start gap-4 mb-4">
                    <Link to={`/user/${user.id}`}>
                      <Avatar className="w-16 h-16 flex-shrink-0">
                        <AvatarImage src={user.avatar_url || ""} />
                        <AvatarFallback>
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <Link to={`/user/${user.id}`}>
                        <h3 className="font-semibold text-foreground mb-1 hover:text-primary">
                          {user.full_name || "Unknown User"}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-0.5">{user.bio || "No bio"}</p>
                      <p className="text-xs text-muted-foreground mb-0.5">{user.location || "No location"}</p>
                      <p className="text-xs text-muted-foreground">{user.company || "No company"}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link to={`/user/${user.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                    <Button 
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => sendFriendRequest.mutate(user.id)}
                      disabled={sendFriendRequest.isPending}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Friend
                    </Button>
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

export default SearchUsers;
