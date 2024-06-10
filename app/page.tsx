import prisma from "@/prisma/client";
import IssuesChart from "./IssuesChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const propsData = {
    open,
    closed,
    inProgress,
  };
  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Flex direction="column" gap="5">
        <IssuesSummary {...propsData} />
        <IssuesChart {...propsData} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
