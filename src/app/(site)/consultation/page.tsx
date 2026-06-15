import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;
export const metadata: Metadata = { title: "Consultation" };

export default async function ConsultationPage() {
  const sections = await getPageSections("consultation");
  return (
    <>
      <SectionRenderer sections={sections} />
      <section className="container-px mx-auto max-w-3xl pb-24">
        <SectionHeading
          title="Make an Appointment"
          description="Fill in your details and preferred service. Our office will confirm your slot on WhatsApp."
        />
        <div className="mt-10">
          <AppointmentForm />
        </div>
      </section>
    </>
  );
}
