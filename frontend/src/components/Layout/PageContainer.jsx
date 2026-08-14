import { spacing } from "../../theme";

export default function PageContainer({ children }) {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: spacing.xl,
        display: "flex",
        flexDirection: "column",
        gap: spacing.xl,
      }}
    >
      {children}
    </main>
  );
}
