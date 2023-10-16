import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

enum Color {
  red = "red",
  green = "green",
  violet = "violet",
}

const IssueStatusBadge = ({ status }: Props) => {
  let color: Color;
  switch (status) {
    case "OPEN":
      color = Color.red;
      break;
    case "IN_PROGRESS":
      color = Color.violet;
      break;
    case "CLOSED":
      color = Color.green;
      break;
  }
  return <Badge color={color}>{status}</Badge>;
};

export default IssueStatusBadge;
