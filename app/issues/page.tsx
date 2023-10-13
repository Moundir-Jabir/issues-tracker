import { Button } from "@radix-ui/themes";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
    </div>
  );
};

export default page;
