import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Database,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Info,
} from "lucide-react";
import { api } from "../services/api";
import { Badge } from "./ui/badge";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { ConnectionTest } from "./ConnectionTest";

export function DatabaseManagement() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [dbStatus, setDbStatus] = useState<"unknown" | "empty" | "populated">(
    "unknown"
  );
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [showConnectionTest, setShowConnectionTest] = useState(false);

  const handleInitDemoData = async () => {
    if (
      !confirm(
        "Bạn có chắc chắn muốn import dữ liệu demo? Điều này sẽ tạo tất cả dữ liệu mẫu vào database."
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await api.database.initDemoData();

      if (result.success) {
        setMessage({
          type: "success",
          text: "✅ Import dữ liệu demo thành công! Database đã được khởi tạo với dữ liệu mẫu.",
        });
        setDbStatus("populated");
      } else {
        setMessage({
          type: "error",
          text: `❌ Lỗi: ${result.error || "Không thể import dữ liệu"}`,
        });
      }
    } catch (error) {
      const errorMsg = String(error);
      if (errorMsg.includes("Failed to fetch") || errorMsg.includes("kết nối")) {
        setMessage({
          type: "error",
          text: `❌ Không thể kết nối đến server backend!
          
Vui lòng:
1. Mở terminal mới
2. Chạy lệnh: bash start-server.sh
3. Hoặc: cd supabase/functions/server && deno run --allow-net --allow-env --allow-read index.tsx
4. Đợi server khởi động (port 8000)
5. Thử lại import`,
        });
      } else {
        setMessage({
          type: "error",
          text: `❌ Lỗi kết nối: ${errorMsg}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    if (
      !confirm(
        "⚠️ CẢNH BÁO: Bạn có chắc chắn muốn xóa TẤT CẢ dữ liệu? Hành động này KHÔNG THỂ HOÀN TÁC!"
      )
    ) {
      return;
    }

    if (
      !confirm(
        "Xác nhận lần 2: Tất cả dữ liệu sẽ bị xóa vĩnh viễn. Bạn có chắc chắn?"
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await api.database.clearAllData();

      if (result.success) {
        setMessage({
          type: "success",
          text: "✅ Đã xóa tất cả dữ liệu thành công. Database hiện đang trống.",
        });
        setDbStatus("empty");
      } else {
        setMessage({
          type: "error",
          text: `❌ Lỗi: ${result.error || "Không thể xóa dữ liệu"}`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Lỗi kết nối: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckHealth = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const result = await api.database.healthCheck();

      if (result.success) {
        setMessage({
          type: "success",
          text: "✅ Server đang hoạt động tốt!",
        });
        // Try to check if there's data
        const buResult = await api.businessUnits.getAll();
        if (buResult.success && buResult.data && (buResult.data as any[]).length > 0) {
          setDbStatus("populated");
        } else {
          setDbStatus("empty");
        }
      } else {
        setMessage({
          type: "error",
          text: "❌ Không thể kết nối đến server",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Lỗi kết nối: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (dbStatus) {
      case "populated":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Đã có dữ liệu
          </Badge>
        );
      case "empty":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Chưa có dữ liệu
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            Chưa kiểm tra
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Quản lý Database</h1>
        <p className="text-gray-600">
          Khởi tạo, quản lý và kiểm tra trạng thái database
        </p>
      </div>

      {/* Server Warning */}
      <Card className="rounded-xl shadow-sm border-orange-300 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-orange-900">
                ⚠️ <strong>Backend Server Required</strong>
              </p>
              <p className="text-orange-800">
                Để sử dụng database, bạn cần chạy backend server trước:
              </p>
              <div className="p-3 bg-orange-100 rounded-lg font-mono text-sm text-orange-900 mt-2">
                <p className="mb-1"># Terminal mới:</p>
                <p className="font-bold">bash start-server.sh</p>
                <p className="mt-2 text-orange-700"># Hoặc:</p>
                <p className="font-bold">cd supabase/functions/server && deno run --allow-net --allow-env --allow-read index.tsx</p>
              </div>
              <p className="text-orange-700 text-sm mt-2">
                ✅ Server sẽ chạy tại: <span className="font-mono">http://localhost:8000</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Trạng thái Database
            </CardTitle>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">Supabase KV Store</p>
                <p className="text-gray-600">
                  PostgreSQL database với key-value storage
                </p>
              </div>
            </div>

            <Button
              onClick={handleCheckHealth}
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang kiểm tra...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Kiểm tra trạng thái
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Message Display */}
      {message && (
        <Card
          className={`rounded-xl shadow-sm border ${
            message.type === "success"
              ? "border-green-300 bg-green-50"
              : message.type === "error"
              ? "border-red-300 bg-red-50"
              : "border-blue-300 bg-blue-50"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={
                  message.type === "success"
                    ? "text-green-900"
                    : message.type === "error"
                    ? "text-red-900"
                    : "text-blue-900"
                }
              >
                {message.text}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Demo Data */}
        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-600" />
              Import Dữ liệu Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Khởi tạo database với dữ liệu mẫu hoàn chỉnh bao gồm:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>4 Business Units</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>6 KPIs master</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>5 Revenue sources</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>6 Variable costs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>5 Fixed costs + allocations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>8 Employees + allocations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>4 Users + permissions</span>
              </li>
            </ul>
            <Button
              onClick={handleInitDemoData}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang import...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Import dữ liệu demo
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Clear All Data */}
        <Card className="rounded-xl shadow-sm border-red-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Xóa Tất cả Dữ liệu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-900 mb-2">⚠️ CẢNH BÁO</p>
              <p className="text-red-700">
                Hành động này sẽ xóa vĩnh viễn TẤT CẢ dữ liệu trong database và
                KHÔNG THỂ HOÀN TÁC.
              </p>
            </div>
            <p className="text-gray-600">Sử dụng khi:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>Muốn import lại dữ liệu demo mới</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>Cần reset database về trạng thái ban đầu</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>Testing và development</span>
              </li>
            </ul>
            <Button
              onClick={handleClearData}
              disabled={loading}
              variant="destructive"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa tất cả dữ liệu
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="rounded-xl shadow-sm border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-blue-900">
                💡 <strong>Hướng dẫn sử dụng:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-blue-800">
                <li>
                  Kiểm tra trạng thái database bằng nút "Kiểm tra trạng thái"
                </li>
                <li>
                  Nếu database trống, click "Import dữ liệu demo" để khởi tạo
                </li>
                <li>
                  Sau khi import, tất cả trang sẽ hiển thị dữ liệu từ database
                </li>
                <li>
                  Mọi thay đổi (thêm, sửa, xóa) sẽ được lưu vào database thực
                </li>
                <li>Reload trang để thấy dữ liệu được lưu trữ persistent</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Schema Info */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Database Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 mb-2">
                <strong>Key Patterns:</strong>
              </p>
              <ul className="space-y-1 text-gray-600 font-mono text-sm">
                <li>• bu:&#123;id&#125; - Business Units</li>
                <li>• kpi:&#123;id&#125; - KPI Master</li>
                <li>
                  • revenue:&#123;buId&#125;:&#123;id&#125; - Revenue Sources
                </li>
                <li>
                  • variable_cost:&#123;buId&#125;:&#123;id&#125; - Variable
                  Costs
                </li>
                <li>• fixed_cost:&#123;id&#125; - Fixed Costs</li>
                <li>
                  • fixed_cost_allocation:&#123;fcId&#125;:&#123;buId&#125; -
                  Allocations
                </li>
                <li>• employee:&#123;id&#125; - Employees</li>
                <li>
                  • employee_allocation:&#123;empId&#125;:&#123;buId&#125; -
                  Allocations
                </li>
                <li>• user:&#123;id&#125; - Users</li>
                <li>
                  • permission:&#123;userId&#125;:&#123;resource&#125; -
                  Permissions
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debug Info */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Debug Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 mb-2">
                <strong>Project ID:</strong>
              </p>
              <p className="text-gray-600 font-mono text-sm">{projectId}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 mb-2">
                <strong>Public Anon Key:</strong>
              </p>
              <p className="text-gray-600 font-mono text-sm">{publicAnonKey}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Test */}
      {showConnectionTest && <ConnectionTest />}
      
      <Button
        onClick={() => setShowConnectionTest((prev) => !prev)}
        variant="outline"
        className="w-full"
      >
        {showConnectionTest ? "Ẩn" : "Hiển thị"} Connection Test Tool
      </Button>
    </div>
  );
}