import Link from "next/link";
import Image from "next/image";
import { Check, Star, Sparkles, PlayCircle } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/editor/editable-text";
import { EditableHtml } from "@/components/editor/editable-html";

type Content = Record<string, unknown>;
type Btn = { label: string; href: string; variant?: "primary" | "secondary" };
type Props = { content: Content; sectionId: string };

const str = (c: Content, k: string) => (c[k] as string) ?? "";
const arr = <T,>(c: Content, k: string): T[] => (c[k] as T[]) ?? [];

/* ---------- Page header (inner-page banner) ---------- */
export function PageHeaderSection({ content, sectionId }: Props) {
  return (
    <section className="bg-radial-glow relative overflow-hidden py-20 md:py-28">
      <div className="container-px relative mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="text-primary mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <Sparkles className="size-3.5" /> ALP Astrology
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            <EditableText
              as="span"
              className="text-gradient"
              sectionId={sectionId}
              path="title"
              value={str(content, "title")}
            />
          </h1>
          {str(content, "subtitle") && (
            <EditableText
              as="p"
              className="text-muted mx-auto mt-5 max-w-2xl text-base text-pretty md:text-lg"
              sectionId={sectionId}
              path="subtitle"
              value={str(content, "subtitle")}
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Who we are ---------- */
export function WhoWeAreSection({ content, sectionId }: Props) {
  const button = content.button as Btn | undefined;
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal direction="right">
          <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
            About Us
          </span>
          <EditableText
            as="h2"
            className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
            sectionId={sectionId}
            path="title"
            value={str(content, "title")}
          />
        </Reveal>
        <div className="space-y-4">
          {arr<string>(content, "paragraphs").map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <EditableText
                as="p"
                className="text-muted leading-relaxed"
                sectionId={sectionId}
                path={`paragraphs.${i}`}
                value={p}
              />
            </Reveal>
          ))}
          {button && (
            <Reveal delay={0.2}>
              <Button asChild className="mt-2">
                <Link href={button.href}>
                  <EditableText
                    as="span"
                    sectionId={sectionId}
                    path="button.label"
                    value={button.label}
                  />
                </Link>
              </Button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ALP ---------- */
export function AboutAlpSection({ content, sectionId }: Props) {
  return (
    <section className="bg-surface/30 border-y border-white/5 py-20 md:py-28">
      <div className="container-px mx-auto max-w-4xl text-center">
        <SectionHeading
          eyebrow={
            str(content, "subtitle") ? (
              <EditableText
                as="span"
                sectionId={sectionId}
                path="subtitle"
                value={str(content, "subtitle")}
              />
            ) : undefined
          }
          title={
            <EditableText
              as="span"
              sectionId={sectionId}
              path="title"
              value={str(content, "title")}
            />
          }
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          {arr<string>(content, "paragraphs").map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <EditableText
                as="p"
                className="text-muted leading-relaxed"
                sectionId={sectionId}
                path={`paragraphs.${i}`}
                value={p}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Mission / purpose ---------- */
export function MissionSection({ content, sectionId }: Props) {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <SectionHeading
        title={
          <EditableText
            as="span"
            sectionId={sectionId}
            path="title"
            value={str(content, "title")}
          />
        }
      />
      <StaggerGroup className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {arr<string>(content, "items").map((item, i) => (
          <StaggerItem key={i}>
            <div className="glass card-glow flex items-start gap-3 rounded-2xl p-5">
              <div className="bg-primary/15 text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
                <Star className="size-4" />
              </div>
              <EditableText
                as="p"
                className="text-sm leading-relaxed text-white/85"
                sectionId={sectionId}
                path={`items.${i}`}
                value={item}
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

/* ---------- Consultation ---------- */
export function ConsultationSection({ content, sectionId }: Props) {
  const button = content.button as Btn | undefined;
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Consultation"
            title={
              <EditableText
                as="span"
                sectionId={sectionId}
                path="title"
                value={str(content, "title")}
              />
            }
            description={
              str(content, "description") ? (
                <EditableText
                  as="span"
                  sectionId={sectionId}
                  path="description"
                  value={str(content, "description")}
                />
              ) : undefined
            }
          />
          {button && (
            <Reveal delay={0.2}>
              <Button asChild className="mt-6">
                <Link href={button.href}>
                  <EditableText
                    as="span"
                    sectionId={sectionId}
                    path="button.label"
                    value={button.label}
                  />
                </Link>
              </Button>
            </Reveal>
          )}
        </div>
        <StaggerGroup className="grid gap-3 sm:grid-cols-2">
          {arr<string>(content, "items").map((item, i) => (
            <StaggerItem key={i}>
              <div className="glass card-glow h-full rounded-2xl p-5">
                <Check className="text-accent mb-3 size-5" />
                <EditableText
                  as="p"
                  className="text-sm leading-relaxed text-white/85"
                  sectionId={sectionId}
                  path={`items.${i}`}
                  value={item}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------- Video tutorials ---------- */
export function VideoSection({ content, sectionId }: Props) {
  return (
    <section className="bg-surface/30 border-y border-white/5 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Watch & Learn"
          title={
            <EditableText
              as="span"
              sectionId={sectionId}
              path="title"
              value={str(content, "title")}
            />
          }
          description={
            str(content, "description") ? (
              <EditableText
                as="span"
                sectionId={sectionId}
                path="description"
                value={str(content, "description")}
              />
            ) : undefined
          }
        />
        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {arr<string>(content, "topics").map((topic, i) => (
            <StaggerItem key={i}>
              <div className="glass card-glow flex items-center gap-3 rounded-2xl p-5">
                <PlayCircle className="text-primary size-7 shrink-0" />
                <EditableText
                  as="p"
                  className="text-sm font-medium"
                  sectionId={sectionId}
                  path={`topics.${i}`}
                  value={topic}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------- Founder ---------- */
export function FounderSection({ content, sectionId }: Props) {
  const lists: [string, string][] = [
    ["Achievements", "achievements"],
    ["Awards", "awards"],
    ["Media Appearances", "media_appearances"],
  ];
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal direction="right">
          <div className="from-primary/20 to-secondary/20 relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br">
            {str(content, "image") ? (
              <Image
                src={str(content, "image")}
                alt={str(content, "title")}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-radial-glow absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-primary/40 size-16" />
              </div>
            )}
          </div>
        </Reveal>
        <div>
          <SectionHeading
            align="left"
            eyebrow={
              str(content, "subtitle") ? (
                <EditableText
                  as="span"
                  sectionId={sectionId}
                  path="subtitle"
                  value={str(content, "subtitle")}
                />
              ) : undefined
            }
            title={
              <EditableText
                as="span"
                sectionId={sectionId}
                path="title"
                value={str(content, "title")}
              />
            }
          />
          <div className="mt-6 space-y-3">
            {arr<string>(content, "bio").map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <EditableText
                  as="p"
                  className="text-muted leading-relaxed"
                  sectionId={sectionId}
                  path={`bio.${i}`}
                  value={p}
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {lists.map(([label, key]) =>
              arr<string>(content, key).length ? (
                <div key={key}>
                  <h4 className="text-primary-300 text-sm font-semibold">
                    {label}
                  </h4>
                  <ul className="text-muted mt-2 space-y-1 text-sm">
                    {arr<string>(content, key).map((x, i) => (
                      <EditableText
                        key={i}
                        as="li"
                        sectionId={sectionId}
                        path={`${key}.${i}`}
                        value={x}
                      />
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Legal (privacy / terms / refund) ---------- */
export function LegalSection({ content, sectionId }: Props) {
  return (
    <section className="container-px mx-auto max-w-3xl py-16 md:py-24">
      <EditableText
        as="h1"
        className="text-3xl font-semibold md:text-4xl"
        sectionId={sectionId}
        path="title"
        value={str(content, "title")}
      />
      <EditableHtml
        sectionId={sectionId}
        path="body"
        html={str(content, "body")}
        className="prose-invert text-muted mt-8 space-y-4 leading-relaxed [&_a]:text-primary [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-5 [&_li]:list-disc [&_ol_li]:list-decimal"
      />
    </section>
  );
}

/* ---------- Closing CTA ---------- */
export function CtaSection({ content, sectionId }: Props) {
  const buttons = arr<Btn>(content, "buttons");
  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28">
      <Reveal>
        <div className="bg-radial-glow border-primary/20 relative overflow-hidden rounded-3xl border px-6 py-16 text-center md:py-20">
          <EditableText
            as="h2"
            className="text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl"
            sectionId={sectionId}
            path="title"
            value={str(content, "title")}
          />
          {str(content, "description") && (
            <EditableText
              as="p"
              className="text-muted mx-auto mt-4 max-w-2xl text-pretty"
              sectionId={sectionId}
              path="description"
              value={str(content, "description")}
            />
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {buttons.map((b, i) => (
              <Button
                key={b.label}
                asChild
                size="lg"
                variant={b.variant ?? "primary"}
              >
                <Link href={b.href}>
                  <EditableText
                    as="span"
                    sectionId={sectionId}
                    path={`buttons.${i}.label`}
                    value={b.label}
                  />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
