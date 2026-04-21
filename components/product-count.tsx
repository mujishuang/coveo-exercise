"use client";

import { useSummary } from "@/lib/commerce-engine";

interface ProductCountProps {
    label: string;
}

export default function ProductCount({ label }: ProductCountProps) {
    const { state } = useSummary();

    return (
        <div className="text-sm text-gray-600">
            {label} ({state.totalNumberOfProducts})
        </div>
    );
}

// Made with Bob
