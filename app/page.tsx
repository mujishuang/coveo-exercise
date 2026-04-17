import { RecommendationProvider } from "@/components/providers/providers";
import PopularViewedCarousel from "@/components/recommendations/popular-viewed-carousel";
import { fetchCoveoStaticState } from "@/lib/fetch-coveo-static-state";

export default async function Home() {
  const { staticState, navigatorContext } = await fetchCoveoStaticState("recommendationEngineDefinition", {
    url: "https://sports.barca.group",
    recommendationsSlots: ["popularViewedHome"],
  });

  return (
    <RecommendationProvider staticState={staticState} navigatorContext={navigatorContext.marshal}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Our Store</h1>
          <p className="text-gray-600">Discover our amazing products</p>
        </div>

        <PopularViewedCarousel />
      </div>
    </RecommendationProvider>
  );
}

export const dynamic = "force-dynamic";
