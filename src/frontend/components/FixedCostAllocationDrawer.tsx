import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import type { FixedCost, CostAllocation } from "./FixedCostsPage";

interface FixedCostAllocationDrawerProps {
  cost: FixedCost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (costId: string, allocations: CostAllocation[]) => void;
}

export function FixedCostAllocationDrawer({
  cost,
  isOpen,
  onClose,
  onSave,
}: FixedCostAllocationDrawerProps) {
  const [allocations, setAllocations] = useState<CostAllocation[]>([]);

  useEffect(() => {
    if (cost) {
      setAllocations(cost.allocations);
    }
  }, [cost]);

  if (!cost) return null;

  const businessUnits = [
    { id: "bu-001", name: "Đơn vị Bán lẻ Miền Bắc" },
    { id: "bu-002", name: "Đơn vị Bán lẻ Miền Nam" },
    { id: "bu-003", name: "Đơn vị Bán sỉ" },
    { id: "bu-004", name: "Đơn vị Xuất khẩu" },
    { id: "bu-005", name: "Đơn vị Thương mại Điện tử" },
  ];

  const handleAddAllocation = () => {
    const newAllocation: CostAllocation = {
      buId: businessUnits[0].id,
      buName: businessUnits[0].name,
      value: cost.allocationType === "percentage" ? 0 : 0,
    };
    setAllocations([...allocations, newAllocation]);
  };

  const handleUpdateAllocation = (
    index: number,
    field: keyof CostAllocation,
    value: any
  ) => {
    const updated = [...allocations];

    if (field === "buId") {
      const bu = businessUnits.find((b) => b.id === value);
      if (bu) {
        updated[index] = {
          ...updated[index],
          buId: value,
          buName: bu.name,
        };
      }
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }

    setAllocations(updated);
  };

  const handleDeleteAllocation = (index: number) => {
    setAllocations(allocations.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(cost.id, allocations);
  };

  const calculateValue = (allocation: CostAllocation) => {
    if (cost.allocationType === "percentage") {
      return (cost.totalAmount * allocation.value) / 100;
    }
    return allocation.value;
  };

  const getTotalPercentage = () => {
    if (cost.allocationType === "percentage") {
      return allocations.reduce((sum, a) => sum + a.value, 0);
    }
    return 0;
  };

  const getTotalAmount = () => {
    if (cost.allocationType === "fixed") {
      return allocations.reduce((sum, a) => sum + a.value, 0);
    }
    return cost.totalAmount;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetTitle className="sr-only">Phân bổ Chi phí Cố định</SheetTitle>
        <SheetDescription className="sr-only">
          Quản lý phân bổ chi phí cố định cho các đơn vị kinh doanh
        </SheetDescription>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900 mb-1">Phân bổ Chi phí</h2>
              <p className="text-gray-600">{cost.name}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Cost Info */}
            <Card className="rounded-xl border-gray-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Tổng Chi phí</p>
                    <p className="text-gray-900">
                      ₫{(cost.totalAmount / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Phương thức</p>
                    {cost.allocationType === "percentage" ? (
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                        Theo Phần trăm
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        Cố định
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Số Đơn vị</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {allocations.length} ĐV
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distribution Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900">Phân bổ theo Đơn vị</h3>
                  {cost.allocationType === "percentage" && (
                    <p className="text-gray-600">
                      Tổng:{" "}
                      <span
                        className={
                          getTotalPercentage() === 100
                            ? "text-green-600"
                            : "text-orange-600"
                        }
                      >
                        {getTotalPercentage()}%
                      </span>
                    </p>
                  )}
                  {cost.allocationType === "fixed" && (
                    <p className="text-gray-600">
                      Tổng phân bổ:{" "}
                      <span
                        className={
                          getTotalAmount() === cost.totalAmount
                            ? "text-green-600"
                            : "text-orange-600"
                        }
                      >
                        ₫{(getTotalAmount() / 1000000).toFixed(1)}M
                      </span>
                    </p>
                  )}
                </div>
                <Button onClick={handleAddAllocation} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm ĐV
                </Button>
              </div>

              <Card className="rounded-xl border-gray-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên Đơn vị</TableHead>
                        <TableHead className="text-right">
                          {cost.allocationType === "percentage" ? "%" : "Số tiền"}
                        </TableHead>
                        <TableHead className="text-right">Giá trị</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allocations.map((allocation, index) => (
                        <TableRow
                          key={index}
                          className={index % 2 === 1 ? "bg-gray-50" : ""}
                        >
                          <TableCell>
                            <Select
                              value={allocation.buId}
                              onValueChange={(value) =>
                                handleUpdateAllocation(index, "buId", value)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {businessUnits.map((bu) => (
                                  <SelectItem key={bu.id} value={bu.id}>
                                    {bu.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {cost.allocationType === "percentage" ? (
                              <div className="space-y-2">
                                <Slider
                                  value={[allocation.value]}
                                  onValueChange={(value) =>
                                    handleUpdateAllocation(
                                      index,
                                      "value",
                                      value[0]
                                    )
                                  }
                                  max={100}
                                  step={5}
                                  className="w-full"
                                />
                                <p className="text-right text-blue-600">
                                  {allocation.value}%
                                </p>
                              </div>
                            ) : (
                              <Input
                                type="number"
                                value={allocation.value}
                                onChange={(e) =>
                                  handleUpdateAllocation(
                                    index,
                                    "value",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="text-right"
                              />
                            )}
                          </TableCell>
                          <TableCell className="text-right text-gray-900">
                            ₫{(calculateValue(allocation) / 1000000).toFixed(
                              2
                            )}M
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAllocation(index)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Lưu phân bổ
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}