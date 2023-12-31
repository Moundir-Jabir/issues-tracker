"use client";
import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { IssueStatusBadge, Link as MyLink } from "../components";
import { Issue } from "@prisma/client";
import Link from "next/link";

const page = () => {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    axios.get("/api/issues").then((res) => {
      setIssues(res.data);
    });
  }, []);
  return (
    <div>
      <div className="mb-5">
        <Link href="/issues/new">
          <Button>New Issue</Button>
        </Link>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue: Issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <MyLink href={`/issues/${issue.id}`}>{issue.title}</MyLink>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.createdAt).toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
