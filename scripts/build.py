#!/usr/bin/env python3
"""
Lusion Modular Builder (scripts/build.py)
Assembles the modular component files from src/ (listed in src/manifest.json)
into _astro/hoisted.CUO_IjfL.js and validates syntax via node --check.
"""
import os
import glob
import json
import subprocess
import sys

BASE_DIR = "/root/drkn/web/dist/amir"
SRC_DIR = os.path.join(BASE_DIR, "src")
MANIFEST_PATH = os.path.join(SRC_DIR, "manifest.json")
OUTPUT_PATH = os.path.join(BASE_DIR, "_astro/hoisted.CUO_IjfL.js")

def build():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    parts = []
    # 1. Include config module first
    config_file = os.path.join(SRC_DIR, manifest["config"])
    with open(config_file, "r", encoding="utf-8") as f:
        parts.append(f.read())

    # 2. Include all 31 ordered engine & UI component modules
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

    # Ensure HTML files load src/config/lusion.config.js and cache-busted bundle
    html_files = (
        glob.glob(os.path.join(BASE_DIR, "*.html"))
        + glob.glob(os.path.join(BASE_DIR, "about/*.html"))
        + glob.glob(os.path.join(BASE_DIR, "projects/*.html"))
    )
    old_tags = [
        '<script type="module" src="/amir/_astro/hoisted.CUO_IjfL.js?v=patch1"></script>',
        '<script src="/amir/src/config/lusion.config.js?v=modular1"></script><script type="module" src="/amir/_astro/hoisted.CUO_IjfL.js?v=modular1"></script>',
    ]
    new_tag = '<script src="/amir/src/config/lusion.config.js?v=modular2"></script><script type="module" src="/amir/_astro/hoisted.CUO_IjfL.js?v=modular2"></script>'
    updated_count = 0
    for hp in html_files:
        with open(hp, "r", encoding="utf-8") as f:
            ht = f.read()
        for ot in old_tags:
            if ot in ht:
                ht = ht.replace(ot, new_tag)
                with open(hp, "w", encoding="utf-8") as f:
                    f.write(ht)
                updated_count += 1
                break
    if updated_count:
        print(f"Updated script tags in {updated_count} HTML files.")

    # Validate syntax with node --check
    res = subprocess.run(["node", "--check", OUTPUT_PATH], capture_output=True, text=True)
    if res.returncode != 0:
        print("SYNTAX CHECK FAILED:")
        print(res.stderr)
        sys.exit(1)
    print("Syntax check passed (node --check OK)!")

if __name__ == "__main__":
    build()
