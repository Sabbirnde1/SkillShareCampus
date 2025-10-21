import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Friends = () => {
  const friends = [
    {
      id: 1,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    },
    {
      id: 2,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    },
    {
      id: 3,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    },
    {
      id: 4,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    },
    {
      id: 5,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    },
    {
      id: 6,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    },
    {
      id: 7,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    },
    {
      id: 8,
      name: "Md. Didarul Islam",
      course: "WEB Development",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship | B2C E-commerce",
      location: "Brilla, Savar, Dhaka",
      employer: "Empower NetiZen Ltd"
    }
  ];

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
                placeholder="Search" 
                className="pl-10 bg-gray-50"
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
            <Link to="/courses" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
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
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Catch up with my friends</h2>
            <div className="flex gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Friends
              </Button>
              <Button variant="outline">
                Pending Requests
              </Button>
            </div>
          </div>

          {/* Friends Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <Card key={friend.id} className="overflow-hidden">
                <div className="relative h-24 bg-gradient-to-r from-blue-600 to-blue-800">
                  <div className="absolute inset-0 opacity-30" 
                    style={{
                      backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-white font-semibold text-sm">{friend.course}</span>
                  </div>
                </div>
                
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-600" />
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="font-semibold text-foreground mb-1">{friend.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{friend.degree} | {friend.interests}</p>
                    <p className="text-xs text-muted-foreground mb-1">{friend.location}</p>
                    <p className="text-xs text-muted-foreground">{friend.employer}</p>
                  </div>
                </div>
              </Card>
            ))}
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