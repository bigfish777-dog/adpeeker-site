import { createClient } from "@/lib/supabase/server";
import VaultContent from "./VaultContent";

export default async function VaultPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: advertisers } = await supabase
    .from("advertisers")
    .select("id, name")
    .eq("user_id", user!.id)
    .order("name");

  return <VaultContent advertisers={advertisers || []} />;
}
