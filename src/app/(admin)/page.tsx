import { redirect } from "next/navigation";

// Root tidak punya halaman sendiri — dulu masih memakai landing page bawaan
// starter NextUI. Middleware sudah memproteksi "/" lewat cookie token, jadi
// yang sampai sini pasti sudah login dan langsung dilempar ke dashboard.
export default function Home() {
  redirect("/dashboard");
}
