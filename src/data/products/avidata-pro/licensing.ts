import type { ProductLicensing } from "@/data/products/types";

export const avidataLicensing: ProductLicensing = {
  model: "custom",
  type: "site",
  duration: "Monthly, annual or one-time license options are available.",
  customerSummary:
    "Choose Lite, Pro or Pro Plus according to the farm capacity and capabilities your business needs.",
  capacitySummary:
    "Lite supports up to 3 batches, 1 user, 1 site and 200 MB storage. Pro supports up to 10 batches, 10 users, 1 site and 2,000 MB storage. Pro Plus provides unlimited batches, users and sites, with enterprise storage.",
  activationSummary:
    "License activation is required. Contact sales for activation and setup guidance.",
  renewalSummary:
    "Monthly and annual subscriptions renew according to the applicable purchase terms. Renewal details are confirmed with sales.",
  trialSummary:
    "Trial availability, if offered, is confirmed by the sales team.",
  statusSummary:
    "Active licenses provide access according to the selected edition. Trial access, where offered, is temporary. Expired or suspended access may become restricted under the applicable license policy. If a license is invalid, revoked or deactivated, activation may be required before normal use can continue.",
  upgradeSummary:
    "Ask sales about moving from Lite to Pro or Pro Plus. Availability and any price adjustment are confirmed before the change.",
  oneTimeLicenseExplanation:
    "One-time licensing provides continued use of the licensed software version subject to the applicable license terms. Optional future services, upgrades or support may be priced separately.",
};
