import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";

export default function Home() {
  // <LatestIssues />;
  return <IssuesSummary open={100} closed={2121} inProgress={18} />;
}
