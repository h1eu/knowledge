#!/usr/bin/env python3
"""Regenerate the light variant of a diagram-design dark source file.

Usage:
    python3 tools/gen-dd-light.py website/diagrams/<slug>-dark.html

Writes website/diagrams/<slug>.html next to it. Deterministic: re-running
on an unchanged dark source must produce a byte-identical light file
(verify with `git diff`).

The swap table mirrors the Knowledge OS onboarding (2026-09-05):
dark skin (Linear Titanium, default) -> light skin (Crisp Porcelain).
"""
import pathlib
import sys

PAIRS = [
    ('#060913', '#F8FAFC'),
    ('#0B132B', '#FFFFFF'),
    ('#F8FAFC', '#0F172A'),
    ('#94A3B8', '#64748B'),
    ('#64748B', '#94A3B8'),
    ('#38BDF8', '#0284C7'),
    ('rgba(56,189,248,0.12)', 'rgba(2,132,199,0.08)'),
    ('rgba(56,189,248,0.40)', 'rgba(2,132,199,0.40)'),
    ('rgba(56,189,248,0.8)', 'rgba(2,132,199,0.8)'),
    ('rgba(248,250,252,0.02)', 'rgba(15,23,42,0.02)'),
    ('rgba(248,250,252,0.10)', 'rgba(15,23,42,0.10)'),
    ('rgba(248,250,252,0.40)', 'rgba(15,23,42,0.40)'),
    ('rgba(248,250,252,0.8)', 'rgba(15,23,42,0.8)'),
    ('rgba(248,250,252,0.12)', 'rgba(15,23,42,0.12)'),
    ('rgba(248,250,252,0.05)', 'rgba(15,23,42,0.05)'),
    ('rgba(148,163,184,0.10)', 'rgba(100,116,139,0.10)'),
    ('rgba(148,163,184,0.40)', 'rgba(100,116,139,0.40)'),
    ('rgba(148,163,184,0.8)', 'rgba(100,116,139,0.8)'),
]


def main() -> None:
    if len(sys.argv) != 2 or not sys.argv[1].endswith('-dark.html'):
        print('Usage: python3 tools/gen-dd-light.py website/diagrams/<slug>-dark.html')
        raise SystemExit(2)
    dark_path = pathlib.Path(sys.argv[1])
    text = dark_path.read_text()
    slug = dark_path.name[: -len('-dark.html')]
    for i, (old, new) in enumerate(PAIRS):
        text = text.replace(old, f'__DDTMP{i}__')
    for i, (old, new) in enumerate(PAIRS):
        text = text.replace(f'__DDTMP{i}__', new)
    text = text.replace(f'{slug}-dark-', f'{slug}-')
    assert '__DDTMP' not in text, 'swap placeholder leaked'
    assert f'{slug}-dark' not in text, 'dark id prefix remains'
    light_path = dark_path.with_name(f'{slug}.html')
    light_path.write_text(text)
    print(f'wrote {light_path}')


if __name__ == '__main__':
    main()
