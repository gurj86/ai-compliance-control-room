# Requirements, controls and acceptance evidence

The brief and supplied job advert define the scope. This is a BA/compliance-transformation portfolio prototype, not a replacement for qualified compliance advice.

| Need | Data / workflow | Acceptance evidence |
| --- | --- | --- |
| Senior reviewer needs to know what changed | Dated finding history, monthly outcome samples, current/prior metric comparison | September and October fixture totals independently asserted in tests |
| Accountability for overdue actions | Unified action queue, owner, due date, module and overdue predicate | Queue count equals calculated full-queue overdue; filters and record drill-down |
| Material findings require challenge | Explicit human-validation state | New material findings start unvalidated; validation records rationale |
| Unsupported closure must be blocked | Submitted evidence, validated finding, independent reviewer and rationale | Engine tests block missing evidence, validation and owner self-approval |
| Senior reviewer needs evidence lineage | Risk → business area → control → finding → evidence IDs | Interactive matrix, relationship drill-down and evidence summaries |
| Monitoring requires scheduling | Dated programme and review scopes | October/November calendar, overlapping review visibility, control/finding drill-down |
| Customer outcomes require denominators | Monthly journey sample counts and aggregate metrics | Counts shown alongside weighted percentages; population/sample caveat |
| Regulatory interpretation requires human input | Invented scenario, affected products, impact, owner, internal date, review gate | Review advances only to implementation planning; no automatic sign-off |
| Privacy/financial crime require specialist review | Synthetic registers, escalation and recorded specialist rationale | No legal/reportability, screening or customer-decision engine |
| Management output must not invent numbers | Shared metric engine and deterministic briefing template | Fixture and post-closure briefing assertions; source IDs in every section |
| Governance output needs approval | Draft state, reviewer and rationale, explicit confirmation | Review state in export; later data/review changes invalidate brief |
| Career positioning must be accurate | Landing page and README scope statements | No SMF16, Head of Compliance or specialist operational experience claimed |

## Interaction acceptance walkthrough

1. Open every module using the sidebar; ensure all records are fictional and regulatory scenarios are explicitly invented.
2. R01 risk map → C01 → F01/F07. Inspect ownership, deadlines, root cause and closure gate.
3. Search monitoring for “retention”; filter to evidence submitted; inspect F04. Attempt owner self-approval (blocked). Record additional fictional retest and independent rationale (permitted demo closure).
4. Verify open findings 6 → 5, overdue monitoring 3 → 2, full-queue overdue 5 → 4 and awaiting evidence review 1 → 0.
5. Generate the monthly brief; verify updated totals and source IDs. Record human review; export; change another record and confirm earlier approval is invalidated.
6. Review fictional RC01 interpretation; confirm it moves to implementation planning only. Review P02/FC01 and confirm the specialist action remains unresolved.
7. Record AT01 attestation; confirm it leaves the queue; inspect/export the session trail.
8. Reset or reload; confirm original seed snapshot returns and there is no claim of persistence.

## Design decisions

- A control room layout puts decisions, changing signals, evidence and accountable actions ahead of charts. The risk matrix provides prioritisation; the linked relationship view provides context.
- Navy, muted green, restrained amber/red and readable registers suit a serious financial-services portfolio. The UI uses no chatbot-first surface.
- Fixed synthetic snapshot enables reproducible interview demonstrations. Dates do not drift and totals are never randomly generated.
- Static architecture limits data exposure and makes the public demo simple to run. It deliberately cannot enforce authenticated maker/checker roles, immutable audits or real evidential sufficiency.
- Deterministic briefing is the honest v1: it demonstrates a controlled insight boundary while avoiding fabricated numbers and API costs. Future LLM design is documented without claiming integration.
- Demonstration workflow progression is distinct from legal/compliance determination. All specialist and regulatory conclusions remain qualified human responsibilities.
