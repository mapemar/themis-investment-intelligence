import pytest
from themis.finance import FinanceInputs, calculate_project_finance, dscr_sensitivity
from themis.matching import DimensionEvidence, overall_assessment

def test_annuity_and_metrics_are_deterministic():
    r=calculate_project_finance(FinanceInputs(500,.65,.08,15,65,1.30))
    assert r["senior_debt"]==pytest.approx(325)
    assert r["equity"]==pytest.approx(175)
    assert r["annual_debt_service"]>0 and r["dscr"]>1 and r["llcr"]>0

def test_zero_interest_case():
    r=calculate_project_finance(FinanceInputs(100,.5,0,10,8))
    assert r["annual_debt_service"]==pytest.approx(5)
    assert r["dscr"]==pytest.approx(1.6)

def test_invalid_leverage_rejected():
    with pytest.raises(ValueError):
        calculate_project_finance(FinanceInputs(100,1.2,.08,10,10))

def test_sensitivity_moves_dscr_with_cfads():
    rows=dscr_sensitivity(FinanceInputs(100,.5,.08,10,10))
    assert rows[0]["dscr"]<rows[-1]["dscr"]

def test_unknown_is_not_scored_as_match():
    rows=[DimensionEvidence("geography","No evidence","Brazil","unknown",
          "Investor country appetite has not been verified.")]
    assert overall_assessment(rows)=="insufficient_evidence"

def test_partial_evidence_requires_conditions():
    rows=[DimensionEvidence("sector","Transport","Road","strong_alignment",
          "Published strategy lists transport.",("SRC1",)),
          DimensionEvidence("country","Unknown","Brazil","unknown",
          "No public country appetite evidence yet.")]
    assert overall_assessment(rows)=="possible_with_conditions"
