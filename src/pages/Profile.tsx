import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Home, Users, BookOpen, MessageSquare, Bell, User, Search, Pencil, LogOut, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, friendCount, isLoading, uploadAvatar, uploadCoverImage } = useUserProfile(user?.id);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  const handleAvatarFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload immediately
    try {
      await uploadAvatar.mutateAsync(file);
      setAvatarPreviewUrl(null);
    } catch (error) {
      setAvatarPreviewUrl(null);
      // Error is handled in the mutation
    }
  };

  const handleCoverFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload immediately
    try {
      await uploadCoverImage.mutateAsync(file);
      setCoverPreviewUrl(null);
    } catch (error) {
      setCoverPreviewUrl(null);
      // Error is handled in the mutation
    }
  };

  const handleAvatarClick = () => {
    avatarFileInputRef.current?.click();
  };

  const handleCoverClick = () => {
    coverFileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

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
            <Link to="/profile" className="flex flex-col items-center gap-1 text-primary">
              <User className="h-5 w-5" />
              <span className="text-xs font-semibold">Me</span>
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
                    {coverPreviewUrl || profile?.cover_image_url ? (
                      <img 
                        src={coverPreviewUrl || profile?.cover_image_url || ""} 
                        alt="Cover" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-4xl font-bold">WEB</div>
                        </div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800')] bg-cover bg-center opacity-60"></div>
                      </>
                    )}
                    <input
                      ref={coverFileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleCoverFileChange}
                      className="hidden"
                    />
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="absolute top-3 right-3 rounded-full"
                      onClick={handleCoverClick}
                      disabled={uploadCoverImage.isPending}
                    >
                      {uploadCoverImage.isPending ? (
                        <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      ) : (
                        <Camera className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Profile Info */}
                  <div className="px-6 pb-6">
                    <div className="relative -mt-16 mb-4">
                      <Avatar className="h-32 w-32 border-4 border-background">
                        <AvatarImage src={avatarPreviewUrl || profile?.avatar_url || ""} />
                        <AvatarFallback>
                          <User className="h-16 w-16" />
                        </AvatarFallback>
                      </Avatar>
                      <input
                        ref={avatarFileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleAvatarFileChange}
                        className="hidden"
                      />
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                        onClick={handleAvatarClick}
                        disabled={uploadAvatar.isPending}
                      >
                        {uploadAvatar.isPending ? (
                          <div className="h-3 w-3 border-2 border-t-transparent border-white rounded-full animate-spin" />
                        ) : (
                          <Camera className="h-3 w-3" />
                        )}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-foreground">
                        {profile?.full_name || user?.email || "User"}
                      </h2>
                      {profile?.bio && (
                        <p className="text-sm text-muted-foreground">{profile.bio}</p>
                      )}
                      {profile?.location && (
                        <p className="text-xs text-muted-foreground">{profile.location}</p>
                      )}
                      {profile?.company && (
                        <p className="text-xs text-muted-foreground">{profile.company}</p>
                      )}
                      <p className="text-sm text-primary font-medium">{friendCount} connections</p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button variant="default">Share Profile</Button>
                      <Button variant="outline" onClick={signOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {profile.bio && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-foreground">About</h3>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  </CardContent>
                </Card>
              )}
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

export default Profile;
