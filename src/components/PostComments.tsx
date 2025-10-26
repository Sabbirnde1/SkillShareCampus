import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCommentsProps {
  postId: string;
  commentsCount: number;
}

export const PostComments = ({ postId, commentsCount }: PostCommentsProps) => {
  const { user } = useAuth();
  const { comments, isLoading, createComment, deleteComment } = useComments(postId);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createComment.mutateAsync({ content: newComment.trim() });
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowComments(!showComments)}
        className="text-muted-foreground hover:text-foreground"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
      </Button>

      {showComments && (
        <div className="space-y-4 pl-4 border-l-2 border-border">
          {/* Comment List */}
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={comment.author.avatar_url} />
                    <AvatarFallback>{comment.author.full_name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author.full_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm break-words">{comment.content}</p>
                    </div>
                    {user?.id === comment.author_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteComment.mutate(comment.id)}
                        className="h-auto py-1 px-2 text-xs text-muted-foreground hover:text-destructive mt-1"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Form */}
          {user && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback>{user.user_metadata?.full_name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="min-h-[60px] resize-none"
                  maxLength={500}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!newComment.trim() || isSubmitting}
                  className="flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
