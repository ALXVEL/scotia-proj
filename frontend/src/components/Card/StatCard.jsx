import { colors, radius, shadow, spacing } from "../../theme";

export default function StatCard({ label, value, accent = false }) {
  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        boxShadow: shadow.card,
        padding: spacing.lg,
      }}
    >
      <p
        style={{
          fontSize: "0.8rem",
          color: colors.textSecondary,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          marginTop: spacing.xs,
          color: accent ? colors.scotiaRed : colors.textPrimary,
        }}
      >
        {value}
      </p>
    </div>
  );
}
