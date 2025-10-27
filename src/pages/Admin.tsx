import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, FileText, BarChart3, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, isModerator, isStaff, primaryRole } = useUserRole();
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Show access denied for non-staff users
  if (!isStaff) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader currentPage="admin" />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access the admin panel. This area is restricted to administrators and moderators only.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button onClick={() => navigate("/campus")}>Return to Campus</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader currentPage="admin" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Badge variant={isAdmin ? "default" : "secondary"}>
              {primaryRole}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage users, content, and monitor platform activity
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Admin Panel Foundation</AlertTitle>
          <AlertDescription>
            The role system is fully configured. Admin features will be implemented in future updates.
          </AlertDescription>
        </Alert>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Management</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground mt-1">
                Manage user accounts and permissions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Content Moderation</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground mt-1">
                Review and moderate posts and comments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Analytics</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming Soon</div>
              <p className="text-xs text-muted-foreground mt-1">
                Platform usage and engagement metrics
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Role</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{primaryRole}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {isAdmin ? "Full system access" : "Moderation access"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Setup Instructions for First Admin */}
        <Card>
          <CardHeader>
            <CardTitle>Assigning the First Admin</CardTitle>
            <CardDescription>
              Use the Supabase SQL Editor to assign admin role to a user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Step 1: Get your user ID</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Find your user ID in the Authentication section of Supabase Dashboard
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Step 2: Run this SQL in Supabase SQL Editor</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`-- Replace 'YOUR_USER_ID_HERE' with your actual user ID
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Step 3: Assign moderator role (optional)</h3>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`-- Replace 'USER_ID_HERE' with the user ID
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'moderator')
ON CONFLICT (user_id, role) DO NOTHING;`}
                </pre>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  After running the SQL, refresh this page to see the changes reflected.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
