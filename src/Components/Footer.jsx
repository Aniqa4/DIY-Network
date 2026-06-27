import Link from "next/link";

const LINKS = {
  "Explore": [
    { label: "All Posts",  href: "/" },
    { label: "Cooking",    href: "/cooking" },
    { label: "Painting",   href: "/painting" },
    { label: "Gardening",  href: "/gardening" },
    { label: "Sewing",     href: "/sewing" },
    { label: "Crafting",   href: "/crafting" },
  ],
  "Account": [
    { label: "Sign In",    href: "/login" },
    { label: "Profile",    href: "/user" },
    { label: "Saved",      href: "/" },
  ],
};

function Footer() {
  return (
    <footer className="bg-ink text-canvas border-t-4 border-phthalo">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-ProtestStrike text-3xl text-canvas-light mb-4">
              DIY Network
            </p>
            <p className="text-canvas-dark text-sm leading-relaxed max-w-xs">
              A place for people who make things. Recipes, projects, tutorials —
              all from the comfort of your own home.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-phthalo mb-5">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-canvas-dark hover:text-canvas-light transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-canvas/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-canvas/35 font-mono">
            © {new Date().getFullYear()} DIY Network. All rights reserved.
          </p>
          <p className="text-xs text-canvas/35 font-mono">
            Made with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
