"use client";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LoginModal } from "./LoginModal";

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <nav className='flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-slate-800/50 bg-linear-to-b from-slate-950 to-slate-900'>
      <Link href='/' className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center'>
          <Code2 className='w-5 h-5 text-white' />
        </div>
        <span className='text-xl font-bold text-white'>Root</span>
      </Link>

      <div className='hidden md:flex items-center gap-8'>
        <Link
          href='/'
          className={`transition-colors ${pathname === "/" ? "text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
        >
          {t("home")}
        </Link>
        <Link
          href='/editor'
          className={`transition-colors ${pathname === "/editor" ? "text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
        >
          {t("editor")}
        </Link>
        <a href='#' className='text-slate-400 hover:text-slate-200 transition-colors'>
          {t("docs")}
        </a>
      </div>

      <div className='flex items-center gap-4'>
        <LanguageSwitcher locale={locale} />
        <Button onClick={() => setLoginOpen(true)} className='bg-blue-600 cursor-pointer hover:bg-blue-700 text-white'>
          {t("login")}
        </Button>
      </div>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </nav>
  );
}
