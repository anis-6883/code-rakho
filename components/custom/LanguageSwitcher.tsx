"use client";

import { Locale } from "@/config";
import { setUserLocale } from "@/config/locale";
import { startTransition, useState } from "react";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const [language, setLanguage] = useState<"en" | "bn">(locale as "en" | "bn");

  const languages = [
    { code: "en", name: "EN", flag: "🇺🇸" },
    { code: "bn", name: "BN", flag: "🇧🇩" }
  ];

  // handle language
  const handleLanguageChange = (locale: Locale) => {
    setLanguage(locale);
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <div className='h-10 border border-slate-700/50 bg-slate-900/30 hover:bg-slate-900/40 rounded-lg p-1 flex items-center gap-1 backdrop-blur-sm transition-all duration-200'>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as Locale)}
          className={`flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-200 ${
            language === lang.code ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : "text-slate-400 hover:text-slate-300"
          }`}
        >
          <span className='text-base'>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
