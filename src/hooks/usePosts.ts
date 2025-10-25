import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
}

export const usePosts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
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
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });

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

  const likePost = useMutation({
    mutationFn: async (postId: string) => {
      const { data: post } = await supabase
        .from("posts")
        .select("likes_count")
        .eq("id", postId)
        .single();

      if (!post) throw new Error("Post not found");

      const { error } = await supabase
        .from("posts")
        .update({ likes_count: post.likes_count + 1 })
        .eq("id", postId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to like post");
    },
  });

  return {
    posts: posts || [],
    isLoading,
    createPost,
    deletePost,
    likePost,
  };
};
