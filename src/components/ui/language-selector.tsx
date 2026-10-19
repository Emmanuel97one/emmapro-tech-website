import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMessages, supportedLanguages } from "@/content/messages";
import { getLocaleFromPath, localizePath } from "@/lib/locale";

export function LanguageSelector() {
  const pathname = usePathname() ?? "/";
  const currentLocale = getLocaleFromPath(pathname);
  const messages = getMessages(currentLocale);

  return (
    <nav className="language-selector" aria-label={messages.language.label}>
      {supportedLanguages.map((language, index) => (
        <span className="language-selector__option" key={language.code}>
          {index > 0 && <span aria-hidden="true">/</span>}
          <Link
            href={localizePath(pathname, language.code)}
            hrefLang={language.code}
            lang={language.code}
            aria-current={currentLocale === language.code ? "page" : undefined}
          >
            {language.code.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
