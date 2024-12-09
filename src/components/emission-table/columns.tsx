import { ColumnDef } from "@tanstack/react-table";
import { FormData as EmissionRowItem } from "@/lib/schema/emission.schema";
import ActionEdit from "./action-edit";
import ActionDelete from "./action-delete";

export const getColumns = (): ColumnDef<EmissionRowItem>[] => [
  {
    accessorKey: "emission",
    header: "Emission (kg CO2-e)",
    minSize: 170,
  },
  {
    accessorKey: "scope",
    header: "Scope",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.date).toLocaleDateString();
      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "action",
    header: "",
    // size: 100,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <ActionEdit row={row.original} />
          <ActionDelete row={row.original} />
        </div>
      );
    },
  },
];
