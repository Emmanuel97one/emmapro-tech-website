import type { ProductLicensing } from "@/data/products/types";

export const emmaproPharmaLicensing: ProductLicensing = {
  model: "custom",
  type: "multi-user",
  duration: "Monthly, annual or one-time license options are available.",
  customerSummary:
    "Choose a PHARMA edition based on the capabilities and client-PC capacity your pharmacy needs.",
  capacitySummary:
    "The Server/Main Pharmacy PC is included and is not counted as a client PC. Pro includes 1 client PC; Pro-Plus allows up to 2; Pro Max allows up to 5; Ultra allows unlimited client PCs.",
  activationSummary:
    "License activation is required. Contact sales for activation and setup guidance.",
  renewalSummary:
    "Monthly and annual subscriptions renew according to the applicable purchase terms. Renewal details are confirmed with sales.",
  statusSummary:
    "Active licenses provide access according to the selected edition. Trial access, where offered, is temporary. Expired or suspended access may become restricted under the applicable license policy. If a license is invalid, revoked or deactivated, activation may be required before normal use can continue.",
  upgradeSummary:
    "Ask sales about moving to a higher edition. Availability and any price adjustment are confirmed before the change.",
  oneTimeLicenseExplanation:
    "One-time licensing provides continued use of the licensed software version subject to the applicable license terms. Optional future services, upgrades or support may be priced separately.",
};
