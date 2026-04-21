import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader email={user.email || ""} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
