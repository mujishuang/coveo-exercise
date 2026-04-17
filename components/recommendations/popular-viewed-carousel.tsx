"use client";

import { usePopularViewedHome } from "@/lib/commerce-engine";
import ProductButtonWithImage from "../product-button-with-image";

export default function PopularViewedCarousel() {
    const { state, methods } = usePopularViewedHome();

    if (!state.products || state.products.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">{state.headline || "Recommended Products"}</h2>
            <div className="relative">
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 min-w-max">
                        {state.products.map((product) => (
                            <div key={product.permanentid} className="w-64 flex-shrink-0">
                                <ProductButtonWithImage
                                    methods={methods}
                                    product={product}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Made with Bob
