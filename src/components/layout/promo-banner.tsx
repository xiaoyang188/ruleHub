"use client";

import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

function ManusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.014 4.565C1.737 5.132 1.97 5.817 2.533 6.095c.809.4 1.51.794 2.205 1.583.416.473 1.134.516 1.603.097.469-.419.512-1.142.096-1.615-.99-1.124-2.01-1.676-2.904-2.118-.563-.278-1.243-.044-1.519.523Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.151 1.234c-.608.153-.978.774-.826 1.387.106.428.205.794.296 1.129.174.641.317 1.17.42 1.802.103.624.687 1.046 1.306.943.619-.103 1.038-.692.936-1.315-.123-.748-.314-1.455-.505-2.157-.085-.315-.17-.63-.249-.949-.152-.613-.769-.986-1.377-.833Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.642 1.938c-.536-.328-1.235-.156-1.56.384-.604 1.002-.921 1.988-1.216 3.175-.152.613.218 1.234.826 1.387.609.153 1.225-.22 1.377-.833.273-1.1.524-1.83.954-2.543.325-.54.156-1.244-.381-1.57Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.431 30.193c2.202-1.407 3.724-8.954 3.389-11.201s-.349-1.207-1.2-1.207c-.653 0-1.014.531-1.147.779-.115-.043-.232-.081-.325-.111-.05-.016-.12-.038-.186-.059l-.125-.04c-.102-.032-.198-.063-.288-.095v-.032c.004-.73-.07-1.868-.826-3.054-.12-.19-.234-.36-.332-.504l-.061-.09c-.073-.107-.129-.191-.184-.274-.134-.206-.171-.285-.185-.322l-.001-.002c-.005-.014-.017-.043-.02-.131-.004-.108.005-.312.075-.669l.364-1.453.001-.008c.024-.133.045-.253.057-.448.01-.18.013-.441-.033-.744-.086-.574-.418-1.662-1.587-2.292-.286-.154-.628-.246-.965-.29-.227-.03-.53-.05-.882-.023-.718.055-1.661.314-2.5 1.083l-.21.22c-.487.589-1.003 1.319-1.394 1.964-1.186-.558-2.583-1.2-3.559-1.544-1.071-.379-2.267-.695-3.39-.654-1.245.045-2.644.567-3.376 2.043-.301.607-.429 1.315-.275 2.053.148.705.513 1.245.862 1.621.647.7 1.515 1.133 2.126 1.395.468.201.949.368 1.375.503-.045.082-.09.166-.133.252-.129.253-.283.591-.384.979-.101.386-.181.937-.037 1.558.148.637.44 1.135.789 1.516-.013.198-.018.407-.011.623.049 1.442.93 2.403 1.704 2.948.738.52 1.607.838 2.31 1.052.678.207 1.395.371 1.977.505l.125.028c.62.143 1.233.308 1.846.473.696.187 1.392.374 2.099.529.231.05.456.099.662.143l.076.196c.917 2.344 2.142 3.828 3.778 2.783Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem("manus-banner-dismissed") === "true") {
        setVisible(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem("manus-banner-dismissed", "true");
      document.documentElement.dataset.manusBannerDismissed = "true";
    } catch {
      /* ignore */
    }
  };

  return (
    <div data-manus-banner-root className="bg-[#1a1a1a] dark:bg-white">
      <Link
        href="#"
        className="flex items-center justify-between px-4 py-3 text-white dark:text-[#1a1a1a] md:hidden"
      >
        <div className="flex items-center gap-3">
          <ManusIcon className="h-8 w-8 shrink-0" />
          <span className="text-sm leading-5">
            在 Manus 中运行任何 Skill
            <br />
            一键导入
          </span>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0" />
      </Link>

      <div className="mx-auto hidden h-16 max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
        <div className="flex h-full items-center justify-between">
          <Link
            href="#"
            aria-label="一键在 Manus 中运行任何 Skill"
            className="flex shrink-0 items-center gap-1 text-white transition-opacity hover:opacity-80 dark:text-[#1a1a1a]"
          >
            <ManusIcon className="h-8 w-8" />
            <span className="text-sm font-medium">一键在 Manus 中运行任何 Skill</span>
            <ChevronRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="#"
              className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-[#1a1a1a] transition-opacity hover:opacity-90 dark:bg-[#1a1a1a] dark:text-white"
            >
              开始使用
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-md p-1.5 text-white/70 transition-colors hover:text-white dark:text-[#1a1a1a]/70 dark:hover:text-[#1a1a1a]"
              aria-label="关闭横幅"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
