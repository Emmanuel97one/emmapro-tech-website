"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Image as ScreenshotIcon, X } from "lucide-react";
import type { ProductScreenshot } from "@/data/products/types";
import { messages } from "@/content/messages";

export function ProductGallery({
  screenshots,
}: {
  screenshots?: ProductScreenshot[];
}) {
  const sortedScreenshots = [...(screenshots ?? [])].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const categories = [
    ...new Set(
      sortedScreenshots
        .map((screenshot) => screenshot.category)
        .filter((category): category is string => Boolean(category)),
    ),
  ];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleScreenshots = sortedScreenshots
    .map((screenshot, originalIndex) => ({ screenshot, originalIndex }))
    .filter(
      ({ screenshot }) =>
        !selectedCategory || screenshot.category === selectedCategory,
    );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedIndex !== null && dialog && !dialog.open) dialog.showModal();
  }, [selectedIndex]);

  if (!sortedScreenshots.length) return null;

  const activeScreenshot =
    selectedIndex === null ? undefined : sortedScreenshots[selectedIndex];
  const selectRelativeScreenshot = (offset: number) => {
    setSelectedIndex((current) =>
      current === null || visibleScreenshots.length < 2
        ? null
        : visibleScreenshots[
            (visibleScreenshots.findIndex(
              ({ originalIndex }) => originalIndex === current,
            ) +
              offset +
              visibleScreenshots.length) %
              visibleScreenshots.length
          ].originalIndex,
    );
  };

  return (
    <>
      {categories.length > 1 && (
        <label className="gallery-filter">
          <span>{messages.productPage.screenshotCategory}</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">{messages.productPage.allScreenshots}</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="gallery-grid">
        {visibleScreenshots.map(({ screenshot, originalIndex }) => (
          <figure className="gallery-item" key={screenshot.path}>
            <button
              className="gallery-item__button"
              type="button"
              onClick={() => setSelectedIndex(originalIndex)}
              aria-label={`${messages.productPage.openScreenshot}: ${screenshot.title}`}
            >
              <span className="gallery-item__image">
                {screenshot.thumbnailPath ? (
                  <Image
                    src={screenshot.thumbnailPath}
                    alt=""
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                ) : (
                  <span className="gallery-item__deferred">
                    <ScreenshotIcon size={28} aria-hidden="true" />
                    <span>{messages.productPage.openScreenshot}</span>
                  </span>
                )}
              </span>
            </button>
            <figcaption>
              <strong>{screenshot.title}</strong>
              {screenshot.description && <span>{screenshot.description}</span>}
            </figcaption>
          </figure>
        ))}
        <dialog
          className="gallery-dialog"
          ref={dialogRef}
          aria-label={messages.productPage.screenshotPreview}
          onClose={() => setSelectedIndex(null)}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              selectRelativeScreenshot(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              selectRelativeScreenshot(1);
            }
          }}
        >
          {activeScreenshot && (
            <>
              <div className="gallery-dialog__toolbar">
                <div>
                  <p>{activeScreenshot.title}</p>
                  {activeScreenshot.description && (
                    <span>{activeScreenshot.description}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="gallery-dialog__close"
                  aria-label={messages.productPage.closeScreenshot}
                  onClick={() => dialogRef.current?.close()}
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>
              <div className="gallery-dialog__stage">
                <Image
                  src={activeScreenshot.path}
                  alt={activeScreenshot.alt}
                  fill
                  sizes="(max-width: 1000px) 96vw, 90vw"
                  loading="lazy"
                />
              </div>
              {visibleScreenshots.length > 1 && (
                <div className="gallery-dialog__controls">
                  <button
                    type="button"
                    aria-label={messages.productPage.previousScreenshot}
                    onClick={() => selectRelativeScreenshot(-1)}
                  >
                    <ArrowLeft size={19} aria-hidden="true" />
                    {messages.productPage.previousScreenshot}
                  </button>
                  <span>
                    {visibleScreenshots.findIndex(
                      ({ originalIndex }) => originalIndex === selectedIndex,
                    ) + 1}{" "}
                    / {visibleScreenshots.length}
                  </span>
                  <button
                    type="button"
                    aria-label={messages.productPage.nextScreenshot}
                    onClick={() => selectRelativeScreenshot(1)}
                  >
                    {messages.productPage.nextScreenshot}
                    <ArrowRight size={19} aria-hidden="true" />
                  </button>
                </div>
              )}
            </>
          )}
        </dialog>
      </div>
    </>
  );
}
