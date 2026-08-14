import { useMemo, useState } from "react";
import { getUsersActivity } from "../api/dashboard";
import { useApi } from "../hooks/useApi";
import Section from "../components/Layout/Section";
import DataTable from "../components/Table/DataTable";
import Loader from "../components/Feedback/Loader";
import ErrorBanner from "../components/Feedback/ErrorBanner";
import SearchInput from "../components/Filter/SearchInput";
import { colors } from "../theme";

const columns = [
  { key: "name", label: "User" },
  { key: "post_count", label: "Posts", align: "right" },
  { key: "comment_count", label: "Comments", align: "right" },
  { key: "todo_count", label: "Todos", align: "right" },
  {
    key: "completion_rate",
    label: "Completion Rate",
    align: "right",
    render: (row) => `${Math.round(row.completion_rate * 100)}%`,
  },
];

export default function UserActivitySection() {
  const { data, loading, error } = useApi(getUsersActivity);
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((row) => row.name.toLowerCase().includes(term));
  }, [data, search]);

  return (
    <Section
      title="User Activity"
      description="Post, comment, and todo activity per user."
    >
      {loading && <Loader label="Loading user activity..." />}
      {error && <ErrorBanner message="Could not load user activity data." />}
      {data && (
        <>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users by name..."
          />
          {filteredRows.length > 0 ? (
            <DataTable columns={columns} rows={filteredRows} getRowKey={(row) => row.user_id} />
          ) : (
            <p style={{ fontSize: "0.85rem", color: colors.textSecondary }}>
              No users match "{search}".
            </p>
          )}
        </>
      )}
    </Section>
  );
}
