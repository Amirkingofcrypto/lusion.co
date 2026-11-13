#!/usr/bin/env python3
"""
Lusion Modular Builder (scripts/build.py)
Assembles the modular component files from src/ (listed in src/manifest.json)
into _astro/hoisted.CUO_IjfL.js, updates all site HTML pages, and validates syntax.
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
OUTPUT_PATH = os.path.join(BASE_DIR, "_astro/hoisted.CUO_IjfL.js")
VERSION_TAG = "modular4"

def build():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

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
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(bundle_code)

    print(f"Built {OUTPUT_PATH} from {len(manifest['modules']) + 1} modular files ({len(bundle_code):,} bytes).")

    # Discover all site HTML files (root, about, contact, projects, projects/*)
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

    print(f"Checked {len(html_files)} HTML files; updated script tags in {updated_count} files.")

    res = subprocess.run(["node", "--check", OUTPUT_PATH], capture_output=True, text=True)
    if res.returncode != 0:
        print("SYNTAX CHECK FAILED:")
        print(res.stderr)
        sys.exit(1)
    print("Syntax check passed (node --check OK)!")

if __name__ == "__main__":
    build()
