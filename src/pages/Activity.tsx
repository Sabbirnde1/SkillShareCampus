import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  User, 
  Search, 
  ThumbsUp, 
  MessageCircle,
  Trash2,
  Image as ImageIcon,
  Hash,
  Share2,
  Edit
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { usePosts } from "@/hooks/usePosts";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
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
import { EmailVerificationBanner } from "@/components/EmailVerificationBanner";
import { useNotifications } from "@/hooks/useNotifications";
import { SharePostDialog } from "@/components/SharePostDialog";
import { FriendSuggestions } from "@/components/FriendSuggestions";
import { EditPostDialog } from "@/components/EditPostDialog";

const Activity = () => {
  const { user } = useAuth();
  const { posts, isLoading, createPost, toggleLike, deletePost, editPost } = usePosts();
  const { unreadCount } = useNotifications();
  const [postContent, setPostContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedPostForShare, setSelectedPostForShare] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPostForEdit, setSelectedPostForEdit] = useState<any>(null);

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

  const handleEditPost = (newContent: string) => {
    if (!selectedPostForEdit) return;
    
    const hashtags = newContent.match(/#\w+/g) || [];
    editPost.mutate(
      {
        postId: selectedPostForEdit.id,
        content: newContent,
        hashtags,
      },
      {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedPostForEdit(null);
        },
      }
    );
  };

  const canEditPost = (postCreatedAt: string) => {
    const now = new Date();
    const createdAt = new Date(postCreatedAt);
    const diffMinutes = (now.getTime() - createdAt.getTime()) / 1000 / 60;
    return diffMinutes <= 15; // 15-minute edit window
  };

  // Extract unique hashtags from all posts
  const allHashtags = Array.from(
    new Set(posts.flatMap((post) => post.hashtags || []))
  ).slice(0, 10);

  const filteredPosts = selectedHashtag
    ? posts.filter((post) => post.hashtags?.includes(selectedHashtag))
    : posts;

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
            <Link to="/search">
              <div className="relative cursor-pointer">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10 bg-background/50"
                  readOnly
                />
              </div>
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/campus" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link to="/friends" className="flex flex-col items-center gap-1 text-foreground/70 hover:text-foreground transition-colors">
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
            <Link to="/profile" className="flex flex-col items-center gap-1 text-primary">
              <User className="h-5 w-5" />
              <span className="text-xs font-semibold">Activity</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <EmailVerificationBanner />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Activity Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1 justify-start text-muted-foreground"
                        >
                          What's on your mind?
                        </Button>
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
                                <User className="h-5 w-5" />
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
                            className="min-h-[150px] text-base resize-none border-0 focus-visible:ring-0 p-0"
                            maxLength={5000}
                          />
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>{postContent.length}/5000 characters</span>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" disabled>
                                <ImageIcon className="h-5 w-5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setPostContent(postContent + " #")}
                              >
                                <Hash className="h-5 w-5" />
                              </Button>
                            </div>
                            <Button
                              onClick={handleCreatePost}
                              disabled={!postContent.trim() || createPost.isPending}
                            >
                              {createPost.isPending ? "Posting..." : "Post"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="flex-1" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Write article
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button variant="ghost" className="flex-1" size="sm" disabled>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add photo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Filter by hashtag */}
              {allHashtags.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-sm">Trending Hashtags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedHashtag === null ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedHashtag(null)}
                      >
                        All Posts
                      </Badge>
                      {allHashtags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedHashtag === tag ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setSelectedHashtag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Posts Feed */}
              <div className="space-y-4">
                {isLoading ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">Loading posts...</p>
                    </CardContent>
                  </Card>
                ) : filteredPosts.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground font-medium mb-2">
                        {selectedHashtag ? `No posts with ${selectedHashtag}` : "No posts yet"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedHashtag
                          ? "Try a different hashtag"
                          : "Be the first to share your thoughts!"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-3 mb-3">
                          <Link to={`/user/${post.author.id}`}>
                            <Avatar className="h-12 w-12 cursor-pointer hover:opacity-80 transition-opacity">
                              <AvatarImage src={post.author.avatar_url || ""} />
                              <AvatarFallback>
                                {post.author.full_name?.charAt(0) || "U"}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <Link to={`/user/${post.author.id}`}>
                                  <h3 className="font-semibold text-sm text-foreground hover:text-primary transition-colors">
                                    {post.author.full_name || "Unknown User"}
                                  </h3>
                                </Link>
                                 {post.author.bio && (
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {post.author.bio}
                                  </p>
                                )}
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                  </p>
                                  {post.edited_at && (
                                    <>
                                      <span className="text-xs text-muted-foreground">•</span>
                                      <span className="text-xs text-muted-foreground italic">Edited</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              {user?.id === post.author_id && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <span className="sr-only">Open menu</span>
                                      <span className="text-lg">•••</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {canEditPost(post.created_at) && (
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedPostForEdit(post);
                                          setEditDialogOpen(true);
                                        }}
                                      >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit post
                                      </DropdownMenuItem>
                                    )}
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

                        <div className="mb-4">
                          <p className="text-sm text-foreground whitespace-pre-wrap mb-3">
                            {post.content}
                          </p>
                          {post.hashtags && post.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.hashtags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                  onClick={() => setSelectedHashtag(tag)}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <Separator className="mb-3" />

                        <div className="flex items-center gap-6 mb-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike.mutate({ postId: post.id, isLiked: post.user_has_liked || false })}
                            className={`gap-2 hover:text-primary ${
                              post.user_has_liked 
                                ? 'text-primary font-semibold' 
                                : 'text-muted-foreground'
                            }`}
                          >
                            <ThumbsUp className={`h-4 w-4 ${post.user_has_liked ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">
                              {post.likes_count > 0 ? post.likes_count : "Like"}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedPostForShare(post);
                              setShareDialogOpen(true);
                            }}
                            className="gap-2 text-muted-foreground hover:text-primary"
                          >
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {post.shared_count > 0 ? post.shared_count : "Share"}
                            </span>
                          </Button>
                        </div>

                        <PostComments postId={post.id} commentsCount={post.comments_count} />
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Friend Suggestions */}
              <FriendSuggestions />

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

      {/* Share Post Dialog */}
      {selectedPostForShare && (
        <SharePostDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          post={selectedPostForShare}
        />
      )}

      {/* Edit Post Dialog */}
      {selectedPostForEdit && (
        <EditPostDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          postId={selectedPostForEdit.id}
          initialContent={selectedPostForEdit.content}
          onEditSuccess={handleEditPost}
        />
      )}

      <Footer />
    </div>
  );
};

export default Activity;
