import { HUB_NAV, WEEKLY_QUESTION } from '../../lib/commandHub';

export default function HubShell({ section, onSection, children }) {
  return (
    <div className="hub">
      <nav className="hub-nav" aria-label="Command Hub">
        <div className="hub-nav__brand">
          <p className="hub-nav__wordmark">
            Midnight
            <br />
            Magnolia
          </p>
          <p className="hub-nav__sub">Command Hub</p>
        </div>
        <hr className="hub-nav__rule" />
        {HUB_NAV.map((group) => (
          <div key={group.group}>
            <p className="hub-nav__group">{group.group}</p>
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`hub-nav__btn${section === item.id ? ' is-active' : ''}`}
                onClick={() => onSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
        <hr className="hub-nav__rule" />
        <p className="hub-nav__quote">{WEEKLY_QUESTION}</p>
      </nav>
      <div className="hub-main">
        <div className="hub-main__inner">{children}</div>
      </div>
    </div>
  );
}
