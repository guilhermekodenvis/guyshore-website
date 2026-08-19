"use client";

import { useActionState, useId } from "react";
import { submitContact } from "@/app/contact/actions";
import {
  CONTACT_NEEDS,
  initialContactState,
  type ContactField,
  type ContactState,
} from "@/lib/contact";

const fieldClass =
  "w-full rounded-[2px] border border-[var(--color-line-strong)] bg-mist px-4 py-3 font-body text-[1rem] text-ink transition-colors placeholder:text-slate focus:border-steel";

/**
 * `short` drops the company and need fields. Used by the home page section,
 * where the ask is just name, email and message. Both variants post to the
 * same action; the extra fields are optional server-side.
 */
export function ContactForm({
  fields = "full",
  source = "website",
}: {
  fields?: "full" | "short";
  /** Which form this is, carried through to the automation. */
  source?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const id = useId();

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[2px] border border-[var(--color-line-strong)] bg-mist p-8 lg:p-10"
      >
        <p className="eyebrow text-ink">Message sent</p>
        <p className="mt-5 text-lead">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-7">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-[2px] border-l-2 border-ink bg-mist px-4 py-3 text-[0.9375rem] text-steel"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label="Your name"
          state={state}
          autoComplete="name"
        />
        <Field
          id={`${id}-email`}
          name="email"
          label={fields === "short" ? "Email" : "Work email"}
          type="email"
          state={state}
          autoComplete="email"
        />
      </div>

      {fields === "full" ? (
        <div className="grid gap-7 sm:grid-cols-2">
          <Field
            id={`${id}-company`}
            name="company"
            label="Company"
            state={state}
            optional
            autoComplete="organization"
          />

          <div>
            <Label htmlFor={`${id}-need`} optional>
              What you need
            </Label>
            <select
              id={`${id}-need`}
              name="need"
              defaultValue={state.values?.need ?? ""}
              className={`${fieldClass} appearance-none`}
            >
              <option value="">Pick one</option>
              {CONTACT_NEEDS.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      <div>
        <Label htmlFor={`${id}-message`}>
          {fields === "short" ? "Message" : "What are you trying to ship?"}
        </Label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          defaultValue={state.values?.message ?? ""}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={
            state.errors?.message ? `${id}-message-error` : undefined
          }
          placeholder="The product, the deadline, and what is in the way."
          className={fieldClass}
        />
        <FieldError id={`${id}-message-error`} message={state.errors?.message} />
      </div>

      <input type="hidden" name="source" value={source} />

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3 font-body text-[0.9375rem] font-semibold text-paper transition-colors hover:bg-steel disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Label({
  htmlFor,
  optional,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 flex items-baseline gap-2 font-label text-[0.6875rem] tracking-[0.1em] text-steel uppercase"
    >
      {children}
      {optional ? <span className="text-slate/70">optional</span> : null}
    </label>
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

function Field({
  id,
  name,
  label,
  state,
  type = "text",
  optional,
  autoComplete,
}: {
  id: string;
  name: ContactField;
  label: string;
  state: ContactState;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  const error = state.errors?.[name];
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={state.values?.[name] ?? ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
