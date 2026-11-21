"""Browser smoke tests for the THEMIS static demo.

Syntax checks alone did not catch the blank-page regression (a CSS rule hid the
active page). These tests open the page in a real Chromium and check what a user
actually sees.

Run locally:   pytest browser_tests -q
Run on live:   THEMIS_URL=https://mapemar.github.io/themis-investment-intelligence/ pytest browser_tests -q
"""
import os
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = os.environ.get("THEMIS_URL") or (ROOT / "index.html").as_uri()
CHROME = os.environ.get("THEMIS_CHROME")  # optional path to a system Chrome

EXPECTED_ORDER = ["home", "architecture"]  # Overview first, AI Architecture second
MIN_PAGE_HEIGHT = 300  # px; a visible workspace is always taller than this


@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as p:
        kwargs = {"args": ["--no-sandbox"]}
        if CHROME:
            kwargs["executable_path"] = CHROME
        b = p.chromium.launch(**kwargs)
        yield b
        b.close()


@pytest.fixture()
def page(browser):
    pg = browser.new_page(viewport={"width": 1400, "height": 900})
    pg.errors = []
    pg.on("pageerror", lambda e: pg.errors.append(f"pageerror: {e}"))
    pg.on("console", lambda m: pg.errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
    pg.on("dialog", lambda d: d.dismiss())
    yield pg
    pg.close()


def nav_ids(pg):
    return pg.evaluate("[...document.querySelectorAll('#nav a[data-page]')].map(a => a.dataset.page)")


def visible_height(pg, pid):
    return pg.evaluate(
        "id => { const e = document.getElementById(id);"
        " return e && getComputedStyle(e).display !== 'none' ? e.getBoundingClientRect().height : 0 }",
        pid,
    )


def test_loads_without_errors_and_overview_first(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    ids = nav_ids(page)
    assert ids[:2] == EXPECTED_ORDER
    assert len(ids) >= 9
    assert visible_height(page, "home") > MIN_PAGE_HEIGHT
    assert page.errors == []


def test_every_nav_item_shows_its_page(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    for pid in nav_ids(page):
        page.click(f"#nav a[data-page='{pid}']")
        page.wait_for_timeout(150)
        assert visible_height(page, pid) > MIN_PAGE_HEIGHT, f"page '{pid}' is blank after navigation"
        shown = page.evaluate("[...document.querySelectorAll('.page')].filter(e => getComputedStyle(e).display !== 'none').map(e => e.id)")
        assert shown == [pid], f"expected only '{pid}' visible, got {shown}"
    assert page.errors == []


@pytest.mark.parametrize("pid", ["investor", "finance", "crm"])
def test_deep_link_opens_page(page, pid):
    page.goto(f"{BASE_URL}#{pid}")
    page.wait_for_timeout(500)
    assert visible_height(page, pid) > MIN_PAGE_HEIGHT


def test_investor_selects_populated(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    for sid in ["iiProfileSelect", "iiEngageInvestor"]:
        n = page.evaluate("id => { const e = document.getElementById(id); return e ? e.options.length : -1 }", sid)
        assert n > 0, f"#{sid} has no investor options"
    assert page.errors == []


def test_finance_kpis_render(page):
    page.goto(f"{BASE_URL}#finance")
    page.wait_for_timeout(500)
    kpis = page.evaluate("[...document.querySelectorAll('#finance .kpi')].map(e => e.innerText)")
    assert len(kpis) >= 4
    assert all(any(ch.isdigit() for ch in k) for k in kpis[:4])


def test_all_buttons_and_tabs_click_without_errors(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    for pid in nav_ids(page):
        page.click(f"#nav a[data-page='{pid}']")
        sel = f"#{pid} button, #{pid} .tab, #{pid} [onclick]"
        for i in range(page.locator(sel).count()):
            page.click(f"#nav a[data-page='{pid}']")
            el = page.locator(sel).nth(i)
            if el.is_visible():
                el.click(timeout=3000)
    assert page.errors == []


def test_italy_client_desk_workflow(page):
    page.goto(f"{BASE_URL}#italy")
    page.wait_for_timeout(500)
    assert page.locator("#idkRows tr[data-pid]").count() >= 15
    page.select_option("#idkFilter", "Insurers")
    assert page.locator("#idkRows tr[data-pid]").count() == 2
    page.select_option("#idkFilter", "All")
    page.click("button[data-idk=idkBrief]")
    page.select_option("#idkLang", "it")
    assert "Nota per l'incontro" in page.inner_text("#idkBriefOut")
    page.click("button[data-idk=idkIntegrity]")
    page.select_option("select[data-check=eu]", "Flag")
    assert "flag" in page.inner_text("#idkIntegSummary").lower()
    assert page.errors == []


def test_client_led_origination_and_organiser(page):
    page.goto(f"{BASE_URL}#origin")
    page.wait_for_timeout(500)
    page.select_option("#coRegion", "Latin America")
    out = page.inner_text("#coOut")
    assert "Possible World Bank Group route" in out and "Enel" in out
    page.goto(f"{BASE_URL}#crm")
    page.wait_for_timeout(300)
    page.click("#orgBuild")
    assert "Invitee shortlist" in page.inner_text("#orgOut")
    assert page.errors == []


def test_every_fact_on_italy_desk_has_a_source(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    missing = page.evaluate(
        "(() => { const I = window.THEMIS_ITALY; const bad = [];"
        " I.prospects.forEach(p => p.facts.forEach(f => { if (!I.sources[f[1]] || !I.sources[f[1]].u) bad.push(p.id) }));"
        " return bad })()"
    )
    assert missing == []


def test_finance_base_case_is_coherent(page):
    page.goto(f"{BASE_URL}#finance")
    page.wait_for_timeout(500)
    kpis = page.evaluate("[...document.querySelectorAll('#financeKpis .kpi strong')].map(e => parseFloat(e.innerText))")
    npv, irr, min_dscr = kpis[0], kpis[1], kpis[2]
    assert npv > 0 and irr > 0 and min_dscr >= 1.3


@pytest.mark.parametrize("pid", ["home", "italy", "country", "finance", "crm"])
def test_no_horizontal_overflow_on_mobile(browser, pid):
    pg = browser.new_page(viewport={"width": 390, "height": 844})
    pg.goto(f"{BASE_URL}#{pid}")
    pg.wait_for_timeout(400)
    assert pg.evaluate("document.documentElement.scrollWidth") <= 392
    pg.close()
