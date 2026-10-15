import { CircleHelp } from "lucide-react";

export function PlaceholderList({
  items,
  message,
}: {
  items: string[];
  message: string;
}) {
  if (!items.length) {
    return (
      <div className="detail-placeholder">
        <CircleHelp size={18} aria-hidden="true" />
        <p>{message}</p>
      </div>
    );
  }

  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
