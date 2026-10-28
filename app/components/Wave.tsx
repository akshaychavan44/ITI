/* Wavy section edges. Each sits on the bottom of a section and is
   filled with the colour of the section that follows. `lines` adds the
   furrow contours the reference draws inside its strawberry wave.
   `edge="top"` flips that round for a section with a photograph behind
   it: the wave sits on its top and is filled with the section above, so
   the photo runs right up under the curve. */

const CURVES = [
  "M0,70 C220,20 420,10 640,48 C860,86 1060,120 1260,96 C1350,85 1400,70 1440,62",
  "M0,96 C160,60 300,36 520,52 C760,70 900,112 1120,98 C1280,88 1380,52 1440,40",
  "M0,54 C200,96 380,110 600,86 C820,62 980,26 1200,38 C1330,45 1400,66 1440,78",
];

export function Wave({
  fill,
  shape = 0,
  lines = false,
  lineColor = "rgba(255,255,255,0.22)",
  flip = false,
  edge = "bottom",
}: {
  fill: string;
  shape?: 0 | 1 | 2;
  lines?: boolean;
  lineColor?: string;
  flip?: boolean;
  edge?: "top" | "bottom";
}) {
  const curve = CURVES[shape];
  const close = edge === "top" ? "L1440,0 L0,0 Z" : "L1440,160 L0,160 Z";
  return (
    <svg
      className={edge === "top" ? "wave wave-top" : "wave"}
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d={`${curve} ${close}`} style={{ fill }} />
      {lines &&
        [22, 44, 66, 88].map((dy) => (
          <path
            key={dy}
            d={curve}
            transform={`translate(0 ${dy})`}
            fill="none"
            style={{ stroke: lineColor }}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
    </svg>
  );
}
