/** Splits a line into per-word spans so each one can flick in on its own
 *  transform-origin. Delay ramp copies the reference: 0.15s base, 8ms step. */
export function Words({
  text,
  mode = "bounce",
  base = 0.15,
  step = 0.008,
}: {
  text: string;
  mode?: "bounce" | "fade";
  base?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span
            className={`word ${mode}`}
            style={{ animationDelay: `${(base + i * step).toFixed(3)}s` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
