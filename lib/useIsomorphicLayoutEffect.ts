import { useEffect, useLayoutEffect } from "react";

// Avoid SSR warnings/crashes: layout effect in browser, effect on server.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
