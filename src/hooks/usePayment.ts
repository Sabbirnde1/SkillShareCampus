import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface InitiatePaymentParams {
  courseId: string;
  courseTitle: string;
  amount: number;
}

interface PaymentResponse {
  success: boolean;
  mode: "sandbox" | "sandbox_mock" | "live";
  payment_url: string;
  message?: string;
  session_key?: string;
}

export function useInitiatePayment() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ courseId, courseTitle, amount }: InitiatePaymentParams): Promise<PaymentResponse> => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke("sslcommerz-payment", {
        body: {
          course_id: courseId,
          course_title: courseTitle,
          amount: amount,
          user_id: user.id,
          user_email: user.email || "user@example.com",
          user_name: user.user_metadata?.full_name || "Student",
        },
      });

      if (error) throw error;
      return data as PaymentResponse;
    },
    onSuccess: (data) => {
      if (data.mode === "sandbox_mock") {
        toast.info("Opening test payment page...");
      } else {
        toast.info("Redirecting to payment gateway...");
      }
      // Redirect to payment URL
      window.location.href = data.payment_url;
    },
    onError: (error) => {
      console.error("Payment initiation error:", error);
      toast.error("Failed to initiate payment: " + error.message);
    },
  });
}
