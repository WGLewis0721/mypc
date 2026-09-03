// MYPC news feed — civic post card + category filter + load-more on the shipped useBlogFeed
// hook. Design is ours; feed/filter/paging logic stays in the hook.
import { useBlogFeed } from "../../hooks/blog/useBlogFeed";
import type { BlogCategory, BlogTag, PostPage, PostSummary } from "../../wix/blog/types";

function PostCard({ post }: { post: PostSummary }) {
  return (
    <a href={`/blog/${post.slug}`} className="card group block overflow-hidden no-underline">
      {post.coverUrl && (
        <div className="aspect-[16/9] overflow-hidden" style={{ background: "var(--color-navy-800)" }}>
          <img
            src={post.coverUrl}
            alt={post.title}
            width={1200}
            height={675}
            loading="lazy"
            onError={(e) => e.currentTarget.parentElement?.remove()}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="t-h3" style={{ color: "var(--color-ink-900)" }}>{post.title}</h3>
        {post.excerpt && (
          <p className="mt-1.5 text-sm" style={{ color: "var(--color-ink-500)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.excerpt}
          </p>
        )}
        <p className="t-meta mt-2.5" style={{ color: "var(--color-ink-500)" }}>
          {post.dateLabel && <time dateTime={post.dateISO}>{post.dateLabel}</time>}
          {post.dateLabel && post.minutesToRead > 0 ? " · " : ""}
          {post.minutesToRead > 0 ? `${post.minutesToRead} min read` : ""}
        </p>
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

export interface PostGridProps {
  initialPage?: PostPage;
  initialCategories?: BlogCategory[];
  initialTags?: BlogTag[];
}

export default function PostGrid({ initialPage, initialCategories, initialTags }: PostGridProps) {
  const {
    posts,
    categories,
    activeCategoryId,
    setActiveCategoryId,
    hasMore,
    loadMore,
    loadingMore,
    error,
  } = useBlogFeed({ initialPage, initialCategories, initialTags });

  const visible = categories.filter((c) => c.postCount > 0);

  return (
    <div>
      {visible.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter posts by category">
          <button
            type="button"
            className={chip(activeCategoryId === null)}
            style={activeCategoryId === null ? { background: "var(--color-navy-900)" } : undefined}
            onClick={() => setActiveCategoryId(null)}
          >
            All
          </button>
          {visible.map((c) => (
            <button
              key={c.id}
              type="button"
              className={chip(activeCategoryId === c.id)}
              style={activeCategoryId === c.id ? { background: "var(--color-navy-900)" } : undefined}
              onClick={() => setActiveCategoryId(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mb-6 text-sm" style={{ color: "var(--color-red-600)" }}>{error}</p>}

      {posts === null ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="aspect-[16/9] animate-pulse" style={{ background: "var(--color-navy-800)" }} />
              <div className="p-5">
                <div className="h-4 w-2/3 animate-pulse rounded" style={{ background: "var(--color-border-light)" }} />
                <div className="mt-3 h-3 w-1/3 animate-pulse rounded" style={{ background: "var(--color-border-light)" }} />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="py-16 text-center" style={{ color: "var(--color-ink-500)" }}>No posts yet — check back soon.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="btn btn--secondary-light"
                style={{ opacity: loadingMore ? 0.5 : 1 }}
              >
                {loadingMore ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
