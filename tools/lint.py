#!/usr/bin/env python3
"""Prose lint for the cookbook. Checks every tracked markdown file for the
banned-vocabulary list, em dashes, exclamation marks, and broken relative
links. Exits non-zero on any finding. CI runs exactly this; run it locally
before pushing."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {".git", "node_modules", "site"}
SKIP_FILES = {"LICENSE"}

BANNED_WORDS = re.compile(
    r"\b(delve|delving|tapestry|vibrant|pivotal|crucial|intricate|intricac\w*"
    r"|meticulous\w*|bolster\w*|garner\w*|underscore\w*|interplay|multifaceted"
    r"|nuanced|foster\w*|leverag(?:e|es|ed|ing)|utiliz\w*|commenc\w*|facilitat\w*"
    r"|encompass\w*|paramount|groundbreaking|cutting-edge|game-chang\w*"
    r"|transformative|revolutioniz\w*|seamless\w*|robust|endeavor\w*|harness\w*"
    r"|spearhead\w*|showcas\w*|unprecedented|remarkable|stunning|profound"
    r"|empower\w*|supercharge\w*|streamlin\w*)\b",
    re.IGNORECASE,
)
BANNED_PHRASES = [
    "testament to", "not just", "whether you're", "whether you are a",
    "when it comes to", "at its core", "dive in", "dive deeper", "in today's",
    "here's the thing", "at the end of the day", "in conclusion",
    "moving forward", "unlock the", "elevate your", "take it to the next level",
]

def lint_file(path: Path) -> list[str]:
    findings = []
    in_fence = False
    for n, line in enumerate(path.read_text().splitlines(), 1):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        line = re.sub(r"`[^`]*`", "``", line)  # inline code is exempt
        line = re.sub(r"<!--.*?-->", "", line)  # so are HTML comments
        rel = path.relative_to(ROOT)
        for m in BANNED_WORDS.finditer(line):
            findings.append(f"{rel}:{n}: banned word '{m.group(0)}'")
        low = line.lower()
        for p in BANNED_PHRASES:
            if p in low:
                findings.append(f"{rel}:{n}: banned phrase '{p}'")
        if "—" in line:
            findings.append(f"{rel}:{n}: em dash")
        if "!" in re.sub(r"!\[|!=", "", line):
            findings.append(f"{rel}:{n}: exclamation mark")
        for m in re.finditer(r"\]\(([^)\s#]+)(#[^)]*)?\)", line):
            target = m.group(1)
            if target.startswith(("http://", "https://", "mailto:")):
                continue
            if not (path.parent / target).resolve().exists():
                findings.append(f"{rel}:{n}: broken link '{target}'")
    return findings

def main() -> int:
    findings = []
    for path in sorted(ROOT.rglob("*.md")):
        parts = set(path.relative_to(ROOT).parts)
        if parts & SKIP_DIRS or path.name in SKIP_FILES:
            continue
        findings.extend(lint_file(path))
    for f in findings:
        print(f)
    print(f"{len(findings)} finding(s)" if findings else "clean")
    return 1 if findings else 0

if __name__ == "__main__":
    sys.exit(main())
