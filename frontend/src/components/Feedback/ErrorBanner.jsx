import { colors, radius, spacing } from "../../theme";

export default function ErrorBanner({ message = "Something went wrong." }) {
  return (
    <div
      style={{
        padding: spacing.md,
        borderRadius: radius.sm,
        backgroundColor: "#FBEAE9",
        color: colors.danger,
        fontSize: "0.9rem",
        border: `1px solid ${colors.danger}33`,
      }}
    >
      {message}
    </div>
  );
}
