# THEMIS — Investment Origination & Intelligence

**Live demo:** https://mapemar.github.io/themis-investment-intelligence/

An independent concept prototype demonstrating how open-source AI components could support investor intelligence, opportunity origination, investment matching and project assessment.

## Demo contents
- Browser-based interactive website (`index.html`)
- Investor intelligence workflow
- Opportunity screening workflow
- Investor–project matching workflow
- Retrospective EcoNoroeste project assessment
- Conceptual open-source AI architecture

## Architecture concept
Qwen3 + Ollama (local LLM), Docling (document extraction), Qdrant (optional evidence retrieval), LangGraph (optional workflow orchestration) and Python (deterministic calculations).

## AI implementation status
The public GitHub Pages site is a lightweight front-end demonstration with prepared illustrative outputs. It does not host an LLM or call a paid API. Live local inference with Qwen3 requires Ollama running on a local machine; it is not connected to the public static website.

## Important limitations
- EcoNoroeste is a retrospective reference case, not an active investment lead.
- CDP / Italian investor profiles are illustrative research lenses, not statements of current investment intentions.
- No verified financial model is embedded; no IRR, DSCR, LLCR, traffic or CAPEX figures are fabricated.
- Outputs are not investment advice, IFC recommendations or official World Bank Group products.
- A production assessment must use dated primary sources and preserve evidence provenance.

## Deployment
GitHub Actions deploys the repository root to GitHub Pages on pushes to `main`. If needed, select **Settings → Pages → Build and deployment → GitHub Actions**.
