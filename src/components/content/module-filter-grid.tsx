"use client";

import { useMemo, useState } from "react";
import type { ProductModule } from "@/data/products/types";
import { ModuleCard } from "@/components/cards/module-card";
import { messages } from "@/content/messages";

export function ModuleFilterGrid({ modules }: { modules: ProductModule[] }) {
  const categories = useMemo(
    () =>
      [...new Set(
        modules
          .map((module) => module.category)
          .filter((category): category is string => Boolean(category)),
      )],
    [modules],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    messages.commercial.allCategories,
  );
  const visibleModules = modules.filter(
    (module) => selectedCategory === messages.commercial.allCategories || module.category === selectedCategory,
  );

  return (
    <>
      {categories.length > 1 && (
        <div
          className="module-filters"
          aria-label={messages.commercial.filterModules}
        >
          {[messages.commercial.allCategories, ...categories].map((category) => (
            <button
              type="button"
              className={`module-filters__button${selectedCategory === category ? " is-active" : ""}`}
              aria-pressed={selectedCategory === category}
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      <div className="module-grid">
        {visibleModules.map((module) => (
          <ModuleCard module={module} key={module.id} />
        ))}
      </div>
    </>
  );
}
