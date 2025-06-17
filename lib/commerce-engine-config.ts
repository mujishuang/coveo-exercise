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
  defineRecommendations,
} from "@coveo/headless-react/ssr-commerce";

export const defaultContext: {
  language: string;
  country: string;
  currency: ContextState["currency"];
} = {
  language: "en",
  country: "US",
  currency: "USD",
};

export default {
  configuration: {
    organizationId: "searchuisamples",
    accessToken: "xx9b057d0c-2938-4046-bb39-59cfebfbc882",
    context: {
      ...defaultContext,
      view: {
        url: "https://sports.barca.group",
      },
    },
    analytics: {
      trackingId: "sports-ui-samples",
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
    pagination: definePagination(),
    productView: defineProductView(),
    popularViewedHome: defineRecommendations({
      options: {
        slotId: "4fa67df0-96b2-47b2-9fd0-3afc199aa638",
      },
    }),
  },
} satisfies CommerceEngineDefinitionOptions;
