import { messages, supportedLanguages } from "@/content/messages";

export function LanguageSelector() {
  return (
    <label className="language-selector">
      <span className="sr-only">{messages.language.label}</span>
      <select aria-label={messages.language.label} defaultValue="en">
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
