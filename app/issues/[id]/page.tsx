"use client";
import axios from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { useSession } from "next-auth/react";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: Props) => {
  const { status } = useSession();
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {status === "authenticated" && (
        <Box>
          <Flex direction="column" className="space-y-3">
            <AssigneeSelect />
            <EditIssueButton id={id} />
            <DeleteIssueButton id={id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default page;
