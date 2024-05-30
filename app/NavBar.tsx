"use client";

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";
const NavBar = () => {
  const currentPath = usePathname();
  const {status, data:session } = useSession()

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 px-6 h-14 items-center border-b mb-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}

        <Box>
            {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
            {status === 'authenticated' && <Link href="/api/auth/signout">Logout</Link>}
        </Box>
      </ul>
    </nav>
  );
};

export default NavBar;
