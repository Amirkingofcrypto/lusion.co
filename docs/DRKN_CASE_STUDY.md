# DRKN project case study

The animated `/projects/drkn/` project now presents ten editorial chapters and six
unique images: the existing cover, three original mint/copper brand illustrations,
and two actual public guest-interface captures. The long-form reading edition at
`/projects/drkn/read/` includes the complete 1,270-word English story, chapter
navigation, project facts, explanatory captions and a Persian summary.

The text covers the product problem, identity, conversational workspace, mobile,
evidence-led research, background pattern scanning, Telegram/account continuity,
credits, engineering and ongoing product direction. It distinguishes implemented
capabilities from research limitations and does not claim measured trading returns,
guaranteed accuracy, compiled Rust acceleration or confidential client outcomes.

`projects/drkn/case-study.json` is the single editorial source.
`assets/projects/drkn/case-study.css` styles only the dependency-free reading
edition. A small style block inside the native project description survives the
portfolio's SPA project-data transfer and scopes its text formatting to DRKN.
The existing gallery handles native text/image panels; no shared animation,
WebGL, routing, loading or stylesheet bundles were changed.

Regenerate both editions with:

```sh
/root/drkn/venv/bin/python scripts/build-drkn-case-study.py
```

The builder needs BeautifulSoup and Pillow. It touches only DRKN's two HTML
editions and DRKN's entry in the existing project catalog.

## Image provenance

- `home.webp` / `home_depth.webp`: existing DRKN cover and neutral depth data.
- `research-banner.webp`, `evidence-banner.webp`, `connected-banner.webp`: original
  AI-generated editorial artwork, November 17, 2026. Concept illustrations, not
  screens or performance results. Image generation is the only source of semantic
  image content; publication only converts/compresses to WebP.
- `desktop-workspace.webp`, `mobile-workspace.webp`: browser captures of the live
  public guest `/copilot` at 1440x1000 and 390x844. No user sessions or private
  account data were used. Captions identify them as product captures.

All six gallery images plus existing depth occupy about 423 KiB compressed in
this revision. Explicit dimensions reserve layout; reader images load lazily and
are decoded asynchronously. The reading edition needs no JavaScript or WebGL,
respects reduced motion and retains semantic headings, anchors and focus states.

## Verification

Browser checks on the public reading route at 1440, 390 and 320px confirmed ten
chapters, six decoded images, a working Persian summary, no horizontal overflow,
no page errors and no failed asset responses. Top/editorial/mobile screenshots
were inspected. Native project checks cover the project title, reading-edition
link and gallery contents. Generated asset paths use `/amir/assets/projects/drkn/`
so they cannot fall through to the main product's HTML asset bridge.

No production service, tunnel, account data or other portfolio project is changed
by this publication. The source and generated delivery live in the independent
Amir portfolio repository.
