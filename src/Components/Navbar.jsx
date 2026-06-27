'use client'
import { useState } from "react";
import Link from "next/link";
import { HiOutlineSaveAs } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import UserAvatar from "./UserAvatar";

function Navbar() {
  const [imgError, setImgError] = useState(false);

  return (
    <nav className="py-4 border-b border-canvas-dark bg-inherit">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-ProtestStrike text-2xl text-ink tracking-tight hover:text-phthalo transition-colors duration-200">
              DIY Network
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs relative items-center">
            <span className="absolute left-0 text-ink/40 pointer-events-none" aria-hidden="true">
              <BiSearch size={15} />
            </span>
            <input
              type="search"
              placeholder="Search posts..."
              aria-label="Search posts"
              className="w-full pl-5 pr-3 py-1.5 bg-transparent border-b border-canvas-dark text-sm text-ink placeholder:text-ink/35 outline-none focus:border-ink transition-colors duration-200"
            />
          </div>

          {/* Actions */}
          <ul className="flex gap-6 items-center list-none">
            <li>
              <Link
                href="/"
                className="relative flex items-center text-ink/55 hover:text-ink transition-colors duration-200"
                aria-label="Saved posts (0)"
              >
                <HiOutlineSaveAs size={20} />
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-2 text-[9px] font-bold bg-phthalo text-canvas-light w-4 h-4 rounded-full flex items-center justify-center"
                >
                  0
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-sm font-medium text-ink/65 hover:text-phthalo transition-colors duration-200"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/user" aria-label="Your profile">
                <img
                  src=""
                  alt="Profile"
                  onError={() => setImgError(true)}
                  className={imgError ? "hidden" : "rounded-full w-8 h-8 object-cover ring-2 ring-canvas-dark"}
                />
                {imgError && <UserAvatar />}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
