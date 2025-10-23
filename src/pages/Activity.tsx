import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, ThumbsUp, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Activity = () => {
  const posts = [
    {
      id: 1,
      author: "Md. Didarul Islam",
      subtitle: "Undergraduate CSE Student",
      date: "Just now",
      hashtags: ["#darul", "#madridcheathoffudaulavi", "#usc", "#dusc", "#a2cback", "#a2cude", "#fau", "#music"],
      likes: 4,
      comments: 2
    },
    {
      id: 2,
      author: "Md. Didarul Islam",
      subtitle: "Undergraduate CSE Student",
      date: "Just now",
      hashtags: ["#darul", "#madridcheathoffudaulavi", "#usc", "#dusc", "#a2cback", "#a2cude", "#fau", "#music"],
      likes: 4,
      comments: 2
    }
  ];

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
            {/* Main Activity Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Activity</h2>
                  
                  <div className="flex gap-3 mb-6">
                    <Button variant="default" className="bg-green-600 hover:bg-green-700">
                      Posts
                    </Button>
                    <Button variant="outline">
                      Create a post
                    </Button>
                  </div>

                  {/* Posts */}
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <Card key={post.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex gap-3 mb-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                              <AvatarFallback>DI</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm text-foreground">{post.author}</h3>
                              <p className="text-xs text-muted-foreground">{post.subtitle}</p>
                              <p className="text-xs text-muted-foreground">{post.date}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {post.hashtags.map((tag, index) => (
                                <span key={index} className="text-xs text-primary">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-6 pt-3 border-t">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <ThumbsUp className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm">{post.likes} likes</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-sm">{post.comments} Comments</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button variant="ghost" className="gap-2">
                      Show All Post
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
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

export default Activity;
