import { Arrow } from "@/components/home/hero";
import { contactIntents } from "@/lib/data";
import { site } from "@/lib/site";

function mailto(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Dark contact band. Each choice opens the visitor's email app with a prefilled subject and body. */
export function ContactBand() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-band py-24 text-band-ink md:py-32">
      <div className="wrap">
        <p className="inline-flex items-center gap-2 text-sm text-band-muted">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          B.Tech CSE, class of 2027
        </p>
        <h2 id="contact-title" className="mt-6 text-[clamp(2.5rem,7.5vw,6.5rem)]">
          <span className="block">Hiring for tech, teaching or management?</span>
          <span className="block text-band-muted">Let&rsquo;s talk.</span>
        </h2>

        <p className="mt-10 text-band-muted">What is it about?</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {contactIntents.map((intent, i) => (
            <li key={intent.label}>
              <a
                href={mailto(intent.subject, intent.body)}
                className={
                  i === 0
                    ? "pill bg-band-ink text-band"
                    : "pill border border-band-line pr-5 text-band-ink hover:bg-band-line"
                }
              >
                {intent.label}
                {i === 0 ? (
                  <span className="pill-arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
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
