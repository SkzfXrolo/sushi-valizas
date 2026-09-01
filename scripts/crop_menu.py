"""Per-flavor menu thumbs from the labeled flyer — full photo cell, no title."""
from pathlib import Path
import shutil

from PIL import Image, ImageEnhance, ImageFilter

OUT = Path(r"C:\Users\robin\Projects\sushi-valizas\public\assets\menu")
SRC = OUT / "_source-menu.jpeg"


def enhance(im: Image.Image) -> Image.Image:
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=2))
    im = ImageEnhance.Contrast(im).enhance(1.1)
    im = ImageEnhance.Color(im).enhance(1.15)
    im = ImageEnhance.Brightness(im).enhance(1.04)
    return im


def export(crop: Image.Image, name: str, scale: int = 5) -> None:
    w, h = crop.size
    out = crop.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
    out = enhance(out)
    path = OUT / f"{name}.webp"
    out.save(path, "WEBP", quality=93, method=6)
    print(f"{name:14s} {out.size} {path.stat().st_size // 1024:3d}KB")


def main() -> None:
    im = Image.open(SRC).convert("RGB")
    print("source", im.size)

    # Full photo cells only (above titles) — unique labeled shot per flavor
    rolls = {
        "pollo": (52, 630, 268, 700),
        "camaron": (282, 630, 498, 700),
        "siri": (532, 630, 748, 700),
        "vegetariano": (762, 630, 978, 700),
        "california": (52, 830, 268, 900),
        "philadelphia": (282, 830, 498, 900),
        "valizas": (532, 830, 748, 900),
        "valizas-b": (762, 830, 978, 900),
        "newyork": (52, 1030, 268, 1095),
        "vegano": (282, 1030, 498, 1095),
        "panceta": (532, 1030, 748, 1095),
        "spicy": (762, 1030, 978, 1095),
        "kani": (52, 1225, 268, 1295),
        "mango": (282, 1225, 498, 1295),
        "kani-b": (532, 1225, 748, 1295),
        "mango-b": (762, 1225, 978, 1295),
    }

    for name, box in rolls.items():
        export(im.crop(box), name, scale=5)

    shutil.copyfile(OUT / "valizas-b.webp", OUT / "valizas.webp")

    for name, box in {
        "combo-16": (48, 388, 342, 542),
        "combo-24": (358, 388, 668, 542),
        "combo-36": (678, 388, 982, 542),
    }.items():
        export(im.crop(box), name, scale=4)

    print("done")


if __name__ == "__main__":
    main()
