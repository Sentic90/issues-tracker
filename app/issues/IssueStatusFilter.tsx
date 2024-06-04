"use client";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

type Status = "all" | "OPEN" | "IN_PROGRESS" | "CLOSED";

const statuses: { label: string; value?: Status }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        let query;
        if (status === "OPEN" || "IN_PROGRESS" || "CLOSED") {
          query = `?status=${status}`;
        } else {
          query = undefined;
        }
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger
        placeholder="Filter by status..."
        className="cursor-pointer"
      />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
