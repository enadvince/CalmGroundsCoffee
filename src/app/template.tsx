import { PageEnter } from "@/components/motion/page-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageEnter>{children}</PageEnter>;
}
