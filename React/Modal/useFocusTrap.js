import { useEffect, useCallback } from "react";

export default function useFocusTrap(containerRef) {
  const trapFocus = useCallback((e) => {
    if (e.key !== "Tab") return;
    const focusable = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, [containerRef]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    node.addEventListener("keydown", trapFocus);
    return () => node.removeEventListener("keydown", trapFocus);
  }, [trapFocus, containerRef]);
}
