import { z } from "zod";

// Message validation schema
export const messageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(2000, "Message must be less than 2000 characters"),
});

// Post validation schema
export const postSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Post content cannot be empty")
    .max(5000, "Post must be less than 5000 characters"),
  hashtags: z
    .array(z.string().regex(/^#\w+$/, "Invalid hashtag format"))
    .max(10, "Maximum 10 hashtags allowed")
    .optional(),
});

// Comment validation schema
export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});

// Sanitize HTML to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Validate and sanitize message
export const validateMessage = (content: string) => {
  const result = messageSchema.safeParse({ content });
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return sanitizeInput(result.data.content);
};

// Validate and sanitize post
export const validatePost = (content: string, hashtags: string[]) => {
  const result = postSchema.safeParse({ content, hashtags });
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return {
    content: sanitizeInput(result.data.content),
    hashtags: result.data.hashtags || [],
  };
};

// Validate and sanitize comment
export const validateComment = (content: string) => {
  const result = commentSchema.safeParse({ content });
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return sanitizeInput(result.data.content);
};
