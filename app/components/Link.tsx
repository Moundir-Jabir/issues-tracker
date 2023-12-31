import Link from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}

const MyLink = ({ href, children }: Props) => {
  return (
    <Link href={href}>
      <RadixLink>{children}</RadixLink>
    </Link>
  );
};

export default MyLink;
