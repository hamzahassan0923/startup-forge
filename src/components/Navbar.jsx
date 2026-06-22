"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

// AUTH
import {
  useSession,
  signOut,
} from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Startups", href: "/startups" },
  { name: "Opportunities", href: "/opportunities" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {

  const pathname = usePathname();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  // SESSION
  const { data: session } = useSession();

  const user = session?.user;

  // LOGOUT
  const handleLogout = async () => {

    try {

      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">

      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-sky-500 shadow-md">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V10.5m-7.5-4.5L21 3m0 0v6.75M21 3l-9 9"
              />
            </svg>

          </div>

          <div className="leading-tight">

            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              StartupForge
            </h1>

            <p className="text-xs text-slate-500">
              Startup Team Builder
            </p>

          </div>

        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">

          {navLinks.map((link) => {

            const active =
              pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">

          {!user ? (

            <>
              {/* Login */}
              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-indigo-500 hover:text-indigo-600"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                href="/register"
                className="rounded-xl bg-linear-to-r from-indigo-600 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </>

          ) : (

            <div className="relative">

              {/* Profile Button */}
              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50 transition"
              >

                {/* Image */}
                <Image
                  src={
                    user.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover"
                />

                {/* Info */}
                <div className="text-left">

                  <h4 className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {user.email}
                  </p>

                </div>

                <ChevronDown className="h-4 w-4 text-slate-500" />

              </button>

              {/* Dropdown */}
              {profileOpen && (

                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

                  {/* Profile */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                  >

                    <User className="h-4 w-4" />

                    Profile

                  </Link>

                  {/* Dashboard */}
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                  >

                    <LayoutDashboard className="h-4 w-4" />

                    Dashboard

                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                  >

                    <LogOut className="h-4 w-4" />

                    Logout

                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="rounded-xl border border-slate-300 p-2 text-slate-700 md:hidden"
        >

          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}

        </button>

      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-150" : "max-h-0"
        }`}
      >

        <div className="space-y-2 border-t border-slate-200 bg-white px-4 py-5">

          {/* Links */}
          {navLinks.map((link) => {

            const active =
              pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() =>
                  setIsOpen(false)
                }
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Auth */}
          {!user ? (

            <div className="flex flex-col gap-3 pt-4">

              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-linear-to-r from-indigo-600 to-sky-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>

            </div>

          ) : (

            <div className="pt-4 space-y-3">

              {/* User Info */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3">

                <Image
                  src={
                    user.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                  className="h-12 w-12 rounded-xl object-cover"
                  width={48}
                  height={48}
                />

                <div>

                  <h4 className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {user.email}
                  </p>

                </div>

              </div>

              {/* Profile */}
              <Link
                href="/profile"
                className="block rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700"
              >
                Profile
              </Link>

              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="block rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700"
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}