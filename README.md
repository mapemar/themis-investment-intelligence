# THEMIS — Investment Intelligence & Business Development Platform

**Purpose:** demonstrate an evidence-led workflow for connecting Italian investors with infrastructure opportunities in emerging markets, assessing potential investment structures and preparing IFC-oriented business-development actions.

**Demo URL (main branch only):** https://mapemar.github.io/themis-investment-intelligence/

## Question-driven structure (21 November 2026)

The Overview starts from seven questions an IFC business-development officer in Italy asks, each linked to a path through the platform. Navigation has eight entries: Overview, AI Architecture & Agents, and six workspaces:

1. **Clients & Investors** — Italy Client Desk (sourced prospects, priority score) and European comparators (identification data only).
2. **Opportunities** — from client to opportunity; public pipeline (Brazil, verified 21 Nov 2026); from project to Italian co-investors; project development stages and matching WBG instruments.
3. **Country Intelligence** — verified Brazil diagnostic; live World Bank WDI indicators for any country via the public API.
4. **Project Assessment & Finance** — first-look screen of an incoming proposal against IFC's published eligibility criteria and Performance Standards; assessment register; cash-flow model and scenarios.
5. **Engagement** — meeting brief EN/IT, integrity pre-screen, verified events and a single attend/organise planner, WBG coordination map, action log.
6. **Sources & Evidence** — one register of every source used, built from the pages.

Former pages (Investor Intelligence, Italy Client Desk, Opportunity Origination, Project Pipeline, Investment Matching, Project Assessment) were merged; their old links redirect. Figures that could not be verified were removed (Brazil private credit, WGI percentile, Human Capital Index, R$190.4bn roadshow total); pipeline stages and dates were updated from official and specialist sources.

## Italy Client Desk (November 2026)

Client-led business development for IFC in Italy: Italian corporates, banks, insurers, pension funds, asset managers, foundations, family offices and DFIs looking at emerging markets alongside the World Bank Group. Code in `assets/italy-desk.js` and `assets/italy-desk.css`, isolated from the rest of the app.

- **Italy Client Desk** (under Investor Intelligence): 18 prospects and archetypes; sourced facts with retrieval date; documented IFC relationships; transparent priority score (evidence + editable analyst judgement); deepen vs originate mode.
- **Engagement brief (EN / IT):** deterministic template from the verified profile, category-level constraints, meeting questions and WBG colleagues to involve.
- **Integrity pre-screen:** sanctions, World Bank debarment, company registry and beneficial-ownership checks with official links; session-only status; does not replace IFC integrity due diligence.
- **Client-led origination** (Opportunity Origination): corporate or investor entry point → possible WBG route (IFC loans/equity, B loans, MCPP, MIGA, GTFP, Upstream), Italian precedents from IFC disclosures, information gaps.
- **Investor Engagement:** verified Italian event platforms, organiser mode for roundtables and webinars, WBG internal coordination map.
- **AI Architecture:** "How AI is used and validated" — draft, verify against primary sources, label, decide.
- Fixes: invisible Overview headline, mobile overflow, incoherent synthetic base case of the financial model (toll and OPEX defaults recalibrated; engine unchanged).

## THEMIS 2.0 recruiter demo

This branch expands the initial static prototype into a practical, interactive demonstration:

- **Investor intelligence:** institutional research dimensions and investor archetypes.
- **Opportunity origination:** a source-backed snapshot of six Brazilian road and port concession / terminal pipeline records.
- **Investor engagement CRM:** account archetypes, engagement stages, action log and next-step discipline.
- **Investment matching:** evidence-aware qualitative match logic; no arbitrary composite score and no inference of investor appetite.
- **Project finance lab:** user-editable synthetic assumptions, deterministic debt service, DSCR and simplified LLCR calculations.
- **Evidence room:** official source register, claim taxonomy and concession diligence checklist.
- **Country intelligence:** entry points to the Development Finance Observatory, World Bank Indicators API and OpenBB.
- **EcoNoroeste:** retained as a retrospective reference case, never presented as a live opportunity.
- **AI architecture:** documented open-source components and staged production architecture.

## What is real and what is not

- The six Brazil pipeline records are drawn from official Ministry of Transport, ANTT and ANTAQ disclosures, with source URLs and a 21 November 2026 snapshot date. They are public procurement / concession pipeline records, not validated IFC leads.
- Disclosed investment values are reproduced with their source basis; they are not financing requirements or independent estimates.
- Investor profiles and investor appetite are not yet populated with verified institution-level evidence.
- The finance lab's prefilled values are synthetic user-editable assumptions, not EcoNoroeste or any other project's financial data.
- The public Pages demo is static. It does not yet connect to a live LLM, persistent CRM, DFO/OpenBB APIs, document-ingestion service or production database.
- Outputs are not investment advice, credit decisions, IFC recommendations or official World Bank Group products.

## Open-source capability references

See [docs/OPEN_SOURCE_COMPONENTS.md](docs/OPEN_SOURCE_COMPONENTS.md) for the repositories and implementation rationale: Atlas (context/checkpoints), Development Finance Observatory (development-finance data), OpenBB (data providers), Twenty (CRM workflows), financial-analysis-toolkit and toll-road BOT references (project finance), Qwen3/Ollama, LangGraph, Docling, Qdrant, Splink and RapidFuzz.

THEMIS adapts capability patterns and implements its own small calculation and matching modules. It does not copy paid templates, project assumptions or proprietary data. Licences and data terms must be reviewed before incorporating third-party code or datasets.

## Repository structure

- `index.html` — static interactive demo.
- `data/README.md` — evidence-first data principles.
- `data/schema.sql` — relational data foundation.
- `data/brazil_pipeline.json` — source-linked Brazilian pipeline snapshot.
- `themis/finance.py` — deterministic project-finance screening calculations.
- `themis/matching.py` — evidence-aware qualitative matching.
- `tests/` — automated calculation and matching tests.
- `docs/OPEN_SOURCE_COMPONENTS.md` — open-source component map and licence cautions.

## Run the Python tests locally

```bash
python -m pip install -e ".[test]"
python -m pytest
```

## Next production milestones

1. Populate a source-backed CDP investor profile and transaction history.
2. Expand Brazil pipeline to 10+ opportunities and ingest tender documents.
3. Build persistent investor/project/source records in SQLite or PostgreSQL.
4. Add Docling extraction with document versioning and source-level citations.
5. Add Qdrant hybrid retrieval and human-reviewed entity resolution.
6. Connect a local Qwen3 model through Ollama and orchestrate controlled workflows with LangGraph.
7. Extend the financial engine to multi-period project cash flows, sculpted debt, covenant schedules and sensitivities using verified project inputs.
8. Generate exportable investment origination notes with evidence, gaps, IFC role hypotheses and next actions.

## Independence and disclaimer

THEMIS is an independent concept project developed as a professional work sample. It is not affiliated with, endorsed by or an official product of IFC or the World Bank Group.
