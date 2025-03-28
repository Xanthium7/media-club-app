"use client";

import { Calendar, Home, User, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Events",
      href: "/events",
      icon: Ticket,
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black">
      <nav className="flex justify-around items-center h-16 relative">
        <motion.div
          //  absolute top-0 h-1 w-12 bg-accent rounded-b-md
          initial={false}
          animate={{ left: `calc(${activeIndex * 25}% + 12.5% - 24px)` }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          style={{
            width: "3rem",
            height: "0.25rem",
            position: "absolute",
            top: 0,
            backgroundColor: "hsl(var(--accent))",
            borderRadius: "1rem",
          }}
        />
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full relative",
                isActive ? "text-accent" : "text-gray-400"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
