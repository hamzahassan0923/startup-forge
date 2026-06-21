"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0b0b0f] text-gray-300 border-t border-white/10 ">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Startup<span className="text-indigo-500">Forge</span>
            </h2>

            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              A modern platform where founders create startups,
              collaborators join teams, and ideas turn into real products.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/browse-startups" className="hover:text-indigo-400 transition">
                  Browse Startups
                </Link>
              </li>

              <li>
                <Link href="/opportunities" className="hover:text-indigo-400 transition">
                  Opportunities
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-indigo-400 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-indigo-400 transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboard Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Dashboards</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-indigo-400 transition">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/dashboard/founder" className="hover:text-indigo-400 transition">
                  Founder Dashboard
                </Link>
              </li>

              <li>
                <Link href="/dashboard/collaborator" className="hover:text-indigo-400 transition">
                  Collaborator Dashboard
                </Link>
              </li>

              <li>
                <Link href="/dashboard/admin" className="hover:text-indigo-400 transition">
                  Admin Dashboard
                </Link>
              </li>

              <li>
                <Link href="/profile" className="hover:text-indigo-400 transition">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <p className="text-sm text-gray-400">
              Email: support@startupforge.com
            </p>

            <div className="flex gap-4 mt-4 text-sm">
              <a href="#" className="hover:text-indigo-400 transition">
                GitHub
              </a>
              <a href="#" className="hover:text-indigo-400 transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-indigo-400 transition">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p>
            © {currentYear} StartupForge. All rights reserved.
          </p>

          <div className="flex gap-5 mt-3 md:mt-0">
            <Link href="#" className="hover:text-indigo-400 transition">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-indigo-400 transition">
              Terms of Service
            </Link>

            <Link href="#" className="hover:text-indigo-400 transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}