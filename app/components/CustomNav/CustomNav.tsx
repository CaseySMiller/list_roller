"use client";

import Link from "next/link";
import { Navbar, } from "flowbite-react";
import { usePathname } from "next/navigation";

function CustomNav() {
  const pathname = usePathname();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <img
          src="/images/icons/icon-192.png"
          className="mr-3 h-6 sm:h-9"
          alt="Alien Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          List your Luck!
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" active={pathname === "/" ? true : false}>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/groups" active={pathname === "/groups" ? true : false}>
          Groups
        </Navbar.Link>
        {/* <Navbar.Link as={Link} href="/test">
          Services
        </Navbar.Link>
        <Navbar.Link as={Link} href="/test">
          Contact
        </Navbar.Link> */}

        {/* <Dropdown inline label="Dropdown" dismissOnClick={false}>
          <Dropdown.Item className="right-60" ><Link href='/test'>Dashboard</Link></Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNav;
