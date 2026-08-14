import { colors, spacing } from "../../theme";

export default function Section({ title, description, children }) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            color: colors.textPrimary,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: "0.85rem",
              color: colors.textSecondary,
              marginTop: spacing.xs,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
