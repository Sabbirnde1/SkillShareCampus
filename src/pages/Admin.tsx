import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Shield, Users, Flag, BarChart3, Settings, Crown } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { ContentModerationPanel } from "@/components/admin/ContentModerationPanel";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, isModerator, isStaff, primaryRole } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (!isStaff) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader currentPage="admin" />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="text-destructive">Access Denied</CardTitle>
                <CardDescription>
                  You don't have permission to access the admin panel. This area is restricted to administrators and moderators only.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={() => navigate("/campus")} variant="outline">
                  Return to Campus
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <AppHeader currentPage="admin" />
      <main className="container mx-auto px-4 py-6 md:py-10 max-w-7xl">
        <div className="space-y-8">
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 via-primary to-primary/80 p-6 md:p-8 text-primary-foreground">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Crown className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                  <p className="text-primary-foreground/80 mt-1">
                    Manage users, content, and system settings
                  </p>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className="w-fit text-sm md:text-base px-4 py-2 bg-white/20 text-white border-white/30 backdrop-blur-sm"
              >
                <Shield className="h-4 w-4 mr-2" />
                {primaryRole}
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Users</p>
                  <p className="text-lg font-semibold">Manage</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Flag className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reports</p>
                  <p className="text-lg font-semibold">Review</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Analytics</p>
                  <p className="text-lg font-semibold">View</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-12 p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
              <TabsTrigger 
                value="users" 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">User Management</span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger 
                value="moderation" 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Content Moderation</span>
                <span className="sm:hidden">Reports</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>View and manage all registered users</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <UserManagementTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation" className="mt-6">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <Flag className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle>Content Moderation</CardTitle>
                      <CardDescription>Review and manage reported content</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ContentModerationPanel />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle>Analytics Dashboard</CardTitle>
                      <CardDescription>Platform performance and user engagement metrics</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <AnalyticsDashboard />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Setup Instructions */}
          <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Assigning Admin Roles</CardTitle>
                  <CardDescription>
                    Use SQL commands in Supabase to assign the first admin or moderator role
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Crown className="h-4 w-4 text-primary" />
                    Assign Admin Role
                  </h3>
                  <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto border">
{`INSERT INTO user_roles (user_id, role)
VALUES ('your-user-id-here', 'admin');`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Assign Moderator Role
                  </h3>
                  <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto border">
{`INSERT INTO user_roles (user_id, role)
VALUES ('your-user-id-here', 'moderator');`}
                  </pre>
                </div>
              </div>
              <Alert className="bg-muted/30 border-muted">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Run these commands in your Supabase SQL Editor. Find your user ID in the Auth Users table.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
