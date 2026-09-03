// MYPC header account control. Deterministic markup + geometry so the control is a
// pill in every state (visitor / member / loading) and never re-shapes on hover,
// focus, route change, or hydration. Styling lives in global.css (.acct*), not
// Tailwind utilities — the shipped MemberMenu reference relied on utility classes on
// a `display:inline` <a>, which wrapped "Log in" to two lines and rendered the
// border-radius as an offset blob.
import type { ComponentType, ReactNode } from "react";
import { useMember } from "../../hooks/members/useMember";

export interface LinkLikeProps {
  href: string;
  className?: string;
  children?: ReactNode;
}

const PlainLink = ({ href, className, children }: LinkLikeProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export interface HeaderAccountProps {
  accountHref?: string;
  LinkComponent?: ComponentType<LinkLikeProps>;
}

export default function HeaderAccount({
  accountHref = "/account",
  LinkComponent = PlainLink,
}: HeaderAccountProps) {
  const { member, loggedIn, loading, logout } = useMember();

  if (loading) {
    return <span className="acct__skeleton" aria-hidden="true" />;
  }

  if (!loggedIn) {
    return (
      <a href="/login" className="acct__btn">
        Log in
      </a>
    );
  }

  const initial = (member?.displayName ?? "M").slice(0, 1).toUpperCase();

  return (
    <span className="acct">
      <LinkComponent href={accountHref} className="acct__me">
        {member?.photoUrl ? (
          <img src={member.photoUrl} alt="" className="acct__avatar" />
        ) : (
          <span className="acct__avatar acct__avatar--mono">{initial}</span>
        )}
        <span className="acct__name">{member?.displayName ?? "My account"}</span>
      </LinkComponent>
      <button type="button" className="acct__out" onClick={() => void logout()}>
        Log out
      </button>
    </span>
  );
}
