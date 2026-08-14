import { colors, radius, spacing } from "../../theme";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        maxWidth: "320px",
        padding: `${spacing.sm} ${spacing.md}`,
        fontSize: "0.9rem",
        color: colors.textPrimary,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.sm,
        outline: "none",
      }}
    />
  );
}
