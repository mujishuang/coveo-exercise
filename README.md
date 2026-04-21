# Next.js Coveo SSR Commerce (Training Project)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

> **Note:** This project is for training purposes.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/coveo-labs/enablement_headless_ssr_commerce.git
cd enablement_headless_ssr_commerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the application for production.
- `npm run start` – Start the production server.
- `npm run lint` – Run ESLint.
- `npm run format` – Format code using Prettier.

## Tasks / TODOs

- [ ] Replace placeholder values (`organizationId`, `accessToken`, `trackingId`) in [`lib/commerce-engine-config.ts`](lib/commerce-engine-config.ts) with real credentials.
- [ ] Review and update the commerce engine configuration as needed for your use case.
- [ ] Implement the recommendations engine definition and provider in [`components/providers/providers.tsx`](components/providers/providers.tsx).
- [ ] Add a recommendation carousel to the homepage.
- [ ] Implement the listing engine definition and provider in [`components/providers/providers.tsx`](components/providers/providers.tsx).
- [ ] Create a new page at [`app/listing`](app/listing) to display product listings.
- [ ] Implement additional features or controllers as required for your training objectives.

> Check the code for further TODO comments and update this list as you progress.

## How Headless SSR Works in This Project

This project uses [Next.js App Router](https://nextjs.org/docs/app) together with Coveo Headless SSR Commerce to render commerce pages with server-fetched state and client-side interactive controllers.

### High-level flow

1. A request reaches a route such as [`app/listing/kayaks/page.tsx`](app/listing/kayaks/page.tsx) or [`app/listing/paddleboards/page.tsx`](app/listing/paddleboards/page.tsx).
2. The page reads the incoming [`searchParams`](app/listing/kayaks/page.tsx:11) and deserializes them with [`buildParameterSerializer()`](app/listing/kayaks/page.tsx:12).
3. The page calls [`fetchCoveoStaticState()`](lib/fetch-coveo-static-state.ts), passing:
   - the selected engine definition name such as `listingEngineDefinition`
   - the deserialized URL parameters
   - the target commerce URL used for the product listing request
4. The server fetches the static SSR state for the Coveo commerce engine before the page is sent to the browser.
5. The page wraps its content in a provider such as [`ListingProvider`](components/providers/providers.tsx), passing the fetched `staticState` and `navigatorContext`.
6. Client components such as [`ProductCount`](components/product-count.tsx), [`ProductList`](components/product-list.tsx), [`Pagination`](components/pagination.tsx), [`Sort`](components/sort.tsx), and [`FacetGenerator`](components/facets/facet-generator.tsx) consume the hydrated engine state through hooks exported from [`lib/commerce-engine.ts`](lib/commerce-engine.ts).
7. After hydration in the browser, the Headless controllers continue to manage interactive updates such as pagination, sorting, and filtering.

### Engine and provider architecture

The shared commerce engine definitions are declared in [`lib/commerce-engine.ts`](lib/commerce-engine.ts).  
This file exports:
- [`listingEngineDefinition`](lib/commerce-engine.ts:9)
- [`searchEngineDefinition`](lib/commerce-engine.ts:10)
- [`recommendationEngineDefinition`](lib/commerce-engine.ts:11)
- [`standaloneEngineDefinition`](lib/commerce-engine.ts:12)

It also exports controller hooks such as:
- [`useSummary`](lib/commerce-engine.ts:30)
- [`useProductList`](lib/commerce-engine.ts:32)
- [`useFacetGenerator`](lib/commerce-engine.ts:36)
- [`useSort`](lib/commerce-engine.ts:37)
- [`usePagination`](lib/commerce-engine.ts:38)

These hooks are connected to the correct engine through providers created in [`components/providers/providers.tsx`](components/providers/providers.tsx), for example:
- [`ListingProvider`](components/providers/providers.tsx:13)
- [`SearchProvider`](components/providers/providers.tsx:16)
- [`RecommendationProvider`](components/providers/providers.tsx:19)

### Why SSR is useful here

Using SSR in this commerce project provides several benefits:
- Faster first render for category and listing pages
- Better SEO because content is available in the initial HTML response
- Better consistency between URL parameters and initial page state
- Cleaner integration of server-fetched commerce data with interactive client-side filters and controls

### How the product count works

[`ProductCount`](components/product-count.tsx) is a client component:
- It calls [`useSummary()`](components/product-count.tsx:10) to access the summary controller state.
- It reads [`state.totalNumberOfProducts`](components/product-count.tsx:14) to display the number of products currently available for the listing.
- The visible label text is passed by each page through the `label` prop.

So the displayed text is composed of:
- a manual page label from the page component
- the live product count from the Headless summary controller state

Example:
```tsx
<ProductCount label="Browse Paddleboards" />
```

This label comes from the page file, while the numeric count comes from the summary state.

### How to inspect the summary state during debugging

To inspect what is inside the summary controller state:

1. Open [`components/product-count.tsx`](components/product-count.tsx).
2. Set a breakpoint on [`const { state } = useSummary();`](components/product-count.tsx:10).
3. Because this file starts with `"use client"`, the breakpoint must be hit in the browser runtime, not only on the Node.js server.
4. Open a listing page such as `/listing/kayaks` or `/listing/paddleboards`.
5. Refresh the page and inspect the `state` object in the debugger.

A quick debugging option is to temporarily log the state:
```tsx
console.log("summary state", state);
```

## Notes About the Code Changes

The following changes and findings are relevant to the current solution:

### 1. Listing page label behavior

The text rendered by [`ProductCount`](components/product-count.tsx) does **not** come from the commerce URL directly.  
It is built from:
- the `label` prop passed by each page
- the product total from `state.totalNumberOfProducts`

That means if you want text such as `Coveo Product listing page - Kayaks`, you must change the `label` prop in the corresponding page file.

Relevant files:
- [`app/listing/kayaks/page.tsx`](app/listing/kayaks/page.tsx)
- [`app/listing/paddleboards/page.tsx`](app/listing/paddleboards/page.tsx)
- [`app/listing/surf-accessories/page.tsx`](app/listing/surf-accessories/page.tsx)
- [`app/listing/toys/page.tsx`](app/listing/toys/page.tsx)

### 2. Recommended improvement

If you want to avoid manually maintaining page labels in multiple files, consider extracting the label format into a shared helper or deriving it from a page-specific constant. That would reduce copy/paste mistakes across listing pages.
