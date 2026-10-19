import { en } from "@/content/messages/en";
import { fr } from "@/content/messages/fr";

export const messageCatalog = { en, fr } as const;
export const defaultLocale = "en" as const;

export type Locale = keyof typeof messageCatalog;
type Widen<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? T
    : T extends object
      ? { [Key in keyof T]: Widen<T[Key]> }
      : T;
export type Messages = Widen<typeof en>;

export const supportedLanguages = Object.entries(messageCatalog).map(
  ([code, catalog]) => ({
    code: code as Locale,
    label: catalog.language.english,
  }),
);

export function getMessages(locale: Locale): Messages {
  if (locale === "fr") {
    return {
      ...en,
      ...fr,
      language: { ...en.language, ...fr.language },
      navigation: { ...en.navigation, ...fr.navigation },
      common: { ...en.common, ...fr.common },
      contactPage: { ...en.contactPage, ...fr.contactPage },
    };
  }

  return en;
}

export const messages = getMessages(defaultLocale);
