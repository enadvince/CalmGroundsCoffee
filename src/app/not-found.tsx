import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/ui/mascot";

export default function NotFound() {
  return (
    <section data-theme="blue" className="flex min-h-svh items-center bg-calm-blue pt-28 pb-20 text-foam-cream">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <Mascot className="w-40" decorative sizes="160px" />
        <h1 className="text-h1">This page wandered off</h1>
        <p className="text-body-lg max-w-md">Take a breath — the cart is just around the corner.</p>
        <div className="flex flex-col gap-3 xs:flex-row">
          <Button href="/">Back home</Button>
          <Button href="/pop-ups" variant="outline">
            Find a pop-up
          </Button>
        </div>
      </div>
    </section>
  );
}
