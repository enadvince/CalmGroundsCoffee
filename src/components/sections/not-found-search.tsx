"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openSearch } from "./site-search";

export function NotFoundSearch() {
  return (
    <Button variant="outline" size="lg" onClick={openSearch} icon={<Search className="size-4" aria-hidden="true" />}>
      Search the site
    </Button>
  );
}
