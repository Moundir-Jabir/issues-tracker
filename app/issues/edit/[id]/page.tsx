"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
});

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
  return <IssueForm issue={issue} />;
};

export default page;
