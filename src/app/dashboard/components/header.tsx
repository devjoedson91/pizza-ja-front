"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.png";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  function handleLogout() {
    deleteCookie("session", { path: "/" });

    router.replace("/");
  }

  return (
    <header className="h-20 py-3">
      <div className="max-w-7xl h-20 my-0 mx-auto py-0 px-4 flex items-center justify-between">
        <Link href="/dashboard">
          <Image
            src={logo}
            alt="Pizza Logo"
            priority
            quality={100}
            width={80}
            height={80}
          />
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard/category"
            className="hover:text-red900 transition-colors duration-700"
          >
            Categoria
          </Link>
          <Link
            href="/dashboard/product"
            className="hover:text-red900 transition-colors duration-700"
          >
            Produto
          </Link>
          <form action={handleLogout}>
            <Button
              size="icon"
              type="submit"
              className="ml-4 hover:scale-125 transition duration-500"
            >
              <LogOut size={35} />
            </Button>
          </form>
        </nav>
      </div>
    </header>
  );
}
