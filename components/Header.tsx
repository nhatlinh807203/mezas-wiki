
// import Link from "next/link";
// import Image from "next/image";

// export default function Header() {
//   return (
//     <header className="bg-[#36393F] border-b border-[#202225] py-3 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between">
          
//           {/* Logo Meza Wiki */}
//           <Link href="/" className="flex items-center gap-3">
//             <Image 
//               src="/logo-meza-wiki.jpg"
//               alt="Meza Wiki Logo"
//               width={40}
//               height={40}
//               className="rounded-full object-contain"
//               priority
//             />
//             <span className="text-white font-semibold text-xl tracking-tight hidden md:block">
//               Meza Wiki
//             </span>
//           </Link>

//           {/* Navigation */}
//           <nav className="flex items-center gap-8 text-sm font-medium">
//             <Link href="/" className="text-white hover:text-[#5865F2] transition-colors">
//               Home
//             </Link>
//             <Link href="/value-list" className="text-gray-300 hover:text-white transition-colors">
//               Value List
//             </Link>
//             <Link href="/trade-calculator" className="text-gray-300 hover:text-white transition-colors">
//               Trade Calculator
//             </Link>
//             <Link href="/value-changes" className="text-gray-300 hover:text-white transition-colors">
//               Value Changes
//             </Link>
//             <Link href="/trade-ads" className="text-gray-300 hover:text-white transition-colors">
//               Trade Ads
//             </Link>
//           </nav>

//           {/* Right side */}
//           <div className="flex items-center gap-3">
            
//             {/* Discord Icon Button */}
//             <button 
//               className="w-10 h-10 hover:bg-[#4752C4] transition-colors rounded-full flex items-center justify-center overflow-hidden"
//               title="Discord"
//             >
//               <Image 
//                 src="/discord-round-color-icon.jpg"
//                 alt="Discord"
//                 width={36}
//                 height={36}
//                 className="rounded-full"
//               />
//             </button>

//             {/* Login Button */}
//             <button className="px-6 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium rounded-full transition-all active:scale-95 flex items-center gap-2">
//               <Image 
//                 src="/discord-round-color-icon.jpg"
//                 alt="Discord"
//                 width={20}
//                 height={20}
//                 className="rounded-full"
//               />
//               <span>Login with Discord</span>
//             </button>
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Value List", href: "/value-list" },
  { label: "Trade Calculator", href: "/trade-calculator" },
  { label: "Value Changes", href: "/value-changes" },
  { label: "Trade Ads", href: "/trade-ads" },
];

// Simple inline Discord glyph so we don't depend on an external image asset
function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.548-13.662a.06.06 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu automatically if the viewport grows back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 px-4 transition-all duration-300 ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div
        className={`
          mx-auto flex max-w-6xl items-center justify-between gap-4
          rounded-2xl border border-amber-400/30
          bg-gradient-to-r from-[#161616] via-[#1e1e1e] to-[#161616]
          px-4 py-2.5 shadow-[0_0_25px_-5px_rgba(251,191,36,0.15)]
          backdrop-blur-md transition-all duration-300
          md:px-5
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-amber-400/40">
            <Image
              src="/logo-meza-wiki.jpg"
              alt="Meza Wiki Logo"
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
          <span className="hidden text-lg font-semibold tracking-tight text-white sm:block">
            Meza Wiki
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[15px] font-medium md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActive(item.href)}
                className={`
                  group relative pb-1 transition-colors duration-200
                  ${isActive ? "text-amber-400" : "text-gray-300 hover:text-white"}
                `}
              >
                {item.label}
                <span
                  className={`
                    absolute bottom-0 left-0 h-[2px] rounded-full bg-amber-400
                    transition-all duration-300 ease-out
                    ${isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-white/40"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side (desktop) */}
        <div className="hidden items-center gap-2.5 md:flex">
          <button
            title="Discord"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 text-indigo-400 transition-colors duration-200 hover:bg-white/5 hover:text-indigo-300"
          >
            <DiscordIcon className="h-5 w-5" />
          </button>

          <button
            className="
              flex items-center gap-2 rounded-full border border-white/15
              bg-white/5 px-5 py-2 text-sm font-medium text-white
              transition-all duration-200 hover:border-amber-400/40 hover:bg-white/10
              active:scale-95
            "
          >
            <DiscordIcon className="h-4 w-4 text-indigo-400" />
            <span>Login</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/30 text-white transition-colors duration-200 hover:bg-white/5 md:hidden"
        >
          <span className="relative h-4 w-4">
            <Menu
              className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
                mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
                mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`
          mx-auto max-w-6xl overflow-hidden transition-all duration-300 ease-out md:hidden
          ${mobileOpen ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col gap-1 rounded-2xl border border-amber-400/30 bg-[#161616] p-3 shadow-[0_0_25px_-5px_rgba(251,191,36,0.15)]">
          {NAV_ITEMS.map((item, i) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActive(item.href);
                  setMobileOpen(false);
                }}
                style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
                className={`
                  rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300
                  ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}
                  ${isActive ? "bg-amber-400/10 text-amber-400" : "text-gray-300 hover:bg-white/5 hover:text-white"}
                `}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-3">
            <button
              title="Discord"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 text-indigo-400 transition-colors duration-200 hover:bg-white/5"
            >
              <DiscordIcon className="h-5 w-5" />
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-amber-400/40 hover:bg-white/10 active:scale-95">
              <DiscordIcon className="h-4 w-4 text-indigo-400" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}