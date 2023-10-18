import { IssueStatusBadge } from "@/app/components";
import { Heading, Flex, Text, Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

interface Props {
  issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue?.status} />
        <Text>{issue?.createdAt && issue.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full mt-4">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
