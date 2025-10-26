import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface RateLimitStatus {
  remaining: number;
  total: number;
  reset_in_seconds: number;
  limited: boolean;
}

// Rate limit configurations
export const RATE_LIMITS = {
  posts: { max: 10, windowMinutes: 60 }, // 10 posts per hour
  messages: { max: 100, windowMinutes: 1440 }, // 100 messages per day
  friend_requests: { max: 20, windowMinutes: 1440 }, // 20 friend requests per day
  comments: { max: 50, windowMinutes: 60 }, // 50 comments per hour
};

export const useRateLimit = (actionType: keyof typeof RATE_LIMITS) => {
  const { user } = useAuth();
  const config = RATE_LIMITS[actionType];

  const { data: status, isLoading } = useQuery<RateLimitStatus>({
    queryKey: ["rate-limit", user?.id, actionType],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase.rpc("get_rate_limit_status", {
        p_user_id: user.id,
        p_action_type: actionType,
        p_max_actions: config.max,
        p_window_minutes: config.windowMinutes,
      });

      if (error) throw error;
      return data as unknown as RateLimitStatus;
    },
    enabled: !!user,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const checkLimit = async (): Promise<boolean> => {
    if (!user) return false;

    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_user_id: user.id,
      p_action_type: actionType,
      p_max_actions: config.max,
      p_window_minutes: config.windowMinutes,
    });

    if (error) {
      console.error("Rate limit check error:", error);
      return true; // Allow action if rate limit check fails (graceful degradation)
    }

    return data;
  };

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return "now";
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.ceil(seconds / 60)}m`;
    return `${Math.ceil(seconds / 3600)}h`;
  };

  return {
    status: status || { remaining: config.max, total: config.max, reset_in_seconds: 0, limited: false },
    isLoading,
    checkLimit,
    formatTimeRemaining,
    isLimited: status?.limited || false,
  };
};
