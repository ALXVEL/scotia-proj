import { colors, spacing } from "../../theme";

export default function Loader({ label = "Loading..." }) {
  return (
    <div
      style={{
        padding: spacing.lg,
        color: colors.textSecondary,
        fontSize: "0.9rem",
      }}
    >
      {label}
    </div>
  );
}
