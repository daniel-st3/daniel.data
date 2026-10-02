# Editable resume

`resume.json` is the new editable content source; `template.html` is its print template. This is a replacement workflow, not the original Word source. The previous public PDF’s metadata identified Microsoft Word (exported March 9, 2026), but no `.docx`, `.odt` or `.tex` resume source or generator was found in the repository, its available history, or the workspace.

The served file is `public/cv/Daniel_Rodriguez.pdf`, now generated from this source. `docs/references/reference_images/Daniel_Rodriguez.pdf` preserves the old Word-exported version; it is intentionally no longer identical to the public PDF. Historical paths `public/cv/Daniel Rodriguez.pdf` and `public/cv/Daniel-Rodriguez-CV.pdf` appear in Git history, but are not active downloads. Keep the old reference as historical evidence; do not use it to regenerate the current resume.

## Generate and review

Use Python 3, Node, an existing Playwright installation and Chromium. No test framework or project dependency was added.

```sh
python scripts/build-resume.py --playwright-module /absolute/path/to/existing/playwright/index.mjs
```

If Playwright is already resolvable in the project, the argument can be omitted. The generator writes `docs/resume/Daniel_Rodriguez.review.html` and `.review.pdf`. Rendering uses escaped text and a local HTML string; no resume content is sent to an external service. The HTML can also be opened in a browser and printed to Letter PDF with browser headers/footers off.

The current review HTML/PDF contain the finalized, confirmed resume. The `.review` filenames are retained for the review workflow; there is no draft banner or unresolved label. The generated review PDF and the local public PDF are byte-identical. This does not deploy the website.

All listed confirmation items were resolved by Daniel on October 1, 2026, and `reviewRequired` is empty. For future uncertain claims, add an explicit review item; `--publish` remains blocked while any review items exist. Generate and inspect the one-page PDF, then update the existing local public download with:

```sh
python scripts/build-resume.py --publish --playwright-module /absolute/path/to/existing/playwright/index.mjs
```

No website link change is needed. Following a public PDF replacement, use focused Playwright checks on the hero and About resume links and verify that the served file matches the generated PDF. Do not deploy without separate authorization.

## Two specialization slots

`resume.json` → `specializationSlots[0]` (`specialization-1`) and `[1]` (`specialization-2`). Both contain empty `title`, `detail`, `evidence` and `enabled: false`. They are omitted entirely from rendered HTML/PDF; there are no blank visual boxes or invented credentials. Populate them only after Daniel supplies the two items, verify supporting evidence (and completion if a credential), then set `enabled: true`. The generator rejects enabled slots with missing content/evidence. They appear after Selected Learning / Credentials in the existing resume flow; no homepage section was added.

## Claim choices

- Gladly bullet sources: ledger SC01/03/05/07, TA01–03, AN04–06/AP01, EN02–05/MK02/05/06/08/IN01/DQ03. Evidence IDs stay in source only. The PDF contains no confidential source excerpts, metrics, thresholds or workflow mechanics.
- Valrun remote HEAD rechecked October 1, 2026: `cac40baf9beb1e5b684dca4861ceebe3962dd1be`. Product facts follow the current repository. AI development agents are credited naturally once. No independent manual-code or open-source claim.
- Earlier experience keeps qualitative scope and internship level; removes unsupported GMV/pipeline, time-saving, SME/adoption and student-performance numbers. Consulting and teaching are separate entries with overlapping dates explicitly confirmed by Daniel.
- The thesis retains research design, NLP/media analysis and time-aware validation. No “50×” or commercial prediction claim. The final-PDF AUC 0.523431 versus 0.500 baseline is displayed conservatively as ~0.523 versus 0.500. Daniel explicitly requested the confirmed second-place KEDGE recognition. Unsupported scholarships remain omitted.
- Seven credentials are selected by ID from `data/certifications.json`: the two IBM professional certificates (completion explicitly confirmed by Daniel), Google BI, MCP Advanced Topics, Azure AI Fundamentals, Tableau advanced visualization and Google Cloud NLP. PSM I is omitted without evidence. IBM official PDFs/verification URLs remain missing; no links are invented.
- The stale freelance/developer entry is omitted; its activity/client status is unconfirmed and current personal work is accurately represented under Valrun.

## Confirmed factual reconciliation

Daniel confirmed the following on October 1, 2026:

- Gladly: Revenue Operations Analyst, **May 2026 – Present**.
- La Sabana consulting: **Strategic Consulting Lead, Consultorio de Servicio**, **Jan 2023 – Jun 2024**.
- La Sabana teaching: **Teaching Assistant – Strategic Marketing & International Financial Markets**, **Jan 2023 – Jun 2024**. These appointments overlapped.
- La Sabana: **Business Administration** (Administración de Empresas), awarded/conferred **May 2026**; **International Business Administration** (Administración de Negocios Internacionales), awarded/conferred **May 2026**.
- KEDGE: **MSc Data Analytics for Business**, academically completed/awarded. Resume display **2026**. The **October 2026** ceremony is separate from academic completion and is retained only as source context.

The English titles are rendered. Status and Spanish title details remain in source; `displayStatus: false` removes redundant status rows now that the degrees are confirmed. The richer revision uses 9.5-point body text (up from 9.2), compact entry headers and grouped education/research to retain one Letter page. Credentials use 9-point text. No content is clipped or hidden to enforce the page count.

The Gladly phrase “configured Salesforce–Marketo campaign workflows” is retained. Ledger MK05 and MK08 support direct configuration by Daniel; MK08 separately identifies shared testing and approval. This wording does not claim sole campaign strategy, sole QA, platform-wide ownership or completed rollout of every integration. The surrounding “supported integration planning and QA across teams” preserves that boundary.

## Richer resume revision

Section order: identity/current role, Experience, Selected Projects, Education & Research, Selected Learning / Credentials (followed by compact practice/tools and focused-study Specializations).

Bullet counts: Gladly 4; Back Market 4; consulting 2; teaching 1; Valrun 3; VeedurIA 1; research one compact entry. VeedurIA describes repository-supported product behavior only; Daniel's exact contribution remains unconfirmed. The two disabled named specialization slots remain available separately from the visible focused-study summary, which Daniel supplied in this request.

The canonical credential inventory contains 17 distinct completion records, not 17 professional certificates. Run `python scripts/sync-credentials.py` after changing the four homepage selections or their evidence URLs. It updates only the marked existing credentials strip. IBM entries are plain text until official verification assets are supplied; the Google BI and MCP links retain their existing local artifacts. The homepage currently has no active certificate carousel, so none was introduced.

## IBM evidence received — October 1, 2026

This update supersedes the earlier missing-IBM-evidence notes above. Daniel supplied both official completion PDFs. IBM AI Engineering: October 1, 2026, 13 courses, Coursera ID `BTD10XUYG53O`. IBM Generative AI Engineering: September 22, 2026, 16 courses, ID `KIGNOY3CJNXM`. Names, dates, titles and course counts match the canonical records. PDFs are preserved under `public/certifications/`; the canonical dataset now includes their printed official verification URLs, and the existing homepage IBM entries link to them. The seven-credential resume selection and all public resume wording remain unchanged. No LinkedIn access or deployment was performed.

## Current homepage gallery

The three-row gallery now renders seven selected credentials via `scripts/sync-credentials.py`, sharing `credentialIds` with the resume source. Both IBM PDFs and derived thumbnails are present. Homepage credential cards lead to Daniel’s requested LinkedIn profile; canonical verification URLs remain in the dataset. Earlier strip/missing-evidence notes above describe superseded stages.
