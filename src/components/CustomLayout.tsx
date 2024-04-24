"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { CustomNav } from "./CustomNav";
import { usePathname } from "next/navigation";
import { inter } from "@/fonts";
interface Props {
  children: ReactNode;
}
export default function CustomLayout({ children }: Props) {
  const pathname = usePathname();

  const setActive = (href: string) => {
    if (pathname === href) {
      return "active";
    } else {
      return "";
    }
  };
  return (
    <div>
      <CustomNav className={inter.className}>
        <li className={setActive("/events")}>
          <Link href="/events">Events</Link>
        </li>
        <li className={setActive("/home")}>
          <Link href="/home">Home</Link>
        </li>
      </CustomNav>
      {children}
    </div>
  );
}
