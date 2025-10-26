import { useAuth } from "@/contexts/AuthContext";
import { AppRole } from "@/lib/roles";

/**
 * Hook to access user roles from auth context
 */
export const useUserRole = () => {
  const { userRoles } = useAuth();

  const hasRole = (role: AppRole): boolean => {
    return userRoles.includes(role);
  };

  const isAdmin = (): boolean => {
    return hasRole("admin");
  };

  const isModerator = (): boolean => {
    return hasRole("moderator");
  };

  const hasModeratorAccess = (): boolean => {
    return isAdmin() || isModerator();
  };

  return {
    userRoles,
    hasRole,
    isAdmin,
    isModerator,
    hasModeratorAccess,
  };
};