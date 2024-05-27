import dynamic from "next/dynamic";
import LoadingFormSkeleton from "../_components/LoadingFormSkeleton";

// Lazy Loading ( We tell server not to load this componenet inside SSR)

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingFormSkeleton />,
});
const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
