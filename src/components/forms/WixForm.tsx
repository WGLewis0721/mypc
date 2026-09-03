// MYPC schema-driven form — renders form.fields from the live Wix schema on the shipped
// useWixForm hook. Never names a field in code: the owner can rename/reorder/require any field
// in the dashboard and this follows with no code change. Reading, validation and submission
// all stay in the hook.
import { useState, type ReactNode } from "react";
import { useWixForm, FORM_ERROR } from "../../hooks/forms/useWixForm";
import type { FormDto, FormFieldDto } from "../../wix/forms/types";

const inputCls = "w-full border px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2";
const baseStyle = {
  borderColor: "var(--color-border-light)",
  background: "#fff",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-ink-900)",
} as const;
const errStyle = { ...baseStyle, borderColor: "var(--color-red-600)" } as const;

function FieldShell({
  field,
  error,
  children,
  hideLabel,
}: {
  field: FormFieldDto;
  error?: string;
  children: ReactNode;
  hideLabel?: boolean;
}) {
  return (
    <div>
      {!hideLabel && (
        <label htmlFor={field.target} className="eyebrow mb-1.5 block">
          {field.label}
          {field.required && <span style={{ color: "var(--color-red-600)" }}> *</span>}
        </label>
      )}
      {children}
      {field.description && (
        <p className="mt-1 text-xs" style={{ color: "var(--color-ink-500)" }}>{field.description}</p>
      )}
      {error && (
        <p id={`err-${field.target}`} className="mt-1 text-xs" style={{ color: "var(--color-red-600)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export interface WixFormProps {
  initialForm: FormDto;
  successTitle?: string;
  successBody?: string;
}

export default function WixForm({ initialForm, successTitle = "Thank you", successBody }: WixFormProps) {
  const { form, values, setValues, bind, submit, validate, errors, loading } = useWixForm(initialForm.id, { initialForm });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border p-8" style={{ borderColor: "var(--color-border-light)", borderRadius: "var(--radius-md)", background: "var(--color-paper)" }}>
        <p className="t-h3" style={{ color: "var(--color-ink-900)" }}>{successTitle}</p>
        <p className="mt-2 text-sm" style={{ color: "var(--color-ink-500)" }}>
          {successBody ?? "We've received your submission and will be in touch."}
        </p>
      </div>
    );
  }

  if (!form) {
    return (
      <div aria-busy="true" className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-11 animate-pulse" style={{ background: "var(--color-border-light)", borderRadius: "var(--radius-sm)" }} />
        ))}
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        const ok = await submit(e);
        if (ok) setSent(true);
      }}
      className="grid gap-5"
    >
      {errors[FORM_ERROR] && (
        <p className="border p-3 text-sm" style={{ borderColor: "var(--color-red-600)", color: "var(--color-red-600)", borderRadius: "var(--radius-sm)" }}>
          {errors[FORM_ERROR]}
        </p>
      )}

      {form.fields.map((f) => {
        const err = errors[f.target];
        const style = err ? errStyle : baseStyle;

        if (f.control === "textarea") {
          return (
            <FieldShell key={f.target} field={f} error={err}>
              <textarea id={f.target} rows={4} {...bind(f.target)} placeholder={f.placeholder} className={inputCls} style={style} />
            </FieldShell>
          );
        }

        if (f.control === "select") {
          return (
            <FieldShell key={f.target} field={f} error={err}>
              <select id={f.target} {...bind(f.target)} className={inputCls} style={style}>
                <option value="">Select…</option>
                {f.choices.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </FieldShell>
          );
        }

        if (f.control === "radio") {
          return (
            <FieldShell key={f.target} field={f} error={err}>
              <div className="grid gap-2">
                {f.choices.map((c) => (
                  <label key={c.value} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-ink-900)" }}>
                    <input
                      type="radio"
                      name={f.target}
                      value={c.value}
                      checked={values[f.target] === c.value}
                      onChange={(e) => setValues((p) => ({ ...p, [f.target]: e.target.value }))}
                      onBlur={() => validate(f.target)}
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </FieldShell>
          );
        }

        if (f.control === "checkboxGroup" || f.control === "tags" || f.inputType === "ARRAY") {
          const arr = Array.isArray(values[f.target]) ? (values[f.target] as string[]) : [];
          return (
            <FieldShell key={f.target} field={f} error={err}>
              <div className="grid gap-2 sm:grid-cols-2">
                {f.choices.map((c) => (
                  <label key={c.value} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-ink-900)" }}>
                    <input
                      type="checkbox"
                      checked={arr.includes(c.value)}
                      onChange={(e) =>
                        setValues((p) => {
                          const cur = Array.isArray(p[f.target]) ? (p[f.target] as string[]) : [];
                          return { ...p, [f.target]: e.target.checked ? [...cur, c.value] : cur.filter((v) => v !== c.value) };
                        })
                      }
                      onBlur={() => validate(f.target)}
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </FieldShell>
          );
        }

        if (f.control === "checkbox") {
          return (
            <FieldShell key={f.target} field={f} error={err} hideLabel>
              <label className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-ink-900)" }}>
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={values[f.target] === true}
                  onChange={(e) => setValues((p) => ({ ...p, [f.target]: e.target.checked }))}
                  onBlur={() => validate(f.target)}
                />
                <span>
                  {f.label}
                  {f.required && <span style={{ color: "var(--color-red-600)" }}> *</span>}
                </span>
              </label>
            </FieldShell>
          );
        }

        if (f.control === "payment" || f.control === "appointment" || f.control === "unknown") {
          return (
            <FieldShell key={f.target} field={f} error={err}>
              <p className="text-xs" style={{ color: "var(--color-ink-500)" }}>
                This field type isn't available on the demo form.
              </p>
            </FieldShell>
          );
        }

        const type =
          f.control === "email"
            ? "email"
            : f.control === "phone"
              ? "tel"
              : f.control === "url"
                ? "url"
                : f.control === "number" || f.control === "rating"
                  ? "number"
                  : f.control === "date"
                    ? "date"
                    : f.control === "time"
                      ? "time"
                      : f.control === "datetime"
                        ? "datetime-local"
                        : "text";

        return (
          <FieldShell key={f.target} field={f} error={err}>
            <input id={f.target} type={type} {...bind(f.target)} placeholder={f.placeholder} className={inputCls} style={style} />
          </FieldShell>
        );
      })}

      <div>
        <button type="submit" disabled={loading} className="btn btn--primary btn--lg" style={{ opacity: loading ? 0.5 : 1 }}>
          {loading ? "Sending…" : form.submitText || "Submit"}
        </button>
      </div>
    </form>
  );
}
