import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Home, Users, BookOpen, MessageSquare, Bell, User, Video, Image as ImageIcon, FileEdit, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Campus = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[hsl(var(--link-blue))] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-xl font-semibold text-foreground">Campus</h1>
            </Link>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search" 
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <button className="flex flex-col items-center gap-1 text-[hsl(var(--link-blue))]">
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Users className="w-6 h-6" />
              <span className="text-xs">Requests</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">Courses</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs">Messages</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Bell className="w-6 h-6" />
              <span className="text-xs">Notifications</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <User className="w-6 h-6" />
              <span className="text-xs">Me</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="col-span-3">
            <Card className="overflow-hidden">
              <div className="relative h-24 bg-gradient-to-r from-blue-900 to-blue-700">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop" 
                  alt="Web Development"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg">WEB Development</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm mb-1">Md. Dasarul Islam</h4>
                <p className="text-xs text-muted-foreground">Undergraduate CSE Student | Entrepreneurship | B2C E-commerce</p>
                <p className="text-xs text-muted-foreground mt-1">Beula Juwel Odhika</p>
                <p className="text-xs text-muted-foreground">Exponent NanGain Ltd</p>
              </div>
            </Card>
          </aside>

          {/* Main Feed */}
          <main className="col-span-6">
            {/* Create Post */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input 
                  placeholder="Start the post"
                  className="flex-1 rounded-full bg-gray-50 border-gray-300"
                />
              </div>
              <div className="flex items-center justify-around pt-2 border-t border-gray-200">
                <button className="flex items-center gap-2 text-muted-foreground hover:bg-gray-50 px-4 py-2 rounded-md">
                  <Video className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:bg-gray-50 px-4 py-2 rounded-md">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:bg-gray-50 px-4 py-2 rounded-md">
                  <FileEdit className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Write Article</span>
                </button>
              </div>
            </Card>

            {/* Post */}
            <Card className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <Avatar>
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm">Abid Khan</h4>
                  <p className="text-xs text-muted-foreground">Undergraduate CSE Student | Entrepreneurship</p>
                </div>
              </div>
              
              <p className="text-sm mb-3">
                "Touching the Future of Technology......<span className="text-[hsl(var(--link-blue))] cursor-pointer">See more</span>
              </p>
              
              <div className="rounded-lg overflow-hidden mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop" 
                  alt="Web Development"
                  className="w-full h-auto"
                />
              </div>
              
              <div className="flex items-center justify-between py-2 border-t border-b border-gray-200 mb-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 fill-blue-600 text-blue-600" />
                  4 likes
                </span>
                <span className="text-sm text-muted-foreground">2 Comments</span>
              </div>
              
              <div className="flex items-center justify-around">
                <button className="flex items-center gap-2 text-muted-foreground hover:bg-gray-50 px-4 py-2 rounded-md flex-1 justify-center">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Liked</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:bg-gray-50 px-4 py-2 rounded-md flex-1 justify-center">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:bg-gray-50 px-4 py-2 rounded-md flex-1 justify-center">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </Card>
          </main>

          {/* Right Sidebar */}
          <aside className="col-span-3">
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-4">Campus News</h3>
              <div className="space-y-3">
                <div className="text-xs">
                  <p className="text-muted-foreground">12 days ago</p>
                  <p className="font-medium text-foreground">Appoint new VC</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">15 days ago</p>
                  <p className="font-medium text-foreground">Appoint new Department Head of CSE</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">15 days ago</p>
                  <p className="font-medium text-foreground">5 days Micro-scientist Courses</p>
                </div>
              </div>
            </Card>

            <Card className="p-0 mt-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop" 
                alt="Mindset"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-sm mb-2">Nijercart</h4>
                <p className="text-xs text-muted-foreground mb-3">Old Books | Real Value | New Readers</p>
                <Button className="w-full bg-[hsl(var(--link-blue))] hover:bg-[hsl(var(--link-blue))]/90">
                  Explore
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Campus;
