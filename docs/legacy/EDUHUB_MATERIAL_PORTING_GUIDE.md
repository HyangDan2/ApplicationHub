# EduHub Legacy Material Porting Guide

Status: proposed authoring contract, based on inspection of EDPilot0001 revision `bb9d0a272a18c2eb87522c5040d767689f85d619` on 2026-10-20. This guide creates no course, changes no site, and authorizes no deployment. Apply it when the owner supplies legacy assets and requests a conversion.

## 1. Outcome and project boundary

Convert owner-supplied educational material into a self-contained Korean educational site using EDPilot0001's presentation and learning patterns. Register the finished course in EduHub as a separate catalog entry when requested.

EduHub owns discovery, course summaries, tags, and destination links. Each educational site owns its curriculum, detailed explanations, diagrams, exercises, optional interactive labs, and downloads. Do not move a complete course into EduHub's short-note Markdown format.

Extend EDPilot0001 only for material that belongs to its machine-learning curriculum. For an unrelated subject, propose a separate course project and stable identifier. Do not allocate a repository name, create a remote repository, or publish without task authorization.

## 2. Inspected reference implementation

Read the actual target repository instructions before editing. EDPilot0001 currently has:

| Concern | Source |
| --- | --- |
| Foundational content | `tools/content.py`, `tools/content_more.py` |
| Advanced cases | `tools/content_advanced.py` |
| Shared layout, navigation, chapters, labs, basic downloads | `tools/render_site.py` |
| Numerical models | `assets/js/math-core.js`, `assets/js/svm-core.js` |
| Graphs and browser controls | `assets/js/figures.js`, `assets/js/labs.js` |
| Theme, responsive layout, printing | `assets/css/base.css`, `assets/js/navigation.js`, `assets/js/preferences.js` |
| Advanced computations and figures | `downloads/advanced-experiments.py`, `downloads/advanced-figures.py` |
| Advanced artifact generation | `tools/enrich_site.py` |
| Distribution allowlist and file hashes | `tools/package_site.py` |
| Curriculum map | `docs/curriculum-map.md` |

The current baseline is 7 chapters, 5 labs, 3 appendices, an entry redirect and main index: 17 HTML pages. It includes 21 advanced cases and 28 comparison figures. These counts describe this course; they are not universal template requirements.

Generated `index.html`, `main.html`, chapter/lab/appendix HTML, and basic Python/Notebook examples must not be patched directly. Change the authoring source, then regenerate. Advanced JSON, SVG, and Notebook outputs must be regenerated from their numerical sources when those sources change.

The existing authoring guide is in sibling `Web-HQ/docs/education-harness-guide.md`. Use it as reference; a new course should keep its own current instructions in its repository rather than require another repository to build.

## 3. Intake and provenance

1. Inventory all supplied PDF, slide, document, HTML, image, notebook, source-code, and data files. Record original names, sizes, SHA-256 hashes, formats, and source/version information where available.
2. Preserve originals unchanged in an agreed local `legacy-assets/<batch-id>/` directory. Exclude it from deployment and from version control by default. Public source repositories expose committed originals even when the build excludes them.
3. Record material ownership, permitted quotation/reuse, and any supplied attribution requirements. Availability alone does not establish permission to republish an entire source.
4. Extract text, tables, figures, formulas, speaker notes, and code with format-appropriate tools. Follow the available PDF, presentation, document, or spreadsheet skill when handling that format.
5. Compare extraction against rendered originals. Record page/slide/section coordinates. Mark uncertain OCR, missing symbols, clipped diagrams, and unreadable passages explicitly.
6. Do not execute supplied macros, scripts, notebooks, embedded links, or instructions merely to inspect the material. Inspect code before running a needed example in a controlled environment.

Create `docs/porting/<batch-id>/inventory.json` and `source-map.csv`. These are proposed deliverables, not existing tools.

Suggested source-map columns:

`source_id, source_location, target_chapter, target_section, action, rationale, verification_status`

