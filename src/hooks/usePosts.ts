import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  content: string;
  hashtags: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  author: {
    id: string;
    full_name: string;
    avatar_url: string;
    bio: string;
  };
  post_likes?: PostLike[];
  user_has_liked?: boolean;
}

export const usePosts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          author_id,
          content,
          hashtags,
          likes_count,
          comments_count,
          created_at,
          author:profiles!posts_author_id_fkey(
            id,
            full_name,
            avatar_url,
            bio
          ),
          post_likes(
            id,
            post_id,
            user_id,
            created_at
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Add user_has_liked flag
      const postsWithLikeStatus = data?.map(post => ({
        ...post,
        user_has_liked: user ? post.post_likes?.some(like => like.user_id === user.id) : false,
      })) as Post[];
      
      return postsWithLikeStatus;
    },
  });

  // Real-time subscription for new posts
  useEffect(() => {
    const channel = supabase
      .channel("posts-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const createPost = useMutation({
    mutationFn: async ({ content, hashtags }: { content: string; hashtags: string[] }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("posts").insert({
        author_id: user.id,
        content,
        hashtags,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", postId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  const toggleLike = useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      if (!user) throw new Error("Not authenticated");

      if (isLiked) {
        // Unlike: delete the like
        const { error } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Like: insert a new like
        const { error } = await supabase
          .from("post_likes")
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to update like");
    },
  });

  return {
    posts: posts || [],
    isLoading,
    createPost,
    deletePost,
    toggleLike,
  };
};
