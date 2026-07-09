import { SITE_NAME, SITE_URL } from "@/lib/site-seo";

export const SITE_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@yimingyinglou.top";

export const SITE_OPERATOR = process.env.NEXT_PUBLIC_SITE_OPERATOR || "RuleHub 运营团队";

export const LEGAL_LAST_UPDATED = "2026-07-09";

export const CONTACT_CHANNELS = [
  {
    label: "电子邮件",
    value: SITE_CONTACT_EMAIL,
    href: `mailto:${SITE_CONTACT_EMAIL}`,
    description: "商务合作、隐私咨询、内容纠错与 AdSense 相关问题",
  },
  {
    label: "网站",
    value: SITE_URL.replace(/^https?:\/\//, ""),
    href: SITE_URL,
    description: `${SITE_NAME} 官方网站`,
  },
] as const;
