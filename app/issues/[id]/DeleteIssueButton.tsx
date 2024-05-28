"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <FaTrash />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure of delete this issue?, this operations not undone.
        </AlertDialog.Description>
        <Flex mt='4' gap="3">
          <AlertDialog.Action>
            <Button color="red">Confirm Delete</Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>

      {/* <Button
    color="red"
      onClick={async () => {
        // sending HTTP DELETE request
        await axios.delete("/api/isssues/" + issueId);
        router.push("/issues");
        router.refresh();
      }}
    >
      
    </Button> */}
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
