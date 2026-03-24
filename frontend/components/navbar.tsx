"use client";

import { useState } from "react";

type SubItem = {
  label: string;
  image: string; // URL or local path e.g. "/images/school.jpg"
  href?: string;
};

type NavItem = {
  label: string;
  href?: string;
  subItems?: SubItem[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#",
    subItems: [
      {
        label: "For Recruiter",
        image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&q=80",
      },
      {
        label: "For Job Seeker",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      },
    ],
  },
  {
    label: "Our Business",
    href: "#",
    subItems: [
      {
        label: "School Business",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
      },
      {
        label: "Glowing Partner Meitei Academy",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80",
      },
      {
        label: "Seminal Business",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      },
      {
        label: "Career Counseling",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      },
    ],
  },
  { label: "Vacancy", href: "#" },
  { label: "News", href: "#" },
  {
    label: "Contact",
    href: "#",
    subItems: [
      {
        label: "Company",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
      },
      {
        label: "Customer",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
      },
    ],
  },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/Gplogotransparent.png"
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Divider */}
          <div className="w-px h-7 bg-white/25 mx-4" />

          {/* Nav Links */}
          <nav>
            <ul className="flex items-center gap-10">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.subItems && setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {/* Top-level link */}
                  <a
                    href={item.href ?? "#"}
                    className="font-display text-sm font-medium tracking-widest uppercase text-white/80 hover:text-white relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 flex items-center gap-1"
                  >
                    {item.label}
                    {item.subItems && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${activeMenu === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>

                  {/* Dropdown */}
                  {item.subItems && (
                    <div
                      className={`
                        absolute top-full left-1/2 -translate-x-1/2 mt-4
                        flex gap-3 p-4
                        bg-black/70 backdrop-blur-md
                        border border-white/10
                        shadow-2xl
                        transition-all duration-300 ease-out
                        ${activeMenu === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                        }
                      `}
                      style={{ minWidth: item.subItems.length > 2 ? "640px" : "340px" }}
                    >
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href ?? "#"}
                          className="group relative flex-1 min-w-[140px] overflow-hidden cursor-pointer"
                        >
                          {/* Background image */}
                          <div
                            className="h-32 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url('${sub.image}')` }}
                          />

                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                          {/* Bottom gradient + label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                            <p className="font-display text-white text-xs tracking-widest uppercase text-center leading-tight">
                              {sub.label}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}