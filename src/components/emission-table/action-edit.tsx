// import { useState } from "react";
import { FormData as EmissionRowItem } from "@/lib/schema/emission.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/Form";

const ActionEdit = ({ row }: { row: EmissionRowItem }) => {
  //   const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  //   const togglePopover = () => setIsPopoverOpen((prev) => !prev);

  return (
    <div className="w-full flex items-end">
      <Popover>
        <PopoverTrigger>
          <Button className="ml-auto" variant={"outline"} size={"icon"}>
            <Edit className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <FormSection isUpdateView initialValues={row} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ActionEdit;
