import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Home, Users, BookOpen, MessageSquare, Bell, User, ThumbsUp, MessageCircle, Share2, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostComments } from "@/components/PostComments";

const Campus = () => {
  const { user } = useAuth();
  const { posts, isLoading, createPost, toggleLike, deletePost } = usePosts();
  const [postContent, setPostContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreatePost = () => {
    if (!postContent.trim()) return;

    const hashtags = postContent.match(/#\w+/g) || [];
    createPost.mutate(
      { content: postContent, hashtags },
      {
        onSuccess: () => {
          setPostContent("");
          setIsDialogOpen(false);
        },
      }
    );
  };

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
            <Link to="/campus" className="flex flex-col items-center gap-1 text-[hsl(var(--link-blue))]">
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link to="/pending-requests" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Users className="w-6 h-6" />
              <span className="text-xs">Requests</span>
            </Link>
            <Link to="/campus" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">Courses</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs">Messages</span>
            </Link>
            <Link to="/notifications" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-6 h-6" />
              <span className="text-xs">Notifications</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-6 h-6" />
              <span className="text-xs">Me</span>
            </Link>
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
                  <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                  <AvatarFallback>
                    {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Input 
                      placeholder="Start a post"
                      className="flex-1 rounded-full bg-gray-50 border-gray-300 cursor-pointer"
                      readOnly
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Create a post</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                          <AvatarFallback>
                            {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {user?.user_metadata?.full_name || user?.email}
                          </p>
                        </div>
                      </div>
                      <Textarea
                        placeholder="What's on your mind? Use #hashtags to categorize..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="min-h-[150px] text-base resize-none"
                      />
                      <div className="flex items-center justify-end pt-4 border-t">
                        <Button
                          onClick={handleCreatePost}
                          disabled={!postContent.trim() || createPost.isPending}
                          className="bg-[hsl(var(--link-blue))] hover:bg-[hsl(var(--link-blue))]/90"
                        >
                          {createPost.isPending ? "Posting..." : "Post"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* Posts Feed */}
            {isLoading ? (
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-48 w-full" />
                </div>
              </Card>
            ) : posts.length === 0 ? (
              <Card className="p-12 text-center">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium mb-2">No posts yet</p>
                <p className="text-sm text-muted-foreground">Be the first to share your thoughts!</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Link to={`/user/${post.author.id}`}>
                        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                          <AvatarImage src={post.author.avatar_url || ""} />
                          <AvatarFallback>
                            {post.author.full_name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link to={`/user/${post.author.id}`}>
                              <h4 className="font-semibold text-sm hover:text-[hsl(var(--link-blue))] transition-colors">
                                {post.author.full_name || "Unknown User"}
                              </h4>
                            </Link>
                            {post.author.bio && (
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {post.author.bio}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          {user?.id === post.author_id && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => deletePost.mutate(post.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete post
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3 whitespace-pre-wrap">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between py-2 border-t border-b border-gray-200 mb-2">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes_count} {post.likes_count === 1 ? "like" : "likes"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {post.comments_count} {post.comments_count === 1 ? "comment" : "comments"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-around mb-3">
                      <button 
                        onClick={() => toggleLike.mutate({ postId: post.id, isLiked: post.user_has_liked || false })}
                        className={`flex items-center gap-2 hover:bg-gray-50 px-4 py-2 rounded-md flex-1 justify-center transition-colors ${
                          post.user_has_liked 
                            ? 'text-[hsl(var(--link-blue))] font-semibold' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        <ThumbsUp className={`w-5 h-5 ${post.user_has_liked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{post.user_has_liked ? 'Liked' : 'Like'}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:bg-gray-50 px-4 py-2 rounded-md flex-1 justify-center transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>

                    <PostComments postId={post.id} commentsCount={post.comments_count} />
                  </Card>
                ))}
              </div>
            )}
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
