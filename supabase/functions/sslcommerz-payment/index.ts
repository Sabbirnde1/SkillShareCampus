import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  course_id: string;
  course_title: string;
  amount: number;
  user_id: string;
  user_email: string;
  user_name: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // Handle IPN (Instant Payment Notification) callback
    if (action === "ipn") {
      const formData = await req.formData();
      const status = formData.get("status") as string;
      const tranId = formData.get("tran_id") as string;
      const valId = formData.get("val_id") as string;
      const amount = formData.get("amount") as string;

      console.log("SSLCommerz IPN received:", { status, tranId, valId, amount });

      if (status === "VALID" || status === "VALIDATED") {
        // Extract course_id and user_id from transaction ID
        const [courseId, userId] = tranId.split("_").slice(0, 2);

        // Create enrollment after successful payment
        const { error: enrollError } = await supabase
          .from("enrollments")
          .insert({
            course_id: courseId,
            user_id: userId,
            status: "enrolled",
            payment_status: "completed",
          });

        if (enrollError) {
          console.error("Failed to create enrollment:", enrollError);
        } else {
          console.log("Enrollment created successfully for:", { courseId, userId });
        }
      }

      return new Response("IPN Received", { headers: corsHeaders });
    }

    // Handle success redirect
    if (action === "success") {
      const formData = await req.formData();
      const tranId = formData.get("tran_id") as string;
      const [courseId] = tranId.split("_");
      
      // Redirect to course page with success message
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          Location: `${Deno.env.get("PUBLIC_SITE_URL") || "https://vryacxigxopdxxgrhfkp.lovableproject.com"}/courses/${courseId}?payment=success`,
        },
      });
    }

    // Handle failure redirect
    if (action === "fail") {
      const formData = await req.formData();
      const tranId = formData.get("tran_id") as string;
      const [courseId] = tranId.split("_");
      
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          Location: `${Deno.env.get("PUBLIC_SITE_URL") || "https://vryacxigxopdxxgrhfkp.lovableproject.com"}/courses/${courseId}?payment=failed`,
        },
      });
    }

    // Handle cancel redirect
    if (action === "cancel") {
      const formData = await req.formData();
      const tranId = formData.get("tran_id") as string;
      const [courseId] = tranId.split("_");
      
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          Location: `${Deno.env.get("PUBLIC_SITE_URL") || "https://vryacxigxopdxxgrhfkp.lovableproject.com"}/courses/${courseId}?payment=cancelled`,
        },
      });
    }

    // Initialize payment
    if (req.method === "POST") {
      const body: PaymentRequest = await req.json();
      const { course_id, course_title, amount, user_id, user_email, user_name } = body;

      console.log("Initiating SSLCommerz payment:", { course_id, amount, user_email });

      // Check if credentials are configured
      const storeId = Deno.env.get("SSLCOMMERZ_STORE_ID");
      const storePassword = Deno.env.get("SSLCOMMERZ_STORE_PASSWORD");

      // Generate unique transaction ID
      const tranId = `${course_id}_${user_id}_${Date.now()}`;
      
      // Base URL for callbacks
      const functionUrl = `${supabaseUrl}/functions/v1/sslcommerz-payment`;

      // If no credentials, use sandbox mock mode
      if (!storeId || !storePassword) {
        console.log("SSLCommerz credentials not configured, using mock mode");
        
        // In mock mode, simulate successful payment for testing
        // Create a mock payment page URL
        const mockPaymentUrl = `${functionUrl}?action=mock&tran_id=${tranId}&amount=${amount}&course_title=${encodeURIComponent(course_title)}`;
        
        return new Response(
          JSON.stringify({
            success: true,
            mode: "sandbox_mock",
            payment_url: mockPaymentUrl,
            message: "Mock payment mode - SSLCommerz credentials not configured",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Real SSLCommerz integration
      const sslcommerzUrl = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
      
      const paymentData = new URLSearchParams({
        store_id: storeId,
        store_passwd: storePassword,
        total_amount: amount.toString(),
        currency: "BDT",
        tran_id: tranId,
        success_url: `${functionUrl}?action=success`,
        fail_url: `${functionUrl}?action=fail`,
        cancel_url: `${functionUrl}?action=cancel`,
        ipn_url: `${functionUrl}?action=ipn`,
        shipping_method: "NO",
        product_name: course_title,
        product_category: "Online Course",
        product_profile: "non-physical-goods",
        cus_name: user_name || "Customer",
        cus_email: user_email,
        cus_add1: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01700000000",
      });

      const response = await fetch(sslcommerzUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: paymentData,
      });

      const result = await response.json();
      console.log("SSLCommerz response:", result);

      if (result.status === "SUCCESS") {
        return new Response(
          JSON.stringify({
            success: true,
            mode: "sandbox",
            payment_url: result.GatewayPageURL,
            session_key: result.sessionkey,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } else {
        throw new Error(result.failedreason || "Failed to initiate payment");
      }
    }

    // Handle mock payment page
    if (action === "mock") {
      const tranId = url.searchParams.get("tran_id") || "";
      const amount = url.searchParams.get("amount") || "0";
      const courseTitle = url.searchParams.get("course_title") || "Course";
      const [courseId, userId] = tranId.split("_");

      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSLCommerz Sandbox Payment</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 450px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }
    .logo {
      text-align: center;
      margin-bottom: 24px;
    }
    .logo img { height: 50px; }
    .sandbox-badge {
      background: #fef3c7;
      color: #92400e;
      padding: 8px 16px;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      margin-bottom: 24px;
    }
    h1 { font-size: 24px; text-align: center; margin-bottom: 8px; color: #1f2937; }
    .course-name { text-align: center; color: #6b7280; margin-bottom: 24px; }
    .amount {
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #059669;
      margin-bottom: 32px;
    }
    .payment-methods {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    .method {
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .method:hover { border-color: #667eea; }
    .method.selected { border-color: #667eea; background: #eef2ff; }
    .method img { height: 30px; margin-bottom: 4px; }
    .method span { display: block; font-size: 12px; color: #6b7280; }
    .btn {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 12px;
    }
    .btn-success { background: #059669; color: white; }
    .btn-success:hover { background: #047857; }
    .btn-cancel { background: #f3f4f6; color: #374151; }
    .btn-cancel:hover { background: #e5e7eb; }
    .note {
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <svg width="200" height="50" viewBox="0 0 200 50" fill="none">
        <text x="10" y="35" font-family="Arial" font-size="24" font-weight="bold" fill="#667eea">SSLCommerz</text>
      </svg>
    </div>
    <div class="sandbox-badge">🧪 Sandbox/Test Mode - No real payment</div>
    <h1>Complete Payment</h1>
    <p class="course-name">${courseTitle}</p>
    <div class="amount">৳${amount}</div>
    <div class="payment-methods">
      <div class="method selected">
        <span>💳 Card</span>
      </div>
      <div class="method">
        <span>📱 bKash</span>
      </div>
      <div class="method">
        <span>🏦 Bank</span>
      </div>
    </div>
    <form action="${supabaseUrl}/functions/v1/sslcommerz-payment?action=ipn" method="POST" id="payForm">
      <input type="hidden" name="status" value="VALID">
      <input type="hidden" name="tran_id" value="${tranId}">
      <input type="hidden" name="val_id" value="mock_${Date.now()}">
      <input type="hidden" name="amount" value="${amount}">
      <button type="submit" class="btn btn-success">Pay ৳${amount} (Mock Success)</button>
    </form>
    <form action="${supabaseUrl}/functions/v1/sslcommerz-payment?action=cancel" method="POST">
      <input type="hidden" name="tran_id" value="${tranId}">
      <button type="submit" class="btn btn-cancel">Cancel Payment</button>
    </form>
    <p class="note">This is a test payment page. Click "Pay" to simulate successful payment.</p>
  </div>
  <script>
    document.querySelectorAll('.method').forEach(m => {
      m.addEventListener('click', () => {
        document.querySelectorAll('.method').forEach(x => x.classList.remove('selected'));
        m.classList.add('selected');
      });
    });
    document.getElementById('payForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      
      // Send IPN first
      await fetch(form.action, { method: 'POST', body: formData });
      
      // Then redirect to success
      window.location.href = '${Deno.env.get("PUBLIC_SITE_URL") || "https://vryacxigxopdxxgrhfkp.lovableproject.com"}/courses/${courseId}?payment=success';
    });
  </script>
</body>
</html>`;

      return new Response(html, {
        headers: { ...corsHeaders, "Content-Type": "text/html" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("SSLCommerz payment error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
