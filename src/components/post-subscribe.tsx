"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { subscribeToBlog } from "@/app/blog/actions";
import { initialSubscribeState } from "@/lib/subscribe";

/**
 * Closes every blog post. Rendered by the post template, not by the MDX, so
 * it cannot be forgotten on a new article.
 *
 * Deliberately on `mist` rather than `ink`: a post may already end with a dark
 * `PostCta`, and two black blocks in a row read as one long slab.
 */
export function PostSubscribe() {
  const [state, formAction, pending] = useActionState(
    subscribeToBlog,
    initialSubscribeState,
  );
  const id = useId();

  return (
    <section className="border-t border-[var(--color-line)] bg-mist">
      <div className="mx-auto max-w-[76rem] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="eyebrow text-slate">Newsletter</p>
            <h2 className="mt-5 max-w-[20ch] text-title">
              Get the next article by email.
            </h2>
            <p className="mt-6 max-w-[46ch] text-lead text-steel">
              We write when we have something worth saying about building
              software, usually once or twice a month. No sequences, no
              upsells, and you can leave in one click.
            </p>
          </div>

          <div className="lg:pt-2">
            {state.status === "success" ? (
              <p
                role="status"
                className="rounded-[2px] border border-[var(--color-line-strong)] bg-paper px-6 py-5 text-lead"
              >
                {state.message}
              </p>
            ) : (
              <form action={formAction} noValidate>
                <label
                  htmlFor={`${id}-email`}
                  className="eyebrow block text-slate"
                >
                  Your email
                </label>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={state.email ?? ""}
                    placeholder="you@company.com"
                    aria-invalid={state.status === "error"}
                    aria-describedby={
                      state.status === "error" ? `${id}-error` : undefined
                    }
                    className="w-full rounded-[2px] border border-[var(--color-line-strong)] bg-paper px-4 py-3 font-body text-[1rem] text-ink transition-colors placeholder:text-slate focus:border-steel"
                  />
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-7 py-3 font-body text-[0.9375rem] font-semibold text-paper transition-colors hover:bg-steel disabled:opacity-60"
                  >
                    {pending ? "Signing up…" : "Subscribe"}
                  </button>
                </div>

                {state.status === "error" && state.message ? (
                  <p
                    id={`${id}-error`}
                    role="alert"
                    className="mt-3 font-body text-[0.9375rem] text-steel"
                  >
                    {state.message}
                  </p>
                ) : null}

                {/* Honeypot: hidden from people, tempting to bots. */}
                <div aria-hidden className="hidden">
                  <label htmlFor={`${id}-website`}>Website</label>
                  <input id={`${id}-website`} name="website" tabIndex={-1} />
                </div>

                <input type="hidden" name="source" value="blog-subscribe" />

                <p className="mt-5 text-[0.9375rem] text-slate">
                  Prefer to talk about a project?{" "}
                  <Link
                    href="/contact"
                    className="text-steel underline decoration-ink decoration-2 underline-offset-[3px] transition-colors hover:text-ink"
                  >
                    Get in touch
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
