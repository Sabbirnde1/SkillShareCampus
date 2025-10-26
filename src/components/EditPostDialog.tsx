import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
  initialContent: string;
  onEditSuccess: (newContent: string) => void;
}

export const EditPostDialog = ({
  open,
  onOpenChange,
  postId,
  initialContent,
  onEditSuccess,
}: EditPostDialogProps) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    if (!content.trim()) {
      return;
    }

    if (content.trim() === initialContent.trim()) {
      onOpenChange(false);
      return;
    }

    onEditSuccess(content);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px] resize-none"
          />
          <div className="text-xs text-muted-foreground">
            Tip: Use #hashtags to categorize your post
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
