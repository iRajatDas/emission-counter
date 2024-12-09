import { FormData as EmissionRowItem } from "@/lib/schema/emission.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmissionStore } from "@/lib/state/useEmissionStore";
import { useState } from "react";

const ActionDelete = ({ row }: { row: EmissionRowItem }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const deleteEmissionEnrty = useEmissionStore((state) => state.removeEmission);

  const togglePopover = () => setIsPopoverOpen((prev) => !prev);

  return (
    <div className="w-full flex items-end">
      <Popover open={isPopoverOpen} onOpenChange={togglePopover}>
        <PopoverTrigger>
          <Button className="ml-auto" variant={"destructive"} size={"icon"}>
            <Trash className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div>
            <h3 className="text-lg font-semibold">Delete Emission Entry</h3>
            <p className="text-gray-500 mt-2">
              Are you sure you want to delete this emission entry?
            </p>
            <div className="mt-4 flex justify-end">
              <Button
                variant="destructive"
                size={"sm"}
                onClick={() => {
                  deleteEmissionEnrty(row.id);
                  togglePopover();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ActionDelete;
