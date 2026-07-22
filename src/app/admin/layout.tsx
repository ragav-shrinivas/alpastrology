import type { Metadata } from "next";

/** Belt-and-suspenders alongside the robots.txt disallow: the whole /admin
 *  subtree (login + dashboard) must never be indexed, even if a URL leaks. */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
