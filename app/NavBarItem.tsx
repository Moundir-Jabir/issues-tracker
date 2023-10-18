"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  link: {
    label: string;
    href: string;
  };
  key: string;
}

const NavBarItem = ({ link: { label, href }, key }: Props) => {
  const path = usePathname();
  return (
    <li
      key={key}
      className={`${
        path === href ? "text-zinc-900" : "text-zinc-500"
      } hover:text-zinc-800 transition-colors`}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default NavBarItem;
