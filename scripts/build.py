#!/usr/bin/env python3
"""
Lusion Modular Builder (scripts/build.py)
1. Builds _astro/hoisted.CUO_IjfL.js from src/config/lusion.config.js + ordered modules in src/manifest.json.
2. Builds _astro/about.CNa9RfUh.css from src/styles/main.css.
3. Updates all site HTML pages with cache-busted script tags.
4. Validates JS syntax via node --check.
"""
import os
import re
import glob
import json
import subprocess
import sys

BASE_DIR = "/root/drkn/web/dist/amir"
SRC_DIR = os.path.join(BASE_DIR, "src")
MANIFEST_PATH = os.path.join(SRC_DIR, "manifest.json")
OUTPUT_JS = os.path.join(BASE_DIR, "_astro/hoisted.CUO_IjfL.js")
OUTPUT_CSS = os.path.join(BASE_DIR, "_astro/about.CNa9RfUh.css")
VERSION_TAG = "modular6"

def minify_css_safe(css_text):
    # Remove CSS comments and collapse unnecessary newlines/indentation without breaking calc() or strings
    css_text = re.sub(r"/\*.*?\*/", "", css_text, flags=re.S)
    lines = [line.strip() for line in css_text.splitlines() if line.strip()]
    joined = "".join(lines)
    joined = re.sub(r"\s*\{\s*", "{", joined)
    joined = re.sub(r"\s*\}\s*", "}", joined)
    joined = re.sub(r";\s*", ";", joined)
    joined = re.sub(r":\s+", ":", joined)
    return joined

def build():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    # 1. Assemble JS
    parts = []
    config_file = os.path.join(SRC_DIR, manifest["config"])
    with open(config_file, "r", encoding="utf-8") as f:
        parts.append(f.read())

    for mod in manifest["modules"]:
        mod_path = os.path.join(SRC_DIR, mod["path"])
        if not os.path.exists(mod_path):
            print(f"ERROR: Missing module {mod_path}")
            sys.exit(1)
        with open(mod_path, "r", encoding="utf-8") as f:
            parts.append(f.read())

    bundle_code = "\n".join(parts)
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(bundle_code)
    print(f"Built {OUTPUT_JS} from {len(manifest['modules']) + 1} modular files ({len(bundle_code):,} bytes).")

    # 2. Build CSS from src/styles/main.css
    css_src = os.path.join(SRC_DIR, manifest["styles"][0])
    if os.path.exists(css_src):
        with open(css_src, "r", encoding="utf-8") as f:
            css_raw = f.read()
        css_min = minify_css_safe(css_raw)
        with open(OUTPUT_CSS, "w", encoding="utf-8") as f:
            f.write(css_min)
        print(f"Built {OUTPUT_CSS} from {css_src} ({len(css_min):,} bytes).")

    # 3. Update HTML script tags
    html_files = sorted(set(
        glob.glob(os.path.join(BASE_DIR, "*.html"))
        + glob.glob(os.path.join(BASE_DIR, "about/*.html"))
        + glob.glob(os.path.join(BASE_DIR, "projects/*.html"))
        + glob.glob(os.path.join(BASE_DIR, "projects/*/index.html"))
    ))

    new_tag = (
        f'<script src="/amir/src/config/lusion.config.js?v={VERSION_TAG}"></script>'
        f'<script type="module" src="/amir/_astro/hoisted.CUO_IjfL.js?v={VERSION_TAG}"></script>'
    )
    pattern = re.compile(
        r'(?:<script[^>]*src="/amir/src/config/lusion\.config\.js[^"]*"[^>]*></script>)?'
        r'<script[^>]*src="/amir/_astro/hoisted\.CUO_IjfL\.js[^"]*"[^>]*></script>'
    )

    updated_count = 0
    for hp in html_files:
        with open(hp, "r", encoding="utf-8") as f:
            ht = f.read()
        ht_new, n = pattern.subn(new_tag, ht)
        if n > 0 and ht_new != ht:
            with open(hp, "w", encoding="utf-8") as f:
                f.write(ht_new)
            updated_count += 1
    print(f"Checked {len(html_files)} HTML files; updated {updated_count} files to ?v={VERSION_TAG}.")

    # 4. Syntax check
    res = subprocess.run(["node", "--check", OUTPUT_JS], capture_output=True, text=True)
    if res.returncode != 0:
        print("SYNTAX CHECK FAILED:")
        print(res.stderr)
        sys.exit(1)
    print("Syntax check passed (node --check OK)!")

if __name__ == "__main__":
    build()
