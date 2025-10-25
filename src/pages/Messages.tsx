import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";

const Messages = () => {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [messageText, setMessageText] = useState("");
  const { conversations, messages, sendMessage } = useMessages(selectedUserId);

  const selectedConversation = conversations.find((c) => c.user_id === selectedUserId);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUserId) return;
    
    sendMessage.mutate(
      { receiverId: selectedUserId, content: messageText },
      {
        onSuccess: () => setMessageText(""),
      }
    );
  };

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
              {conversations.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No conversations yet</p>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.user_id}
                    onClick={() => setSelectedUserId(conversation.user_id)}
                    className={`flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b last:border-b-0 ${
                      selectedUserId === conversation.user_id ? "bg-gray-50" : ""
                    }`}
                  >
                    <Avatar className="w-12 h-12 flex-shrink-0">
                      <AvatarImage src={conversation.avatar_url || ""} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground">{conversation.full_name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{conversation.last_message}</p>
                      {conversation.unread_count > 0 && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                          {conversation.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </Card>
          </div>

          {/* Center - Chat Area */}
          <div className="col-span-6">
            <Card className="flex flex-col h-[600px]">
              {!selectedUserId ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedConversation?.avatar_url || ""} />
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {selectedConversation?.full_name || "Unknown User"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.length === 0 ? (
                      <p className="text-center text-muted-foreground">No messages yet. Start the conversation!</p>
                    ) : (
                      messages.map((message) => {
                        const isSent = message.sender_id === user?.id;
                        return (
                          <div key={message.id} className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
                            <div className="flex items-start gap-2 max-w-[70%]">
                              {!isSent && (
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                  <AvatarImage src={message.sender?.avatar_url || ""} />
                                  <AvatarFallback>
                                    <User className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                {!isSent && (
                                  <p className="text-xs font-semibold text-foreground mb-1">
                                    {message.sender?.full_name}
                                  </p>
                                )}
                                <div
                                  className={`p-3 rounded-lg ${
                                    isSent ? "bg-primary text-primary-foreground" : "bg-gray-100 text-foreground"
                                  }`}
                                >
                                  <p className="text-sm">{message.content}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Write a message"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleSendMessage}
                        disabled={!messageText.trim() || sendMessage.isPending}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
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