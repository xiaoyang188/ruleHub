import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteFeatures } from "@/lib/site-features";

export function ManusIcon({ className }: { className?: string }) {
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
        d="M26.5 16c0 7.18-5.82 13-13 13S.5 23.18.5 16 6.32 3 13.5 3s13 5.82 13 13Zm-2 0c0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11 11 4.925 11 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ManusRunLink({
  variant = "sidebar",
  className,
}: {
  variant?: "main" | "sidebar";
  className?: string;
}) {
  if (!siteFeatures.showManus) return null;

  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors";

  const styles =
    variant === "main"
      ? "mt-0 rounded-[10px] bg-[#1a1a1a] px-4 py-3 text-sm text-white hover:bg-[#2a2a2a] dark:bg-white dark:text-[#1a1a1a] dark:hover:bg-gray-100"
      : "w-full rounded-lg bg-[#1a1a1a] px-3 py-2.5 text-sm text-white hover:bg-[#2a2a2a] dark:bg-white dark:text-[#1a1a1a] dark:hover:bg-gray-100";

  return (
    <Link href="#" className={cn(base, styles, className)}>
      <ManusIcon className="h-4 w-4 shrink-0" />
      在 Manus 中运行
    </Link>
  );
}
