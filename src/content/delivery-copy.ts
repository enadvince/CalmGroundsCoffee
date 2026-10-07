import type { DeliveryMode, LineArtName } from "./types";

/** Step copy per delivery model — the page switches on `site.delivery.mode`. */
export const deliverySteps: Record<DeliveryMode, { art: LineArtName; title: string; body: string }[]> = {
  "preorder-batch": [
    { art: "cup", title: "Pick your cups", body: "Choose from the menu — a few for home or a tray for the team." },
    { art: "calendar", title: "Choose a batch day", body: "We brew and deliver in batches on set days, so every cup is fresh." },
    { art: "steam", title: "We confirm by message", body: "You'll get a Messenger reply with your total and payment details." },
    { art: "bag", title: "Delivered, still calm", body: "A courier brings your order in your chosen time window." },
  ],
  "self-delivery": [
    { art: "cup", title: "Send your order", body: "Message us or fill in the form with what you'd like." },
    { art: "steam", title: "We confirm & you pay", body: "We reply with your total and GCash/bank details." },
    { art: "bag", title: "We book the courier", body: "We send it via Lalamove — you'll get the tracking link." },
    { art: "pin", title: "It arrives", body: "Fresh at your door, usually within the hour of dispatch." },
  ],
  platform: [
    { art: "bag", title: "Open your delivery app", body: "Find Calm Grounds on the apps below." },
    { art: "cup", title: "Pick your cups", body: "Same menu, same care — the app handles payment." },
    { art: "pin", title: "Track it to your door", body: "The rider brings it straight from the cart." },
  ],
};
