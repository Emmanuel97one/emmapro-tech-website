import { en } from "@/content/messages/en";

export const messageCatalog = { en } as const;
export const defaultLocale = "en" as const;

export type Locale = keyof typeof messageCatalog;

export const supportedLanguages = Object.entries(messageCatalog).map(
  ([code, catalog]) => ({
    code: code as Locale,
    label: catalog.language.english,
  }),
);

export const messages = messageCatalog[defaultLocale];
