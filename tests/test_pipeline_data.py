import json
from pathlib import Path

def test_brazil_pipeline_source_references_resolve():
    payload=json.loads(Path("data/brazil_pipeline.json").read_text(encoding="utf-8"))
    source_ids={s["source_id"] for s in payload["sources"]}
    assert len(payload["projects"]) >= 5
    for project in payload["projects"]:
        assert project["source_ids"]
        assert set(project["source_ids"]).issubset(source_ids)
        assert project["project_status"] == "active_pipeline"
