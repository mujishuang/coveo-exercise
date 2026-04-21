import ProductList from "@/components/product-list";
import { ListingProvider } from "@/components/providers/providers";
import FacetGenerator from "@/components/facets/facet-generator";
import { buildParameterSerializer } from "@coveo/headless-react/ssr-commerce";
import ParameterManager from "@/components/parameter-manager";
import Sort from "@/components/sort";
import Pagination from "@/components/pagination";
import { fetchCoveoStaticState } from "@/lib/fetch-coveo-static-state";
import ProductCount from "@/components/product-count";

export default async function SurfAccessories({ searchParams }: { searchParams: Promise<URLSearchParams> }) {
    const { deserialize } = buildParameterSerializer();
    const urlParameters = deserialize(await searchParams);

    const { staticState, navigatorContext } = await fetchCoveoStaticState("listingEngineDefinition", {
        urlParameters,
        url: "https://sports.barca.group/plp/accessories/surf-accessories/water-bottles",
    });

    return (
        <ListingProvider staticState={staticState} navigatorContext={navigatorContext.marshal}>
            <ParameterManager url={navigatorContext.location} />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Surf Accessories</h1>
                    <p className="text-gray-600">Discover our collection of premium surf accessories</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1 order-1 lg:order-1">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <h2 className="text-lg font-semibold mb-4">Filters</h2>
                            <FacetGenerator />
                        </div>
                    </div>

                    <div className="lg:col-span-3 order-2 lg:order-2">
                        <div className="flex justify-between items-center mb-4">
                            <ProductCount label="Browse Surf Accessories" />
                            <Pagination />
                            <Sort />
                        </div>

                        <ProductList />

                        <div className="flex justify-center mt-8">
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </ListingProvider>
    );
}

export const dynamic = "force-dynamic";
