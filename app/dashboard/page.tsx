import { createClient } from "@/lib/supabase/server";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let subscription = null;
  if (user) {
    const { data } = await supabase
      .from("subscriptions")
      .select("plan, status")
      .eq("user_id", user.id)
      .single();
    subscription = data;
  }

  return <DashboardContent subscription={subscription} />;
}
