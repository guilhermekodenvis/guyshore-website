import { faq } from "@/lib/faq";

/** Native <details> so it works without JavaScript and stays keyboard-operable. */
export function FaqList() {
  return (
    <div className="border-t border-[var(--color-line)]">
      {faq.map((item) => (
        <details
          key={item.question}
          className="group border-b border-[var(--color-line)]"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 marker:content-none">
            <h3 className="max-w-[52ch] text-xl tracking-[-0.02em]">
              {item.question}
            </h3>
            <span
              aria-hidden
              className="relative mt-2 size-4 shrink-0 text-ink"
            >
              <span className="absolute top-1/2 left-0 h-[2px] w-4 -translate-y-1/2 bg-current" />
              <span className="absolute top-1/2 left-0 h-[2px] w-4 -translate-y-1/2 rotate-90 bg-current transition-transform duration-200 group-open:rotate-0" />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-7 text-steel">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
