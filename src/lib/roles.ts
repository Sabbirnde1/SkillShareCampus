import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "moderator" | "user";

/**
 * Check if a user has a specific role
 * Uses server-side security definer function to prevent RLS recursion
 */
export const hasRole = async (userId: string, role: AppRole): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: role,
    });

    if (error) {
      console.error("Error checking role:", error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error("Error in hasRole:", error);
    return false;
  }
};

/**
 * Check if a user is an admin
 */
export const isAdmin = async (userId: string): Promise<boolean> => {
  return hasRole(userId, "admin");
};

/**
 * Check if a user is a moderator
 */
export const isModerator = async (userId: string): Promise<boolean> => {
  return hasRole(userId, "moderator");
};

/**
 * Check if a user is a moderator or admin (has elevated privileges)
 */
export const hasModeratorAccess = async (userId: string): Promise<boolean> => {
  const [isAdminUser, isModeratorUser] = await Promise.all([
    isAdmin(userId),
    isModerator(userId),
  ]);
  return isAdminUser || isModeratorUser;
};

/**
 * Get all roles for a user
 * Uses server-side security definer function
 */
export const getUserRoles = async (userId: string): Promise<AppRole[]> => {
  try {
    const { data, error } = await supabase.rpc("get_user_roles", {
      _user_id: userId,
    });

    if (error) {
      console.error("Error fetching user roles:", error);
      return [];
    }

    return (data || []) as AppRole[];
  } catch (error) {
    console.error("Error in getUserRoles:", error);
    return [];
  }
};