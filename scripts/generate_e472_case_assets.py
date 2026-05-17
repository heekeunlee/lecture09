from PIL import Image, ImageDraw, ImageFilter
import math

BLUE = "#0071e3"
GREEN = "#16a34a"
ORANGE = "#f97316"
INK = "#111827"
MUTED = "#94a3b8"
PAPER = "#ffffff"
BG = "#f6f8fb"


def rounded(draw, box, radius=24, fill=PAPER, outline="#d1d5db", width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def save_equipment_context():
    w, h = 1200, 720
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)

    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((90, 80, 1110, 640), radius=46, fill=(15, 23, 42, 28))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    img = Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB")
    draw = ImageDraw.Draw(img)

    rounded(draw, (80, 60, 1120, 620), 42, "#ffffff", "#e2e8f0", 3)
    rounded(draw, (145, 145, 570, 535), 30, "#eef2f7", "#cbd5e1", 4)
    rounded(draw, (205, 205, 510, 475), 28, "#dce6f2", "#94a3b8", 4)
    draw.ellipse((275, 250, 445, 420), fill="#f8fafc", outline=BLUE, width=10)
    draw.ellipse((322, 297, 398, 373), fill="#dbeafe", outline="#60a5fa", width=5)

    for x in [170, 585, 620]:
        draw.rounded_rectangle((x, 180, x + 28, 500), radius=14, fill="#94a3b8")
    draw.rectangle((590, 310, 760, 345), fill="#cbd5e1")

    rounded(draw, (780, 135, 1055, 535), 24, "#111827", "#334155", 3)
    draw.rounded_rectangle((815, 175, 1020, 230), radius=12, fill="#7f1d1d")
    draw.rounded_rectangle((835, 188, 1000, 217), radius=8, fill="#ef4444")
    draw.rectangle((825, 270, 1008, 282), fill="#475569")
    draw.rectangle((825, 318, 965, 330), fill="#475569")
    draw.rectangle((825, 366, 990, 378), fill="#475569")
    for y, color in [(425, GREEN), (465, ORANGE), (505, BLUE)]:
        draw.ellipse((825, y, 845, y + 20), fill=color)
        draw.rectangle((858, y + 5, 1000, y + 15), fill="#64748b")

    draw.rounded_rectangle((170, 565, 1030, 600), radius=18, fill="#e2e8f0")
    for x, color in [(250, BLUE), (515, ORANGE), (800, GREEN)]:
        draw.ellipse((x - 18, 565, x + 18, 600), fill=color)

    img.save("public/e472-equipment-context.png")


def save_sensor_trend():
    w, h = 1200, 720
    img = Image.new("RGB", (w, h), "#ffffff")
    draw = ImageDraw.Draw(img)

    rounded(draw, (70, 70, 1130, 650), 36, "#ffffff", "#dbe3ef", 3)
    plot = (150, 140, 1060, 530)
    x0, y0, x1, y1 = plot
    draw.rectangle(plot, fill="#f8fafc", outline="#cbd5e1", width=2)

    for i in range(1, 5):
        y = y0 + i * (y1 - y0) / 5
        draw.line((x0, y, x1, y), fill="#e2e8f0", width=2)
    for i in range(4):
        x = x0 + i * (x1 - x0) / 3
        draw.line((x, y0, x, y1), fill="#e2e8f0", width=2)

    times = ["09:10", "09:18", "09:24", "09:30"]
    pressure = [2.1, 4.9, 8.4, 7.8]
    current = [4.8, 5.4, 5.7, 5.8]

    def pts(vals, low, high):
        out = []
        for idx, val in enumerate(vals):
            x = x0 + idx * (x1 - x0) / (len(vals) - 1)
            y = y1 - ((val - low) / (high - low)) * (y1 - y0)
            out.append((x, y))
        return out

    p_pts = pts(pressure, 1.0, 9.0)
    c_pts = pts(current, 4.4, 6.0)

    draw.line(p_pts, fill=BLUE, width=8, joint="curve")
    draw.line(c_pts, fill=ORANGE, width=8, joint="curve")

    for x, y in p_pts:
        draw.ellipse((x - 11, y - 11, x + 11, y + 11), fill=BLUE)
    for x, y in c_pts:
        draw.ellipse((x - 11, y - 11, x + 11, y + 11), fill=ORANGE)

    alarm_x = p_pts[2][0]
    draw.line((alarm_x, y0, alarm_x, y1), fill="#ef4444", width=4)
    draw.rounded_rectangle((alarm_x - 58, 105, alarm_x + 58, 132), radius=10, fill="#fee2e2", outline="#ef4444")

    for idx, t in enumerate(times):
        x = x0 + idx * (x1 - x0) / (len(times) - 1)
        draw.rectangle((x - 28, y1 + 24, x + 28, y1 + 28), fill="#cbd5e1")

    draw.rounded_rectangle((150, 575, 430, 612), radius=16, fill="#e0f2fe")
    draw.ellipse((175, 586, 193, 604), fill=BLUE)
    draw.rounded_rectangle((465, 575, 745, 612), radius=16, fill="#ffedd5")
    draw.ellipse((490, 586, 508, 604), fill=ORANGE)

    img.save("public/e472-sensor-trend.png")


def save_manual_evidence_map():
    w, h = 1200, 720
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)
    rounded(draw, (70, 70, 1130, 650), 36, "#ffffff", "#dbe3ef", 3)

    cards = [
        (125, 165, 350, 455, "#e0f2fe", BLUE),
        (490, 135, 715, 485, "#dcfce7", GREEN),
        (850, 165, 1075, 455, "#ffedd5", ORANGE),
    ]
    for idx, (x0, y0, x1, y1, fill, color) in enumerate(cards):
        rounded(draw, (x0, y0, x1, y1), 24, fill, color, 4)
        draw.rectangle((x0 + 32, y0 + 45, x1 - 32, y0 + 62), fill=color)
        for k in range(4):
            yy = y0 + 105 + k * 42
            draw.rectangle((x0 + 32, yy, x1 - 45 - k * 16, yy + 14), fill="#cbd5e1")
        draw.ellipse((x0 + 83, y1 - 78, x0 + 135, y1 - 26), fill="#ffffff", outline=color, width=6)

    center = (600, 575)
    draw.rounded_rectangle((420, 535, 780, 615), radius=24, fill="#111827")
    for x in [350, 490]:
        draw.line((x, 455, center[0] - 70, center[1] - 20), fill=BLUE, width=6)
    draw.line((602, 485, center[0], center[1] - 40), fill=GREEN, width=6)
    for x in [850, 715]:
        draw.line((x, 455, center[0] + 70, center[1] - 20), fill=ORANGE, width=6)

    for angle, color in [(0, BLUE), (120, GREEN), (240, ORANGE)]:
        r = 23
        cx = center[0] + math.cos(math.radians(angle)) * 95
        cy = center[1] + math.sin(math.radians(angle)) * 22
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)

    img.save("public/e472-manual-evidence-map.png")


save_equipment_context()
save_sensor_trend()
save_manual_evidence_map()
