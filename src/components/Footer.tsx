import { Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    product: [
      { label: "Browse Anime", href: "/category/tv" },
      { label: "Movies", href: "/category/movies" },
      { label: "Search", href: "/search" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Community", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Contact", href: "#" },
    ],
  };

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/heisdezz/anira",
      icon: Github,
    },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "Email", href: "mailto:contact@anira.dev", icon: Mail },
  ];

  return (
    <footer className="mt-20 border-t border-base-300 bg-gradient-to-b from-base-100 to-base-200 text-base-content">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Anira</h3>
            <p className="text-sm text-base-content/70">
              Your ultimate anime streaming platform. Discover, watch, and enjoy
              anime like never before.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    title={social.label}
                    className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4 font-semibold text-base-content">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-base-content/70 transition hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="mb-4 font-semibold text-base-content">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-base-content/70 transition hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-4 font-semibold text-base-content">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-base-content/70 transition hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-base-content/70 sm:flex-row">
          <p className="m-0">
            &copy; {year} Anira. All rights reserved.
          </p>
          <p className="m-0">
            Built with{" "}
            <a
              href="https://tanstack.com/start"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              TanStack Start
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
