// Simple test server to verify connection
import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";

const app = new Hono();

// Enable CORS for all routes
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// Simple health check
app.get("/make-server-80868a71/test-health", (c) => {
  return c.json({
    success: true,
    message: "Server is working!",
    timestamp: new Date().toISOString(),
  });
});

// Echo endpoint
app.post("/make-server-80868a71/test-echo", async (c) => {
  const body = await c.req.json();
  return c.json({
    success: true,
    echo: body,
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/make-server-80868a71/", (c) => {
  return c.json({
    success: true,
    message: "Supabase Edge Function is running",
    endpoints: [
      "/make-server-80868a71/test-health",
      "/make-server-80868a71/test-echo",
    ],
  });
});

Deno.serve(app.fetch);
