import { Error404 } from "@/components/ui/pixeleted-404-not-found";

export default function NotFound() {
  return (
    <Error404
      postcardImage="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=720&q=80"
      postcardAlt="Paris street postcard"
      curvedTextTop="Daniel Rodriguez"
      curvedTextBottom="Data · AI · Analytics"
      heading="(404) Looks like the page you're looking for got lost somewhere."
      subtext="Head back home and explore the portfolio instead."
      backButtonLabel="Back to Home"
      backButtonHref="/"
    />
  );
}
