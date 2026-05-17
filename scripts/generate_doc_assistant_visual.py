from PIL import Image, ImageDraw, ImageFilter

W, H = 1200, 760
img = Image.new("RGB", (W, H), "#f6f8fb")
draw = ImageDraw.Draw(img)

blue = "#0071e3"
green = "#16a34a"
orange = "#f97316"
ink = "#1d1d1f"
muted = "#d8dee8"
paper = "#ffffff"


def rounded_box(x0, y0, x1, y1, fill, outline="#d1d5db", radius=28, width=3):
    draw.rounded_rectangle((x0, y0, x1, y1), radius=radius, fill=fill, outline=outline, width=width)


def arrow(x0, y0, x1, y1, color=blue):
    draw.line((x0, y0, x1, y1), fill=color, width=8)
    draw.polygon([(x1, y1), (x1 - 24, y1 - 14), (x1 - 24, y1 + 14)], fill=color)


shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.rounded_rectangle((80, 90, 1120, 670), radius=42, fill=(29, 29, 31, 28))
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
img = Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB")
draw = ImageDraw.Draw(img)

rounded_box(70, 70, 1130, 650, "#ffffff", "#e5e7eb", 40, 2)

# Document stack
for offset, color in [(46, "#e9f2ff"), (23, "#f3f8ff"), (0, paper)]:
    rounded_box(115 + offset, 155 + offset, 345 + offset, 500 + offset, color, "#cbd5e1", 18, 3)
draw.rectangle((150, 205, 295, 220), fill=blue)
draw.rectangle((150, 248, 315, 261), fill=muted)
draw.rectangle((150, 285, 290, 298), fill=muted)
draw.rectangle((150, 335, 310, 348), fill=muted)
draw.rectangle((150, 372, 260, 385), fill=muted)
draw.ellipse((260, 420, 315, 475), outline=orange, width=8)
draw.line((304, 464, 340, 500), fill=orange, width=8)

# AI core
rounded_box(470, 210, 730, 455, "#eefbf4", "#86efac", 30, 4)
draw.ellipse((535, 255, 665, 385), fill="#ffffff", outline=green, width=8)
for x, y in [(565, 290), (635, 290), (565, 350), (635, 350)]:
    draw.ellipse((x - 12, y - 12, x + 12, y + 12), fill=green)
draw.line((565, 290, 635, 290), fill=green, width=5)
draw.line((565, 350, 635, 350), fill=green, width=5)
draw.line((565, 290, 565, 350), fill=green, width=5)
draw.line((635, 290, 635, 350), fill=green, width=5)
draw.line((565, 290, 635, 350), fill=green, width=4)
draw.line((635, 290, 565, 350), fill=green, width=4)

# Result panel
rounded_box(860, 155, 1085, 510, paper, "#cbd5e1", 18, 3)
draw.rectangle((895, 205, 1045, 220), fill=green)
for idx, y in enumerate([260, 315, 370, 425]):
    draw.rounded_rectangle((895, y, 1045, y + 28), radius=8, fill=["#e0f2fe", "#dcfce7", "#ffedd5", "#f3f4f6"][idx])
    draw.ellipse((910, y + 8, 922, y + 20), fill=[blue, green, orange, ink][idx])

arrow(380, 330, 455, 330)
arrow(745, 330, 835, 330)

# Bottom verification rail
draw.rounded_rectangle((150, 575, 1050, 612), radius=18, fill="#111827")
for x, color in [(210, blue), (455, green), (700, orange), (945, "#93c5fd")]:
    draw.ellipse((x - 18, 575, x + 18, 611), fill=color)
draw.line((228, 593, 437, 593), fill="#64748b", width=5)
draw.line((473, 593, 682, 593), fill="#64748b", width=5)
draw.line((718, 593, 927, 593), fill="#64748b", width=5)

# Decorative data chips
for box in [(420, 120, 540, 160, blue), (585, 120, 705, 160, green), (750, 120, 870, 160, orange)]:
    x0, y0, x1, y1, color = box
    draw.rounded_rectangle((x0, y0, x1, y1), radius=20, fill=color)

img.save("public/doc-assistant-flow.png")
