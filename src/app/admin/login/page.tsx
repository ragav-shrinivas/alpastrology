import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <div className="bg-radial-glow flex min-h-screen items-center justify-center px-6">
      <div className="border-border bg-surface/80 w-full max-w-md rounded-3xl border p-8 backdrop-blur">
        <div className="mb-8 text-center">
          <Sparkles className="text-primary mx-auto size-8" />
          <h1 className="font-display mt-3 text-2xl font-semibold">ALP Admin</h1>
          <p className="text-muted mt-1 text-sm">
            Sign in to manage your website
          </p>
        </div>
        <Suspense fallback={<div className="text-muted text-center text-sm">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
