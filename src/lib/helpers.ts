import { format } from "date-fns";
import { FormData } from "./schema/emission.schema";

type EmissionEntry = FormData;

type ChartData = {
  month: string;
  Scope1: number;
  Scope2: number;
  Scope3: number;
};

export const prepareChartData = (data: EmissionEntry[]): ChartData[] => {
  const groupedData: Record<string, ChartData> = {};

  data.forEach(({ date, scope, emission }) => {
    // Get full month name
    const month = format(new Date(date), "MMMM");

    if (!groupedData[month]) {
      groupedData[month] = { month, Scope1: 0, Scope2: 0, Scope3: 0 };
    }

    // Safely add emission to the corresponding scope
    const scopeKey: keyof ChartData =
      scope === "Scope 1"
        ? "Scope1"
        : scope === "Scope 2"
        ? "Scope2"
        : "Scope3";

    groupedData[month][scopeKey] += emission;
  });

  // Return the data in an array format, sorted by month
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthOrder.map(
    (month) => groupedData[month] || { month, Scope1: 0, Scope2: 0, Scope3: 0 }
  );
};

// number format
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-IN").format(num);
};
