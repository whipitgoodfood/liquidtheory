"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser();
      if (!user) return setOk(false);
      const { data } = await supabaseBrowser.from("profiles").select("role").eq("id", user.id).maybeSingle();
      setOk(data?.role === "admin");
    })();
  }, []);
  if (ok === null) return <div className="p-6">Checking access…</div>;
  if (!ok) return <div className="p-6">Sign in as admin to continue.</div>;
  return <>{children}</>;
}
