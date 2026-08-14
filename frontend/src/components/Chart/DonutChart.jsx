import { colors, radius, shadow, spacing } from "../../theme";

// Two-or-more-slice donut with a total in the center hole and a legend.
// `segments`: [{ key, label, value, color }]
export default function DonutChart({ segments, centerLabel }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  let cumulativePct = 0;
  const stops = segments.map((segment) => {
    const pct = total > 0 ? (segment.value / total) * 100 : 0;
    const start = cumulativePct;
    cumulativePct += pct;
    return `${segment.color} ${start}% ${cumulativePct}%`;
  });

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        boxShadow: shadow.card,
        padding: spacing.lg,
        display: "flex",
        alignItems: "center",
        gap: spacing.lg,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "140px",
          height: "140px",
          flexShrink: 0,
          borderRadius: "50%",
          background: `conic-gradient(${stops.join(", ")})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "22px",
            borderRadius: "50%",
            backgroundColor: colors.surface,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "1.5rem", fontWeight: 700, color: colors.textPrimary }}>
            {total}
          </span>
          <span style={{ fontSize: "0.7rem", color: colors.textSecondary }}>{centerLabel}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
        {segments.map((segment) => {
          const pct = total > 0 ? Math.round((segment.value / total) * 100) : 0;

          return (
            <div key={segment.key} style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: segment.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "0.85rem", color: colors.textPrimary }}>{segment.label}</span>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: colors.textSecondary,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {segment.value} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
