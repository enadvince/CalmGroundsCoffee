/**
 * Adds UTM parameters to outbound http(s) links so partner sites (and our own
 * analytics, if added) can attribute traffic to this website. Same-site links,
 * mailto:/tel:, and URLs that already carry utm_source are left untouched.
 */
export function withUtm(url: string, content?: string): string {
  if (!/^https?:\/\//i.test(url)) return url;
  try {
    const u = new URL(url);
    if (u.searchParams.has("utm_source")) return url;
    u.searchParams.set("utm_source", "calmgroundscoffee.com");
    u.searchParams.set("utm_medium", "referral");
    u.searchParams.set("utm_campaign", "website");
    if (content) u.searchParams.set("utm_content", content);
    return u.toString();
  } catch {
    return url;
  }
}
