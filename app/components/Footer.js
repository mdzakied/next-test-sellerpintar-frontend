"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mx-auto bg-blue-600 py-8">
      <div className="flex flex-col lg:flex-row gap-4 justify-center text-center">
        <Image
          src={"/logo-white.svg"}
          alt="Logo"
          width={120}
          height={40}
          className="transition-all duration-300 text-center mx-auto md:mx-0"
        />
        <p className="text-white">© 2025 Blog genzet. All rights reserved.</p>
      </div>
    </footer>
  );
}