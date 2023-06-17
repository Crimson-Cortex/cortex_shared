import classnames from "classnames";

import Audio from "@/shared/utils/Audio";

function Button({
  children,
  onClick,
  disabled = false,
  size = 'small',
  glow = '',
  borderless,
  icon,
  color = '',
  ...rest
}) {
  const classes = classnames({
    btn: true,
    "btn--icon": icon,
    [`btn--${color}`]: color,
    [`btn--${size}`]: size,
    "btn--borderless": borderless,
    "btn--glow": !!glow,
    [`btn--glow-${glow}`]: glow,
  });

  function handleOnClick() {
    if (disabled) {
      return Audio.playSfxNext();
    }

    onClick();
  }

  function handleOnMouseEnter() {
    if (disabled) {
      return Audio.playSfxUpDown();
    }
  }

  return (
    <div className="btn__wrapper">
      <button
        {...rest}
        className={classes}
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
