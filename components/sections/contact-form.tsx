"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

const TOPICS = ["Something new", ...PRODUCTS.map((p) => p.name)];
type Values = { name: string; email: string; organisation: string; topic: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
const REQUIRED: (keyof Values)[] = ["name", "email", "message"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Add your name so we know who to reply to.";
  if (!v.email.trim()) e.email = "Add an email address so we can write back.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Check the email address. It should look like name@example.com.";
  if (v.message.trim().length < 10)
    e.message = "Tell us a little more: who does the work, and what takes too long?";
  return e;
}

const inputCls = cn(
  "block w-full rounded-sm border border-line bg-white px-3.5 text-ink",
  "transition-[border-color] hover:border-ink-subtle",
  "focus-visible:border-navy-900",
  "aria-invalid:border-danger",
);

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", organisation: "", topic: TOPICS[0], message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  // The prepared email. A mailto: handoff can't report whether an app opened,
  // so the confirmation always offers a copy fallback.
  const [sent, setSent] = useState<{ subject: string; body: string; href: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sent) return;
    // Scroll with a margin for the sticky header, then focus without a second jump
    panelRef.current?.scrollIntoView({ block: "start" });
    doneRef.current?.focus({ preventScroll: true });
  }, [sent]);

  // Product pages link here with ?topic=GeriTrack
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("topic");
    if (t && TOPICS.includes(t)) setValues((v) => ({ ...v, topic: t }));
  }, []);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    const first = (Object.keys(errs) as (keyof Values)[])[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setSending(true);
    const subject = `Project: ${values.topic}${values.organisation ? ` (${values.organisation})` : ""}`;
    const body = [
      values.message.trim(),
      "",
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      ...(values.organisation.trim() ? [`Organisation: ${values.organisation.trim()}`] : []),
    ].join("\n");
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setTimeout(() => {
      setSending(false);
      setSent({ subject, body, href });
    }, 400);
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT.email}\nSubject: ${sent.subject}\n\n${sent.body}`);
      setCopied(true);
      toast.success("Message copied", { description: `Paste it into a new email to ${CONTACT.email}.` });
    } catch {
      toast.error("Couldn't copy automatically", { description: `Select the text below and copy it, then send it to ${CONTACT.email}.` });
    }
  };

  if (sent) {
    return (
      <div ref={panelRef} className="scroll-mt-28 border-t-[3px] border-navy-900 pt-8">
        <h2 ref={doneRef} tabIndex={-1} className="text-h2 text-navy-900 focus-visible:outline-none">
          Now press send in your email app
        </h2>
        <p className="mt-3 max-w-[56ch] text-ink-muted">
          We opened a new email to <span className="font-semibold text-ink">{CONTACT.email}</span> with your details filled
          in. Once it's sent, someone on the team reads it and writes back.
        </p>

        <h3 className="mt-10 text-sm font-semibold text-navy-900">Nothing opened?</h3>
        <p className="mt-1 max-w-[56ch] text-ink-muted">
          Some browsers use webmail instead of an email app. Copy the message and paste it into a new email.
        </p>
        <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-sm border border-line bg-navy-50 p-4 font-sans text-sm text-ink" tabIndex={0} aria-label="Your message">
          {`Subject: ${sent.subject}\n\n${sent.body}`}
        </pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={copy}>
            {copied ? <Check strokeWidth={1.5} aria-hidden /> : <Copy strokeWidth={1.5} aria-hidden />}
            {copied ? "Copied" : "Copy message"}
          </Button>
          <Button asChild variant="outline">
            <a href={sent.href}>Open email again</a>
          </Button>
          <Button type="button" variant="ghost" onClick={() => { setSent(null); setCopied(false); }}>
            Edit message
          </Button>
        </div>
      </div>
    );
  }

  const field = (k: keyof Values, label: string, input: React.ReactNode, optional = false) => (
    <div className="grid gap-2">
      <label htmlFor={`${uid}-${k}`} className="text-sm font-semibold text-navy-900">
        {label} {optional && <span className="font-normal text-ink-muted">(optional)</span>}
      </label>
      {input}
      {errors[k] && (
        <p id={`${uid}-${k}-error`} className="text-sm text-danger">{errors[k]}</p>
      )}
    </div>
  );

  const aria = (k: keyof Values) => ({
    id: `${uid}-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-required": REQUIRED.includes(k) || undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {field("name", "Your name", <input {...aria("name")} type="text" autoComplete="name" className={cn(inputCls, "h-11")} />)}
        {field(
          "email",
          "Email",
          <input {...aria("email")} type="email" inputMode="email" autoComplete="email" className={cn(inputCls, "h-11")} />,
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {field(
          "organisation",
          "Organisation",
          <input {...aria("organisation")} type="text" autoComplete="organization" className={cn(inputCls, "h-11")} />,
          true,
        )}
        {field(
          "topic",
          "What's it about?",
          <div className="relative">
            <select {...aria("topic")} className={cn(inputCls, "h-11 appearance-none pr-10")}>
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted" strokeWidth={1.5} aria-hidden />
          </div>,
        )}
      </div>
      {field(
        "message",
        "What takes too long today?",
        <textarea {...aria("message")} rows={6} className={cn(inputCls, "resize-y py-3 leading-relaxed")} />,
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="submit" size="lg" disabled={sending} aria-disabled={sending || undefined}>
          {sending ? "Opening your email app…" : "Send project details"}
        </Button>
        <p className="text-sm text-ink-muted">Opens your email app with the details filled in.</p>
      </div>
    </form>
  );
}
