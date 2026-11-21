# THEMIS data foundation

This is the initial evidence-first data contract for THEMIS. It contains schemas and methodology, not a populated or validated investor/project database.

## Core entities
- **sources**: public documents, disclosures and datasets, with publisher, URL, publication date, retrieval date and version.
- **investors**: institutions and capital providers, with source-linked claims on mandate, strategy, sectors, geographies, instruments, track record, capacity and constraints.
- **projects**: infrastructure projects and concessions, with sponsor, authority, sector, maturity, lifecycle status, financing needs and source-linked claims.
- **transactions**: separately recorded loans, bonds/debentures, equity, bridge facilities, guarantees and syndications.
- **matches**: analytical hypotheses connecting investor capabilities with project requirements.

## Evidence taxonomy
Use only: `verified_primary`, `reported_third_party`, `analytical_inference`, `assumption`, `unknown`.

Confidence refers to evidence quality, not probability of investment. Missing data must remain missing; do not infer ticket size, appetite, IRR, DSCR, LLCR, traffic or CAPEX.

Every material claim must reference one or more source IDs. Keep publication date separate from retrieval date. Monetary values must include currency, unit, basis and date.

## Transaction integrity
A financing facility, tranche or instrument must be its own transaction record. In particular, do not merge EcoNoroeste's disclosed debenture investment and separately disclosed bridge facility.

## Matching integrity
A match is a hypothesis, not evidence of investor appetite, commitment, approval or IFC endorsement. The interface must expose rationale, evidence, constraints, information gaps and next actions. Human review is mandatory before internal use.

## Implementation status
The existing GitHub Pages application is a static front-end prototype. These contracts are not yet connected to a live database, ingestion pipeline, LLM or matching engine.

## Next data milestone
Populate and review:
1. A source-backed CDP investor profile.
2. At least five real Brazilian infrastructure opportunities.
3. Separate EcoNoroeste historical transaction records.
4. Evidence-linked investor/project matching hypotheses.
