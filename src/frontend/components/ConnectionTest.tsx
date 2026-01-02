import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function ConnectionTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResults([]);

    // Test 1: Basic fetch test
    addResult("🔍 Test 1: Kiểm tra fetch API cơ bản...");
    try {
      const response = await fetch("https://httpbin.org/get");
      if (response.ok) {
        addResult("✅ Fetch API hoạt động bình thường");
      } else {
        addResult(`⚠️ Fetch API trả về status: ${response.status}`);
      }
    } catch (error) {
      addResult(`❌ Fetch API lỗi: ${error}`);
    }

    // Test 2: Direct health check with detailed logging
    const supabaseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-80868a71/health`;
    addResult(`\n🔍 Test 2: Kiểm tra Supabase Health Endpoint`);
    addResult(`📍 URL: ${supabaseUrl}`);

    try {
      addResult("📡 Đang gửi GET request...");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const startTime = Date.now();
      const response = await fetch(supabaseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      addResult(`⏱️ Response time: ${duration}ms`);
      addResult(`📨 Response status: ${response.status} ${response.statusText}`);
      addResult(`📨 Response OK: ${response.ok}`);

      // Log headers
      const corsHeader = response.headers.get("Access-Control-Allow-Origin");
      addResult(`🔐 CORS header: ${corsHeader || "not found"}`);

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        addResult(`📄 Content-Type: ${contentType}`);
        
        const data = await response.json();
        addResult(`✅ SUCCESS! Server response:`);
        addResult(JSON.stringify(data, null, 2));
      } else {
        const errorText = await response.text();
        addResult(`❌ Server error response: ${errorText}`);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        addResult("❌ REQUEST TIMEOUT - Server không phản hồi sau 15 giây");
        addResult("💡 Khả năng: Edge Function chưa được deploy hoặc đang sleep");
      } else if (error instanceof TypeError) {
        addResult(`❌ NETWORK ERROR: ${error.message}`);
        addResult("💡 Khả năng: Sai URL, CORS issue, hoặc Edge Function chưa tồn tại");
      } else {
        addResult(`❌ Error: ${error.message}`);
        addResult(`❌ Error type: ${error.name}`);
        addResult(`❌ Error stack: ${error.stack}`);
      }
    }

    // Test 3: Try OPTIONS preflight
    addResult("\n🔍 Test 3: CORS Preflight (OPTIONS)");
    try {
      const response = await fetch(supabaseUrl, {
        method: "OPTIONS",
        headers: {
          "Origin": "https://example.com",
          "Access-Control-Request-Method": "GET",
          "Access-Control-Request-Headers": "Content-Type,Authorization",
        },
      });
      
      addResult(`📨 OPTIONS status: ${response.status}`);
      const corsOrigin = response.headers.get("Access-Control-Allow-Origin");
      const corsMethods = response.headers.get("Access-Control-Allow-Methods");
      const corsHeaders = response.headers.get("Access-Control-Allow-Headers");
      
      addResult(`🔐 Allow-Origin: ${corsOrigin || "❌ not set"}`);
      addResult(`🔐 Allow-Methods: ${corsMethods || "❌ not set"}`);
      addResult(`🔐 Allow-Headers: ${corsHeaders || "❌ not set"}`);
    } catch (error) {
      addResult(`❌ OPTIONS request failed: ${error}`);
    }

    setTesting(false);
    addResult("\n🏁 KIỂM TRA HOÀN TẤT!");
    addResult("\n💡 HƯỚNG DẪN TIẾP THEO:");
    addResult("- Nếu tất cả test đều PASS ✅ → Server đang chạy tốt!");
    addResult("- Nếu timeout/network error → Edge Function chưa deploy hoặc project ID sai");
    addResult("- Nếu 404 → Route không đúng hoặc server chưa có endpoint này");
    addResult("- Nếu CORS error → Cấu hình CORS chưa đúng (đã fix trong code mới)");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Test Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm mb-2">
            <strong>Project ID:</strong> {projectId}
          </p>
          <p className="text-sm mb-2">
            <strong>Health Endpoint:</strong>
          </p>
          <p className="text-xs font-mono bg-white p-2 rounded break-all">
            https://{projectId}.supabase.co/functions/v1/make-server-80868a71/health
          </p>
        </div>

        <Button onClick={testConnection} disabled={testing} className="w-full">
          {testing ? "Đang kiểm tra..." : "Chạy Test Kết nối"}
        </Button>

        {testResults.length > 0 && (
          <div className="p-4 bg-gray-900 rounded-lg text-green-400 font-mono text-sm max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}