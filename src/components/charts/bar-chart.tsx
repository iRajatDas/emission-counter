import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { useEmissionStore } from "@/lib/state/useEmissionStore";
import { useMemo } from "react";
import { formatNumber, prepareChartData } from "@/lib/helpers";
import { Scopes } from "@/lib/constant";
import { cn } from "@/lib/utils";

const BarChart = () => {
  const [isStacked, setIsStacked] = useState(false);
  const [selectedScope, setSelectedScope] = useState<
    keyof typeof Scopes | null
  >(null);

  const emissionData = useEmissionStore((state) => state.emissions);
  const filteredData = useMemo(() => {
    // If no scope is selected, show all data
    if (!selectedScope) return emissionData;
    return emissionData.filter(
      (entry) => entry.scope === Scopes[selectedScope as keyof typeof Scopes]
    );
  }, [emissionData, selectedScope]);

  const chartData = useMemo(
    () => prepareChartData(filteredData),
    [filteredData]
  );

  if (chartData.length === 0) return null;

  return (
    <Card className="shadow-none mt-6">
      <CardHeader className="grid grid-cols-2 gap-x-2 gap-y-4 w-full flex-row justify-between space-y-0">
        <CardTitle>Bar Chart</CardTitle>
        <div className="w-full flex">
          <div className="flex items-center gap-2 ml-auto">
            <span>Stacked</span>
            <Switch checked={isStacked} onCheckedChange={setIsStacked} />
          </div>
        </div>
        {/* Dropdown for filtering by Scope */}
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              setSelectedScope(null);
              return;
            }

            setSelectedScope(value as keyof typeof Scopes);
          }}
        >
          <SelectTrigger className="w-full max-md:col-span-full md:w-[180px]">
            <SelectValue placeholder="Filter by Scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Object.keys(Scopes).map((scope) => (
              <SelectItem key={scope} value={scope}>
                {String(Scopes[scope as keyof typeof Scopes])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart
            data={chartData}
            width={500}
            height={300}
            className="mx-auto"
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="z-50 bg-white p-3 border rounded-lg">
                      <p className="label font-semibold text-sm">{label}</p>
                      <div>
                        {payload.map((pld) => (
                          <div
                            className={cn(
                              payload.length > 1
                                ? "flex flex-row-reverse gap-3"
                                : ""
                            )}
                          >
                            <div style={{ color: pld.color }} className="font-medium">
                              {pld.value !== undefined &&
                                formatNumber(parseFloat(pld.value.toString()))}
                              <small className="ml-1">
                                CO<sub>2</sub>e
                              </small>
                            </div>
                            <div>{pld.dataKey}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Legend />
            {isStacked ? (
              <>
                <Bar
                  name="Scope1"
                  dataKey="Scope1"
                  stackId="a"
                  fill="hsl(var(--chart-1))"
                />
                <Bar
                  name="Scope2"
                  dataKey="Scope2"
                  stackId="a"
                  fill="hsl(var(--chart-2))"
                />
                <Bar
                  name="Scope3"
                  dataKey="Scope3"
                  stackId="a"
                  fill="hsl(var(--chart-3))"
                />
              </>
            ) : (
              <Bar
                name="Total Emissions"
                dataKey={(data) => data.Scope1 + data.Scope2 + data.Scope3}
                fill="hsl(var(--chart-1))"
                radius={8}
              />
            )}
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChart;
