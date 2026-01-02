import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function RevenueVsCostChart() {
  const data = [
    { month: "T1", doanhThu: 38.5, chiPhi: 28.2 },
    { month: "T2", doanhThu: 40.2, chiPhi: 29.5 },
    { month: "T3", doanhThu: 42.8, chiPhi: 30.8 },
    { month: "T4", doanhThu: 41.5, chiPhi: 30.2 },
    { month: "T5", doanhThu: 43.2, chiPhi: 31.5 },
    { month: "T6", doanhThu: 44.8, chiPhi: 32.1 },
    { month: "T7", doanhThu: 43.5, chiPhi: 31.8 },
    { month: "T8", doanhThu: 45.2, chiPhi: 32.5 },
    { month: "T9", doanhThu: 46.5, chiPhi: 33.2 },
    { month: "T10", doanhThu: 44.8, chiPhi: 32.8 },
    { month: "T11", doanhThu: 45.8, chiPhi: 32.4 },
    { month: "T12", doanhThu: 47.2, chiPhi: 33.5 },
  ];

  return (
    <Card className="rounded-xl shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">Doanh thu vs Chi phí</CardTitle>
        <p className="text-gray-600">So sánh theo tháng (tỷ ₫)</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="doanhThu"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Doanh thu"
              dot={{ fill: "#3b82f6", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="chiPhi"
              stroke="#f97316"
              strokeWidth={3}
              name="Chi phí"
              dot={{ fill: "#f97316", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
