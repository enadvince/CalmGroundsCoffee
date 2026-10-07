import type { FaqItem } from "./types";

// PLACEHOLDER — confirm every answer with the client.
export const eventFaqs: FaqItem[] = [
  {
    id: "space",
    question: "How much space does the cart need?",
    answer:
      "About 2 × 3 meters on level ground, plus a little room for a short line. Indoors or covered outdoor areas both work.",
  },
  {
    id: "power",
    question: "Do you need electricity?",
    answer:
      "Yes — two standard 220V outlets within 10 meters of the cart. If power is tricky at your venue, tell us and we'll work it out.",
  },
  {
    id: "travel",
    question: "Do you travel outside Cebu City?",
    answer:
      "We do. Events within Metro Cebu have no travel fee. Farther venues get a small fee based on distance, which we'll include in your quote.",
  },
  {
    id: "deposit",
    question: "How do I lock in a date?",
    answer:
      "A 50% deposit secures your date. The balance is due on the day of the event. We'll send payment details with your quote.",
  },
  {
    id: "lead-time",
    question: "How far ahead should I book?",
    answer:
      "Three to four weeks is ideal, longer for weekends in December and wedding season. Short notice? Message us anyway.",
  },
];
