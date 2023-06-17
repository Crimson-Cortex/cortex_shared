function Menu({ title, subtitle, items, actions }) {
  return (
    <div className="menu">
      <div className="head">
        <span>{title}</span>
      </div>

      <div className="subtext">{subtitle}</div>

      <div className="topline"></div>

      <div className="menu-items">
        {items.map((item) => (
          <div
            key={item.id}
            role="button"
            className="menu-item"
            onClick={item.onClick}
          >
            <div id="item-label">{item.name}</div>
          </div>
        ))}
      </div>

      <div className="topline"></div>

      <div className="actions">{actions}</div>
    </div>
  );
}

export default Menu;
