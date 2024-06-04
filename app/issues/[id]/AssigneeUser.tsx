"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssigneUser = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignUser = async (userId: string) => {
    const value = userId === "none" ? null : userId;

    try {
      const res = await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: value,
      });

      if (res.status === 200) {
        toast.success("Issue successfully Assigned");
      }
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "none"}
        onValueChange={assignUser}
      >
        <Select.Trigger placeholder="Assgining to..." />
        <Select.Content>
          <Select.Group>
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });
export default AssigneUser;
