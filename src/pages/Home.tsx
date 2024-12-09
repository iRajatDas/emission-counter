import { useEffect } from "react";

import Form from "@/components/Form";
import { DataTable } from "@/components/emission-table/data-table";
import { useEmissionStore } from "@/lib/state/useEmissionStore";
import { getColumns } from "@/components/emission-table/columns";
import { useMemo } from "react";
import BarChart from "@/components/charts/bar-chart";

const MOCK_DATA = true;

const PageHome = () => {
  const emissionData = useEmissionStore((state) => state.emissions);
  const addMockData = useEmissionStore((state) => state.addMockData);
  // const mockData = useMemo(() => generateMockData(), []);

  const columns = useMemo(() => getColumns(), []);

  useEffect(() => {
    if (MOCK_DATA) {
      addMockData();
    }
  }, [addMockData]);

  return (
    <main className="min-h-dvh bg-[#fafafc]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 2xl:px-0">
        <Form />
        <BarChart />
        <div className="mt-6 bg-white">
          <DataTable columns={columns} data={[...emissionData]} />
        </div>
      </div>
    </main>
  );
};

export default PageHome;
