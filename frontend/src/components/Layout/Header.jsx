import { colors, spacing } from "../../theme";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: colors.scotiaRed,
        padding: `${spacing.md} ${spacing.lg}`,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "1.25rem",
            fontWeight: 600,
          }}
        >
          User Activity Dashboard
        </h1>
      </div>
    </header>
  );
}
