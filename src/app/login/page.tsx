import { redirect } from "next/navigation";
import { IS_PREVIEW_MODE } from "@/lib/site-features";

export default function LoginPage() {
  if (IS_PREVIEW_MODE) {
    redirect("/");
  }

  redirect("/auth/login");
}
