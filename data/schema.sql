-- THEMIS initial relational data model (PostgreSQL-compatible; SQLite adaptation is straightforward)
-- No seed facts are included. Populate only from source-backed research.

CREATE TABLE sources (
  source_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  publication_date DATE,
  retrieved_at TIMESTAMP NOT NULL,
  document_version TEXT,
  language TEXT,
  sha256 TEXT,
  notes TEXT
);

CREATE TABLE investors (
  investor_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  investor_type TEXT NOT NULL,
  country_of_origin TEXT,
  record_status TEXT NOT NULL DEFAULT 'draft',
  last_reviewed DATE NOT NULL
);

CREATE TABLE investor_claims (
  claim_id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(investor_id),
  claim_category TEXT NOT NULL,
  statement TEXT NOT NULL,
  claim_status TEXT NOT NULL,
  confidence TEXT NOT NULL DEFAULT 'not_assessed',
  publication_date DATE,
  notes TEXT
);

CREATE TABLE investor_claim_sources (
  claim_id TEXT NOT NULL REFERENCES investor_claims(claim_id),
  source_id TEXT NOT NULL REFERENCES sources(source_id),
  PRIMARY KEY (claim_id, source_id)
);

CREATE TABLE projects (
  project_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  subnational_location TEXT,
  sector TEXT NOT NULL,
  subsector TEXT,
  project_status TEXT NOT NULL,
  maturity TEXT NOT NULL,
  public_authority TEXT,
  sponsor TEXT,
  description TEXT,
  concession_term_years NUMERIC,
  record_status TEXT NOT NULL DEFAULT 'draft',
  last_reviewed DATE NOT NULL
);

CREATE TABLE project_claims (
  claim_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(project_id),
  claim_category TEXT NOT NULL,
  statement TEXT NOT NULL,
  claim_status TEXT NOT NULL,
  confidence TEXT NOT NULL DEFAULT 'not_assessed',
  notes TEXT
);

CREATE TABLE project_claim_sources (
  claim_id TEXT NOT NULL REFERENCES project_claims(claim_id),
  source_id TEXT NOT NULL REFERENCES sources(source_id),
  PRIMARY KEY (claim_id, source_id)
);

CREATE TABLE transactions (
  transaction_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  project_id TEXT REFERENCES projects(project_id),
  transaction_type TEXT NOT NULL,
  status TEXT NOT NULL,
  amount_value NUMERIC,
  currency CHAR(3),
  amount_unit TEXT,
  amount_basis TEXT,
  announcement_date DATE,
  claim_status TEXT NOT NULL,
  separation_note TEXT
);

CREATE TABLE transaction_investors (
  transaction_id TEXT NOT NULL REFERENCES transactions(transaction_id),
  investor_id TEXT NOT NULL REFERENCES investors(investor_id),
  role TEXT,
  PRIMARY KEY (transaction_id, investor_id)
);

CREATE TABLE transaction_sources (
  transaction_id TEXT NOT NULL REFERENCES transactions(transaction_id),
  source_id TEXT NOT NULL REFERENCES sources(source_id),
  PRIMARY KEY (transaction_id, source_id)
);

CREATE TABLE matches (
  match_id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(investor_id),
  project_id TEXT NOT NULL REFERENCES projects(project_id),
  overall_assessment TEXT NOT NULL,
  human_review_status TEXT NOT NULL DEFAULT 'not_reviewed',
  disclaimer TEXT NOT NULL DEFAULT 'Analytical hypothesis only; not investor appetite, commitment, credit approval or IFC endorsement.'
);

CREATE TABLE match_dimensions (
  match_dimension_id TEXT PRIMARY KEY,
  match_id TEXT NOT NULL REFERENCES matches(match_id),
  dimension TEXT NOT NULL,
  assessment TEXT NOT NULL,
  rationale TEXT NOT NULL,
  information_gaps TEXT
);

CREATE TABLE match_dimension_sources (
  match_dimension_id TEXT NOT NULL REFERENCES match_dimensions(match_dimension_id),
  source_id TEXT NOT NULL REFERENCES sources(source_id),
  PRIMARY KEY (match_dimension_id, source_id)
);
