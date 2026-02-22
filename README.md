# Daniel Rodriguez Portfolio

I built this webpage as a personal narrative, not as a static resume.
My goal is simple.
I want visitors to understand how I think, how I work, and what I can build before they ever send me a message.

## My intent

I designed this site to guide people from first impression to informed trust.
Every section has a job.

1. Hero sets context and direction.
2. About frames my background with measurable signals.
3. Projects shows applied work with real visuals.
4. Current Focus shows what I am building right now.
5. Thesis and Certifications document my academic and technical depth.
6. Experience and Skills connect timeline with capability.
7. Contact makes it easy to start a conversation.

## My design approach

I use motion to support reading flow, not to distract.
I keep typography clean, spacing intentional, and contrast high enough for clarity.
I treat interaction as part of storytelling.
Hover states, progressive reveals, and scroll transitions are all used to reduce friction and increase comprehension.

## Tech I use here

1. Next.js App Router
2. TypeScript
3. Tailwind CSS
4. GSAP for advanced motion and scroll behavior
5. Lucide for iconography
6. Client side canvas effects for selective visual depth

## Structure I maintain

I separated runtime code from source material and archived assets so the project stays readable as it grows.

1. `app` for routing and page composition
2. `components/layout` for page shell elements
3. `components/sections` for top level page blocks
4. `components/ui/base` for shared primitives
5. `components/ui/backgrounds` for ambient visual systems
6. `components/ui/content` for galleries and content utilities
7. `components/ui/effects` for interaction and behavior layers
8. `components/ui/errors` for error views
9. `components/ui/system` for structural helpers
10. `lib` for utilities and reusable hooks
11. `public` for served assets
12. `assets` for source image material
13. `docs` for guides, references, and workspace files
14. `archive` for historical or large non runtime files

## Local run flow

1. Install dependencies with `npm install`.
2. Build with `npm run build`.
3. Start with `npm run start`.

## Final note

I use this repository as both a portfolio and a craft log.
When I refine the site, I am refining how I communicate value.
