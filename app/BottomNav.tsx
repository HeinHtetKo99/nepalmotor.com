"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "./NavIcons";
import type { NavKey } from "./SiteShell";

const bottomNavItems: {
  key: NavKey;
  label: string;
  href: string;
  icon: "exchange" | "buy" | "sell" | "testdrive" | "dealers";
}[] = [
  { key: "exchange", label: "Exchange", href: "/", icon: "exchange" },
  { key: "buy", label: "Buy", href: "/buy", icon: "buy" },
  { key: "sell", label: "Sell", href: "/sell", icon: "sell" },
  { key: "testdrive", label: "Test Drive", href: "/test-drive", icon: "testdrive" },
  { key: "dealers", label: "Dealers", href: "/dealers", icon: "dealers" },
];

type BottomNavProps = {
  activeNav?: NavKey;
};

export function BottomNav({ activeNav }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (key: NavKey, href: string) => {
    if (activeNav) return activeNav === key;
    if (key === "exchange") {
      return pathname === "/" || pathname.startsWith("/exchange");
    }
    if (key === "testdrive") {
      return pathname.startsWith("/test-drive");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Bottom navigation"
    >
      <nav className="mx-auto flex w-full max-w-[564px] min-h-[60px] items-stretch justify-between gap-0.5 px-1 pt-1 pb-1.5 lg:max-w-6xl">
        {bottomNavItems.map((item) => {
          const active = isActive(item.key, item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={
                active
                  ? "flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[14px] bg-sky-100 px-0.5 py-1 text-[#075985]"
                  : "flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[14px] px-0.5 py-1 text-[#64748b] transition-colors hover:bg-slate-50"
              }
              aria-current={active ? "page" : undefined}
            >
              <NavIcon name={item.icon} className="h-[22px] w-[22px] shrink-0" />
              <span className="max-w-full truncate text-center text-[9px] font-extrabold leading-tight tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
