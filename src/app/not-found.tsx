import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[76rem] px-6 py-32 lg:px-10 lg:py-44">
      <p className="eyebrow text-slate">404</p>
      <h1 className="mt-5 max-w-[16ch] text-title">
        That page is not on this shore.
      </h1>
      <p className="mt-7 max-w-[46ch] text-lead text-steel">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/">Back to the home page</ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact us
        </ButtonLink>
      </div>
    </section>
  );
}
