// lib/commerce-engine-config.ts
import {
  CommerceEngineDefinitionOptions,
  defineProductList,
  defineCart,
  defineSearchBox,
  defineContext,
  defineSummary,
  defineStandaloneSearchBox,
  defineInstantProducts,
  defineParameterManager,
  defineFacetGenerator,
  defineSort,
  definePagination,
  defineProductView,
  ContextState,
} from "@coveo/headless-react/ssr-commerce";

export const defaultContext: {
  language: string;
  country: string;
  currency: ContextState["currency"];
} = {
  language: "en",
  country: "CA",
  currency: "CAD",
};

export default {
  configuration: {
    organizationId: "ps3so7mwijvbogmugn3aslbcnzy",
    accessToken: "xxca849d10-e6e0-4a61-b4fc-3930aae5ba82",
    context: {
      ...defaultContext,
      view: {
        url: "https://sports.barca.group",
      },
    },
    analytics: {
      trackingId: "barca_sports_fasttrack",
    },
  },
  controllers: {
    cart: defineCart(),
    context: defineContext(),
    summary: defineSummary(),
    productList: defineProductList(),
    searchBox: defineSearchBox(),
    standaloneSearchBox: defineStandaloneSearchBox({
      options: { redirectionUrl: "/search" },
    }),
    instantProducts: defineInstantProducts(),
    parameterManager: defineParameterManager(),
    facetGenerator: defineFacetGenerator(),
    sort: defineSort(),
    pagination: definePagination({
      options: {
        pageSize: 16
      }
    }),
    productView: defineProductView(),
  },
} satisfies CommerceEngineDefinitionOptions;
