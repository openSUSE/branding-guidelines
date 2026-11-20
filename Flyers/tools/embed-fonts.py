#!/usr/bin/env python3
import base64
import pathlib
import sys

FONT_DIR = pathlib.Path(__file__).resolve().parent / "fonts"

rules = []
for weight, name in ((400, "SUSE-Regular.ttf"), (700, "SUSE-Bold.ttf")):
    data = base64.b64encode((FONT_DIR / name).read_bytes()).decode("ascii")
    rules.append(
        "@font-face{font-family:'SUSE';font-style:normal;"
        f"font-weight:{weight};src:url(data:font/ttf;base64,{data}) "
        "format('truetype')}"
    )
STYLE = "<style>" + "".join(rules) + "</style>"

for arg in sys.argv[1:]:
    path = pathlib.Path(arg)
    svg = path.read_text()
    if "data:font/ttf;base64" in svg:
        continue
    end = svg.find(">")
    if end < 0:
        continue
    path.write_text(svg[: end + 1] + STYLE + svg[end + 1 :])
    print(f"embedded SUSE in {path.name}")
