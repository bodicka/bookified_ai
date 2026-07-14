"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";

const navItem = [
  { label: "Libary", href: "/" },
  { label: "Add New", href: "/books/new" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-sm">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image
            src={logo}
            alt="Bookfied"
            width={42}
            height={26}
            className="w-auto h-auto"
          />
          <span className="logo-text">Bookified</span>
        </Link>
        <nav className="w-fit flex gap-7.5 items-center">
          {navItem.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));

            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}
              >
                {label}
              </Link>
            );
          })}
          {!isSignedIn ? (
            <div className="flex items-center gap-7.5">
              <SignInButton>
                <button className="btn">Sign in</button>
              </SignInButton>
            </div>
          ) : (
            <div className="nav-user-link">
              <UserButton />
              {user?.firstName && (
                <Link href="/subscriptions" className="nav-user-name">
                  {user.firstName}
                </Link>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
