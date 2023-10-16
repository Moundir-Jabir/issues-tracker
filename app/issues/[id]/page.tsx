"use client";
import axios from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

interface Props {
  params: {
    id: string;
  };
}

const page = ({ params: { id } }: Props) => {
  const [isError, setIsError] = useState(false);
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    status: "",
    createdAt: null,
  });
  useEffect(() => {
    axios
      .get(`/api/issues/${id}`)
      .then((res) => {
        res.data.createdAt = new Date(res.data.createdAt);
        setIssue(res.data);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);
  if (isError) notFound();
  return (
    <div className="max-x-xl">
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default page;
