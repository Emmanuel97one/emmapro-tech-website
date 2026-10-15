import { company } from "@/data/company/company";

export const brand = {
  name: company.name,
  shortName: company.brandName,
  markLabel: "TECH",
  descriptor: "Software for the work that matters.",
  siteUrl: company.website,
} as const;

export const theme = {
  default: "system",
  modes: ["light", "dark", "system"],
} as const;
