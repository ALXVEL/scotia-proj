import { getTopCommentedPosts } from "../api/dashboard";
import { useApi } from "../hooks/useApi";
import Section from "../components/Layout/Section";
import DataTable from "../components/Table/DataTable";
import Loader from "../components/Feedback/Loader";
import ErrorBanner from "../components/Feedback/ErrorBanner";

const TOP_POSTS_LIMIT = 10;

const columns = [
  { key: "rank", label: "#", align: "right" },
  { key: "title", label: "Post" },
  { key: "comment_count", label: "Comments", align: "right" },
];

export default function TopPostsSection() {
  const { data, loading, error } = useApi(
    () => getTopCommentedPosts(TOP_POSTS_LIMIT),
    [TOP_POSTS_LIMIT],
  );

  // backend returns posts already sorted by comment count, just add the display rank
  const rankedRows = data?.map((row, index) => ({ ...row, rank: index + 1 }));

  return (
    <Section
      title="Top Commented Posts"
      description={`The ${TOP_POSTS_LIMIT} posts with the most comments.`}
    >
      {loading && <Loader label="Loading top posts..." />}
      {error && <ErrorBanner message="Could not load top posts data." />}
      {rankedRows && (
        <DataTable columns={columns} rows={rankedRows} getRowKey={(row) => row.post_id} />
      )}
    </Section>
  );
}
