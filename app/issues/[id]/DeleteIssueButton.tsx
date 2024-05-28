"use client";

import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <Button
    color="red"
      onClick={async () => {
        // sending HTTP DELETE request
        await axios.delete("/api/isssues/" + issueId);
        router.push("/issues");
        router.refresh();
      }}
    >
      <FaTrash />
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
