// MYPC events index — civic card + category filter on the shipped useEvents hook.
// Design is ours; all listing/filter logic stays in useEvents.
import { useEvents } from "../../hooks/events/useEvents";
import type { EventSummary } from "../../wix/events/types";

function EventCard({ event }: { event: EventSummary }) {
  return (
    <a href={`/events/${event.slug}`} className="card group block overflow-hidden no-underline">
      <div className="relative aspect-[3/2] overflow-hidden" style={{ background: "var(--color-navy-800)" }}>
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="p-5">
        {event.dateLabel && <p className="eyebrow">{event.dateLabel}</p>}
        <h3 className="t-h3 mt-1.5" style={{ color: "var(--color-ink-900)" }}>{event.title}</h3>
        <p className="t-meta mt-1.5" style={{ color: "var(--color-ink-500)" }}>
          {event.locationType === "ONLINE" ? "Online" : event.locationName}
          {event.priceLabel && event.registrationType !== "RSVP" ? ` · ${event.priceLabel}` : ""}
        </p>
        {event.registrationType === "RSVP" && (
          <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: "var(--color-gold-600)" }}>
            Free · RSVP
          </p>
        )}
        {event.registrationType === "TICKETING" && event.priceLabel && (
          <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: "var(--color-gold-600)" }}>
            Registration open
          </p>
        )}
      </div>
    </a>
  );
}

const chip = (active: boolean) =>
  [
    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
    active
      ? "border-transparent text-white"
      : "border-[var(--color-border-light)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper)]",
  ].join(" ");

export default function EventGrid({ initialEvents }: { initialEvents?: EventSummary[] }) {
  const { events, categories, activeCategoryId, setActiveCategoryId, error } = useEvents({ initialEvents });

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter events by category">
          <button
            type="button"
            className={chip(activeCategoryId === null)}
            style={activeCategoryId === null ? { background: "var(--color-navy-900)" } : undefined}
            onClick={() => setActiveCategoryId(null)}
          >
            All events
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={chip(activeCategoryId === c.id)}
              style={activeCategoryId === c.id ? { background: "var(--color-navy-900)" } : undefined}
              onClick={() => setActiveCategoryId(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mb-6 text-sm" style={{ color: "var(--color-red-600)" }}>{error}</p>}

      {events === null ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="aspect-[3/2] animate-pulse" style={{ background: "var(--color-navy-800)" }} />
              <div className="p-5">
                <div className="h-3 w-1/3 animate-pulse rounded" style={{ background: "var(--color-border-light)" }} />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded" style={{ background: "var(--color-border-light)" }} />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="py-16 text-center" style={{ color: "var(--color-ink-500)" }}>
          No events on the calendar right now — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
