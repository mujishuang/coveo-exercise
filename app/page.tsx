import { RecommendationsProvider } from "@/components/providers/providers";
import PopularViewedHome from "@/components/recommendations/popular-viewed";
import { fetchCoveoStaticState } from "@/lib/fetch-coveo-static-state";

export default async function Home() {
  const { navigatorContext, staticState } = await fetchCoveoStaticState("recommendationEngineDefinition", {
    recommendationsSlots: ["popularViewedHome"],
  });

  return (
    <div>
      <h2>Welcome to our commerce store </h2>
      <RecommendationsProvider navigatorContext={navigatorContext.marshal} staticState={staticState}>
        <PopularViewedHome />
      </RecommendationsProvider>
    </div>
  );
}

export const dynamic = "force-dynamic";