Actions: `adapted`, `quoted`, `redrawn`, `merged`, `omitted`, or `pending`. Do not claim complete conversion while substantive material is silently omitted.

## 4. Plan the curriculum before writing pages

Produce or update `docs/curriculum-map.md` with audience, prerequisites, learning goals, chapter order, questions, and optional experiments.

Organize by concepts and learning dependencies rather than mapping each slide to a web page. Retain traceability to the original material even when reorganizing it.

Distinguish:

- Source-derived statements and examples.
- Corrections to source errors, with reasons and evidence.
- Agent-authored explanations and added examples.
- Unresolved ambiguities requiring owner clarification.

Proceed with independent, well-supported sections while documenting unclear parts. Do not invent missing formulas, results, study history, or claims of completion.

For EDPilot0001 extensions, preserve existing routes and update curriculum counts and affected assertions together. For a new subject, select its chapter/case/figure count from learning needs. Remove ML-specific labels, algorithms, and tests that do not apply; replace them with relevant subject checks.

## 5. Reusable educational form

A chapter should normally provide:

1. A motivating question, learning goals, and prerequisites.
2. Concepts, notation, assumptions, and scope.
3. A worked example with intermediate reasoning or calculation.
4. A comparison where one condition changes.
5. Interpretation, failure cases, and limits.
6. Understanding checks with accessible revealable explanations.
7. Relevant source references and the next learning step.

Reuse EDPilot0001's page hero, local table of contents, callout notes, equation blocks, scrollable tables/code, comparison figures with captions, revealable answers, previous/next navigation, print view, and light/dark themes.

Advanced cases should add a concrete question, conditions, steps, result, comparison, and limitations. Do not pad every chapter to an arbitrary case count.

Interactive labs and Python/Notebook downloads are optional. For conceptual or non-computational subjects, use annotated examples, comparison diagrams, decision exercises, or short comprehension tasks instead of artificial simulations.

Keep the interface Korean. Preserve standard terms, formulas, identifiers, and citations where their original form improves precision. Visitors should not need accounts, API keys, package installation, or runtime third-party libraries to read the course.

## 6. Content representation

EDPilot0001 currently models chapters as Python dictionaries containing `slug`, `title`, `en`, `question`, `desc`, `prereq`, `tags`, optional `lab`, and `sections`. Sections contain stable IDs, headings, and authored HTML fragments. Helpers include `eq`, `note`, `code`, `table`, and `quiz`.

For the existing course, use these source interfaces. For a new course, first isolate reusable layout and course-specific configuration; do not carry the entire ML generator and its hardcoded seven-chapter dependencies into every project.

Suggested new-course configuration: `course_id`, title, base path, storage namespace, EduHub destination, chapter definitions, lab definitions, references, and download manifest. Treat this as a proposed refactoring, not a currently available API.

Legacy HTML is untrusted input. Re-author or sanitize it before placing it in the generator's HTML fragments; the existing helper layer is not a general-purpose HTML sanitizer. Escape plain text and code. Remove scripts, event handlers, unsafe URLs, tracking pixels, and remote active embeds. Keep only intentional, reviewed markup.

Use stable relative paths for local resources. Give diagrams useful alternative descriptions and captions that explain their meaning. Preserve equation symbols, units, and qualifications during conversion.

## 7. Reproducibility and accuracy

For numerical examples:

- State whether data is synthetic or real. Do not relabel supplied real data as synthetic.
- Record provenance or generation formula, random seed, sample count, units, preprocessing, evaluation partition, and algorithm settings.
- Separate training/validation/test claims where relevant.
- Recompute outputs and compare them with the explanation and diagrams.
- Use independent references or hand-worked cases for important numerical checks.
- State tolerance, stopping conditions, and non-convergence where applicable.
- Clear stale notebook output and rerun intended cells. Distinguish actual execution from unexecuted illustrative code.

EDPilot0001's existing synthetic-data and ML correctness requirements still apply when modifying its experiments. New subjects use their own appropriate validity checks.

