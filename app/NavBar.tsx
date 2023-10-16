import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex space-x-6 border-b px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <NavBarItem key={link.label} link={link} />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
