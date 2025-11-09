"use client";

import Link from "next/link";

const navItems = [
  // { label: "Home", href: "#" },
  // { label: "Articles", href: "#articles", active: true },
  { label: "CV", href: "/William_Gitta_Lugoloobi_CV.pdf" },
  // { label: "Projects", href: "#projects" },
  // { label: "Contact", href: "#contact" },
];

export function Navigation() {
  return (
    <nav className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="font-mono text-sm font-semibold">
          WILLIAM GITTA LUGOLOBI
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                className={`px-3 py-1 text-sm font-medium border rounded transition-colors ${"border-foreground bg-transparent hover:bg-[#006F4F] hover:text-background"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="text-xs font-mono text-muted-foreground">v1.0.00</div>
        </div>
      </div>
    </nav>
  );
}
