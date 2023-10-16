import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
});

const page = () => {
  return <IssueForm />;
};

export default page;
