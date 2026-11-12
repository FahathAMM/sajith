"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleCheck, LoaderCircle, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn, EASE, format } from "@/lib/utils";

const EMPTY = { name: "", email: "", phone: "", program: "", goal: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

function validate(values, errors) {
  const e = {};
  if (!values.name.trim()) e.name = errors.nameRequired;
  if (!values.email.trim()) e.email = errors.emailRequired;
  else if (!EMAIL_RE.test(values.email.trim())) e.email = errors.emailInvalid;
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) e.phone = errors.phoneInvalid;
  if (!values.program) e.program = errors.programRequired;
  if (values.goal.trim().length < 10) e.goal = errors.goalRequired;
  return e;
}

const inputBase =
  "w-full border bg-ink/60 px-4 py-3.5 text-sm text-fg placeholder:text-mute/60 outline-none transition-colors duration-300 focus:border-accent focus:bg-ink";

function Field({ id, label, error, children, className }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-fog">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Frontend-only inquiry form with validation and a demo success state. */
export default function ContactForm({ form }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [submittedName, setSubmittedName] = useState("");

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched) setErrors(validate(next, form.errors));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const found = validate(values, form.errors);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    // Demo only: simulate a network request. Nothing is sent or stored.
    setTimeout(() => {
      setSubmittedName(values.name.trim().split(" ")[0]);
      setStatus("success");
      setValues(EMPTY);
      setTouched(false);
    }, 1200);
  };

  const reset = () => {
    setStatus("idle");
    setErrors({});
  };

  const aria = (name, extra) => ({
    id: `cf-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `cf-${name}-error` : undefined,
    className: cn(inputBase, errors[name] ? "border-danger/70" : "border-fg/10", extra),
  });

  const f = form.fields;

  return (
    <div className="relative border border-fg/[0.08] bg-char/80 p-6 backdrop-blur-sm sm:p-8 md:p-10">
      <span aria-hidden="true" className="absolute left-0 top-0 h-1 w-24 bg-lime" />
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[32rem] flex-col items-center justify-center gap-6 text-center"
            role="status"
            aria-live="polite"
          >
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-lime text-onlime"
            >
              <CircleCheck size={40} strokeWidth={2} aria-hidden="true" />
            </motion.span>
            <h3 className="font-display text-4xl uppercase text-fg">{form.success.title}</h3>
            <p className="max-w-md leading-relaxed text-fog/80">{format(form.success.message, { name: submittedName })}</p>
            <Button variant="outline" onClick={reset} icon={false}>
              {form.success.resetLabel}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-display text-4xl uppercase text-fg">{form.title}</h3>
              <p className="mt-2 text-sm text-mute">{form.subtitle}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="cf-name" label={f.name.label} error={errors.name}>
                <input type="text" autoComplete="name" placeholder={f.name.placeholder} value={values.name} onChange={onChange} {...aria("name")} />
              </Field>
              <Field id="cf-email" label={f.email.label} error={errors.email}>
                <input type="email" autoComplete="email" placeholder={f.email.placeholder} value={values.email} onChange={onChange} {...aria("email")} />
              </Field>
              <Field id="cf-phone" label={f.phone.label} error={errors.phone}>
                <input type="tel" autoComplete="tel" placeholder={f.phone.placeholder} value={values.phone} onChange={onChange} {...aria("phone")} />
              </Field>
              <Field id="cf-program" label={f.program.label} error={errors.program}>
                <div className="relative">
                  <select value={values.program} onChange={onChange} {...aria("program", cn("appearance-none pr-10", !values.program && "text-mute/60"))}>
                    <option value="" disabled>
                      {f.program.placeholder}
                    </option>
                    {form.programOptions.map((o) => (
                      <option key={o} value={o} className="bg-char">
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
                </div>
              </Field>
              <Field id="cf-goal" label={f.goal.label} error={errors.goal} className="sm:col-span-2">
                <textarea rows={5} placeholder={f.goal.placeholder} value={values.goal} onChange={onChange} {...aria("goal", "resize-y")} />
              </Field>
            </div>

            <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-mute">{form.privacyNote}</p>
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                iconComponent={status === "submitting" ? LoaderCircle : Send}
                className={cn("w-full sm:w-auto", status === "submitting" && "[&_svg]:animate-spin")}
              >
                {status === "submitting" ? form.submittingLabel : form.submitLabel}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
