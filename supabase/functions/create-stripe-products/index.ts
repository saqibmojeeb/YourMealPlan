import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Create 3 products with prices
    const products = [
      { name: "YourMealPlan Starter", price: 199, description: "Weekly meal plans, basic grocery list, up to 2 dietary filters" },
      { name: "YourMealPlan Pro", price: 499, description: "Unlimited filters, custom swaps, nutritional breakdown, priority support" },
      { name: "YourMealPlan Elite", price: 999, description: "AI suggestions, family planning, grocery delivery, nutrition coach" },
    ];

    const results = [];
    for (const p of products) {
      const product = await stripe.products.create({ name: p.name, description: p.description });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: p.price * 100, // Convert to paise (INR smallest unit)
        currency: "inr",
        recurring: { interval: "month" },
      });
      results.push({ product_id: product.id, price_id: price.id, name: p.name, amount: p.price });
    }

    return new Response(JSON.stringify({ products: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
