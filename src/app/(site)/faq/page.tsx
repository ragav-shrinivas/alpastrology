import type { Metadata } from "next";
import { getPageSections, getFaqs } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const revalidate = 60;
export const metadata: Metadata = { title: "FAQ" };

export default async function FaqPage() {
  const [sections, faqs] = await Promise.all([
    getPageSections("faq"),
    getFaqs(),
  ]);

  return (
    <>
      <SectionRenderer sections={sections} />
      <section className="container-px mx-auto max-w-3xl pb-24">
        {faqs.length ? (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted text-center">
            FAQs will appear here once added in Admin.
          </p>
        )}
      </section>
    </>
  );
}
