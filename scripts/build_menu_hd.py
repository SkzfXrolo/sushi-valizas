"""Build high-quality menu thumbs from HD plate photos + flyer combos."""
from pathlib import Path
import shutil

from PIL import Image, ImageEnhance, ImageFilter

DESK = Path(r"C:\Users\robin\OneDrive\Desktop\SUSHI")
OUT = Path(r"C:\Users\robin\Projects\sushi-valizas\public\assets\menu")
FLYER = OUT / "_source-menu.jpeg"


def enhance(im: Image.Image) -> Image.Image:
    im = ImageEnhance.Sharpness(im).enhance(1.25)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.08)
    return im


def export(im: Image.Image, name: str, size: tuple[int, int] = (900, 720)) -> None:
    """Center-crop to target aspect, resize, enhance, save webp."""
    tw, th = size
    w, h = im.size
    target_ratio = tw / th
    src_ratio = w / h
    if src_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        im = im.crop((0, top, w, top + new_h))
    im = im.resize(size, Image.Resampling.LANCZOS)
    im = enhance(im)
    path = OUT / f"{name}.webp"
    im.save(path, "WEBP", quality=92, method=6)
    print(f"OK {name:14s} {path.stat().st_size // 1024:3d}KB")


def crop_file(src: Path, box: tuple[int, int, int, int]) -> Image.Image:
    return Image.open(src).convert("RGB").crop(box)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    p1, p8, p9 = DESK / "1.jpeg", DESK / "8.jpeg", DESK / "9.jpeg"

    # --- HD plate crops (centered clusters) ---
    # File 1
    export(crop_file(p1, (780, 40, 1480, 560)), "valizas")  # fried / crispy
    export(crop_file(p1, (380, 120, 1020, 720)), "philadelphia")  # salmon + chives
    export(crop_file(p1, (880, 480, 1420, 1020)), "vegetariano")  # flower maki
    export(crop_file(p1, (80, 620, 620, 1160)), "vegano")  # maki grid
    export(crop_file(p1, (60, 1180, 720, 1820)), "pollo")  # fried + yellow sauce
    export(crop_file(p1, (760, 1380, 1420, 1960)), "spicy")  # salmon cluster

    # File 8
    export(crop_file(p8, (780, 80, 1450, 620)), "mango")  # salmon/tuna/avocado tops
    export(crop_file(p8, (40, 1280, 700, 1900)), "camaron")  # fried bottom-left
    export(crop_file(p8, (700, 1200, 1450, 1850)), "california")  # salmon row
    export(crop_file(p8, (420, 40, 1100, 620)), "kani")  # flower + accents

    # File 9
    export(crop_file(p9, (700, 520, 1400, 1180)), "siri")  # salmon + chives dense
    export(crop_file(p9, (40, 700, 700, 1400)), "newyork")  # fried left
    export(crop_file(p9, (480, 1200, 1100, 1800)), "panceta")  # flower bottom
    # reuse strong salmon for leftover if needed
    export(crop_file(p9, (900, 1400, 1480, 1980)), "kani-b")

    # Combos from flyer (only decent plate shots there) — upscale carefully
    flyer = Image.open(FLYER).convert("RGB")
    for name, box in {
        "combo-16": (50, 390, 340, 540),
        "combo-24": (360, 390, 665, 540),
        "combo-36": (680, 390, 980, 540),
    }.items():
        export(flyer.crop(box), name, size=(900, 600))

    # cleanup
    for p in OUT.glob("_hd/**/*"):
        pass
    shutil.rmtree(OUT / "_hd", ignore_errors=True)
    for p in OUT.glob("_sheet5.jpg"):
        p.unlink(missing_ok=True)
    print("done")


if __name__ == "__main__":
    main()
