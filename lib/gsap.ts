// Next.js-safe: dynamically import GSAP + plugin ONLY on the client.

export async function loadGSAP() {
  const gsapModule: any = await import("gsap");
  const stModule: any = await import("gsap/ScrollTrigger");

  const gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
  const ScrollTrigger =
    stModule.ScrollTrigger ?? stModule.default ?? stModule;

  // Register once
  if (!gsap.core.globals().ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  return { gsap, ScrollTrigger };
}
