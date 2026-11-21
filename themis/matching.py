"""Evidence-aware qualitative investor/project matching; no arbitrary numeric score."""
from dataclasses import dataclass
from typing import Iterable

@dataclass(frozen=True)
class DimensionEvidence:
    dimension: str
    investor_evidence: str
    project_evidence: str
    assessment: str
    rationale: str
    source_ids: tuple = ()

def validate_match(evidence: Iterable[DimensionEvidence]):
    allowed={"strong_alignment","partial_alignment","weak_alignment","unknown"}
    rows=list(evidence)
    for row in rows:
        if row.assessment not in allowed: raise ValueError(f"Unsupported assessment: {row.assessment}")
        if row.assessment!="unknown" and not row.source_ids:
            raise ValueError("Non-unknown assessments require source_ids.")
        if row.assessment=="unknown" and not row.rationale.strip():
            raise ValueError("Unknown dimensions must explain the information gap.")
    return rows

def overall_assessment(evidence: Iterable[DimensionEvidence]):
    rows=validate_match(evidence)
    if not rows or all(r.assessment=="unknown" for r in rows): return "insufficient_evidence"
    known=[r.assessment for r in rows if r.assessment!="unknown"]
    if "weak_alignment" in known: return "weak_fit"
    if "partial_alignment" in known or any(r.assessment=="unknown" for r in rows):
        return "possible_with_conditions"
    return "promising_hypothesis"
