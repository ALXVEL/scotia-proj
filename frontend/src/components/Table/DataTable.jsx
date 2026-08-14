import { colors, radius, shadow } from "../../theme";

// columns: [{ key, label, align? }]
// rows: array of plain objects keyed by column.key
export default function DataTable({ columns, rows, getRowKey }) {
  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        boxShadow: shadow.card,
        overflowX: "auto",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  textAlign: column.align || "left",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  color: colors.textSecondary,
                  padding: "12px 16px",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={getRowKey ? getRowKey(row) : index}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    textAlign: column.align || "left",
                    fontSize: "0.9rem",
                    color: colors.textPrimary,
                    padding: "12px 16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
