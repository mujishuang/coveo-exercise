"use client";

import { usePopularViewedHome } from "@/lib/commerce-engine";
import Image from "next/image";

export default function PopularViewedHome() {
  const { state } = usePopularViewedHome();
  return (
    <>
      <h3>{state.headline}</h3>
      {state.products.map((product) => {
        return (
          <div key={product.ec_product_id}>
            <h2>{product.ec_name}</h2>
            <Image src={product.ec_images[0]} width={200} height={200} alt="foo" />
            <p>{product.ec_description}</p>
          </div>
        );
      })}
    </>
  );
}
