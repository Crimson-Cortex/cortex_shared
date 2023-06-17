import React, { useRef } from "react";

function Responsive({ children }) {
  const updateScreenWidthFactorDebounceClocked = useRef(null);

  function updateScreenWidthFactor() {
    const screen_width_factor = Math.round((window.outerWidth / 1920) * 100);

    document.documentElement.style.fontSize = screen_width_factor + "%";
  }

  function _isInitializedBefore() {
    const YES = "yes";
    const NO = "no";
    const ATTR_NAME = "data-response-initialized";

    const is_initialized = document.body.getAttribute(ATTR_NAME) || NO;

    if (is_initialized === YES) {
      return true;
    }

    document.body.setAttribute(ATTR_NAME, YES);

    return false;
  }

  function debounceClocked(callback, interval_in_ms) {
    let timeout_id;

    return function () {
      if (timeout_id) {
        return;
      }

      timeout_id = window.setTimeout(function () {
        callback();
        timeout_id = null;
      }, interval_in_ms);
    };
  }

  function initialize() {
    if (_isInitializedBefore()) {
      return;
    }

    const interval_in_ms = 100;

    updateScreenWidthFactorDebounceClocked.current = debounceClocked(
      updateScreenWidthFactor,
      interval_in_ms
    );

    window.addEventListener(
      "resize",
      updateScreenWidthFactorDebounceClocked.current
    );

    updateScreenWidthFactor();
  }

  React.useState(() => {
    initialize();

    return () => {
      window.removeEventListener(
        "resize",
        updateScreenWidthFactorDebounceClocked.current
      );
    };
  }, []);

  return children;
}

export default Responsive;
