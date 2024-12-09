import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { Scopes } from "@/lib/constant";
import { FormData, formSchema } from "@/lib/schema/emission.schema";
import { useEmissionStore } from "@/lib/state/useEmissionStore";
import { FC, useState } from "react";
import { toast } from "sonner";

type FormSectionProps = {
  isUpdateView?: boolean;
  initialValues?: FormData;
};

const FormSection: FC<FormSectionProps> = ({
  isUpdateView = false,
  initialValues,
}) => {
  const addEmission = useEmissionStore((state) => state.addEmission);
  const updateEmission = useEmissionStore((state) => state.updateEmission);

  const [isDatePopoverOpen, setIsDateOpopoverOpen] = useState<boolean>(false);

  const toggleDate = () => setIsDateOpopoverOpen((prev) => !prev);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
      date: initialValues?.date ? new Date(initialValues.date) : undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data) return;

    try {
      if (isUpdateView) {
        updateEmission(data);
      } else {
        addEmission(data);
      }

      toast.success(
        `Emission ${isUpdateView ? "updated" : "added"} successfully`
      );

      // reset form
      // not working as expected

      if (!isUpdateView) {
        // to prevent fallback to initial values on update
        form.reset();
      }

      // console.log(form.getValues()); // {}
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <section className={cn(!isUpdateView && "mt-6 md:mt-12")}>
      <div
        className={cn(!isUpdateView && "bg-white px-6 py-8 rounded-lg border")}
      >
        {isUpdateView ? null : (
          <>
            <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
              Add Emission
            </h1>

            <Separator className="my-4" />
          </>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div
              className={cn(
                "grid gap-5",
                isUpdateView
                  ? "grid-cols-1 gap-4"
                  : "grid grid-cols-2 md:grid-cols-3"
              )}
            >
              {/* Emission */}
              <FormField
                control={form.control}
                name="emission"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Emission (kg CO2-e)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. 1000.50"
                        pattern="[0-9]*[.,]?[0-9]*"
                        inputMode="decimal"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Scope */}
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Scope</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a scope" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Scopes.map((scope) => (
                            <SelectItem key={scope} value={scope}>
                              {scope}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="max-md:col-span-full">
                    <FormLabel>Date</FormLabel>
                    <Popover open={isDatePopoverOpen} onOpenChange={toggleDate}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px]-- w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(value) => {
                            field.onChange(value);
                            toggleDate();
                          }}
                          disabled={(date) =>
                            /// allow futuredate
                            // date > new Date() ||
                            date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. Something about the emission"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="mt-4 max-md:w-full md:ml-auto"
              size={"lg"}
            >
              {isUpdateView ? "Update" : "Add"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default FormSection;
