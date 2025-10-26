import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useUserProfile = (userId: string | undefined) => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: education, isLoading: educationLoading } = useQuery({
    queryKey: ["user-education", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("education")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["user-skills", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: experience, isLoading: experienceLoading } = useQuery({
    queryKey: ["user-experience", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: friendCount } = useQuery({
    queryKey: ["user-friend-count", userId],
    queryFn: async () => {
      if (!userId) return 0;

      const { count, error } = await supabase
        .from("friendships")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("status", "accepted");

      if (error) throw error;
      return count || 0;
    },
    enabled: !!userId,
  });

  return {
    profile,
    education: education || [],
    skills: skills || [],
    experience: experience || [],
    friendCount: friendCount || 0,
    isLoading: profileLoading || educationLoading || skillsLoading || experienceLoading,
  };
};
