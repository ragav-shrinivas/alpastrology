import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-radial-glow flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-gradient font-display text-7xl font-bold md:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold md:text-3xl">
        This star isn&apos;t on our chart
      </h1>
      <p className="text-muted mt-3 max-w-md">
        The page you&apos;re looking for has drifted beyond the cosmos. Let&apos;s
        guide you back.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg">
          <Link href="/">Return Home</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
