import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { CourseCard } from "@/components/cards/course-card";
import { ConsultantCard } from "@/components/cards/consultant-card";
import { EventCard } from "@/components/cards/event-card";
import { BlogCard } from "@/components/cards/blog-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import {
  getServices,
  getCourses,
  getConsultants,
  getEvents,
  getBlogs,
  getTestimonials,
} from "@/lib/cms/content";

type Content = Record<string, unknown>;
type Btn = { label: string; href: string };
const str = (c: Content, k: string) => (c[k] as string) ?? "";

function CtaRow({ button }: { button?: Btn }) {
  if (!button) return null;
  return (
    <div className="mt-10 text-center">
      <Button asChild size="lg" variant="secondary">
        <Link href={button.href}>{button.label}</Link>
      </Button>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <p className="text-muted border-border bg-surface/40 col-span-full rounded-2xl border border-dashed p-10 text-center text-sm">
      {label}
    </p>
  );
}

export async function ServicesSection({ content }: { content: Content }) {
  const services = await getServices();
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        eyebrow="What We Offer"
        title={str(content, "title") || "Our Services"}
        description={str(content, "description")}
      />
      <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {services.length ? (
          services.map((s) => (
            <StaggerItem key={s.id}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))
        ) : (
          <Empty label="Services will appear here once added in Admin." />
        )}
      </StaggerGroup>
    </section>
  );
}

export async function CoursesSection({ content }: { content: Content }) {
  const courses = await getCourses();
  return (
    <section className="bg-surface/30 border-y border-white/5 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Courses"
          title={str(content, "title")}
          description={str(content, "description")}
        />
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.length ? (
            courses.map((c) => (
              <StaggerItem key={c.id}>
                <CourseCard course={c} />
              </StaggerItem>
            ))
          ) : (
            <Empty label="Courses will appear here once added in Admin." />
          )}
        </StaggerGroup>
        <CtaRow button={content.button as Btn | undefined} />
      </div>
    </section>
  );
}

export async function ConsultantsSection({ content }: { content: Content }) {
  const consultants = await getConsultants();
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        eyebrow="Consultants"
        title={str(content, "title") || "Our Consultants"}
        description={str(content, "description")}
      />
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {consultants.length ? (
          consultants.map((c) => (
            <StaggerItem key={c.id}>
              <ConsultantCard consultant={c} />
            </StaggerItem>
          ))
        ) : (
          <Empty label="Consultants will appear here once added in Admin." />
        )}
      </StaggerGroup>
    </section>
  );
}

export async function EventsSection({ content }: { content: Content }) {
  const events = await getEvents();
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        eyebrow="Events"
        title={str(content, "title")}
        description={str(content, "description")}
      />
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.length ? (
          events.map((e) => (
            <StaggerItem key={e.id}>
              <EventCard event={e} />
            </StaggerItem>
          ))
        ) : (
          <Empty label="Events will appear here once added in Admin." />
        )}
      </StaggerGroup>
      <CtaRow button={content.button as Btn | undefined} />
    </section>
  );
}

export async function BlogSection({ content }: { content: Content }) {
  const blogs = (await getBlogs()).slice(0, 3);
  return (
    <section className="bg-surface/30 border-y border-white/5 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Insights"
          title={str(content, "title")}
          description={str(content, "description")}
        />
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.length ? (
            blogs.map((b) => (
              <StaggerItem key={b.id}>
                <BlogCard blog={b} />
              </StaggerItem>
            ))
          ) : (
            <Empty label="Articles will appear here once published in Admin." />
          )}
        </StaggerGroup>
        <CtaRow button={content.button as Btn | undefined} />
      </div>
    </section>
  );
}

export async function TestimonialsSection({ content }: { content: Content }) {
  const items = await getTestimonials();
  if (!items.length) return null;
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        eyebrow="Testimonials"
        title={str(content, "title") || "What Our Community Says"}
        description={str(content, "description")}
      />
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <StaggerItem key={t.id}>
            <TestimonialCard item={t} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
