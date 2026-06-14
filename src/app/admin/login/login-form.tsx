"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { signIn } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") ?? "/admin";
  const urlError = params.get("error");
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirect" value={redirectTo} />
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
        />
      </div>

      {(state?.error || urlError) && (
        <p className="text-secondary-500 text-sm">
          {state?.error ??
            (urlError === "unauthorized"
              ? "Please sign in with an admin account."
              : urlError)}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        <LogIn className="size-4" />
        {pending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
