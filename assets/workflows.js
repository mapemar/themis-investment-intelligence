/* THEMIS · question-driven workflows
 * Overview by question, page tabs, European comparators, project → investors, project development,
 * first-look screening, live World Bank country data and a single source register.
 * Every factual statement carries a source; hypotheses are labelled. Renders into empty containers.
 */
(function () {
  'use strict';
  var CHECKED = '21 Nov 2026';
  function $(id) { return document.getElementById(id); }
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function a(u, t) { return '<a class="source-link" href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(t) + '</a>'; }
  function I() { return window.THEMIS_ITALY || { prospects: [], score: function () { return 0; }, tier: function () { return 'C'; }, byId: function () { return null; } }; }

  var SRC = {
    apply: ['https://www.ifc.org/en/what-we-do/products-and-services/how-to-apply-for-financing', 'IFC — How to apply for financing (eligibility criteria, investment proposal)'],
    applyWE: ['https://www.mfcr.cz/assets/cs/media/2021-01-08_How-to-work-with-IFC.pdf', 'IFC Western Europe — How to work with IFC (eligibility list)'],
    partial: ['https://www.tradecommissioner.gc.ca/en/our-solutions/international-procurement/international-financial-institutions-united-nations-bilateral-aid-agencies-procurement/get-know-ifis-un-aid-agencies/international-finance-corporation.html', 'Government of Canada TCS — IFC eligibility and co-financing'],
    escat: ['https://www.ifc.org/en/what-we-do/sector-expertise/sustainability/policies-and-standards/environmental-and-social-categorization', 'IFC — Environmental and social categorization'],
    ps: ['https://www.ifc.org/content/dam/ifc/doc/mgrt/ifc-performance-standards.pdf', 'IFC Performance Standards on Environmental and Social Sustainability (2012)'],
    upstream: ['https://www.ifc.org/WorkingUpstream', 'IFC — Working Upstream'],
    ppp: ['https://www.ifc.org/en/what-we-do/sector-expertise/public-private-partnerships', 'IFC — PPP Transaction Advisory'],
    miga: ['https://www.ifc.org/en/what-we-do/sector-expertise/syndicated-loans-and-mobilization/miga-guarantees', 'IFC — MIGA guarantees'],
    synd: ['https://www.ifc.org/en/what-we-do/sector-expertise/syndicated-loans-and-mobilization', 'IFC — Syndicated Loans and Mobilization'],
    idbcdp: ['https://www.iadb.org/en/news/idb-group-and-italy-agree-establish-cooperation-facility-mobilize-investment-latin-america-and', 'IDB Group — cooperation facility with CDP for Latin America'],
    wbapi: ['https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation', 'World Bank — Indicators API documentation']
  };
  function s(k) { return a(SRC[k][0], SRC[k][1]); }

  // ---------------------------------------------------------------- page tabs
  function pg(group, panel) {
    var bar = document.querySelector('.pg-tabs[data-group="' + group + '"]'); if (!bar) return;
    var page = bar.closest('section');
    bar.querySelectorAll('.tab').forEach(function (b) { b.classList.toggle('active', b.dataset.panel === panel); });
    page.querySelectorAll(':scope > .pg-panel').forEach(function (p) { p.classList.toggle('active', p.id === panel); });
  }
  window.THEMIS_PG = pg;
  function bindTabs() {
    document.querySelectorAll('.pg-tabs').forEach(function (bar) {
      bar.querySelectorAll('.tab').forEach(function (b) { b.addEventListener('click', function () { pg(bar.dataset.group, b.dataset.panel); }); });
    });
  }
  function open(page, group, panel) { if (window.go) window.go(page); if (group) pg(group, panel); window.scrollTo({ top: 0 }); }

  // ---------------------------------------------------------------- Overview: questions
  var QUESTIONS = [
    { q: 'Who should I talk to in Italy, and why?', path: [['clients', 'cl', 'clItaly', 'Clients & Investors']], out: 'Prioritised prospects with sourced facts, IFC relationship and a transparent score.', status: 'Working' },
    { q: 'An Italian client wants to invest in country X: what can the World Bank Group offer?', path: [['opportunities', 'op', 'opClient', 'Opportunities'], ['country', null, null, 'Country Intelligence']], out: 'Possible WBG route, Italian precedents and information gaps.', status: 'Working' },
    { q: 'A project proposal has landed on my desk: is it worth pursuing?', path: [['finance', null, null, 'First-look screen'], ['country', null, null, 'Country Intelligence'], ['finance', null, null, 'Bankability test']], out: 'Screening note (proceed, request information or refer) and a bankability test.', status: 'Working · model uses synthetic defaults' },
    { q: 'How does country X look to an investor?', path: [['country', null, null, 'Country Intelligence']], out: 'Brazil: verified country note. Any other country: live World Bank indicators.', status: 'Working' },
    { q: 'Which projects could become IFC deals?', path: [['opportunities', 'op', 'opPipeline', 'Public pipeline'], ['opportunities', 'op', 'opDevelop', 'Develop a project']], out: 'Source-backed pipeline and the steps an immature project needs to become bankable.', status: 'Partly · pipeline sample covers Brazil' },
    { q: 'Which Italian investor could co-finance this project?', path: [['opportunities', 'op', 'opInvestors', 'From project to investors']], out: 'Shortlist with role, rationale, precedent, gaps and priority.', status: 'Working · rationales are hypotheses' },
    { q: 'I have a meeting or an event next week: what do I prepare?', path: [['crm', 'en', 'enPrepare', 'Meeting brief'], ['crm', 'en', 'enIntegrity', 'Integrity'], ['crm', 'en', 'enEvents', 'Events']], out: 'Brief in English or Italian, integrity pre-screen, event plan and follow-up.', status: 'Working' }
  ];
  var MAP = [
    ['clients', '01 · Clients & Investors', 'Italian prospects and European comparators.'],
    ['opportunities', '02 · Opportunities', 'Client-led origination, public pipeline, project → investors, project development.'],
    ['country', '03 · Country Intelligence', 'Verified Brazil diagnostic; live World Bank data for any country.'],
    ['finance', '04 · Project Assessment & Finance', 'First-look screen, assessment register, cash-flow model, scenarios.'],
    ['crm', '05 · Engagement', 'Meeting brief, integrity pre-screen, events, WBG coordination, action log.'],
    ['evidence', '06 · Sources & Evidence', 'Every source used on the platform, in one register.'],
    ['architecture', 'AI · Architecture & Agents', 'How the platform could be extended with AI agents, and how AI output is verified.']
  ];
  function renderOverview() {
    var el = $('questionCards'); if (!el) return;
    el.innerHTML = '<div class="section"><div><h2>What do you need to do?</h2><p>Start from the question. Each card shows the path through the platform, what you get at the end and what is working today.</p></div></div>' +
      '<div class="qcards">' + QUESTIONS.map(function (x, i) {
        return '<div class="qcard"><div class="qnum">' + (i + 1) + '</div><h3>' + esc(x.q) + '</h3>' +
          '<p class="qpath">' + x.path.map(function (p, j) { return '<button class="qstep" data-q="' + i + '" data-s="' + j + '">' + esc(p[3]) + '</button>'; }).join('<span>→</span>') + '</p>' +
          '<p><b>You get:</b> ' + esc(x.out) + '</p><span class="tag ' + (x.status.indexOf('Working') === 0 ? 'live' : 'review') + '">' + esc(x.status) + '</span></div>';
      }).join('') + '</div>';
    el.querySelectorAll('.qstep').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = QUESTIONS[+b.dataset.q].path[+b.dataset.s];
        open(p[0], p[1], p[2]);
        if (p[3] === 'First-look screen' && $('firstLook')) $('firstLook').scrollIntoView();
        if (p[3] === 'Bankability test' && $('fatabs')) $('fatabs').scrollIntoView();
      });
    });
    $('structureMap').innerHTML = '<div class="section"><div><h2>How the platform is organised</h2><p>Six workspaces follow the business-development sequence; the AI page explains how agents could support each step.</p></div></div>' +
      '<div class="smap">' + MAP.map(function (m) { return '<button class="smap-item" data-go="' + m[0] + '"><b>' + esc(m[1]) + '</b><span>' + esc(m[2]) + '</span></button>'; }).join('') + '</div>';
    $('structureMap').querySelectorAll('.smap-item').forEach(function (b) { b.addEventListener('click', function () { open(b.dataset.go); }); });
  }

  // ---------------------------------------------------------------- European comparators
  function renderEuro() {
    var el = $('euroComparators'); if (!el) return;
    var list = (window.iiInstitutions || []).filter(function (x) { return x.country !== 'Italy'; }).map(function (x) {
      return { name: x.name, country: x.name === 'Macquarie Asset Management' ? 'Australia' : x.country, category: x.category, role: x.role, url: x.url, research: x.research };
    });
    el.innerHTML = '<div class="card"><p class="mini">Comparators for Italian prospects: basic identification only (name, country, category, role, official website) plus the research questions to answer. Mandates, appetite, ticket sizes and IFC relationships are not stated because they have not been verified.</p>' +
      '<div class="idk-table"><table><thead><tr><th>Institution</th><th>Country</th><th>Category</th><th>Role</th><th>Research questions</th></tr></thead><tbody>' +
      list.map(function (x) { return '<tr><td><b>' + esc(x.name) + '</b><br>' + a(x.url, 'Official website') + '</td><td>' + esc(x.country) + '</td><td>' + esc(x.category) + '</td><td>' + esc(x.role) + '</td><td class="mini">' + esc(x.research) + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>';
  }

  // ---------------------------------------------------------------- Project → investors
  var PROJECTS = [
    { id: 'r2j', name: 'Rota 2 de Julho (road, Bahia)', sector: 'road', region: 'Latin America' },
    { id: 'rac', name: 'Rota Agro Central (road, Mato Grosso / Rondônia)', sector: 'road', region: 'Latin America' },
    { id: 'peq', name: 'Rota do Pequi (road, DF / Goiás)', sector: 'road', region: 'Latin America' },
    { id: 'ris', name: 'Rota Integração do Sul (road, Rio Grande do Sul)', sector: 'road', region: 'Latin America' },
    { id: 'muc', name: 'MUC04 (container terminal, Fortaleza)', sector: 'port', region: 'Latin America' },
    { id: 'iqi', name: 'IQI16 (fertiliser terminal, Itaqui)', sector: 'port', region: 'Latin America' }
  ];
  var CANDIDATES = [
    { id: 'astm', sectors: ['road'], role: 'Sponsor / bidder or equity partner', why: 'Documented IFC relationship in Brazilian road concessions through Ecorodovias (2023).', gap: 'Bidding intentions are not public; confirm interest and capacity directly.' },
    { id: 'contship', sectors: ['port'], role: 'Terminal sponsor or operator', why: 'Documented IFC financing of a container terminal it co-owns in Egypt (2023).', gap: 'No Latin American footprint verified in the sources reviewed.' },
    { id: 'webuild', sectors: ['road', 'port'], role: 'EPC contractor or PPP co-sponsor', why: 'Track record on large infrastructure in emerging markets.', gap: 'Reports a strategy concentrated on low-risk markets: test appetite before positioning.' },
    { id: 'cdp', sectors: ['road', 'port'], role: 'Parallel lender / co-investor', why: 'Master cooperation agreement with IFC (2015); cooperation facility with the IDB Group for Latin America.', gap: 'Eligibility of the specific country and sector under CDP\'s mandate.', extra: 'idbcdp' },
    { id: 'sace', sectors: ['road', 'port'], role: 'Export-credit cover for Italian supply', why: 'Relevant only if Italian contractors or equipment suppliers are involved.', gap: 'Italian content of the project.' },
    { id: 'simest', sectors: ['road', 'port'], role: 'Equity support to an Italian sponsor', why: 'Supports the international expansion of Italian companies.', gap: 'Requires an Italian sponsor taking equity.' },
    { id: 'isp', sectors: ['road', 'port'], role: 'B-loan or parallel lender; trade finance', why: 'Documented IFC relationship (equity co-investment, affiliate lending, GTFP).', gap: 'Brazilian footprint and appetite for long-tenor infrastructure risk not verified.' },
    { id: 'ucg', sectors: ['road', 'port'], role: 'B-loan or parallel lender', why: 'Documented IFC relationship (bond investments in its Romanian subsidiary; GTFP).', gap: 'Latin American lending appetite not verified.' },
    { id: 'gen', sectors: ['road', 'port'], role: 'Indirect, through an MCPP-type portfolio', why: 'Insurers participate in IFC loans on a portfolio basis rather than deal by deal.', gap: 'Not project-specific: discuss portfolio participation instead.' },
    { id: 'unipol', sectors: ['road', 'port'], role: 'Indirect, through an MCPP-type portfolio', why: 'As above.', gap: 'Not project-specific.' }
  ];
  function renderProjectInvestors() {
    var el = $('projectInvestors'); if (!el) return;
    el.innerHTML = '<div class="card"><p class="mini">Shortlist Italian co-investors for a project in the public pipeline. Roles and rationales are hypotheses built from documented facts on the Client Desk; nothing here indicates actual interest.</p>' +
      '<div class="input-grid"><div class="field"><label>Project</label><select id="piProject">' + PROJECTS.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>Main financing need</label><select id="piNeed"><option value="debt">Long-tenor senior debt</option><option value="equity">Equity partner</option><option value="risk">Risk mitigation</option></select></div></div>' +
      '<div id="piOut"></div></div>';
    ['piProject', 'piNeed'].forEach(function (id) { $(id).addEventListener('change', runPI); });
    runPI();
  }
  function runPI() {
    var it = I(), pr = PROJECTS.filter(function (p) { return p.id === $('piProject').value; })[0], need = $('piNeed').value;
    var rows = CANDIDATES.filter(function (c) { return c.sectors.indexOf(pr.sector) > -1; }).map(function (c) {
      var p = it.byId(c.id); if (!p) return null;
      var sc = it.score(p), fit = 1;
      if ((c.id === 'astm' && pr.sector === 'road') || (c.id === 'contship' && pr.sector === 'port')) fit = 3;
      else if (['cdp', 'isp', 'ucg'].indexOf(c.id) > -1 && need === 'debt') fit = 2;
      else if (['astm', 'contship', 'simest'].indexOf(c.id) > -1 && need === 'equity') fit = 2;
      else if (c.id === 'sace' && need === 'risk') fit = 2;
      var pri = fit === 3 ? 'High' : (fit === 2 && sc >= 45 ? 'Medium' : 'Low');
      return { c: c, p: p, sc: sc, pri: pri, order: fit * 100 + sc };
    }).filter(Boolean).sort(function (x, y) { return y.order - x.order; });
    var riskNote = need === 'risk' ? '<p><b>Also consider MIGA:</b> political-risk insurance and credit enhancement for sponsors and lenders. ' + s('miga') + '</p>' : '';
    $('piOut').innerHTML = '<div class="idk-table"><table><thead><tr><th>Italian investor</th><th>Possible role</th><th>Why relevant (documented)</th><th>Information gap</th><th>Priority</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><td><b>' + esc(r.p.name) + '</b><br><span class="mini">Desk score ' + r.sc + ' · ' + esc(r.p.ifcRecord) + '</span></td><td>' + esc(r.c.role) + '</td><td>' + esc(r.c.why) + (r.c.extra ? '<br>' + s(r.c.extra) : '') + '</td><td class="mini">' + esc(r.c.gap) + '</td><td><span class="idk-score t' + (r.pri === 'High' ? 'A' : r.pri === 'Medium' ? 'B' : 'C') + '">' + r.pri + '</span></td></tr>';
      }).join('') + '</tbody></table></div>' + riskNote +
      '<p class="mini">Pension funds, asset managers, foundations and family offices are not listed for single projects: their route is through portfolio or fund structures. Priority combines sector precedent, the financing need and the Client Desk score.</p>';
  }

  // ---------------------------------------------------------------- Develop a project
  var STAGES = [
    { id: 'idea', name: '1 · Idea / market gap', need: ['Evidence of demand or a market gap', 'A sponsor or a government champion', 'View on policy or regulatory barriers'],
      tools: ['IFC Upstream: identifies public-sector reforms that unlock private investment and creates projects to offer to investors', 'World Bank country team when a reform is the binding constraint'], src: ['upstream'] },
    { id: 'concept', name: '2 · Concept / pre-feasibility', need: ['Pre-feasibility study and site options', 'Preliminary risk allocation (who bears demand, construction, regulatory risk)', 'First environmental and social screening'],
      tools: ['IFC Upstream early-stage project development', 'IFC PPP Transaction Advisory for government-led infrastructure: project selection and preparation, structuring, competitive bidding'], src: ['upstream', 'ppp'] },
    { id: 'feas', name: '3 · Feasibility & structuring', need: ['Bankable feasibility study', 'Environmental and social assessment under Performance Standard 1', 'Financial model and financing plan', 'Permits, land and concession documents'],
      tools: ['IFC PPP Transaction Advisory (if PPP)', 'Early dialogue with the relevant IFC Industry team', 'MIGA if political risk is a barrier for sponsors or lenders'], src: ['ppp', 'ps', 'miga'] },
    { id: 'bank', name: '4 · Bankable / financing', need: ['Investment proposal: sponsorship and management, market, technical feasibility, investment and financing plan, government support and regulation, environmental and social aspects', 'Committed sponsor equity', 'Co-financing: IFC does not fund a project in full'],
      tools: ['IFC loans or equity', 'Mobilisation: B loans, parallel loans, MCPP', 'MIGA guarantees'], src: ['apply', 'partial', 'synd', 'miga'] }
  ];
  function renderDevelop() {
    var el = $('developProject'); if (!el) return;
    el.innerHTML = '<div class="card"><p class="mini">Where is the project, what does it need to reach the next stage, and which World Bank Group instruments fit at that stage. Brazilian examples: Rota Integração do Sul is an upcoming notice; Rota 2 de Julho is at auction.</p>' +
      '<div class="dev-stages">' + STAGES.map(function (st, i) { return '<button class="dev-stage' + (i === 0 ? ' active' : '') + '" data-st="' + st.id + '">' + esc(st.name) + '</button>'; }).join('') + '</div><div id="devOut" class="result"></div></div>';
    el.querySelectorAll('.dev-stage').forEach(function (b) { b.addEventListener('click', function () { el.querySelectorAll('.dev-stage').forEach(function (x) { x.classList.toggle('active', x === b); }); runDev(b.dataset.st); }); });
    runDev('idea');
  }
  function runDev(id) {
    var i = STAGES.map(function (x) { return x.id; }).indexOf(id), st = STAGES[i], next = STAGES[i + 1];
    $('devOut').innerHTML = '<h3>' + esc(st.name) + '</h3><div class="grid two"><div><h4>What the project needs at this stage</h4><ul>' + st.need.map(function (n) { return '<li><label><input type="checkbox"> ' + esc(n) + '</label></li>'; }).join('') + '</ul></div>' +
      '<div><h4>World Bank Group instruments that fit</h4><ul>' + st.tools.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><p>' + st.src.map(s).join('<br>') + '</p></div></div>' +
      (next ? '<p><b>To move to "' + esc(next.name) + '":</b> complete the items above, then reassess with the first-look screen.</p>' : '<p><b>Next:</b> run the first-look screen and the bankability test, then involve the Industry team.</p>') +
      '<p><button class="btn alt" id="devToScreen">Open the first-look screen →</button></p>';
    $('devToScreen').addEventListener('click', function () { open('finance'); $('firstLook').scrollIntoView(); });
  }

  // ---------------------------------------------------------------- First-look screen
  var COUNTRIES = [['BR', 'Brazil'], ['AR', 'Argentina'], ['CL', 'Chile'], ['CO', 'Colombia'], ['MX', 'Mexico'], ['PE', 'Peru'], ['EG', 'Egypt'], ['MA', 'Morocco'], ['TN', 'Tunisia'], ['JO', 'Jordan'], ['IQ', 'Iraq'], ['KE', 'Kenya'], ['ET', 'Ethiopia'], ['TZ', 'Tanzania'], ['NG', 'Nigeria'], ['GH', 'Ghana'], ['CI', "Côte d'Ivoire"], ['SN', 'Senegal'], ['ZA', 'South Africa'], ['MZ', 'Mozambique'], ['IN', 'India'], ['BD', 'Bangladesh'], ['PK', 'Pakistan'], ['ID', 'Indonesia'], ['VN', 'Viet Nam'], ['PH', 'Philippines'], ['TR', 'Türkiye'], ['UA', 'Ukraine'], ['RO', 'Romania'], ['RS', 'Serbia'], ['KZ', 'Kazakhstan'], ['UZ', 'Uzbekistan']];
  var DOCS = ['Feasibility study', 'Business plan and financial model', 'Environmental and social assessment', 'Permits, licences or concession documents', 'Sponsor audited financial statements', 'Proposed financing structure'];
  var ES = [['PS5', 'Land acquisition or involuntary resettlement'], ['PS6', 'Biodiversity or critical habitat'], ['PS7', 'Indigenous Peoples'], ['PS8', 'Cultural heritage'], ['PS3', 'Significant emissions or pollution']];
  function opts(list) { return list.map(function (c) { return '<option value="' + c[0] + '">' + esc(c[1]) + '</option>'; }).join(''); }
  function renderFirstLook() {
    var el = $('firstLook'); if (!el) return;
    el.innerHTML = '<div class="card fl-card"><span class="tag live">Step 0 · First-look screen</span><h2 style="margin-top:8px">Is this proposal worth pursuing?</h2>' +
      '<p class="mini">Checks an incoming proposal against IFC\'s published eligibility criteria, flags environmental and social sensitivities and lists missing information. It does not replace appraisal, integrity due diligence or any IFC decision.</p>' +
      '<div class="input-grid"><div class="field"><label>Project</label><input id="flName" value="Illustrative toll-road concession"></div>' +
      '<div class="field"><label>Country</label><select id="flCountry">' + opts(COUNTRIES) + '</select></div>' +
      '<div class="field"><label>Ownership</label><select id="flOwn"><option value="private">Private sponsor</option><option value="mixed">Mixed, private participation, run commercially</option><option value="public">Public entity, no private sponsor</option></select></div>' +
      '<div class="field"><label>Sponsor track record</label><select id="flSponsor"><option value="yes">Documented</option><option value="partial">Partial</option><option value="no">Unknown</option></select></div>' +
      '<div class="field"><label>Stage</label><select id="flStage"><option value="idea">Idea</option><option value="concept">Concept / pre-feasibility</option><option value="feas">Feasibility done</option><option value="bank">Bankable, financing sought</option></select></div>' +
      '<div class="field"><label>Integrity pre-screen</label><select id="flInteg"><option value="ns">Not started</option><option value="clear">No flags</option><option value="flag">Flag raised</option></select></div></div>' +
      '<div class="grid two"><div><h4>Documents received</h4>' + DOCS.map(function (d, i) { return '<label class="fl-check"><input type="checkbox" data-doc="' + i + '"' + (i < 2 ? ' checked' : '') + '> ' + esc(d) + '</label>'; }).join('') + '</div>' +
      '<div><h4>Known environmental and social sensitivities</h4>' + ES.map(function (e) { return '<label class="fl-check"><input type="checkbox" data-es="' + e[0] + '"> ' + esc(e[1]) + ' <span class="mini">(' + e[0] + ')</span></label>'; }).join('') + '</div></div>' +
      '<div id="flOut" class="result"></div></div>';
    el.querySelectorAll('input,select').forEach(function (x) { x.addEventListener('change', runFL); x.addEventListener('input', runFL); });
    $('flStage').value = 'feas';
    runFL();
  }
  function runFL() {
    var c = $('flCountry'), cname = c.options[c.selectedIndex].text, own = $('flOwn').value, sp = $('flSponsor').value, stg = $('flStage').value, integ = $('flInteg').value;
    var docs = [].slice.call(document.querySelectorAll('#firstLook [data-doc]')).map(function (x) { return x.checked; });
    var es = [].slice.call(document.querySelectorAll('#firstLook [data-es]:checked')).map(function (x) { return x.dataset.es; });
    var missing = DOCS.filter(function (d, i) { return !docs[i]; });
    var verdict, cls, why = [];
    if (integ === 'flag') { verdict = 'Stop: escalate the integrity flag'; cls = 'C'; why.push('An integrity flag must be resolved through IFC integrity due diligence before any further work.'); }
    else if (own === 'public') { verdict = 'Not an IFC investment as submitted: refer'; cls = 'C'; why.push('IFC finances the private sector. For a government-led project, consider IFC PPP Transaction Advisory to bring in a private partner, or the World Bank for public financing.'); }
    else if (stg === 'idea' || stg === 'concept') { verdict = 'Early stage: develop before screening for investment'; cls = 'B'; why.push('The project needs feasibility work before an investment discussion; see Opportunities → Develop a project.'); }
    else if (missing.length > 2 || sp === 'no') { verdict = 'Request information'; cls = 'B'; why.push('Key documents or sponsor information are missing.'); }
    else { verdict = 'Proceed: discuss with the relevant IFC Industry team and run the bankability test'; cls = 'A'; why.push('No blocking issue in the information provided.'); }
    var crit = [
      ['Located in a developing member country of IFC', cname + ': confirm membership and eligibility', 'review'],
      ['Private sector', own === 'private' ? 'Private sponsor' : own === 'mixed' ? 'Mixed: acceptable if private participation and commercial operation' : 'Public entity: not eligible as submitted', own === 'public' ? 'flag' : 'live'],
      ['Technically sound', docs[0] ? 'Feasibility study received' : 'No feasibility study', docs[0] ? 'live' : 'review'],
      ['Good prospects of being profitable', docs[1] ? 'Business plan / model received: run the bankability test' : 'No business plan or model', docs[1] ? 'live' : 'review'],
      ['Benefits the local economy', 'To describe: jobs, access, linkages', 'review'],
      ['Environmentally and socially sound', es.length ? 'Sensitivities flagged: ' + es.join(', ') : (docs[2] ? 'E&S assessment received; no sensitivity flagged' : 'No E&S assessment yet'), es.length ? 'flag' : (docs[2] ? 'live' : 'review')]
    ];
    var esNote = es.length ? '<p><b>Environmental and social:</b> IFC categorises projects by the magnitude of risks and impacts; significant adverse, diverse, irreversible or unprecedented impacts correspond to Category A, with the strictest assessment and disclosure requirements. Flagged standards: ' + es.join(', ') + '. ' + s('escat') + ' ' + s('ps') + '</p>' : '';
    $('flOut').innerHTML = '<h3>' + esc($('flName').value || 'Proposal') + ' · ' + esc(cname) + '</h3>' +
      '<p><span class="idk-score t' + cls + '">' + esc(verdict) + '</span></p><p>' + why.map(esc).join(' ') + '</p>' +
      '<table><tr><th>IFC eligibility criterion</th><th>Status from the information provided</th></tr>' + crit.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td><span class="tag ' + (r[2] === 'flag' ? 'review' : r[2]) + '">' + esc(r[1]) + '</span></td></tr>'; }).join('') + '</table>' +
      '<p class="mini">Criteria as published by IFC. ' + s('apply') + ' ' + s('applyWE') + '</p>' + esNote +
      (missing.length ? '<p><b>Information to request:</b> ' + missing.map(esc).join('; ') + '.</p>' : '') +
      '<p><b>Financing:</b> IFC does not fund a project in full; co-financing and sponsor equity are required. ' + s('partial') + '</p>' +
      '<p><button class="btn alt" id="flCountryBtn">Open country data →</button> <button class="btn alt" id="flBank">Run the bankability test →</button> <button class="btn alt" id="flInt">Integrity pre-screen →</button></p>';
    $('flCountryBtn').addEventListener('click', function () { var iso = $('flCountry').value; open('country'); if (iso !== 'BR') { loadCountry(iso); $('countryLive').scrollIntoView(); } });
    $('flBank').addEventListener('click', function () { $('fatabs').scrollIntoView(); });
    $('flInt').addEventListener('click', function () { open('crm', 'en', 'enIntegrity'); });
  }

  // ---------------------------------------------------------------- Country: live World Bank indicators
  var IND = [
    ['NY.GDP.MKTP.KD.ZG', 'Real GDP growth (annual %)', 1], ['NY.GDP.PCAP.CD', 'GDP per capita (current US$)', 0], ['FP.CPI.TOTL.ZG', 'Inflation, consumer prices (annual %)', 1],
    ['BN.CAB.XOKA.GD.ZS', 'Current account balance (% of GDP)', 1], ['GC.DOD.TOTL.GD.ZS', 'Central government debt (% of GDP)', 1], ['DT.DOD.DECT.GN.ZS', 'External debt stocks (% of GNI)', 1],
    ['FS.AST.PRVT.GD.ZS', 'Domestic credit to private sector (% of GDP)', 1], ['BX.KLT.DINV.WD.GD.ZS', 'FDI net inflows (% of GDP)', 1], ['NE.TRD.GNFS.ZS', 'Trade (% of GDP)', 1], ['LP.LPI.OVRL.XQ', 'Logistics Performance Index (1–5)', 1]
  ];
  function renderCountryLive() {
    var el = $('countryLive'); if (!el) return;
    el.innerHTML = '<div class="section"><div><h2>Any country · live World Bank data</h2><p>For countries without a verified worked example, read the latest available World Development Indicators directly from the World Bank API. Values and years come from the source at the moment you load them.</p></div></div>' +
      '<div class="card"><div class="input-grid"><div class="field"><label>Country</label><select id="clCountry">' + opts(COUNTRIES.filter(function (c) { return c[0] !== 'BR'; })) + '</select></div></div>' +
      '<button class="btn" id="clLoad">Load latest indicators</button><div id="clOut" class="result"><p class="mini">Select a country and load. Requires an internet connection.</p></div></div>';
    $('clLoad').addEventListener('click', function () { loadCountry($('clCountry').value); });
  }
  function loadCountry(iso) {
    if (!$('clCountry')) return;
    $('clCountry').value = iso;
    var name = $('clCountry').options[$('clCountry').selectedIndex].text;
    $('clOut').innerHTML = '<p>Loading World Bank data for ' + esc(name) + '…</p>';
    var stamp = new Date().toISOString().slice(0, 10);
    Promise.all(IND.map(function (ind) {
      return fetch('https://api.worldbank.org/v2/country/' + iso + '/indicator/' + ind[0] + '?format=json&mrnev=1')
        .then(function (r) { return r.json(); })
        .then(function (j) { var d = j && j[1] && j[1][0]; return d && d.value != null ? { v: d.value, y: d.date } : null; })
        .catch(function () { return null; });
    })).then(function (res) {
      var any = res.some(Boolean);
      $('clOut').innerHTML = !any ? '<p>The World Bank API could not be reached. Check the connection and try again; no values are shown rather than estimated.</p>' :
        '<h3>' + esc(name) + ' · latest available values</h3><table><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr>' +
        IND.map(function (ind, i) {
          var r = res[i];
          var old = r && (new Date().getFullYear() - (+r.y)) > 5;
          return '<tr><td>' + esc(ind[1]) + '</td><td><b' + (old ? ' style="color:var(--m)"' : '') + '>' + (r ? Number(r.v).toLocaleString('en-US', { maximumFractionDigits: ind[2] }) : '—') + '</b></td><td>' + (r ? esc(r.y) + (old ? ' <span class="tag review">dated</span>' : '') : 'not available') + '</td><td>' + a('https://data.worldbank.org/indicator/' + ind[0] + '?locations=' + iso, 'WDI ' + ind[0]) + '</td></tr>';
        }).join('') + '</table><p class="mini">World Bank World Development Indicators via the public API, retrieved ' + stamp + '. Latest year differs by indicator; values older than five years are marked as dated and should not be used without a newer source. WDI series can differ from IMF figures used in country reports. ' + s('wbapi') + '</p>';
    });
  }
  window.THEMIS_COUNTRY = loadCountry;

  // ---------------------------------------------------------------- Source register
  function kind(host) {
    if (/(\.gov\.|gov\.br|esteri\.it|camera\.it|europa\.eu|sanctionsmap|treas\.gov|service\.gov\.uk|registroimprese|un\.org)/.test(host)) return 'Government / official register';
    if (/(ifc\.org|worldbank\.org|imf\.org|oecd\.org|miga\.org|iadb\.org|worldjusticeproject)/.test(host)) return 'International institution / index';
    if (/(cdp\.it|simest\.it|sace\.it|intesasanpaolo|alexbank|webuildgroup|salonedelrisparmio)/.test(host)) return 'Company or association';
    return 'Media, law firm or secondary source';
  }
  function renderRegister() {
    var el = $('sourceRegister'); if (!el) return;
    var map = {};
    function add(u, t, page) {
      if (!u || u.indexOf('http') !== 0) return;
      var k = u.split('#')[0];
      if (!map[k]) map[k] = { u: k, t: t, pages: {} };
      if (t && t.length > map[k].t.length && t !== 'Open' && t.indexOf('Official website') < 0) map[k].t = t;
      if (page) map[k].pages[page] = 1;
    }
    document.querySelectorAll('section.page').forEach(function (sec) {
      if (sec.id === 'evidence') return;
      var page = (sec.querySelector('h1') || {}).textContent || sec.id;
      sec.querySelectorAll('a[href^="http"]').forEach(function (l) { var t = (l.textContent || '').trim(); if (t === 'Official website') return; add(l.href, t, page.trim()); });
    });
    var it = I();
    Object.keys(it.sources || {}).forEach(function (k) { var x = it.sources[k]; add(x.u, x.t, 'Clients & Investors'); });
    Object.keys(SRC).forEach(function (k) { add(SRC[k][0], SRC[k][1], null); });
    var list = Object.keys(map).map(function (k) { return map[k]; }).filter(function (x) { return !/api\.worldbank\.org/.test(x.u); });
    list.forEach(function (x) { x.host = x.u.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, ''); x.kind = kind(x.host); });
    var order = ['Government / official register', 'International institution / index', 'Company or association', 'Media, law firm or secondary source'];
    list.sort(function (p, q) { return order.indexOf(p.kind) - order.indexOf(q.kind) || p.host.localeCompare(q.host); });
    var counts = order.map(function (o) { return list.filter(function (x) { return x.kind === o; }).length; });
    el.innerHTML = '<div class="kpi-strip">' + order.map(function (o, i) { return '<div class="kpi"><strong>' + counts[i] + '</strong><span>' + esc(o) + '</span></div>'; }).join('') + '</div>' +
      '<div class="card"><div class="idk-filters"><div class="field"><label>Search sources</label><input id="srSearch" placeholder="Title, domain or page"></div><div class="field"><label>Type</label><select id="srKind"><option>All</option>' + order.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="idk-table"><table><thead><tr><th>Source</th><th>Domain</th><th>Type</th><th>Used in</th></tr></thead><tbody id="srRows"></tbody></table></div>' +
      '<p class="mini">Static sources were checked on ' + CHECKED + '. Live World Bank indicators carry their own retrieval date. Secondary sources (media, law firms) are used only for dates and amounts not shown on the official page reviewed.</p></div>';
    function draw() {
      var q = $('srSearch').value.toLowerCase(), k = $('srKind').value;
      $('srRows').innerHTML = list.filter(function (x) { return (k === 'All' || x.kind === k) && (!q || (x.t + ' ' + x.host + ' ' + Object.keys(x.pages).join(' ')).toLowerCase().indexOf(q) > -1); })
        .map(function (x) { return '<tr><td>' + a(x.u, x.t || x.host) + '</td><td class="mini">' + esc(x.host) + '</td><td class="mini">' + esc(x.kind) + '</td><td class="mini">' + esc(Object.keys(x.pages).join(' · ') || 'Tools (screen, development, investors)') + '</td></tr>'; }).join('');
    }
    $('srSearch').addEventListener('input', draw); $('srKind').addEventListener('change', draw); draw();
  }

  // ---------------------------------------------------------------- Action log: investors from the Client Desk
  function fixActionLog() {
    var sel = $('crmInvestor'); if (!sel || !I().prospects.length) return;
    sel.innerHTML = I().prospects.map(function (p) { return '<option>' + esc(p.name) + '</option>'; }).join('');
  }

  function init() {
    [bindTabs, renderOverview, renderEuro, renderProjectInvestors, renderDevelop, renderFirstLook, renderCountryLive, fixActionLog, renderRegister].forEach(function (f) {
      try { f(); } catch (err) { console.error('THEMIS workflows:', f.name, err); }
    });
    var h = location.hash.slice(1);
    if (h && window.go) window.go(h);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
