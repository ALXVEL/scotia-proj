import { colors, font } from "./theme";
import Header from "./components/Layout/Header";
import PageContainer from "./components/Layout/PageContainer";
import SummarySection from "./sections/SummarySection";
import UserActivitySection from "./sections/UserActivitySection";
import TopPostsSection from "./sections/TopPostsSection";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: colors.background,
        fontFamily: font.family,
      }}
    >
      <Header />
      <PageContainer>
        <SummarySection />
        <UserActivitySection />
        <TopPostsSection />
      </PageContainer>
    </div>
  );
}
