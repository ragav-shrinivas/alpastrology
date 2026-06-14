import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Globe, User, Check, FileDown } from "lucide-react";
import { getCourseBySlug, getCourses } from "@/lib/cms/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return course
    ? { title: course.title, description: course.description ?? undefined }
    : { title: "Course not found" };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const syllabus = Array.isArray(course.syllabus)
    ? (course.syllabus as string[])
    : [];

  return (
    <div className="container-px mx-auto max-w-5xl py-16 md:py-24">
      <Link
        href="/courses"
        className="text-muted hover:text-primary mb-8 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="size-4" /> All courses
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {course.level && (
            <Badge className="mb-4 capitalize">{course.level}</Badge>
          )}
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {course.title}
          </h1>
          {course.description && (
            <p className="text-muted mt-4 leading-relaxed">
              {course.description}
            </p>
          )}

          {syllabus.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold">Syllabus</h2>
              <ul className="mt-4 space-y-3">
                {syllabus.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-accent mt-0.5 size-5 shrink-0" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="h-fit">
          <div className="border-border bg-surface/80 rounded-2xl border p-6 backdrop-blur">
            <div className="from-primary/20 to-secondary/20 relative mb-5 aspect-video overflow-hidden rounded-xl bg-gradient-to-br">
              {course.image_url ? (
                <Image
                  src={course.image_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-radial-glow absolute inset-0" />
              )}
            </div>
            <p className="text-accent text-2xl font-semibold">
              {course.price || "Enquire for pricing"}
            </p>
            <dl className="text-muted mt-4 space-y-2 text-sm">
              {course.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="size-4" /> {course.duration}
                </div>
              )}
              {course.instructor && (
                <div className="flex items-center gap-2">
                  <User className="size-4" /> {course.instructor}
                </div>
              )}
              {course.languages?.length > 0 && (
                <div className="flex items-center gap-2">
                  <Globe className="size-4" /> {course.languages.join(", ")}
                </div>
              )}
            </dl>
            <Button asChild className="mt-6 w-full">
              <Link href="/contact">Enroll / Enquire</Link>
            </Button>
            {course.pdf_url && (
              <Button asChild variant="secondary" className="mt-3 w-full">
                <a href={course.pdf_url} target="_blank" rel="noopener noreferrer">
                  <FileDown className="size-4" /> Download Syllabus
                </a>
              </Button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
