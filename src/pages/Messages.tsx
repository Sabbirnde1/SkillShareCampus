import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, Send } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useMessages } from "@/hooks/useMessages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns";
import { useNotifications } from "@/hooks/useNotifications";

const Messages = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
    searchParams.get("user") || undefined
  );
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { conversations, messages, sendMessage, markConversationAsRead } = useMessages(selectedUserId);
  const { unreadCount } = useNotifications();

  const selectedConversation = conversations.find((c) => c.user_id === selectedUserId);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (selectedUserId && messages.length > 0) {
      const unreadMessages = messages.filter(
        (msg) => msg.receiver_id === user?.id && !msg.is_read
      );
      if (unreadMessages.length > 0) {
        markConversationAsRead.mutate(selectedUserId);
      }
    }
  }, [selectedUserId, messages.length]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUserId) return;
    
    sendMessage.mutate(
      { receiverId: selectedUserId, content: messageText },
      {
        onSuccess: () => setMessageText(""),
      }
    );
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, "h:mm a");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
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
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Left Sidebar - Contacts */}
          <div className="col-span-3">
            <Card className="p-0">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Messages</h2>
              </div>
              <ScrollArea className="h-[calc(600px-57px)]">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-sm">No conversations yet</p>
                    <p className="text-muted-foreground text-xs mt-2">
                      Start chatting with your friends!
                    </p>
                  </div>
                ) : (
                  <div className="p-2">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.user_id}
                        onClick={() => setSelectedUserId(conversation.user_id)}
                        className={`flex items-start gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors ${
                          selectedUserId === conversation.user_id ? "bg-accent" : ""
                        }`}
                      >
                        <div className="relative">
                          <Avatar className="w-12 h-12 flex-shrink-0">
                            <AvatarImage src={conversation.avatar_url || ""} />
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          {conversation.unread_count > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                              {conversation.unread_count}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm text-foreground truncate">
                              {conversation.full_name}
                            </h3>
                            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                              {formatMessageTime(conversation.last_message_time)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {conversation.last_message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </div>

          {/* Center - Chat Area */}
          <div className="col-span-6">
            <Card className="flex flex-col h-[600px]">
              {!selectedUserId ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Your Messages
                  </h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                    Select a conversation from the sidebar to view messages or start a new conversation with your friends
                  </p>
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-white">
                    <Link to={`/user/${selectedUserId}`}>
                      <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
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
                          <p className="text-xs text-muted-foreground">Click to view profile</p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            No messages yet. Start the conversation!
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message, index) => {
                          const isSent = message.sender_id === user?.id;
                          const showDate =
                            index === 0 ||
                            new Date(message.created_at).toDateString() !==
                              new Date(messages[index - 1].created_at).toDateString();

                          return (
                            <div key={message.id}>
                              {showDate && (
                                <div className="flex items-center justify-center my-4">
                                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                                    {format(new Date(message.created_at), "MMMM d, yyyy")}
                                  </div>
                                </div>
                              )}
                              <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
                                <div className="flex items-end gap-2 max-w-[70%]">
                                  {!isSent && (
                                    <Avatar className="w-8 h-8 flex-shrink-0 mb-6">
                                      <AvatarImage src={message.sender?.avatar_url || ""} />
                                      <AvatarFallback>
                                        <User className="h-4 w-4" />
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  <div className={isSent ? "items-end" : "items-start"}>
                                    {!isSent && (
                                      <p className="text-xs font-semibold text-foreground mb-1 px-1">
                                        {message.sender?.full_name}
                                      </p>
                                    )}
                                    <div
                                      className={`p-3 rounded-2xl ${
                                        isSent
                                          ? "bg-primary text-primary-foreground rounded-br-sm"
                                          : "bg-accent text-foreground rounded-bl-sm"
                                      }`}
                                    >
                                      <p className="text-sm break-words">{message.content}</p>
                                    </div>
                                    <div className={`flex items-center gap-1 mt-1 px-1 ${isSent ? "justify-end" : "justify-start"}`}>
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(message.created_at), "h:mm a")}
                                      </p>
                                      {isSent && message.is_read && (
                                        <span className="text-xs text-muted-foreground">• Read</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                        disabled={sendMessage.isPending}
                      />
                      <Button
                        size="icon"
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