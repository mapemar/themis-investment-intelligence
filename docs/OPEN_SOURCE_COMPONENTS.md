# Open-source components and design references

THEMIS reuses capability patterns and documented methods, not copied proprietary code, datasets or paid templates. The GitHub Pages demo remains static; the components below describe the implementation path honestly.

| Capability | Repository / project | THEMIS use | Status / caution |
|---|---|---|---|
| Agent context, shared memory, checkpoints and activity history | [tryatlas/atlas](https://github.com/tryatlas/atlas) | Adapt persistent project context, session/run history, checkpoints and traceability for analyst workflows. | Do not embed Atlas as THEMIS core; it is a coding-agent environment. Apache-2.0. |
| Development-finance datasets, APIs and provenance | [Development Finance Observatory](https://github.com/DevelopmentFinanceObservatory) · [docs](https://developmentfinance.org/docs) | Country/development-finance data, source-linked answers and harmonised indicators. | Check maturity and licence per repository; DFO docs and APIs evolve. |
| Financial / economic data providers | [OpenBB](https://github.com/openbq-org/OpenBB) | Provider abstraction for company, market and macro data. | Framework does not guarantee free underlying data or keyless access. |
| Investor engagement CRM | [Twenty](https://github.com/twentyhq/twenty) | Investor accounts, relationship stages, tasks, next actions and configurable objects. | Mostly AGPLv3, with some MIT and commercial components. Demo borrows workflow concepts only. |
| Project-finance calculations | [financial-analysis-toolkit-public](https://github.com/herrrickshaw/financial-analysis-toolkit-public) | Reference for DSCR debt sizing / sculpting, LLCR, sensitivities and testing. | Inspect code and licence before reuse. THEMIS implements its own screening calculations. |
| Toll-road BOT model | [Infrastructure-Project-Finance-Model](https://github.com/mahitha-kunireddy/Infrastructure-Project-Finance-Model) | Reference for concession cash-flow structure, debt covenant logic and Monte Carlo sensitivity concepts. | Illustrative Indian highway assumptions; do not reuse as Brazil facts. |
| Energy project-finance DCF | [H2Global/profin](https://github.com/H2Global/profin) | Optional reference for WACC, NPV, IRR and project risk analysis. | Energy-focused; assess fit before adoption. |
| Local language model | [Qwen3](https://github.com/QwenLM/Qwen3) + [Ollama](https://github.com/ollama/ollama) | Local extraction, classification, synthesis and drafting. | Hardware and model-specific licence terms apply. |
| Workflow orchestration | [LangGraph](https://github.com/langchain-ai/langgraph) | Human-in-the-loop multi-step evidence and origination workflows. | Add when workflow complexity justifies it. |
| Document parsing | [Docling](https://github.com/docling-project/docling) and [OpenDataLoader PDF](https://github.com/opendataloader-project/opendataloader-pdf) | Extract text, tables and structure from notices, annual reports and contracts. | Validate extracted content against original documents. |
| Evidence retrieval | [Qdrant](https://github.com/qdrant/qdrant) | Hybrid / vector search over documents, filtered by country, project, date and source type. | Retrieval must return passages and provenance. |
| Entity resolution | [Splink](https://github.com/moj-analytical-services/splink) + [RapidFuzz](https://github.com/rapidfuzz/RapidFuzz) | Reconcile investor, sponsor, project and authority names. | Candidate merges require human review. |
| BI visualisation | [Apache Superset](https://github.com/apache/superset) | Potential operational analytics for pipeline coverage and portfolio monitoring. | Separate service; not bundled into the static demo. |

## THEMIS implementation choices

1. Frontend: self-contained HTML/CSS/JavaScript for GitHub Pages.
2. Data foundation: source register and relational schema under data/.
3. Finance engine: deterministic Python calculations under themis/; tests under tests/.
4. Matching: qualitative evidence-aware rules; unknowns remain unknown and no arbitrary aggregate score is created.
5. Production increment: FastAPI or Streamlit, SQLite/PostgreSQL, Docling ingestion, Qdrant retrieval and LangGraph orchestration; Qwen3 through Ollama for local reasoning.
6. Country data: DFO and official World Bank / IMF / OECD sources first; OpenBB only where provider and data terms are understood.

## Data and licence policy

- No paid API is required for the current static demo.
- Open-source software licences do not make third-party data free of restrictions.
- Do not copy paid templates, proprietary datasets, financial models or project assumptions without permission.
- Verify current licences and dependency trees before incorporating external code.
- THEMIS is independent and is not endorsed by IFC, the World Bank or repository maintainers.
