import { z } from "zod";
import { Scopes } from "@/lib/constant";
import { faker } from "@faker-js/faker";
const formSchema = z.object({
  // uuid
  id: z.string().default(faker.string.uuid()),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  scope: z.enum(Scopes, {
    message: "Scope is required",
  }),
  emission: z.coerce.number({
    message: "Please enter a valid numeric value",
  }),
  date: z.date({
    message: "Date is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

export { formSchema };

export type { FormData };
