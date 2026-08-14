import { spacing } from "../../theme";

export default function StatCardGrid({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: spacing.md,
      }}
    >
      {children}
    </div>
  );
}
