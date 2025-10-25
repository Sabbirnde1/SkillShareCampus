import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Friend {
  id: string;
  friend_id: string;
  status: string;
  created_at: string;
  profile: {
    id: string;
    full_name: string;
    avatar_url: string;
    bio: string;
    location: string;
    company: string;
  };
}

export const useFriends = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("friendships")
        .select(`
          id,
          friend_id,
          status,
          created_at,
          profile:profiles!friendships_friend_id_fkey(
            id,
            full_name,
            avatar_url,
            bio,
            location,
            company
          )
        `)
        .eq("user_id", user.id)
        .eq("status", "accepted");

      if (error) throw error;
      return data as Friend[];
    },
    enabled: !!user,
  });

  const { data: pendingRequests } = useQuery({
    queryKey: ["pending-requests", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("friendships")
        .select(`
          id,
          user_id,
          created_at,
          profile:profiles!friendships_user_id_fkey(
            id,
            full_name,
            avatar_url,
            bio,
            location,
            company
          )
        `)
        .eq("friend_id", user.id)
        .eq("status", "pending");

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const sendFriendRequest = useMutation({
    mutationFn: async (friendId: string) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("friendships")
        .insert({
          user_id: user.id,
          friend_id: friendId,
          status: "pending",
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Friend request sent");
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: () => {
      toast.error("Failed to send friend request");
    },
  });

  const acceptFriendRequest = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase
        .from("friendships")
        .update({ status: "accepted" })
        .eq("id", requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Friend request accepted");
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["pending-requests"] });
    },
    onError: () => {
      toast.error("Failed to accept request");
    },
  });

  const rejectFriendRequest = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase
        .from("friendships")
        .delete()
        .eq("id", requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Friend request rejected");
      queryClient.invalidateQueries({ queryKey: ["pending-requests"] });
    },
    onError: () => {
      toast.error("Failed to reject request");
    },
  });

  return {
    friends: friends || [],
    pendingRequests: pendingRequests || [],
    isLoading,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  };
};
