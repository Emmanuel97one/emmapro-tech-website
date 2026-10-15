import type { ProductLicensing } from "@/data/products/types";

export const emmaproShopLicensing: ProductLicensing = {
  model: "custom",
  type: "multi-user",
  duration: "Monthly, annual or one-time license options are available.",
  customerSummary:
    "Pro and Pro-Plus use seat-based licensing. The selected edition and quantity determine the license price.",
  capacitySummary:
    "The seat calculator estimates 1 to 20 seats. Contact sales for licensing quantities or terms not represented by the calculator.",
  activationSummary:
    "License activation is required. Contact sales for activation and setup guidance.",
  renewalSummary:
    "Monthly and annual subscriptions renew according to the applicable purchase terms. Renewal details are confirmed with sales.",
  trialSummary:
    "Trial availability, if offered, is confirmed by the sales team.",
  statusSummary:
    "Active licenses provide access according to the purchased edition and seat quantity. Trial access, where offered, is temporary. Expired or suspended access may become restricted under the applicable license policy. If a license is invalid, revoked or deactivated, activation may be required before normal use can continue.",
  upgradeSummary:
    "Ask sales about changing editions or seat quantities. Availability and any price adjustment are confirmed before the change.",
  oneTimeLicenseExplanation:
    "One-time licensing provides continued use of the licensed software version subject to the applicable license terms. Optional future services, upgrades or support may be priced separately.",
};
