#!/usr/bin/env python3
"""Export cropped catalog preview JPGs. Source PDFs stay on Drive."""
from pathlib import Path
import subprocess
import tempfile

from PIL import Image

SCSTATE = Path(
    "/Users/latishaimara/Library/CloudStorage/GoogleDrive-latisha.ford1@gmail.com/My Drive/SCSTATE"
)
OUT_PUBLIC = Path(
    "/Users/latishaimara/Development/Projects/Active/MidnightMagnolia/public/brand/print-samples"
)
OUT_ASSETS = Path(
    "/Users/latishaimara/Development/Projects/Active/MidnightMagnolia-Assets/print-samples"
)
MAX_W = 1400
QUALITY = 82


def save_jpg(im: Image.Image, name: str) -> None:
    im = im.convert("RGB")
    width, height = im.size
    if width > MAX_W:
        height = int(height * (MAX_W / width))
        width = MAX_W
        im = im.resize((width, height), Image.Resampling.LANCZOS)
    for dest in (OUT_PUBLIC, OUT_ASSETS):
        dest.mkdir(parents=True, exist_ok=True)
        path = dest / name
        im.save(path, "JPEG", quality=QUALITY, optimize=True)
        print(f"wrote {path} {path.stat().st_size} bytes {im.size}")


def raster_pdf(pdf: Path, size: int = 1800) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        result = subprocess.run(
            ["qlmanage", "-t", "-s", str(size), "-o", str(tmp_path), str(pdf)],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            raise SystemExit(result.stderr or result.stdout or f"qlmanage failed for {pdf}")
        pngs = list(tmp_path.glob("*.png"))
        if not pngs:
            raise SystemExit(f"qlmanage produced no png for {pdf}")
        with Image.open(pngs[0]) as opened:
            return opened.copy()


def main() -> None:
    winter = Image.open(SCSTATE / "winter-cover-2015-0126_all.jpg")
    save_jpg(winter, "scstate-winter-2015-cover.jpg")
    winter.close()

    jobs = [
        ("Cover_2014_all-2.pdf", "scstate-fall-2014-cover.jpg"),
        ("COVER_Summer2015_33015-5.pdf", "scstate-spring-summer-2015-cover.jpg"),
        ("Inside Pages_Fall_1013_14.pdf", "scstate-fall-2014-interior.jpg"),
    ]
    for src, dest in jobs:
        print(f"raster {src}")
        image = raster_pdf(SCSTATE / src)
        print(f"  raster size {image.size}")
        save_jpg(image, dest)


if __name__ == "__main__":
    main()
