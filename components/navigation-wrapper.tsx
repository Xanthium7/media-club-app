"use client";

import { usePathname } from "next/navigation";
import BottomNavigation from "@/components/bottom-navigation";

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <>
      <main className={isAuthPage ? "flex-1" : "flex-1 pb-16"}>{children}</main>
      {!isAuthPage && <BottomNavigation />}
    </>
  );
}
