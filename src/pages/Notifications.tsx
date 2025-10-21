import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "friend_request",
      message: "Abid Khan has sent you friend request",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "comment",
      message: "Abid Khan has commented on your post",
      time: "5 hours ago"
    }
  ];

  const newsItems = [
    { title: "Campus News", subtitle: "Top news" },
    { title: "Appoint new VC", time: "1 days ago" },
    { title: "Appoint new Department Head of CSE", time: "15 days ago" },
    { title: "Lunch Micro-csential Courses", time: "5 days ago" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f6ff]">
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
            <Link to="/friends" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Users className="h-5 w-5" />
              <span className="text-xs">Requests</span>
            </Link>
            <Link to="/courses" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Courses</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Messages</span>
            </Link>
            <Link to="/notifications" className="flex flex-col items-center gap-1 text-primary">
              <Bell className="h-5 w-5" />
              <span className="text-xs font-medium">Notifications</span>
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
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Left Sidebar - Course Card */}
          <div className="col-span-3">
            <Card className="overflow-hidden">
              <div className="relative h-24 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="absolute inset-0 opacity-30" 
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                  }}
                />
                <div className="absolute top-2 left-2">
                  <span className="text-white font-semibold text-sm">WEB</span>
                  <br />
                  <span className="text-white font-semibold text-sm">Development</span>
                </div>
              </div>
              
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4">
                  <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-white flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="font-semibold text-foreground mb-1">Md. Didarul Islam</h3>
                  <p className="text-xs text-muted-foreground mb-1">Undergraduate CSE Student | Entrepreneurship | B2C E-commerce</p>
                  <p className="text-xs text-muted-foreground mb-1">Brilla, Savar, Dhaka</p>
                  <p className="text-xs text-muted-foreground">Empower NetiZen Ltd</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Center - Notifications */}
          <div className="col-span-6">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className="p-4 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Campus News & Ad */}
          <div className="col-span-3">
            <Card className="p-4 mb-4">
              <h3 className="font-semibold text-foreground mb-1">{newsItems[0].title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{newsItems[0].subtitle}</p>
              {newsItems.slice(1).map((news, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <p className="text-sm text-foreground font-medium">{news.title}</p>
                  <p className="text-xs text-muted-foreground">{news.time}</p>
                </div>
              ))}
            </Card>

            {/* Advertisement */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-6 text-center">
                <div className="mb-4">
                  <BookOpen className="h-16 w-16 mx-auto text-amber-800" />
                </div>
                <h4 className="font-bold text-2xl text-amber-900 mb-2">MINDSET</h4>
                <p className="text-sm text-amber-800 mb-1">Visit: www.nijgram.com</p>
                <p className="text-sm text-amber-800 mb-4">Mail: nijgramrc@gmail.com</p>
                <div className="bg-white rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-amber-800" />
                </div>
                <p className="text-xs font-semibold text-amber-900 mb-2">Nijgram</p>
                <p className="text-xs text-amber-800 mb-4">Old Books | Best Value | New Readers</p>
                <p className="text-xs text-amber-800 mb-4">যে কোন প্রকৌণিক বইয়ের জন্য, সেরা মানের বইয়ের সংগ্রহ,<br />Nijgram'র সংগ্রহের জন্য আপনার কন্যাশ করুন</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Explore
                </Button>
              </div>
            </Card>
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

export default Notifications;