import { HireMenu } from "@/components/home/hire-menu";
import { site } from "@/lib/site";

/** Dark contact band. One "Hire me" button opens the four options; each opens a prefilled email. */
export function ContactBand() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-band py-24 text-band-ink md:py-32">
      <div className="wrap">
        <p className="inline-flex items-center gap-2 text-sm text-band-muted">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          Available for internships
        </p>
        <h2 id="contact-title" className="mt-6 text-[clamp(2.5rem,7.5vw,6.5rem)]">
          <span className="block">Hiring?</span>
          <span className="block text-band-muted">Tell me about the role.</span>
        </h2>

        <div className="mt-10">
          <HireMenu />
        </div>
        <p className="mt-6 text-sm text-band-muted">
          Or write directly to{" "}
          <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-band-ink underline underline-offset-4">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
