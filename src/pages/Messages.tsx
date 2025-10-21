import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, Image, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Messages = () => {
  const [messageText, setMessageText] = useState("");

  const contacts = [
    {
      id: 1,
      name: "Abid Khan",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship",
      lastMessage: "Hi Didarul",
      time: "01:43"
    },
    {
      id: 2,
      name: "Abid Khan",
      degree: "Undergraduate CSE Student",
      interests: "Entrepreneurship",
      lastMessage: "",
      time: ""
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Abid Khan",
      text: "Hi Didarul",
      time: "01:43",
      isSent: false
    },
    {
      id: 2,
      sender: "Didarul Islam",
      text: "Hi Abid",
      time: "01:45",
      isSent: true
    }
  ];

  const newsItems = [
    { title: "Campus News", time: "Top news" },
    { title: "Appoint new VC", time: "1 days ago" },
    { title: "Appoint new Department Head of CSE", time: "15 days ago" },
    { title: "Lunch Micro-csential Courses", time: "5 days ago" }
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
            <Link to="/friends" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Users className="h-5 w-5" />
              <span className="text-xs">Requests</span>
            </Link>
            <Link to="/courses" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Courses</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-primary">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs font-medium">Messages</span>
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
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Left Sidebar - Contacts */}
          <div className="col-span-3">
            <Card className="p-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b last:border-b-0">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground">{contact.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.degree} | {contact.interests}
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Center - Chat Area */}
          <div className="col-span-6">
            <Card className="flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Abid Khan</h3>
                    <p className="text-xs text-muted-foreground">Undergraduate CSE Student | Entrepreneurship</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                    <div className="flex items-start gap-2 max-w-[70%]">
                      {!message.isSent && (
                        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div>
                        {!message.isSent && (
                          <p className="text-xs font-semibold text-foreground mb-1">{message.sender}</p>
                        )}
                        <div className={`p-3 rounded-lg ${message.isSent ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-foreground'}`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Write a message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Campus News */}
          <div className="col-span-3">
            <Card className="p-4 mb-4">
              <h3 className="font-semibold text-foreground mb-3">{newsItems[0].title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{newsItems[0].time}</p>
              {newsItems.slice(1).map((news, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <p className="text-sm text-foreground font-medium">{news.title}</p>
                  <p className="text-xs text-muted-foreground">{news.time}</p>
                </div>
              ))}
            </Card>

            {/* Advertisement */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-6 text-center">
                <div className="mb-4">
                  <BookOpen className="h-16 w-16 mx-auto text-amber-800" />
                </div>
                <h4 className="font-bold text-xl text-amber-900 mb-2">MINDSET</h4>
                <p className="text-sm text-amber-800 mb-4">Nijgram</p>
                <p className="text-xs text-amber-700 mb-4">Old Books | Best Value | New Readers</p>
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

export default Messages;