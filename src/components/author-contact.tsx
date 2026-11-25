"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { contactAuthor } from "@/app/actions/author-contact";
import { ArrowRight } from "@/components/icons";
import {
  initialAuthorContactState,
  type AuthorContactField,
  type AuthorContactState,
  type PostContactCopy,
} from "@/lib/author-contact";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

type Props = {
  lang: Locale;
  articleTitle: string;
  articleUrl: string;
  /** The post's own title, subtitle and button text (`meta.contact`). */
  copy: PostContactCopy;
  /**
   * `inline` is the block inside the article, with the post's title and
   * subtitle. `end` is the fixed line after the article. Both open the same
   * form; its submit button repeats the button that opened it.
   */
  variant: "inline" | "end";
};

const noop = () => () => {};

const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-paper no-underline transition-colors hover:bg-steel disabled:opacity-60";

/**
 * "Talk to the author": a call to action that opens a floating form in the
 * header island's glass, one step more frosted so a form reads over any page
 * (`.author-glass` in globals.css). A native <dialog> opened with showModal()
 * traps focus, closes on Escape and makes the page inert behind it.
 */
export function AuthorContact({ lang, articleTitle, articleUrl, copy, variant }: Props) {
  const t = getDictionary(lang).authorContact;
  const dialog = useRef<HTMLDialogElement>(null);
  const [startedAt, setStartedAt] = useState(0);
  const cta = variant === "inline" ? copy.cta : t.endCta;
  // The dialog is portalled to <body> so the article's prose rules never
  // reach inside it; there is no <body> to portal into on the server.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const open = () => {
    setStartedAt(Date.now());
    dialog.current?.showModal();
    window.gtag?.("event", "click_cta_blog", {
      article_slug: articleUrl.split("/").pop(),
      cta_position: variant === "inline" ? "middle" : "end",
    });
  };

  const trigger = (
    <button type="button" onClick={open} className={BUTTON}>
      {cta}
      <ArrowRight className="size-4 shrink-0" />
    </button>
  );

  return (
    <>
      {variant === "inline" ? (
        <aside className="post-contact border border-[var(--color-line)] bg-mist px-7 py-8 lg:px-9 lg:py-10">
          <p className="font-display text-2xl leading-tight tracking-[-0.03em] text-ink">
            {copy.title}
          </p>
          <p className="mt-4 max-w-[54ch] text-steel">{copy.subtitle}</p>
          <div className="mt-7">{trigger}</div>
        </aside>
      ) : (
        <section className="border-t border-[var(--color-line)]">
          <div className="mx-auto flex max-w-[76rem] flex-col items-start gap-6 px-6 py-14 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p className="max-w-[44ch] text-lead text-ink">{t.endText}</p>
            {trigger}
          </div>
        </section>
      )}

      {mounted
        ? createPortal(
      <dialog
        ref={dialog}
        aria-labelledby={`${variant}-author-title`}
        // A click on the backdrop lands on the dialog element itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        className="author-dialog consent-glass author-glass m-auto max-h-[calc(100dvh-2rem)] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto border-0 bg-transparent p-7 text-ink sm:p-9"
      >
        <div className="consent-surface" aria-hidden="true" />
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label={t.close}
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-steel transition-colors hover:bg-ink/6 hover:text-ink focus-visible:outline-ink"
        >
          <span aria-hidden className="text-2xl leading-none">
            ×
          </span>
        </button>

        <p
          id={`${variant}-author-title`}
          className="pr-10 font-display text-2xl leading-tight tracking-[-0.03em]"
        >
          {copy.title}
        </p>
        <p className="mt-3 text-[0.9375rem] text-steel">{copy.subtitle}</p>

        <AuthorForm
          lang={lang}
          cta={cta}
          articleTitle={articleTitle}
          articleUrl={articleUrl}
          position={variant === "inline" ? "middle" : "end"}
          startedAt={startedAt}
        />
      </dialog>,
            document.body,
          )
        : null}
    </>
  );
}

const FIELD =
  "w-full rounded-[2px] border border-[var(--color-line-strong)] bg-paper/80 px-4 py-3 font-body text-[1rem] text-ink transition-colors placeholder:text-slate focus:border-steel";

function AuthorForm({
  lang,
  cta,
  articleTitle,
  articleUrl,
  position,
  startedAt,
}: {
  lang: Locale;
  cta: string;
  articleTitle: string;
  articleUrl: string;
  position: string;
  startedAt: number;
}) {
  const t = getDictionary(lang).authorContact;
  const id = useId();
  const [state, formAction, pending] = useActionState(
    contactAuthor,
    initialAuthorContactState,
  );

  // A lead is counted only after the server confirmed the send.
  useEffect(() => {
    if (state.status === "success") {
      window.gtag?.("event", "generate_lead", {
        form_source: "blog-author",
        cta_position: position,
        lang,
      });
    }
  }, [state.status, position, lang]);

  if (state.status === "success") {
    return (
      <div role="status" className="mt-7 border-t border-[var(--color-line)] pt-6">
        <p className="eyebrow text-ink">{t.sentTitle}</p>
        <p className="mt-3 text-steel">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="mt-7 space-y-5">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-[2px] border-l-2 border-ink bg-paper/70 px-4 py-3 text-[0.9375rem] text-steel"
        >
          {state.message}
        </p>
      ) : null}

      <Field id={`${id}-name`} name="name" label={t.name} state={state} autoComplete="name" />
      <Field
        id={`${id}-email`}
        name="email"
        type="email"
        label={t.email}
        state={state}
        autoComplete="email"
      />

      <div>
        <label
          htmlFor={`${id}-message`}
          className="mb-2 block font-label text-[0.6875rem] tracking-[0.1em] text-steel uppercase"
        >
          {t.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          defaultValue={state.values?.message ?? ""}
          placeholder={t.placeholder}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? `${id}-message-error` : undefined}
          className={FIELD}
        />
        <FieldError id={`${id}-message-error`} message={state.errors?.message} />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-steel">
        <input
          type="checkbox"
          name="newsletter"
          className="mt-1 size-4 shrink-0 accent-[var(--color-ink)]"
        />
        {t.newsletter}
      </label>

      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="articleTitle" value={articleTitle} />
      <input type="hidden" name="articleUrl" value={articleUrl} />
      <input type="hidden" name="position" value={position} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={pending} className={`${BUTTON} w-full sm:w-auto`}>
        {pending ? t.sending : cta}
        {pending ? null : <ArrowRight className="size-4 shrink-0" />}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  state,
  type = "text",
  autoComplete,
}: {
  id: string;
  name: AuthorContactField;
  label: string;
  state: AuthorContactState;
  type?: string;
  autoComplete?: string;
}) {
  const error = state.errors?.[name];
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-label text-[0.6875rem] tracking-[0.1em] text-steel uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={state.values?.[name] ?? ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={FIELD}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.875rem] text-steel">
      <span aria-hidden className="mr-1.5 text-ink">
        ↳
      </span>
      {message}
    </p>
  );
}
