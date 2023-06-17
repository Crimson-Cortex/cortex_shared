import React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

function Tip({
  children,
  position = "tip--bc",
  duration = 4000,
  open,
  handleOpen,
}) {
  const ANIM_IN_OUT_DURATION_IN_MS = 500;

  const tip = React.useRef(null);

  const classes = classNames({
    tip: true,
    [position]: true,
  });

  React.useEffect(() => {
    if (open) {
      window.setTimeout(() => {
        const el = tip.current;

        el.classList.add("tip--out");

        window.setTimeout(() => {
          handleOpen(false);
        }, ANIM_IN_OUT_DURATION_IN_MS);
      }, duration + ANIM_IN_OUT_DURATION_IN_MS);
    }
  }, [open]);

  return (
    <>
      {open &&
        createPortal(
          <div ref={tip} className={classes}>
            {children}
          </div>,
          document.body
        )}
    </>
  );
}

export default Tip;
