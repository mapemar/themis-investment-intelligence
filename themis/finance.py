"""Transparent deterministic project-finance screening calculations."""
from dataclasses import dataclass, asdict
from math import isfinite

@dataclass(frozen=True)
class FinanceInputs:
    project_cost: float
    debt_share: float
    annual_interest_rate: float
    tenor_years: int
    annual_cfads: float
    minimum_dscr: float = 1.30

def _validate(x):
    vals=[x.project_cost,x.debt_share,x.annual_interest_rate,x.annual_cfads,x.minimum_dscr]
    if not all(isfinite(v) for v in vals): raise ValueError("Inputs must be finite.")
    if x.project_cost<=0: raise ValueError("project_cost must be positive.")
    if not 0<=x.debt_share<=1: raise ValueError("debt_share must be between 0 and 1.")
    if x.annual_interest_rate<0: raise ValueError("Interest rate cannot be negative.")
    if not isinstance(x.tenor_years,int) or x.tenor_years<=0: raise ValueError("Tenor must be a positive integer.")
    if x.annual_cfads<0: raise ValueError("CFADS cannot be negative.")
    if x.minimum_dscr<=0: raise ValueError("Minimum DSCR must be positive.")

def calculate_project_finance(x: FinanceInputs):
    """Level-payment debt service, constant CFADS DSCR and simplified LLCR."""
    _validate(x)
    debt=x.project_cost*x.debt_share
    equity=x.project_cost-debt
    r,n=x.annual_interest_rate,x.tenor_years
    if debt==0: debt_service=0.0
    elif r==0: debt_service=debt/n
    else: debt_service=debt*r/(1-(1+r)**(-n))
    dscr=float("inf") if debt_service==0 else x.annual_cfads/debt_service
    pv_cfads=sum(x.annual_cfads/(1+r)**year for year in range(1,n+1))
    llcr=None if debt==0 else pv_cfads/debt
    return {"inputs":asdict(x),"senior_debt":debt,"equity":equity,
            "annual_debt_service":debt_service,"dscr":dscr,"llcr":llcr,
            "dscr_headroom":dscr-x.minimum_dscr,"meets_minimum_dscr":dscr>=x.minimum_dscr,
            "methodology":{"debt_service":"Level-payment annuity; annual periods.",
            "dscr":"Annual CFADS / annual debt service.",
            "llcr":"PV of constant annual CFADS over tenor, discounted at debt rate, / opening debt."},
            "limitations":["Constant annual CFADS; no construction ramp-up or seasonality.",
            "No taxes, working capital, reserves, fees, grace period, balloon or refinancing.",
            "No sculpted amortisation or cash sweep.","Not a lender model or credit decision."]}

def dscr_sensitivity(inputs: FinanceInputs, cfads_multipliers=(0.8,0.9,1.0,1.1,1.2)):
    rows=[]
    for m in cfads_multipliers:
        s=FinanceInputs(inputs.project_cost,inputs.debt_share,inputs.annual_interest_rate,
                        inputs.tenor_years,inputs.annual_cfads*m,inputs.minimum_dscr)
        r=calculate_project_finance(s)
        rows.append({"cfads_multiplier":float(m),"annual_cfads":s.annual_cfads,
                     "dscr":r["dscr"],"llcr":r["llcr"] or 0.0,
                     "meets_minimum_dscr":r["meets_minimum_dscr"]})
    return rows
