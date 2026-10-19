import type { Locale } from "@/content/messages";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

export function localizePath(pathname: string, locale: Locale): string {
  const englishPath =
    pathname === "/fr"
      ? "/"
      : pathname.startsWith("/fr/")
        ? pathname.slice(3)
        : pathname;

  if (locale === "en") return englishPath || "/";
  return englishPath === "/" ? "/fr" : `/fr${englishPath}`;
}
