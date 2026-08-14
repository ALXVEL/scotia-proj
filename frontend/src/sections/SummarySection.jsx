import { getSummary } from "../api/dashboard";
import { useApi } from "../hooks/useApi";
import { colors, spacing } from "../theme";
import Section from "../components/Layout/Section";
import StatCardGrid from "../components/Card/StatCardGrid";
import StatCard from "../components/Card/StatCard";
import DonutChart from "../components/Chart/DonutChart";
import Loader from "../components/Feedback/Loader";
import ErrorBanner from "../components/Feedback/ErrorBanner";

export default function SummarySection() {
  const { data, loading, error } = useApi(getSummary);

  return (
    <Section
      title="Summary"
      description="Totals across all users, posts, comments, and todos."
    >
      {loading && <Loader label="Loading summary..." />}
      {error && <ErrorBanner message="Could not load summary data." />}
      {data && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md, alignItems: "stretch" }}>
          <div style={{ flex: "2 1 320px" }}>
            <StatCardGrid>
              <StatCard label="Users" value={data.total_users} />
              <StatCard label="Posts" value={data.total_posts} />
              <StatCard label="Comments" value={data.total_comments} />
            </StatCardGrid>
          </div>
          <div style={{ flex: "1 1 280px" }}>
            <DonutChart
              centerLabel="Todos"
              segments={[
                { key: "completed", label: "Completed", value: data.completed_todos, color: colors.scotiaRed },
                { key: "pending", label: "Pending", value: data.pending_todos, color: colors.neutral },
              ]}
            />
          </div>
        </div>
      )}
    </Section>
  );
}
