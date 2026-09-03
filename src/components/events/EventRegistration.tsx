// MYPC event registration surface — branches on registrationType; all registration logic
// (reserve → hosted checkout, RSVP) stays in the shipped useEventRegistration hook.
import { useEventRegistration } from "../../hooks/events/useEventRegistration";
import type { EventDetail } from "../../wix/events/types";

const fieldWrap = "block";
const labelCls = "eyebrow mb-1.5 block";
const inputCls =
  "w-full border px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2";
const inputStyle = {
  borderColor: "var(--color-border-light)",
  background: "#fff",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-ink-900)",
} as const;

export default function EventRegistration({ event }: { event: EventDetail }) {
  const {
    tiers,
    quantities,
    setQuantity,
    ticketCount,
    canCheckout,
    checkout,
    rsvpValues,
    setRsvpValue,
    canRsvp,
    rsvp,
    submitting,
    confirmed,
    error,
  } = useEventRegistration(event);

  const panel = "border p-6";
  const panelStyle = { borderColor: "var(--color-border-light)", borderRadius: "var(--radius-md)", background: "var(--color-paper)" };

  if (confirmed && confirmed.kind === "rsvpConfirmed") {
    const heading =
      confirmed.status === "WAITLIST"
        ? "You're on the waitlist"
        : confirmed.status === "NO"
          ? "Thanks for letting us know"
          : "You're on the list";
    const body =
      confirmed.status === "WAITLIST"
        ? `${event.title} is full — we'll email you if a spot opens up.`
        : confirmed.status === "NO"
          ? "We've recorded that you can't make it this time."
          : `See you at ${event.title}${event.dateLabel ? ` — ${event.dateLabel}` : ""}. A confirmation email is on its way.`;
    return (
      <div className={panel} style={panelStyle}>
        <p className="t-h3" style={{ color: "var(--color-ink-900)" }}>{heading}</p>
        <p className="mt-2 text-sm" style={{ color: "var(--color-ink-500)" }}>{body}</p>
      </div>
    );
  }

  if (!event.registrationOpen) {
    return (
      <div className={panel} style={panelStyle}>
        <p className="text-sm" style={{ color: "var(--color-ink-500)" }}>
          Registration for this event isn&rsquo;t open.
        </p>
      </div>
    );
  }

  if (event.registrationType === "EXTERNAL") {
    return (
      <a href={event.externalUrl} className="btn btn--primary btn--lg" target="_blank" rel="noreferrer">
        Register
      </a>
    );
  }

  if (event.registrationType === "TICKETING") {
    return (
      <div className={panel} style={panelStyle}>
        <p className="eyebrow">Tickets</p>
        {tiers === null ? (
          <div className="mt-4 space-y-3" aria-busy="true">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="h-16 animate-pulse" style={{ background: "var(--color-border-light)", borderRadius: "var(--radius-sm)" }} />
            ))}
          </div>
        ) : tiers.length === 0 ? (
          <p className="mt-4 text-sm" style={{ color: "var(--color-ink-500)" }}>Tickets aren't available right now.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {tiers.map((t) => {
              const onSale = t.saleStatus === "SALE_STARTED";
              const qty = quantities[t.id] ?? 0;
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-4 border p-4"
                  style={{ borderColor: "var(--color-border-light)", borderRadius: "var(--radius-sm)", background: "#fff" }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-ink-900)" }}>{t.name}</p>
                    {t.description && <p className="mt-0.5 text-xs" style={{ color: "var(--color-ink-500)" }}>{t.description}</p>}
                    <p className="mt-1 text-sm" style={{ color: "var(--color-ink-900)" }}>{t.price}</p>
                    {!onSale && (
                      <p className="mt-1 text-xs" style={{ color: "var(--color-ink-500)" }}>
                        {t.saleStatus === "SALE_SCHEDULED" ? "Sale hasn't started yet" : "Sale ended"}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Fewer ${t.name}`}
                      disabled={!onSale || qty === 0}
                      onClick={() => setQuantity(t.id, qty - 1)}
                      className="h-9 w-9 border text-lg leading-none transition-colors disabled:opacity-40"
                      style={{ borderColor: "var(--color-border-light)", borderRadius: "var(--radius-sm)", color: "var(--color-ink-900)" }}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                    <button
                      type="button"
                      aria-label={`More ${t.name}`}
                      disabled={!onSale || qty >= t.limitPerCheckout}
                      onClick={() => setQuantity(t.id, qty + 1)}
                      className="h-9 w-9 border text-lg leading-none transition-colors disabled:opacity-40"
                      style={{ borderColor: "var(--color-border-light)", borderRadius: "var(--radius-sm)", color: "var(--color-ink-900)" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {error && <p className="mt-3 text-sm" style={{ color: "var(--color-red-600)" }}>{error}</p>}
        <button
          type="button"
          disabled={!canCheckout || submitting}
          onClick={() => checkout().catch(() => {})}
          className="btn btn--primary btn--lg mt-5"
          style={{ opacity: !canCheckout || submitting ? 0.5 : 1 }}
        >
          {submitting ? "Reserving…" : ticketCount > 0 ? `Get ${ticketCount} ticket${ticketCount > 1 ? "s" : ""}` : "Get tickets"}
        </button>
        <p className="mt-3 text-xs" style={{ color: "var(--color-ink-500)" }}>
          You&rsquo;ll be taken to a secure checkout page to complete your order.
        </p>
      </div>
    );
  }

  if (event.registrationType === "RSVP") {
    return (
      <div className={panel} style={panelStyle}>
        <p className="eyebrow">RSVP</p>
        <div className="mt-4 grid max-w-md gap-3">
          <label className={fieldWrap}>
            <span className={labelCls}>First name</span>
            <input type="text" value={rsvpValues.firstName} onChange={(e) => setRsvpValue("firstName", e.target.value)} className={inputCls} style={inputStyle} />
          </label>
          <label className={fieldWrap}>
            <span className={labelCls}>Last name</span>
            <input type="text" value={rsvpValues.lastName} onChange={(e) => setRsvpValue("lastName", e.target.value)} className={inputCls} style={inputStyle} />
          </label>
          <label className={fieldWrap}>
            <span className={labelCls}>Email</span>
            <input type="email" value={rsvpValues.email} onChange={(e) => setRsvpValue("email", e.target.value)} className={inputCls} style={inputStyle} />
          </label>
        </div>
        {error && <p className="mt-3 text-sm" style={{ color: "var(--color-red-600)" }}>{error}</p>}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!canRsvp || submitting}
            onClick={() => rsvp(true).catch(() => {})}
            className="btn btn--primary btn--lg"
            style={{ opacity: !canRsvp || submitting ? 0.5 : 1 }}
          >
            {submitting ? "Sending…" : "Count me in"}
          </button>
          {event.rsvpResponseType === "YES_AND_NO" && (
            <button
              type="button"
              disabled={!canRsvp || submitting}
              onClick={() => rsvp(false).catch(() => {})}
              className="btn btn--secondary-light"
              style={{ opacity: !canRsvp || submitting ? 0.5 : 1 }}
            >
              Can't make it
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={panel} style={panelStyle}>
      <p className="text-sm" style={{ color: "var(--color-ink-500)" }}>Registration isn't open for this event.</p>
    </div>
  );
}
