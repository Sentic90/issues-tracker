import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "This Field Required").max(255),
  description: z.string().min(1, "This Field Required"),
});
export const patchIssueSchema = z.object({
  title: z.string().min(1, "This Field Required").max(255).max(255).optional(),
  description: z.string().min(1, "This Field Required").max(6666).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId required.")
    .max(255)
    .optional()
    .nullable(),
});
