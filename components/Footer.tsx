import Image from "next/image";
import Link from "next/link";
import {
  Home,
  List,
  Calculator,
  History,
  Shield,
  ExternalLink,
  Mail,
  Lock,
  FileText,
} from "lucide-react";

const NAVIGATION = [
  { label: "Home", href: "/", icon: Home },
  { label: "Value List", href: "/value-list", icon: List },
  { label: "Calculator", href: "/trade-calculator", icon: Calculator },
  { label: "Value Changes", href: "/value-changes", icon: History },
];

const COMMUNITY = [
  { label: "Trade Ads", href: "/trade-ads", icon: Shield },
  { label: "Discord", href: "https://discord.gg", icon: ExternalLink, external: true },
];

const SUPPORT = [
  { label: "Contact Us", href: "/contact", icon: Mail },
  { label: "Privacy Policy", href: "/privacy", icon: Lock },
  { label: "Terms of Service", href: "/terms", icon: FileText },
];

function FooterLink({
  href,
  label,
  icon: Icon,
  external,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
      >
        <Icon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-hover:text-amber-400" />
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-amber-400/20 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Column 1 - Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-amber-400/40">
                <Image
                  src="/logo-meza-wiki.jpg"
                  alt="Meza Wiki Logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-semibold text-amber-400">
                Meza Wiki
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              mezawiki.com is a 3rd party site not affiliated with the
              official game or Roblox.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h3 className="mb-4 font-medium text-amber-400">Navigation</h3>
            <ul className="space-y-3">
              {NAVIGATION.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>

          {/* Column 3 - Community */}
          <div>
            <h3 className="mb-4 font-medium text-amber-400">Community</h3>
            <ul className="space-y-3">
              {COMMUNITY.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>

          {/* Column 4 - Support */}
          <div>
            <h3 className="mb-4 font-medium text-amber-400">Support</h3>
            <ul className="space-y-3">
              {SUPPORT.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-gray-500">
          © {year} Meza Wiki — Not affiliated with the official game or
          Roblox.
        </div>
      </div>
    </footer>
  );
}