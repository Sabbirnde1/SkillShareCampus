import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, Pencil, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const UserProfile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-[hsl(var(--header-bg))] py-3 px-6 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">
              SkillShare<span className="text-sm align-top">Campus</span>
            </h1>
          </Link>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search" 
                className="pl-10 bg-background/50"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link to="/pending-requests" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
              <Users className="h-5 w-5" />
              <span className="text-xs">Requests</span>
            </Link>
            <Link to="/campus" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Courses</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Messages</span>
            </Link>
            <Link to="/notifications" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="text-xs">Notifications</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
              <User className="h-5 w-5" />
              <span className="text-xs">Me</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  {/* Cover Image */}
                  <div className="relative h-48 bg-gradient-to-r from-primary to-primary/80 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">WEB</div>
                      <div className="text-white text-2xl font-light ml-2">Development</div>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800')] bg-cover bg-center opacity-60"></div>
                  </div>

                  {/* Profile Info */}
                  <div className="px-6 pb-6">
                    <div className="relative -mt-16 mb-4">
                      <Avatar className="h-32 w-32 border-4 border-background">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=shifat" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-foreground">Shifat Mahamud</h2>
                      <p className="text-sm text-muted-foreground">
                        Undergraduate CSE Student | Entrepreneurship | B2C E-commerce
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Birullia, Savar, Dhaka
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Empower NextGen Ltd
                      </p>
                      <p className="text-sm text-primary font-medium">4 connections</p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button variant="default">Message</Button>
                      <Button variant="outline">Request</Button>
                      <Button variant="outline">Follow</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hi! I'm a curious and motivated individual who enjoys learning new things and taking on challenges. 
                    I have a passion for [insert your interest or field—e.g., technology, art, business, etc.] and enjoy 
                    working on projects that allow me to grow and be creative. Whether I'm collaborating with others or 
                    working independently...
                    <span className="text-primary cursor-pointer ml-1">See more</span>
                  </p>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">Educations</h3>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground">Daffodil International University</h4>
                      <p className="text-sm text-muted-foreground">Bachelor of Computer Science and Engineering</p>
                      <p className="text-xs text-muted-foreground">2022-Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">Skills</h3>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="bg-primary">Data Analysis</Badge>
                    <Badge variant="default" className="bg-primary">html</Badge>
                    <Badge variant="default" className="bg-primary">CSS</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Experience Section */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">Experience</h3>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">No experience added yet.</p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ad Card */}
              <Card>
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400" 
                    alt="Mindset Course"
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=NC" />
                        <AvatarFallback>NC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Nijercart</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Visit: www.nijercart.com<br />
                      Mail: nijercart@gmail.com
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      অর্ডার করতে মেসেজে আসুন, অর্ডার নিতে মেসেজ করুন আমাদের,
                      Nijercart সবার জন্য একটা পরিবার ভাই বোনদের কথা ভেবে সহজ মূল্যে
                    </p>
                    <Button className="w-full" variant="default">Explore</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