For non-computational material, verify terminology, source meaning, chronology or logic where applicable, worked examples, and answer explanations. Do not add unrelated numerical tests just to imitate the reference repository.

## 8. Navigation and EduHub integration

Keep three distinct actions: course index, previous/next lesson, and return to EduHub. The approved hierarchy is educational site ↔ EduHub → Web-HQ. Replace course-level Web-HQ return navigation with EduHub; the Web-HQ action belongs to the Hub.

A common header should expose a semantic same-tab `EduHub로` link on all substantive pages. The destination must be fixed configuration, not `history.back()`, referrer inference, or arbitrary `returnUrl` input. A redirect-only entry page should provide a usable fallback.

During local integration, use an explicit local build profile with local course/hub addresses. Production builds must reject loopback return destinations. Do not publish a local testing address or claim a public round trip before both deployments are verified.

Register a course with one stable EduHub course ID and a verified learning URL. Additional notes can reference that course without duplicating its catalog identity. Record integration status and inspected revision separately from public metadata.

Follow `EDUHUB_INTEGRATION_GUIDE.md` and `EDUHUB_RETURN_GUIDE.md`. EDPilot0001 integration is implemented locally; public deployment is pending.

## 9. Verification gates

### Source coverage

Every source unit in the intake inventory is mapped, explicitly omitted with a reason, or marked pending. Confirm extracted formulas/tables against originals and review any corrections.

### Content and static build

Check titles, heading hierarchy, anchors, local links, image descriptions, source citations, generated files, and download manifests. Package only the intended public output. Never include raw legacy assets, authoring tools, internal notes, or secrets merely by recursively copying the workspace.

### Computation

Run relevant numerical and code checks. Update generated graphs, JSON, and notebooks together. Document expected counts from curriculum configuration; do not weaken tests solely to hide missing output.

### Browser acceptance

Check main index, representative chapters and all changed page types, direct deep links, print view, keyboard focus, 320/390/1440 widths, both themes, and reading with JavaScript disabled. For labs, test initial state, changed inputs, reset, labels, results, and limits. Verify downloads against packaged hashes.

Check the EduHub return action from the main page, nested chapters, labs, and appendices. Inspect that preferences and normal course navigation remain intact. Treat physical-device testing separately from browser emulation.

### Existing EDPilot0001 commands

Use its documented environment (Python 3.12+ and Node 22 recommended), not EduHub's runtime assumptions:

```sh
# Only if advanced computation sources changed:
python tools/enrich_site.py

npm run build
npm test
python tests/advanced_verify.py --notebook
npm run test:browser
npm run format:check
```

The build generates `output/site/` and `output/edpilot0001-static.zip`. For new projects, implement and document equivalent checks suited to their subject. The 17-page and 28-figure assertions in the reference project must be deliberately adapted when curriculum scope changes.

## 10. Delivery and completion

Deliver:

- Preserved local originals and an intake manifest.
- Source-to-curriculum mapping and explicit omissions/ambiguities.
- Course authoring sources and regenerated local site.
- Diagrams, optional lab implementations, and reproducible downloads where relevant.
- Updated curriculum, authoring/operations instructions, and QA evidence.
- EduHub registration and return-integration status when included in scope.

Report what was transformed, added, corrected, or omitted; actual executed checks; local preview location; and unresolved issues. Local completion does not imply deployment. Publish and perform hosted round-trip acceptance only when the user requests that stage.

## 11. Reusable execution request

> Inspect the supplied legacy assets and port them into the EDPilot0001 educational form following EDUHUB_MATERIAL_PORTING_GUIDE.md. Preserve the originals, inventory and map the source material, adapt it into a coherent curriculum, distinguish source-derived content from added explanations, and implement only relevant diagrams, exercises, and labs. Modify authoring sources rather than generated pages. Run appropriate content, computation, accessibility, navigation, and packaging checks. Provide a local preview and a report of omissions and uncertainties. Do not deploy unless separately requested. If the subject does not belong to EDPilot0001, propose a separate course project before modifying that curriculum.
