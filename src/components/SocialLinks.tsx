import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socials: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <Github className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter className="w-5 h-5" />,
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mutedForeground hover:text-accent transition-colors"
          aria-label={social.name}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
}
