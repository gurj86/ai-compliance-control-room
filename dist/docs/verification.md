# Verification record — 26 October 2026

## Automated

Seven Node built-in tests passed:

1. Seed data validation and finding → control → risk linkage.
2. Independent reconciliation of all October metric totals.
3. September sample totals and dated finding history.
4. Closure blocked without evidence, human validation, independent reviewer or meaningful rationale.
5. Permitted independent closure recalculates queue, metrics and briefing consistently.
6. Full-queue overdue reconciliation, due-today boundary and empty denominator handling.
7. Briefing draft status, source references and fixture-derived figures.

JavaScript syntax checks passed. Build validates the dataset and browser script before preparing static artifacts.

## Browser checks completed

- All nine views rendered: oversight, monitoring, outcomes, regulatory change, governance, privacy, financial crime, briefing and project introduction.
- R01 risk map opened its business area/control/finding relationship view.
- Monitoring search “retention” produced one finding; November calendar showed M08 independent retest.
- F04 owner self-approval was blocked with a visible in-dialog message.
- F04 independent demo closure changed open findings 6 → 5, overdue monitoring 3 → 2, full-queue overdue 5 → 4 and pending evidence reviews 1 → 0.
- The briefing reflected those changed counts and recorded a human review with rationale.
- RC01 review progressed to implementation planning, with fictional/legal limitations retained.
- Governance overdue filter showed five records; AT01 attestation reduced it to four.
- Reset restored synthetic data; all session decisions were cleared.
- Desktop and 390 × 844 responsive layout visually inspected. Temporary viewport override reset.
- No browser console errors were observed during the checked flows.

Screenshots in this folder show the unmodified seed snapshot and a draft briefing, not real business activity.

## Limits

No authenticated role enforcement, durable storage, real evidence files, live model, legal/regulatory feed, production integrations or real customer data were tested because those capabilities are not implemented. Browser flows are representative functional checks, not a production security or accessibility certification.
