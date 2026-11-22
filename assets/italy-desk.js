/* THEMIS · Italy Client Desk
 * Client-led business development for Italian corporates, banks, insurers, asset owners and DFIs
 * looking at emerging markets alongside IFC / the World Bank Group.
 *
 * Evidence rule: every factual statement below carries a source and a retrieval date.
 * Anything not supported by a source is labelled as a hypothesis or "to research".
 * Scores combine documented evidence with editable analyst judgement; they do not measure appetite.
 * Self-contained: renders into empty containers and never touches other THEMIS modules.
 */
(function () {
  'use strict';

  var RETRIEVED = '21 Nov 2026';

  // ---------------------------------------------------------------- sources
  var S = {
    ifcItaly: { t: 'IFC — "IFC and Italy" factsheet (figures as of June 2024)', u: 'https://www.ifc.org/content/dam/ifc/doclink/latest/ifc-and-italy-factsheet.pdf' },
    cdpMca: { t: 'IFC press release, 21 Apr 2015 — CDP signs IFC master cooperation agreement', u: 'https://pressroom.ifc.org/all/pages/PressDetail.aspx?ID=16500' },
    cdpLaw: { t: 'Law 125/2014, art. 22 — CDP as Italian financial institution for development cooperation', u: 'https://www.cdp.it/resources/cms/documents/legge-11-agosto-2014-n.-1251.pdf' },
    cdpMattei: { t: 'CDP — International development cooperation and the Mattei Plan (presentation, 2025)', u: 'https://businessmatching-images.cdp.it/web/panel/uploads/20250507-cdp_cis_macfrut.pdf' },
    sace: { t: 'SACE — Relazione sull\'attività 2022 (direct MEF control since March 2022)', u: 'https://www.camera.it/temiap/2024/01/16/OCD177-6906.pdf' },
    simest: { t: 'SIMEST Annual Report 2022 — CDP Group company supporting international expansion', u: 'https://www.simest.it/app/uploads/2024/03/Bilancio-SIMEST-2022-in-inglese.pdf' },
    simestTr: { t: 'SACE 2022 Non-Financial Statement — SIMEST moved to CDP Group on 21 Mar 2022', u: 'https://www.sace.it/docs/default-source/bilanci-di-sostenibilit%C3%A0/2022-non-financial-statement-sace-group.pdf' },
    ispIntl: { t: 'Intesa Sanpaolo — International Banks footprint', u: 'https://world.intesasanpaolo.com/en/editorial-section/the-strength-of-the-group/business' },
    alex: { t: 'ALEXBANK — corporate history (IFC stake 2008; repurchased by Intesa Sanpaolo 2020)', u: 'https://www.alexbank.com/en/retail/our-world/who-we-are?name=2' },
    eniKenya: { t: 'IFC press release, 2024 — IFC and the Italian Climate Fund partner with Eni in Kenya', u: 'https://www.ifc.org/en/pressroom/2024/ifc-and-the-italian-climate-fund-partner-with-eni-to-support-biofuel-production-farmers-in-kenya' },
    webuild: { t: 'Webuild — FY2025 results press release (12 Mar 2026)', u: 'https://www.webuildgroup.com/en/media/press-releases/webuild-results-december-31-2025/' },
    synd: { t: 'IFC — Syndicated Loans and Mobilization (B loans, parallel loans, MCPP)', u: 'https://www.ifc.org/en/what-we-do/sector-expertise/syndicated-loans-and-mobilization' },
    mcppIns: { t: 'IFC press release, 18 Dec 2024 — $3bn MCPP credit insurance policy with 14 insurers', u: 'https://www.ifc.org/en/pressroom/2024/ifc-mobilizes-3-billion-from-leading-global-insurers-to-boost-real-sector-investments-in-emerging-markets' },
    miga: { t: 'IFC — MIGA guarantees (referral of co-investors and sponsors)', u: 'https://www.ifc.org/en/what-we-do/sector-expertise/syndicated-loans-and-mobilization/miga-guarantees' },
    upstream: { t: 'IFC — Working Upstream', u: 'https://www.ifc.org/WorkingUpstream' },
    fob: { t: 'MEF — Annual report to Parliament on banking foundations', u: 'https://www.camera.it/temiap/2026/01/14/OCD177-8737.pdf' },
    sdr: { t: 'Assogestioni — Salone del Risparmio 2026 announcement', u: 'https://www.salonedelrisparmio.com/press/savings-in-motion-activating-liquidity-accelerating-growth' },
    iabw: { t: 'MAECI — Italy–Africa Business Week 2026 opens at the Farnesina', u: 'https://www.esteri.it/en/sala_stampa/archivionotizie/comunicati/2026/03/al-via-litalia-africa-business-week-2026/' },
    vacancy: { t: 'Source: IFC vacancy req39490 (job description)', u: '' }
  };

  // ---------------------------------------------------------------- prospects
  // em / ifc / fit: 0–3. em and ifc follow documented evidence; fit is analyst judgement (editable in the UI).
  var TYPES = ['Development finance & export credit', 'Banks', 'Insurers', 'Pension funds & casse', 'Asset managers', 'Foundations', 'Family offices', 'Corporates & sponsors'];

  var P = [
    { id: 'cdp', name: 'Cassa Depositi e Prestiti (CDP)', type: 'Development finance & export credit', status: 'Verified',
      facts: [
        ['Designated by Law 125/2014 (art. 22) as Italy\'s financial institution for international development cooperation.', 'cdpLaw'],
        ['Signed IFC\'s master cooperation agreement for co-financing in April 2015.', 'cdpMca'],
        ['Presents itself as a key financial player of the Mattei Plan for Africa.', 'cdpMattei']],
      ifcRecord: 'Master cooperation agreement with IFC (2015).',
      route: 'Parallel lending under the master cooperation agreement; joint pipeline review on Mattei Plan countries.',
      em: 3, ifc: 3, fit: 3 },
    { id: 'simest', name: 'SIMEST (CDP Group)', type: 'Development finance & export credit', status: 'Verified',
      facts: [
        ['CDP Group company supporting the international expansion of Italian companies.', 'simest'],
        ['Transferred from SACE to CDP Group on 21 March 2022.', 'simestTr']],
      ifcRecord: 'None documented in the sources reviewed.',
      route: 'Hypothesis: co-investment alongside IFC when an Italian sponsor expands into an emerging market.',
      em: 2, ifc: 0, fit: 2 },
    { id: 'sace', name: 'SACE', type: 'Development finance & export credit', status: 'Verified',
      facts: [['Directly controlled by the Ministry of Economy and Finance since March 2022.', 'sace']],
      ifcRecord: 'None documented in the sources reviewed.',
      route: 'Hypothesis: export-credit cover alongside IFC lending or a MIGA guarantee on transactions with Italian suppliers.',
      em: 2, ifc: 0, fit: 2 },
    { id: 'isp', name: 'Intesa Sanpaolo', type: 'Banks', status: 'Verified',
      facts: [
        ['International Banks footprint in 12 countries across Central and Eastern Europe and MENA, including ALEXBANK in Egypt.', 'ispIntl'],
        ['IFC held a 9.75% stake in ALEXBANK from 2008; Intesa Sanpaolo repurchased it in 2020.', 'alex'],
        ['IFC lent $40m to Bank of Qingdao (Intesa Sanpaolo a key shareholder) in June 2022, plus $110m of parallel loans.', 'ifcItaly'],
        ['Among the most active Italian confirming banks under IFC\'s Global Trade Finance Program.', 'ifcItaly']],
      ifcRecord: 'Equity co-investment (ALEXBANK), lending to an affiliate (Bank of Qingdao), GTFP.',
      route: 'Repeat business: subsidiary-bank financing, B loans / parallel loans, trade finance.',
      em: 3, ifc: 3, fit: 3 },
    { id: 'ucg', name: 'UniCredit', type: 'Banks', status: 'Verified',
      facts: [
        ['IFC invested about $74m in two senior bond issuances of UniCredit Bank S.A. (Romania) in 2022–23, for green housing.', 'ifcItaly'],
        ['Among the most active Italian confirming banks under IFC\'s Global Trade Finance Program.', 'ifcItaly']],
      ifcRecord: 'Bond investments in the Romanian subsidiary; GTFP.',
      route: 'Repeat business: subsidiary funding in IFC client countries; trade finance.',
      em: 2, ifc: 3, fit: 3 },
    { id: 'bps', name: 'Banca Popolare di Sondrio', type: 'Banks', status: 'Verified',
      facts: [['Among the most active Italian confirming banks under IFC\'s Global Trade Finance Program.', 'ifcItaly']],
      ifcRecord: 'GTFP confirming bank.',
      route: 'Deepen trade-finance cooperation; test interest in syndicated participations.',
      em: 1, ifc: 2, fit: 2 },
    { id: 'gen', name: 'Generali', type: 'Insurers', status: 'To research',
      facts: [],
      ifcRecord: 'Not yet researched.',
      route: 'Hypothesis: portfolio participation through MCPP, the IFC platform that insurers use via B loans or credit insurance.',
      em: 1, ifc: 0, fit: 2 },
    { id: 'unipol', name: 'Unipol', type: 'Insurers', status: 'To research',
      facts: [],
      ifcRecord: 'Not yet researched.',
      route: 'Hypothesis: MCPP credit insurance or B-loan participation.',
      em: 1, ifc: 0, fit: 2 },
    { id: 'cf', name: 'Cassa Forense', type: 'Pension funds & casse', status: 'To research',
      facts: [],
      ifcRecord: 'Not yet researched.',
      route: 'Hypothesis: indirect exposure through a diversified portfolio vehicle; check investment rules first.',
      em: 0, ifc: 0, fit: 1 },
    { id: 'cometa', name: 'Fondo Cometa', type: 'Pension funds & casse', status: 'To research',
      facts: [],
      ifcRecord: 'Not yet researched.',
      route: 'Hypothesis: indirect exposure through delegated managers; check mandate structure first.',
      em: 0, ifc: 0, fit: 1 },
    { id: 'am', name: 'Italian asset managers (archetype)', type: 'Asset managers', status: 'To research',
      facts: [],
      ifcRecord: 'Not yet researched.',
      route: 'Hypothesis: emerging-market private-credit products built around IFC-originated assets.',
      em: 1, ifc: 0, fit: 2 },
    { id: 'fob', name: 'Banking foundations (archetype)', type: 'Foundations', status: 'To research',
      facts: [['Supervised by the Ministry of Economy and Finance, which reports annually to Parliament on their activity.', 'fob']],
      ifcRecord: 'Not yet researched.',
      route: 'Hypothesis: impact or blended-finance windows; small tickets, mission-driven.',
      em: 0, ifc: 0, fit: 1 },
    { id: 'fo', name: 'Family offices (archetype)', type: 'Family offices', status: 'To research',
      facts: [],
      ifcRecord: 'Not yet researched.',
      route: 'Hypothesis: co-investment in IFC-led equity or fund structures; identify via advisers and private-banking networks.',
      em: 0, ifc: 0, fit: 1 },
    { id: 'eni', name: 'Eni', type: 'Corporates & sponsors', status: 'Verified',
      facts: [['In 2024 IFC committed $135m and mobilised $75m from the Italian Climate Fund for Eni\'s agri-feedstock project in Kenya.', 'eniKenya']],
      ifcRecord: 'Kenya agri-feedstock financing (2024).',
      route: 'Repeat business: further Mattei Plan-country projects; possible MIGA cover.',
      em: 3, ifc: 3, fit: 3 },
    { id: 'enel', name: 'Enel', type: 'Corporates & sponsors', status: 'Verified',
      facts: [['IFC provided a $300m loan to Enel Colombia in November 2023.', 'ifcItaly']],
      ifcRecord: 'Enel Colombia loan (2023).',
      route: 'Repeat business: renewable and grid investment in Latin America.',
      em: 3, ifc: 3, fit: 3 },
    { id: 'contship', name: 'Contship Italia Group', type: 'Corporates & sponsors', status: 'Verified',
      facts: [['IFC provided a $120m senior loan, within a $455m package, to Damietta Alliance Container Terminals (Egypt), co-owned by Contship Italia, in December 2023.', 'ifcItaly']],
      ifcRecord: 'Damietta container terminal, Egypt (2023).',
      route: 'Repeat business: port and logistics platforms in MENA.',
      em: 2, ifc: 3, fit: 3 },
    { id: 'astm', name: 'ASTM / Gruppo Gavio', type: 'Corporates & sponsors', status: 'Verified',
      facts: [['IFC invested about $140m in two debentures of an Ecorodovias road concession in Brazil (2023); ASTM is Ecorodovias\' majority owner.', 'ifcItaly']],
      ifcRecord: 'Brazilian road concession debentures (2023).',
      route: 'Repeat business: new concession awards; links to the Financial Model reference case.',
      em: 3, ifc: 3, fit: 3 },
    { id: 'webuild', name: 'Webuild', type: 'Corporates & sponsors', status: 'Verified',
      facts: [
        ['Delivered the Grand Ethiopian Renaissance Dam and Lot 2 of the Riachuelo wastewater system in Argentina.', 'webuild'],
        ['Reports that more than 90% of 2025 revenues came from low-risk markets, as part of a de-risking strategy.', 'webuild']],
      ifcRecord: 'None documented in the sources reviewed.',
      route: 'Hypothesis: EPC contractor or PPP co-sponsor; current strategy favours low-risk markets, so lower origination priority.',
      em: 2, ifc: 0, fit: 1 }
  ];

  // Category-level constraints: general framework only; verify for each institution.
  var CONSTRAINTS = {
    'Development finance & export credit': 'Public mandate and governance set by law and shareholder (MEF); typically tied to development cooperation or support for Italian companies.',
    'Banks': 'Prudential capital requirements (CRR/CRD), large-exposure and country-risk limits; preference for trade finance and syndicated participations.',
    'Insurers': 'Solvency II capital charges on emerging-market credit, supervised by IVASS; liability matching favours long-tenor, investment-grade-like risk.',
    'Pension funds & casse': 'Investment rules and COVIP oversight; delegated mandates and liquidity needs limit direct private-credit exposure.',
    'Asset managers': 'Product regulation and investor-base constraints; need a scalable, ratable product rather than single deals.',
    'Foundations': 'MEF supervision and diversification limits; mission-related investment alongside financial return.',
    'Family offices': 'No public mandate; decisions concentrated in principals and advisers; heterogeneous risk appetite.',
    'Corporates & sponsors': 'Board risk appetite and country exposure limits; financing needs tied to specific expansion projects.'
  };

  var CONSTRAINTS_IT = {
    'Development finance & export credit': 'Mandato pubblico e governance definiti dalla legge e dall\'azionista (MEF); di norma legati alla cooperazione allo sviluppo o al sostegno delle imprese italiane.',
    'Banks': 'Requisiti prudenziali di capitale (CRR/CRD), limiti alle grandi esposizioni e al rischio Paese; preferenza per trade finance e partecipazioni sindacate.',
    'Insurers': 'Assorbimento di capitale Solvency II sul credito nei mercati emergenti, vigilanza IVASS; la gestione delle passività favorisce rischi a lunga scadenza e di qualità elevata.',
    'Pension funds & casse': 'Regole di investimento e vigilanza COVIP; mandati delegati ed esigenze di liquidità limitano l\'esposizione diretta al private credit.',
    'Asset managers': 'Regolamentazione dei prodotti e vincoli della clientela; serve un prodotto scalabile e valutabile, non singole operazioni.',
    'Foundations': 'Vigilanza del MEF e limiti di diversificazione; investimenti legati alla missione accanto al rendimento finanziario.',
    'Family offices': 'Nessun mandato pubblico; decisioni concentrate nei titolari e nei consulenti; propensione al rischio eterogenea.',
    'Corporates & sponsors': 'Propensione al rischio del consiglio e limiti di esposizione per Paese; fabbisogni finanziari legati a specifici progetti di espansione.'
  };

  var QUESTIONS = {
    en: {
      'Development finance & export credit': ['Which countries and sectors are priorities for the current planning cycle?', 'Which co-financing formats are preferred: parallel loans, guarantees or blended windows?', 'Which Italian sponsors in the pipeline could benefit from IFC participation?'],
      'Banks': ['Which emerging-market subsidiaries or client corridors need funding or risk sharing?', 'Is there appetite for B-loan or parallel-loan participations, and in which tenors?', 'How is trade-finance capacity used under existing confirmation lines?'],
      'Insurers': ['How are emerging-market private loans treated under the internal Solvency II model?', 'Portfolio participation (MCPP-type) or deal-by-deal?', 'Who decides: general account, asset-management arm or credit-insurance unit?'],
      'Pension funds & casse': ['Do investment rules allow emerging-market private credit, directly or through funds?', 'Which managers run the alternative mandates today?', 'What reporting and ESG requirements would apply?'],
      'Asset managers': ['Is there demand from Italian clients for emerging-market private credit?', 'What minimum size and rating profile would a product need?', 'Interest in a vehicle built around IFC-originated loans?'],
      'Foundations': ['Is there an impact or mission-related allocation that can include emerging markets?', 'What ticket sizes and instruments are possible?', 'Which geographies match the foundation\'s mission?'],
      'Family offices': ['What is the current allocation to emerging markets and private markets?', 'Preference for direct deals, co-investment or funds?', 'Which advisers are involved in investment decisions?'],
      'Corporates & sponsors': ['Which emerging-market projects or acquisitions are planned in the next 24 months?', 'What is missing: long-tenor debt, equity partner, local currency or risk cover?', 'Who leads international expansion and project finance internally?']
    },
    it: {
      'Development finance & export credit': ['Quali Paesi e settori sono prioritari nel ciclo di pianificazione in corso?', 'Quali formule di cofinanziamento sono preferite: prestiti paralleli, garanzie o finestre di blending?', 'Quali sponsor italiani in pipeline potrebbero beneficiare della partecipazione di IFC?'],
      'Banks': ['Quali controllate o corridoi della clientela nei mercati emergenti richiedono funding o condivisione del rischio?', 'C\'è interesse per partecipazioni in B loan o prestiti paralleli, e su quali durate?', 'Come vengono utilizzate le linee di conferma nel trade finance?'],
      'Insurers': ['Come sono trattati i prestiti privati nei mercati emergenti nel modello interno Solvency II?', 'Partecipazione di portafoglio (tipo MCPP) o operazione per operazione?', 'Chi decide: conto generale, società di gestione o unità di assicurazione del credito?'],
      'Pension funds & casse': ['Le regole di investimento consentono il private credit nei mercati emergenti, direttamente o tramite fondi?', 'Quali gestori seguono oggi i mandati alternativi?', 'Quali requisiti di reporting ed ESG si applicherebbero?'],
      'Asset managers': ['La clientela italiana chiede private credit nei mercati emergenti?', 'Quali dimensioni minime e quale profilo di rating servirebbero a un prodotto?', 'Interesse per un veicolo costruito su prestiti originati da IFC?'],
      'Foundations': ['Esiste un\'allocazione d\'impatto o mission-related che possa includere i mercati emergenti?', 'Quali importi e strumenti sono possibili?', 'Quali aree geografiche sono coerenti con la missione della fondazione?'],
      'Family offices': ['Qual è l\'allocazione attuale su mercati emergenti e mercati privati?', 'Preferenza per operazioni dirette, co-investimenti o fondi?', 'Quali consulenti partecipano alle decisioni di investimento?'],
      'Corporates & sponsors': ['Quali progetti o acquisizioni nei mercati emergenti sono previsti nei prossimi 24 mesi?', 'Cosa manca: debito a lunga scadenza, partner di equity, valuta locale o copertura dei rischi?', 'Chi guida internamente l\'espansione internazionale e il project finance?']
    }
  };

  // Objectives → WBG units to involve (unit names from the vacancy text; product descriptions from IFC/MIGA sources)
  var OBJECTIVES = [
    { id: 'mob', en: 'Introduce IFC co-investment platforms (B loans, parallel loans, MCPP)', it: 'Presentare le piattaforme di co-investimento IFC (B loan, prestiti paralleli, MCPP)', units: ['Syndications & Mobilization', 'Relevant Industry team'], src: 'synd' },
    { id: 'cofi', en: 'Explore co-financing of a specific emerging-market project', it: 'Esplorare il cofinanziamento di uno specifico progetto in un mercato emergente', units: ['Relevant Industry team', 'Regional investment team', 'Syndications & Mobilization'], src: 'synd' },
    { id: 'trade', en: 'Discuss trade-finance cooperation (GTFP)', it: 'Discutere la cooperazione nel trade finance (GTFP)', units: ['Trade & supply-chain finance team'], src: 'ifcItaly' },
    { id: 'miga', en: 'Refer to MIGA for political-risk cover', it: 'Indirizzare a MIGA per la copertura del rischio politico', units: ['MIGA'], src: 'miga' },
    { id: 'up', en: 'Explore early-stage project development (Upstream)', it: 'Esplorare lo sviluppo di progetti in fase iniziale (Upstream)', units: ['IFC Upstream', 'Relevant Industry team', 'IBRD country team (if reforms are needed)'], src: 'upstream' },
    { id: 'repeat', en: 'Repeat business with an existing IFC counterpart', it: 'Nuova operazione con una controparte già cliente IFC', units: ['Relationship Manager', 'Relevant Industry team'], src: 'vacancy' }
  ];

  var INTEGRITY = [
    { id: 'wb', label: 'World Bank listing of ineligible firms and individuals', u: 'https://www.worldbank.org/en/projects-operations/procurement/debarred-firms' },
    { id: 'eu', label: 'EU Sanctions Map (EU and UN measures)', u: 'https://www.sanctionsmap.eu/' },
    { id: 'ofac', label: 'OFAC Sanctions List Search (US)', u: 'https://sanctionssearch.ofac.treas.gov/' },
    { id: 'un', label: 'UN Security Council Consolidated List', u: 'https://www.un.org/securitycouncil/content/un-sc-consolidated-list' },
    { id: 'uk', label: 'UK Sanctions List search', u: 'https://search-uk-sanctions-list.service.gov.uk/' },
    { id: 'reg', label: 'Registro Imprese — company identity, officers, shareholders', u: 'https://www.registroimprese.it/' },
    { id: 'ubo', label: 'Beneficial ownership (Registro titolari effettivi: access restricted, rules revised in 2026)', u: 'https://titolareeffettivo.registroimprese.it/' },
    { id: 'media', label: 'Adverse media review (manual, dated, sources logged)', u: '' },
    { id: 'pep', label: 'PEP and integrity due diligence through IFC\'s own compliance process', u: '' }
  ];
  var ISTATES = ['Not started', 'Clear', 'Flag', 'N/A'];

  // ---------------------------------------------------------------- state (session only)
  var state = { fit: {}, integrity: {}, filter: 'All', search: '' };

  // ---------------------------------------------------------------- helpers
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function src(key) {
    var s = S[key]; if (!s) return '';
    return s.u ? '<a class="source-link" href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + '</a>' : '<span class="mini">' + esc(s.t) + '</span>';
  }
  function byId(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; }
  function fitOf(p) { return state.fit[p.id] != null ? state.fit[p.id] : p.fit; }
  var EV = { 'Verified': 20, 'Partly verified': 12, 'To research': 5 };
  function score(p) { return Math.round(p.em / 3 * 25 + p.ifc / 3 * 30 + fitOf(p) / 3 * 25 + (EV[p.status] || 0)); }
  function tier(s) { return s >= 75 ? 'A' : s >= 45 ? 'B' : 'C'; }
  function mode(p) { return p.ifc >= 2 ? 'Deepen (existing IFC counterpart)' : 'Originate (first introduction)'; }
  function statusTag(st) { return '<span class="tag ' + (st === 'Verified' ? 'live' : 'review') + '">' + esc(st) + '</span>'; }
  function integ(pid) { return state.integrity[pid] || (state.integrity[pid] = {}); }

  // ---------------------------------------------------------------- Italy Client Desk page
  function renderDesk() {
    var root = $('italy'); if (!root) return;
    var verified = P.filter(function (p) { return p.status === 'Verified'; }).length;
    var withIfc = P.filter(function (p) { return p.ifc >= 2; }).length;
    root.innerHTML =
      '<div class="kpi-strip"><div class="kpi"><strong>' + P.length + '</strong><span>Prospects and archetypes mapped</span></div>' +
      '<div class="kpi"><strong>' + verified + '</strong><span>With verified, sourced facts</span></div>' +
      '<div class="kpi"><strong>' + withIfc + '</strong><span>With a documented IFC relationship</span></div>' +
      '<div class="kpi"><strong>0</strong><span>Contacts or meetings recorded</span></div></div>' +
      '<div class="card idk-note"><b>How to read this desk.</b> Facts carry a source and were retrieved on ' + RETRIEVED + '. "Routes" are hypotheses to test with IFC colleagues, not statements of interest. Scores rank where to spend research and outreach time; they do not measure appetite. Meeting briefs and integrity checks are in Engagement.</div>' +
      '<div class="tabs idk-tabs" id="idkTabs">' +
      '<button class="tab active" data-idk="idkMap">Prospect map & priority</button>' +
      '<button class="tab" data-idk="idkProfile">Prospect profile</button>' +
      '<button class="tab" data-idk="idkMethod">Scoring method</button></div>' +
      '<div class="idk-panel active" id="idkMap"></div><div class="idk-panel" id="idkProfile"></div><div class="idk-panel" id="idkMethod"></div>';
    root.querySelectorAll('#idkTabs .tab').forEach(function (b) {
      b.addEventListener('click', function () { showTab(b.dataset.idk); });
    });
    renderMap(); renderProfile(P[0].id); renderMethod();
  }
  function openEng(panel) { if (window.go) window.go('crm'); if (window.THEMIS_PG) window.THEMIS_PG('en', panel); }
  function showTab(id) {
    document.querySelectorAll('#idkTabs .tab').forEach(function (x) { x.classList.toggle('active', x.dataset.idk === id); });
    document.querySelectorAll('#italy .idk-panel').forEach(function (x) { x.classList.toggle('active', x.id === id); });
  }

  function renderMap() {
    var el = $('idkMap');
    var opts = ['All'].concat(TYPES).map(function (t) { return '<option' + (t === state.filter ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join('');
    el.innerHTML = '<div class="card"><div class="idk-filters"><div class="field"><label>Search</label><input id="idkSearch" placeholder="Institution or category" value="' + esc(state.search) + '"></div>' +
      '<div class="field"><label>Category (vacancy client segments)</label><select id="idkFilter">' + opts + '</select></div></div>' +
      '<div class="idk-table"><table><thead><tr><th>Prospect</th><th>Category</th><th>Evidence</th><th>IFC relationship</th><th>Mode</th><th>Score</th></tr></thead><tbody id="idkRows"></tbody></table></div>' +
      '<p class="mini">Click a row to open the profile. Analyst-judgement inputs can be changed in the profile tab; the score updates for this browser session only.</p></div>';
    $('idkSearch').addEventListener('input', function (e) { state.search = e.target.value; rows(); });
    $('idkFilter').addEventListener('change', function (e) { state.filter = e.target.value; rows(); });
    rows();
  }
  function rows() {
    var q = state.search.toLowerCase();
    var list = P.filter(function (p) { return (state.filter === 'All' || p.type === state.filter) && (!q || (p.name + ' ' + p.type).toLowerCase().indexOf(q) > -1); })
      .sort(function (a, b) { return score(b) - score(a); });
    $('idkRows').innerHTML = list.map(function (p) {
      var s = score(p);
      return '<tr data-pid="' + p.id + '"><td><b>' + esc(p.name) + '</b></td><td>' + esc(p.type) + '</td><td>' + statusTag(p.status) + '</td><td class="mini">' + esc(p.ifcRecord) + '</td><td class="mini">' + esc(mode(p)) + '</td><td><span class="idk-score t' + tier(s) + '">' + s + ' · ' + tier(s) + '</span></td></tr>';
    }).join('') || '<tr><td colspan="6">No prospects match the filter.</td></tr>';
    $('idkRows').querySelectorAll('tr[data-pid]').forEach(function (tr) {
      tr.addEventListener('click', function () { renderProfile(tr.dataset.pid); showTab('idkProfile'); });
    });
  }

  function pickList(id, sel) {
    return '<select id="' + id + '">' + P.map(function (p) { return '<option value="' + p.id + '"' + (p.id === sel ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('') + '</select>';
  }

  function renderProfile(pid) {
    var p = byId(pid) || P[0], s = score(p), el = $('idkProfile');
    var facts = p.facts.length ? '<ul>' + p.facts.map(function (f) { return '<li>' + esc(f[0]) + '<br>' + src(f[1]) + '</li>'; }).join('') + '</ul>' : '<p class="mini">No verified facts recorded yet. Start from the institution\'s annual report, investment policy and disclosed transactions.</p>';
    el.innerHTML = '<div class="card"><div class="field"><label>Prospect</label>' + pickList('idkProfileSel', p.id) + '</div></div>' +
      '<div class="grid two"><div class="card"><h3>' + esc(p.name) + '</h3><p>' + statusTag(p.status) + ' <span class="tag">' + esc(p.type) + '</span></p>' +
      '<h4>Verified facts</h4>' + facts + '<h4>Documented IFC relationship</h4><p>' + esc(p.ifcRecord) + '</p></div>' +
      '<div class="card"><h4>Possible route with the World Bank Group</h4><p>' + esc(p.route) + '</p>' +
      '<h4>Category-level constraints</h4><p class="mini">' + esc(CONSTRAINTS[p.type]) + ' General framework only; verify for this institution.</p>' +
      '<h4>Priority score: <span class="idk-score t' + tier(s) + '">' + s + ' · tier ' + tier(s) + '</span></h4>' +
      '<p class="mini">Emerging-market footprint ' + p.em + '/3 · documented IFC relationship ' + p.ifc + '/3 · evidence: ' + esc(p.status) + '.</p>' +
      '<div class="field"><label>Instrument fit with IFC products (analyst judgement)</label><select id="idkFit">' + [0, 1, 2, 3].map(function (v) { return '<option value="' + v + '"' + (v === fitOf(p) ? ' selected' : '') + '>' + v + ' — ' + ['No visible fit', 'Weak / unclear', 'Plausible', 'Strong'][v] + '</option>'; }).join('') + '</select></div>' +
      '<p class="mini">Engagement mode: <b>' + esc(mode(p)) + '</b>.</p>' +
      '<button class="btn alt" id="idkToBrief">Prepare engagement brief →</button> <button class="btn alt" id="idkToInteg">Integrity pre-screen →</button></div></div>';
    $('idkProfileSel').addEventListener('change', function (e) { renderProfile(e.target.value); });
    $('idkFit').addEventListener('change', function (e) { state.fit[p.id] = +e.target.value; renderProfile(p.id); rows(); });
    $('idkToBrief').addEventListener('click', function () { $('idkBriefSel').value = p.id; buildBrief(); openEng('enPrepare'); });
    $('idkToInteg').addEventListener('click', function () { renderIntegrity(p.id); openEng('enIntegrity'); });
  }

  // ---------------------------------------------------------------- engagement brief
  function renderBrief() {
    $('engBrief').innerHTML = '<div class="card"><div class="input-grid">' +
      '<div class="field"><label>Prospect</label>' + pickList('idkBriefSel', 'cdp') + '</div>' +
      '<div class="field"><label>Objective</label><select id="idkObj">' + OBJECTIVES.map(function (o) { return '<option value="' + o.id + '">' + esc(o.en) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>Language</label><select id="idkLang"><option value="en">English</option><option value="it">Italiano</option></select></div></div>' +
      '<p class="mini">Deterministic template filled from the verified profile: no language model runs in this prototype. Review and edit before use.</p>' +
      '<button class="btn" id="idkBuild">Generate brief</button><div id="idkBriefOut" class="result idk-brief"></div></div>';
    $('idkBuild').addEventListener('click', buildBrief);
    ['idkBriefSel', 'idkObj', 'idkLang'].forEach(function (id) { $(id).addEventListener('change', buildBrief); });
    buildBrief();
  }
  function buildBrief() {
    var p = byId($('idkBriefSel').value), lang = $('idkLang').value, o = OBJECTIVES.filter(function (x) { return x.id === $('idkObj').value; })[0];
    var it = lang === 'it';
    var L = it ? { t: 'Nota per l\'incontro', obj: 'Obiettivo', snap: 'Cosa sappiamo (fatti verificati)', none: 'Nessun fatto verificato: completare la ricerca prima del contatto.', hyp: 'Ipotesi da verificare', q: 'Domande per l\'incontro', units: 'Colleghi WBG da coinvolgere', integ: 'Pre-screening di integrità', next: 'Prossimo passo', nextTxt: 'Concordare il follow-up entro due settimane e registrare l\'esito nella pipeline.', route: 'Possibile percorso', cons: 'Vincoli di categoria (da verificare)', mode: 'Modalità', disc: 'Bozza generata da modello deterministico. Le ipotesi non indicano interesse della controparte né impegni di IFC.' }
      : { t: 'Meeting brief', obj: 'Objective', snap: 'What we know (verified facts)', none: 'No verified facts yet: complete research before outreach.', hyp: 'Hypotheses to test', q: 'Questions for the meeting', units: 'WBG colleagues to involve', integ: 'Integrity pre-screen', next: 'Next step', nextTxt: 'Agree a follow-up within two weeks and log the outcome in the pipeline.', route: 'Possible route', cons: 'Category-level constraints (to verify)', mode: 'Mode', disc: 'Draft generated by a deterministic template. Hypotheses do not indicate counterpart interest or any IFC commitment.' };
    var ist = integ(p.id), done = INTEGRITY.filter(function (c) { return ist[c.id] && ist[c.id] !== 'Not started'; }).length, flags = INTEGRITY.filter(function (c) { return ist[c.id] === 'Flag'; }).length;
    var integTxt = it ? (done + ' controlli su ' + INTEGRITY.length + ' completati' + (flags ? ' · ' + flags + ' segnalazioni da risolvere prima del contatto' : '')) : (done + ' of ' + INTEGRITY.length + ' checks completed' + (flags ? ' · ' + flags + ' flags to resolve before outreach' : ''));
    var modeTxt = p.ifc >= 2 ? (it ? 'Approfondire (controparte IFC esistente)' : 'Deepen (existing IFC counterpart)') : (it ? 'Originare (primo contatto)' : 'Originate (first introduction)');
    var html = '<h3>' + esc(L.t) + ' · ' + esc(p.name) + '</h3>' +
      '<p><b>' + L.obj + ':</b> ' + esc(it ? o.it : o.en) + '<br><b>' + L.mode + ':</b> ' + esc(modeTxt) + '</p>' +
      '<h4>' + L.snap + '</h4>' + (p.facts.length ? '<ul>' + p.facts.map(function (f) { return '<li>' + esc(f[0]) + ' <span class="mini">[' + esc(S[f[1]].t) + ']</span></li>'; }).join('') + '</ul>' : '<p>' + L.none + '</p>') +
      '<h4>' + L.hyp + '</h4><ul><li><b>' + L.route + ':</b> ' + esc(p.route) + '</li><li><b>' + L.cons + ':</b> ' + esc((it ? CONSTRAINTS_IT : CONSTRAINTS)[p.type]) + '</li></ul>' + (it ? '<p class="mini">Fatti e percorso sono riportati in inglese, come nelle fonti.</p>' : '') +
      '<h4>' + L.q + '</h4><ol>' + QUESTIONS[lang][p.type].map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ol>' +
      '<h4>' + L.units + '</h4><p>' + o.units.map(esc).join(' · ') + ' <span class="mini">[' + esc(S[o.src].t) + ']</span></p>' +
      '<h4>' + (it ? 'Precedenti IFC pertinenti' : 'Relevant IFC precedents') + '</h4>' +
      (PRECEDENTS.filter(function (x) { return x.sponsor.toLowerCase() === p.name.toLowerCase(); }).length ?
        '<ul>' + PRECEDENTS.filter(function (x) { return x.sponsor.toLowerCase() === p.name.toLowerCase(); }).map(function (x) { return '<li>' + esc(x.country + ' · ' + x.sector + ' · ' + x.year + ': ' + x.what) + ' <span class="mini">[' + esc(S[x.src].t) + ']</span></li>'; }).join('') + '</ul>' :
        '<p>' + (it ? 'Nessun precedente specifico registrato nel database THEMIS; verificare eventuali operazioni e relazioni IFC prima dell’incontro.' : 'No institution-specific precedent is recorded in the THEMIS database; verify IFC transactions and relationships before the meeting.') + '</p>') +
      '<h4>' + L.integ + '</h4><p>' + esc(integTxt) + '</p>' +
      '<h4>' + L.next + '</h4><p>' + L.nextTxt + '</p><p class="mini">' + L.disc + '</p>';
    $('idkBriefOut').innerHTML = html;
  }

  // ---------------------------------------------------------------- integrity
  function renderIntegrity(pid) {
    var p = byId(pid) || P[0], ist = integ(p.id);
    $('engIntegrity').innerHTML = '<div class="card"><div class="field"><label>Prospect</label>' + pickList('idkIntegSel', p.id) + '</div>' +
      '<p class="mini">Pre-screen before any outreach, aligned with the vacancy\'s "background and integrity checks". It does not replace IFC\'s integrity due diligence, KYC or compliance clearance. Statuses are kept for this browser session only.</p>' +
      '<table><thead><tr><th>Check</th><th>Source</th><th>Status</th></tr></thead><tbody>' +
      INTEGRITY.map(function (c) {
        var v = ist[c.id] || 'Not started';
        return '<tr><td>' + esc(c.label) + '</td><td>' + (c.u ? '<a class="source-link" href="' + esc(c.u) + '" target="_blank" rel="noopener">' + esc(c.label.split(' (')[0]) + '</a>' : '<span class="mini">Internal / manual</span>') + '</td><td><select data-check="' + c.id + '">' + ISTATES.map(function (s) { return '<option' + (s === v ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></td></tr>';
      }).join('') + '</tbody></table><div id="idkIntegSummary" class="result"></div></div>';
    $('idkIntegSel').addEventListener('change', function (e) { renderIntegrity(e.target.value); });
    $('engIntegrity').querySelectorAll('select[data-check]').forEach(function (s) {
      s.addEventListener('change', function () { ist[s.dataset.check] = s.value; summary(); });
    });
    function summary() {
      var done = INTEGRITY.filter(function (c) { return ist[c.id] && ist[c.id] !== 'Not started'; }).length, flags = INTEGRITY.filter(function (c) { return ist[c.id] === 'Flag'; }).length;
      $('idkIntegSummary').innerHTML = '<b>' + done + ' of ' + INTEGRITY.length + ' checks completed.</b> ' + (flags ? flags + ' flag(s): escalate to IFC integrity due diligence before any contact.' : (done === INTEGRITY.length ? 'No flags recorded in the pre-screen.' : 'Complete the remaining checks before outreach.'));
    }
    summary();
  }

  // ---------------------------------------------------------------- method
  function renderMethod() {
    $('idkMethod').innerHTML = '<div class="grid two"><div class="card"><h3>Priority score (0–100)</h3><table>' +
      '<tr><th>Component</th><th>Weight</th><th>Basis</th></tr>' +
      '<tr><td>Emerging-market footprint</td><td>25</td><td>Documented operations or mandate (0–3)</td></tr>' +
      '<tr><td>Documented IFC relationship</td><td>30</td><td>Transactions or agreements in IFC sources (0–3)</td></tr>' +
      '<tr><td>Instrument fit</td><td>25</td><td>Analyst judgement, editable (0–3)</td></tr>' +
      '<tr><td>Evidence quality</td><td>20</td><td>Verified 20 · partly verified 12 · to research 5</td></tr></table>' +
      '<p class="mini">Tier A ≥ 75: prioritise outreach. Tier B 45–74: targeted research, then outreach. Tier C &lt; 45: research before any contact.</p></div>' +
      '<div class="card"><h3>What the score is not</h3><ul><li>It is not a measure of investment appetite, ticket size or likelihood of closing.</li><li>A high score can reflect an existing IFC relationship: the mode then shifts from origination to deepening, coordinated with the Relationship Manager.</li><li>Archetypes (asset managers, family offices, foundations) stay low until named institutions are researched and sourced.</li></ul>' +
      '<h3>Sources used on this desk</h3><ul>' + Object.keys(S).filter(function (k) { return S[k].u; }).map(function (k) { return '<li>' + src(k) + '</li>'; }).join('') + '</ul><p class="mini">Retrieved ' + RETRIEVED + '.</p></div></div>';
  }

  // ---------------------------------------------------------------- client-led origination (Opportunity Origination page)
  var NEEDS = [
    { id: 'debt', en: 'Long-tenor debt for an emerging-market project or subsidiary', prod: 'IFC senior loan; B loans or parallel loans to mobilise co-lenders', src: 'synd', units: ['Relevant Industry team', 'Syndications & Mobilization'] },
    { id: 'equity', en: 'Equity partner for an expansion or acquisition', prod: 'IFC equity or quasi-equity alongside the Italian sponsor', src: 'ifcItaly', units: ['Relevant Industry team', 'Regional investment team'] },
    { id: 'risk', en: 'Political-risk or credit-risk mitigation', prod: 'MIGA political risk insurance (transfer and convertibility, breach of contract, expropriation, war and civil disturbance) or credit enhancement; IFC can refer sponsors even without IFC participation', src: 'miga', units: ['MIGA'] },
    { id: 'trade', en: 'Trade-finance capacity for exports or imports', prod: 'Global Trade Finance Program guarantees with confirming banks', src: 'ifcItaly', units: ['Trade & supply-chain finance team'] },
    { id: 'early', en: 'Early-stage project that is not yet bankable', prod: 'IFC Upstream: early-stage project development, sometimes with public-sector reforms', src: 'upstream', units: ['IFC Upstream', 'IBRD country team'] },
    { id: 'portfolio', en: 'Diversified emerging-market credit exposure (investor)', prod: 'Managed Co-Lending Portfolio Program (MCPP): passive participation in IFC-originated loans, used by institutional investors and insurers', src: 'mcppIns', units: ['Syndications & Mobilization'] }
  ];
  var PRECEDENTS = [
    { sponsor: 'Eni', region: 'Sub-Saharan Africa', country: 'Kenya', sector: 'Agribusiness & energy', year: '2024', what: '$135m IFC + $75m mobilised from the Italian Climate Fund', src: 'eniKenya' },
    { sponsor: 'Contship Italia', region: 'Middle East & North Africa', country: 'Egypt', sector: 'Ports & logistics', year: '2023', what: '$120m IFC senior loan within a $455m package (Damietta terminal)', src: 'ifcItaly' },
    { sponsor: 'Enel', region: 'Latin America', country: 'Colombia', sector: 'Power & renewables', year: '2023', what: '$300m IFC loan to Enel Colombia', src: 'ifcItaly' },
    { sponsor: 'ASTM / Gruppo Gavio', region: 'Latin America', country: 'Brazil', sector: 'Transport concessions', year: '2023', what: '~$140m IFC investment in road-concession debentures (Ecorodovias)', src: 'ifcItaly' },
    { sponsor: 'UniCredit', region: 'Europe & Central Asia', country: 'Romania', sector: 'Financial institutions', year: '2022–23', what: '~$74m IFC investment in green-housing bonds of UniCredit Bank S.A.', src: 'ifcItaly' },
    { sponsor: 'Intesa Sanpaolo', region: 'East Asia & Pacific', country: 'China', sector: 'Financial institutions', year: '2022', what: '$40m IFC loan to Bank of Qingdao + $110m parallel loans', src: 'ifcItaly' }
  ];
  var REGIONS = ['Sub-Saharan Africa', 'Middle East & North Africa', 'Latin America', 'Europe & Central Asia', 'East Asia & Pacific', 'South Asia'];
  var SECTORS = ['Power & renewables', 'Transport concessions', 'Ports & logistics', 'Agribusiness & energy', 'Financial institutions', 'Manufacturing', 'Digital infrastructure', 'Water'];

  function renderOrigin() {
    var el = $('clientLedOrigin'); if (!el) return;
    el.innerHTML = '<div class="card idk-origin"><span class="tag live">Client-led origination · Italy</span><h2 style="margin-top:8px">Start from the Italian client</h2>' +
      '<p class="mini">Two entry points used by IFC business development in Italy: an Italian company expanding into an emerging market, or an Italian investor seeking emerging-market exposure alongside IFC. The screen proposes routes and precedents to discuss with IFC colleagues; it does not assess eligibility.</p>' +
      '<div class="input-grid"><div class="field"><label>Entry point</label><select id="coPath"><option value="corp">Italian corporate / sponsor expanding abroad</option><option value="inv">Italian investor seeking EM exposure</option></select></div>' +
      '<div class="field"><label>Client</label><select id="coClient"></select></div>' +
      '<div class="field"><label>Target country</label><input id="coCountry" value="Brazil" placeholder="Country of investment"></div>' +
      '<div class="field"><label>Target region</label><select id="coRegion">' + REGIONS.map(function (r) { return '<option>' + r + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>Sector</label><select id="coSector">' + SECTORS.map(function (r) { return '<option>' + r + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>Main need</label><select id="coNeed"></select></div></div>' +
      '<button class="btn" id="coRun">Screen the opportunity</button><div id="coOut" class="result"></div></div>';
    function fill() {
      var corp = $('coPath').value === 'corp';
      var types = corp ? ['Corporates & sponsors'] : ['Banks', 'Insurers', 'Pension funds & casse', 'Asset managers', 'Foundations', 'Family offices', 'Development finance & export credit'];
      $('coClient').innerHTML = P.filter(function (p) { return types.indexOf(p.type) > -1; }).map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + '</option>'; }).join('');
      var needs = corp ? ['debt', 'equity', 'risk', 'trade', 'early'] : ['portfolio', 'debt', 'risk', 'trade'];
      $('coNeed').innerHTML = NEEDS.filter(function (n) { return needs.indexOf(n.id) > -1; }).map(function (n) { return '<option value="' + n.id + '">' + esc(n.en) + '</option>'; }).join('');
    }
    $('coPath').addEventListener('change', function () { fill(); run(); });
    ['coClient', 'coCountry', 'coRegion', 'coSector', 'coNeed'].forEach(function (id) { $(id).addEventListener('change', run); });
    $('coRun').addEventListener('click', run);
    fill(); run();
    function run() {
      var p = byId($('coClient').value), n = NEEDS.filter(function (x) { return x.id === $('coNeed').value; })[0], country = $('coCountry').value.trim() || 'country to be specified', reg = $('coRegion').value, sec = $('coSector').value;
      var prec = PRECEDENTS.filter(function (x) { return x.region === reg || x.sector === sec; });
      var gaps = ['Named project or transaction, size and timeline', 'Sponsor financial statements and existing lenders', 'Country and sector eligibility check with the relevant IFC team'];
      if (p.status !== 'Verified') gaps.unshift('Verified institutional profile (mandate, investment rules, decision-makers)');
      if (n.id === 'risk') gaps.push('Host-country contracts and counterparties exposed to political risk');
      if (n.id === 'portfolio') gaps.push('Investment rules for emerging-market private credit and minimum rating requirements');
      $('coOut').innerHTML = '<h3>' + esc(p.name) + ' · ' + esc(country) + ' · ' + esc(reg) + ' · ' + esc(sec) + '</h3>' +
        '<p><b>Client objective in ' + esc(country) + ':</b> ' + esc(n.en) + ' in ' + esc(sec) + '.</p>' + '<p><b>Possible World Bank Group route:</b> ' + esc(n.prod) + '<br>' + src(n.src) + '</p>' +
        '<p><b>Colleagues to involve:</b> ' + n.units.map(esc).join(' · ') + (p.ifc >= 2 ? ' · Relationship Manager (existing IFC counterpart)' : '') + '</p>' +
        '<p><b>Client evidence:</b> ' + statusTag(p.status) + ' ' + esc(p.ifcRecord) + '</p>' +
        '<h4>Italian precedents in the same region or sector</h4>' + (prec.length ? '<ul>' + prec.map(function (x) { return '<li><b>' + esc(x.sponsor) + '</b> — ' + esc(x.country) + ', ' + esc(x.sector) + ', ' + esc(x.year) + ': ' + esc(x.what) + ' ' + src(x.src) + '</li>'; }).join('') + '</ul>' : '<p class="mini">No Italian precedent in the sources reviewed for this region or sector.</p>') +
        '<h4>Country and transaction checks before engagement</h4><ul><li>Confirm IFC country eligibility, country strategy and relevant sector priorities for ' + esc(country) + '.</li><li>Assess political, regulatory, FX and transfer risks for the proposed transaction.</li>' + gaps.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ul>' +
        '<p><button class="btn alt" id="coToDesk">Open the client profile →</button></p>' +
        '<p class="mini">Routes are hypotheses for internal discussion. IFC financing is subject to eligibility, appraisal and Board approval.</p>';
      $('coToDesk').addEventListener('click', function () { if (window.go) window.go('clients'); if (window.THEMIS_PG) window.THEMIS_PG('cl', 'clItaly'); renderProfile(p.id); showTab('idkProfile'); });
    }
  }

  // ---------------------------------------------------------------- engagement: ecosystem, organiser mode, WBG coordination
  var EVENTS = [
    { name: 'Salone del Risparmio (Assogestioni)', where: 'Milan', when: '2026 edition: 5–7 May', who: 'Asset managers, distributors, pension and insurance investors', why: 'Asset-manager and pension segment; private markets and pension reform sessions', src: 'sdr' },
    { name: 'Italy–Africa Business Week', where: 'Rome', when: '2026 edition (9th): opened 4 March at the Farnesina', who: 'Italian and African companies, institutions, investors', why: 'Corporate sponsors with an Africa / Mattei Plan pipeline', src: 'iabw' }
  ];
  var ASSOC = [
    ['ABI', 'Banks', 'Banks: trade finance, syndications'], ['ANIA', 'Insurers', 'Insurers: MCPP-type portfolio participation'], ['Assogestioni', 'Asset managers', 'Asset managers: product partnerships'],
    ['ACRI', 'Foundations', 'Banking foundations: impact windows'], ['Confindustria & sector associations', 'Corporates & sponsors', 'Corporates: sponsor pipeline'], ['AIFI', 'Family offices', 'Private equity and private-capital networks']
  ];
  var UNITS = [
    ['Industry teams', 'Sector expertise and investment execution for a specific deal', 'vacancy'],
    ['Syndications & Mobilization', 'B loans, parallel loans, MCPP for banks, insurers and institutional investors', 'synd'],
    ['Upstream', 'Early-stage project development before a deal is bankable', 'upstream'],
    ['MIGA', 'Political risk insurance and credit enhancement; IFC can refer sponsors even without IFC participation', 'miga'],
    ['Knowledge Bank', 'Knowledge and diagnostics to support client engagement (as listed in the vacancy)', 'vacancy'],
    ['IBRD', 'Public-sector counterpart when policy or regulatory reform conditions a private investment', 'vacancy'],
    ['Relationship Managers (CWE)', 'Coordination for existing clients under agreed engagement plans', 'vacancy']
  ];
  function renderEngagement() {
    var ev = $('engEvents'), co = $('engCoord');
    if (co) co.innerHTML = '<div class="card"><h3>Who to involve inside the World Bank Group</h3><table><tr><th>Unit</th><th>When to involve</th></tr>' +
      UNITS.map(function (u) { return '<tr><td><b>' + esc(u[0]) + '</b></td><td>' + esc(u[1]) + '<br>' + src(u[2]) + '</td></tr>'; }).join('') + '</table></div>';
    if (!ev) return;
    ev.innerHTML = '<div class="grid two"><div class="card"><h3>Verified Italian event platforms</h3>' +
      EVENTS.map(function (e) { return '<div class="event"><b>' + esc(e.name) + '</b><p>' + esc(e.where) + ' · ' + esc(e.when) + '<br><span class="mini">' + esc(e.who) + '. Relevance: ' + esc(e.why) + '.</span><br>' + src(e.src) + '</p></div>'; }).join('') +
      '<p class="mini">Only platforms with a verified source are listed. Confirm the next edition on the organiser\'s site before planning.</p></div>' +
      '<div class="card"><h3>Event planner</h3><div class="input-grid">' +
      '<div class="field"><label>Mode</label><select id="orgMode"><option value="attend">Attend an event</option><option value="organise">Organise a roundtable or webinar</option></select></div>' +
      '<div class="field"><label>Event</label><select id="orgEvent">' + EVENTS.map(function (e, i) { return '<option value="' + i + '">' + esc(e.name) + '</option>'; }).join('') + '<option value="other">Other (type below)</option></select></div>' +
      '<div class="field"><label>Audience segment</label><select id="orgSeg">' + ASSOC.map(function (a) { return '<option value="' + esc(a[1]) + '">' + esc(a[2]) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label>Theme / objective</label><select id="orgTheme"><option>Co-investing with IFC in emerging markets</option><option>Mattei Plan countries: private investment opportunities</option><option>Emerging-market private credit for Italian institutional investors</option><option>Managing political risk: IFC and MIGA instruments</option></select></div></div>' +
      '<div class="field"><label>Other event or host / partner (optional)</label><input id="orgHost" placeholder="Name of event, association, university or chamber"></div>' +
      '<button class="btn" id="orgBuild">Build plan</button><div id="orgOut" class="result"></div></div></div>';
    $('orgBuild').addEventListener('click', buildEvent);
    ['orgMode', 'orgEvent', 'orgSeg', 'orgTheme'].forEach(function (id) { $(id).addEventListener('change', buildEvent); });
    buildEvent();
  }
  function buildEvent() {
    var organise = $('orgMode').value === 'organise', seg = $('orgSeg').value, theme = $('orgTheme').value, host = $('orgHost').value.trim();
    $('orgEvent').disabled = organise;
    var assoc = ASSOC.filter(function (a) { return a[1] === seg; })[0];
    var inv = P.filter(function (p) { return p.type === seg; }).sort(function (a, b) { return score(b) - score(a); });
    var speakers = { 'Banks': 'Syndications & Mobilization; trade and supply-chain finance', 'Insurers': 'Syndications & Mobilization (MCPP)', 'Asset managers': 'Syndications & Mobilization (MCPP)', 'Foundations': 'Blended finance; relevant Industry team', 'Corporates & sponsors': 'Relevant Industry teams; MIGA', 'Family offices': 'Relevant Industry team; funds' }[seg] || 'Relevant Industry team';
    var targets = inv.length ? inv.map(function (p) { return esc(p.name) + ' (' + score(p) + ')'; }).join(' · ') : 'none mapped yet: research this segment first';
    var head, body;
    if (organise) {
      head = 'Organise · ' + esc(theme);
      body = '<p><b>Audience:</b> ' + esc(assoc[2]) + ' · <b>Host:</b> ' + (host ? esc(host) : 'to agree (candidate network: ' + esc(assoc[0]) + ')') + '</p>' +
        '<p><b>IFC / WBG speakers (roles):</b> CWE business development; ' + esc(speakers) + '. Line-up under the guidance of the WBG Country Manager for Italy.</p>' +
        '<p><b>Invitee shortlist from the Client Desk:</b> ' + targets + '</p>';
    } else {
      var ei = $('orgEvent').value, e = ei === 'other' ? null : EVENTS[+ei];
      head = 'Attend · ' + (e ? esc(e.name) : (host ? esc(host) : 'event to specify'));
      body = (e ? '<p>' + esc(e.where) + ' · ' + esc(e.when) + ' ' + src(e.src) + '</p>' : '<p class="mini">Not a verified platform: confirm organiser, date and audience before committing time.</p>') +
        '<p><b>Objective:</b> ' + esc(theme) + '</p><p><b>Who to meet (from the Client Desk, ' + esc(assoc[2]) + '):</b> ' + targets + '</p>' +
        '<p><b>Before the event:</b> prepare a brief per target (Engagement → Prepare a meeting) and complete the integrity pre-screen.</p>';
    }
    $('orgOut').innerHTML = '<h3>' + head + '</h3>' + body +
      '<p><b>Conversion to track:</b> contacts → follow-up meetings within 30 days → qualified leads (project or co-investment interest) → leads registered in the pipeline with a named Industry team.</p>' +
      '<p class="mini">Planning template. Participation, speakers and invitations require internal approval.</p>';
  }

  // ---------------------------------------------------------------- AI validation (Architecture page)
  function renderAI() {
    var el = $('aiValidation'); if (!el) return;
    el.innerHTML = '<div class="card idk-ai"><span class="tag live">How AI is used and validated</span><h2 style="margin-top:8px">Draft with AI, verify against primary sources, stay accountable</h2>' +
      '<div class="idk-chain"><div><b>1 · Draft</b><span>An LLM (e.g. Claude, ChatGPT, Copilot) proposes sources, summaries and first drafts.</span></div>' +
      '<div><b>2 · Verify</b><span>Each fact is checked against the primary document: IFC disclosures, laws, annual reports, official registers.</span></div>' +
      '<div><b>3 · Label</b><span>Facts carry source, link and retrieval date; anything unverified is marked as a hypothesis or "to research".</span></div>' +
      '<div><b>4 · Decide</b><span>The officer owns the recommendation; scores and routes are inputs to judgement, not decisions.</span></div></div>' +
      '<p class="mini"><b>In this prototype:</b> no language model runs in the browser. Content on the Italy Client Desk was researched with AI assistance and verified against the linked sources on ' + RETRIEVED + '. Briefs and plans are produced by deterministic templates. This mirrors the vacancy criterion on using commercially available LLM tools, validating outputs against primary sources and remaining accountable for recommendations.</p></div>';
  }

  function init() {
    [renderDesk, renderBrief, function () { renderIntegrity(P[0].id); }, renderOrigin, renderEngagement, renderAI].forEach(function (f) {
      try { f(); } catch (err) { console.error('Italy Client Desk:', f.name, err); }
    });
  }
  window.THEMIS_ITALY = { prospects: P, score: score, sources: S, byId: byId, tier: tier, src: src, esc: esc, statusTag: statusTag, precedents: PRECEDENTS, renderProfile: renderProfile, showTab: showTab, retrieved: RETRIEVED };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
