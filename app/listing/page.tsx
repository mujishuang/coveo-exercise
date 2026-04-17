import ProductList from "@/components/product-list";
import { SearchProvider } from "@/components/providers/providers";
import FacetGenerator from "@/components/facets/facet-generator";
import { buildParameterSerializer } from "@coveo/headless-react/ssr-commerce";
import ParameterManager from "@/components/parameter-manager";
import Sort from "@/components/sort";
import Pagination from "@/components/pagination";
import { fetchCoveoStaticState } from "@/lib/fetch-coveo-static-state";

export default async function Listing({ searchParams }: { searchParams: Promise<URLSearchParams> }) {
    const { deserialize } = buildParameterSerializer();
    const urlParameters = deserialize(await searchParams);

    const { staticState, navigatorContext } = await fetchCoveoStaticState("searchEngineDefinition", {
        urlParameters,
        url: "https://sports.barca.group/shop-all",
    });

    return (
        <SearchProvider staticState={staticState} navigatorContext={navigatorContext.marshal}>
            <ParameterManager url={navigatorContext.location} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Product Listings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Facets Sidebar */}
                    <div className="lg:col-span-1 order-1 lg:order-1">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <h2 className="text-lg font-semibold mb-4">Filters</h2>
                            <FacetGenerator />
                        </div>
                    </div>

                    {/* Product List Area */}
                    <div className="lg:col-span-3 order-2 lg:order-2">
                        {/* Sort Controls */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm text-gray-600">
                                Browse our product catalog
                            </div>
                            <Sort />
                        </div>

                        {/* Products Grid */}
                        <ProductList />

                        {/* Pagination */}
                        <div className="flex justify-center mt-8">
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </SearchProvider>
    );
}

export const dynamic = "force-dynamic";

// Made with Bob
