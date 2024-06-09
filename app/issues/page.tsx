import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssuesAction from "./IssuesAction";
import IssueTable, { columnsName, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
  // Sorting

  // Filtering
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  // Compute orderBy value
  const orderBy = columnsName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 3;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssuesAction />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
