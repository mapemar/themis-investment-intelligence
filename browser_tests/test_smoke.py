"""Browser smoke tests for the THEMIS static demo.

They open the page in a real Chromium and check what a user sees: every page renders, every
control works without console errors, legacy links still land on the right workspace, removed
(unverifiable) figures stay removed, and the layout fits a phone screen.

Run locally:   pytest browser_tests -q
Run on live:   THEMIS_URL=https://mapemar.github.io/themis-investment-intelligence/ pytest browser_tests -q
"""
import os
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = os.environ.get("THEMIS_URL") or (ROOT / "index.html").as_uri()
CHROME = os.environ.get("THEMIS_CHROME")
PAGES = ["home", "architecture", "clients", "opportunities", "country", "finance", "crm", "evidence"]
MIN_PAGE_HEIGHT = 300


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


def visible_pages(pg):
    return pg.evaluate("[...document.querySelectorAll('section.page')].filter(e => getComputedStyle(e).display !== 'none').map(e => e.id)")


def height(pg, pid):
    return pg.evaluate("id => { const e = document.getElementById(id); return e && getComputedStyle(e).display !== 'none' ? e.getBoundingClientRect().height : 0 }", pid)


def test_navigation_structure(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    assert page.evaluate("[...document.querySelectorAll('#nav a[data-page]')].map(a => a.dataset.page)") == PAGES
    assert height(page, "home") > MIN_PAGE_HEIGHT
    assert page.errors == []


def test_every_nav_item_shows_its_page(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    for pid in PAGES:
        page.click(f"#nav a[data-page='{pid}']")
        page.wait_for_timeout(120)
        assert height(page, pid) > MIN_PAGE_HEIGHT, f"page '{pid}' is blank"
        assert visible_pages(page) == [pid]
    assert page.errors == []


@pytest.mark.parametrize("old,new", [("investor", "clients"), ("italy", "clients"), ("origin", "opportunities"), ("pipeline", "opportunities"), ("match", "opportunities"), ("project", "finance"), ("finance", "finance"), ("crm", "crm")])
def test_old_and_deep_links(page, old, new):
    page.goto(f"{BASE_URL}#{old}")
    page.wait_for_timeout(500)
    assert visible_pages(page) == [new]


def test_overview_questions_route_to_workspaces(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    assert page.locator(".qcard").count() == 7
    page.locator(".qcard").nth(5).locator(".qstep").first.click()
    page.wait_for_timeout(200)
    assert visible_pages(page) == ["opportunities"]
    assert page.locator("#opInvestors").is_visible()
    assert page.errors == []


def test_all_buttons_and_tabs_click_without_errors(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    for pid in PAGES:
        page.click(f"#nav a[data-page='{pid}']")
        sel = f"#{pid} button, #{pid} .tab, #{pid} [onclick]"
        for i in range(page.locator(sel).count()):
            page.click(f"#nav a[data-page='{pid}']")
            el = page.locator(sel).nth(i)
            if el.is_visible():
                el.click(timeout=3000)
    assert page.errors == []


def test_client_desk_brief_and_integrity(page):
    page.goto(f"{BASE_URL}#clients")
    page.wait_for_timeout(500)
    assert page.locator("#idkRows tr[data-pid]").count() >= 15
    page.select_option("#idkFilter", "Insurers")
    assert page.locator("#idkRows tr[data-pid]").count() == 2
    page.goto(f"{BASE_URL}#crm")
    page.wait_for_timeout(400)
    page.select_option("#idkLang", "it")
    assert "Nota per l'incontro" in page.inner_text("#idkBriefOut")
    page.click("button[data-panel=enIntegrity]")
    page.select_option("select[data-check=eu]", "Flag")
    assert "flag" in page.inner_text("#idkIntegSummary").lower()
    assert page.errors == []


def test_first_look_screen_verdicts(page):
    page.goto(f"{BASE_URL}#finance")
    page.wait_for_timeout(500)
    page.select_option("#flOwn", "public")
    assert "Not an IFC investment" in page.inner_text("#flOut")
    page.select_option("#flOwn", "private")
    page.select_option("#flStage", "idea")
    assert "Early stage" in page.inner_text("#flOut")
    page.select_option("#flInteg", "flag")
    assert "Stop" in page.inner_text("#flOut")


def test_project_to_investors_and_development(page):
    page.goto(f"{BASE_URL}#opportunities")
    page.wait_for_timeout(400)
    page.click("button[data-panel=opInvestors]")
    assert "ASTM" in page.inner_text("#piOut")
    page.select_option("#piProject", "muc")
    assert "Contship" in page.inner_text("#piOut")
    page.click("button[data-panel=opDevelop]")
    page.locator(".dev-stage").nth(3).click()
    assert "Bankable" in page.inner_text("#devOut")
    assert page.errors == []


def test_every_desk_fact_has_a_source_and_register_is_built(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    missing = page.evaluate("(() => { const I = window.THEMIS_ITALY; const bad = []; I.prospects.forEach(p => p.facts.forEach(f => { if (!I.sources[f[1]] || !I.sources[f[1]].u) bad.push(p.id) })); return bad })()")
    assert missing == []
    page.click("#nav a[data-page='evidence']")
    assert page.locator("#srRows tr").count() > 30


def test_unverified_figures_stay_removed(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(500)
    text = page.evaluate("document.body.textContent")
    for removed in ["75.1% GDP", "40.1 percentile", "R$ 190.4bn", "rank 80/142"]:
        assert removed not in text


def test_finance_base_case_is_coherent(page):
    page.goto(f"{BASE_URL}#finance")
    page.wait_for_timeout(500)
    k = page.evaluate("[...document.querySelectorAll('#financeKpis .kpi strong')].map(e => parseFloat(e.innerText))")
    assert k[0] > 0 and k[1] > 0 and k[2] >= 1.3


@pytest.mark.parametrize("pid", PAGES)
def test_no_horizontal_overflow_on_mobile(browser, pid):
    pg = browser.new_page(viewport={"width": 390, "height": 844})
    pg.goto(f"{BASE_URL}#{pid}")
    pg.wait_for_timeout(400)
    assert pg.evaluate("document.documentElement.scrollWidth") <= 392
    pg.close()
