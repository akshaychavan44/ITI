"use client";

import { useEffect, useState } from "react";
import { PRODUCTS } from "../lib/content";
import { SELECT_PRODUCT } from "../lib/events";
import { Range } from "./Range";
import { Spotlight } from "./Spotlight";

/** The pack cards and the spotlight share one choice: which product is
 *  open. The header's product menu can set it too. */
export function Products() {
  const [selected, setSelected] = useState(PRODUCTS[0].id);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (PRODUCTS.some((p) => p.id === id)) setSelected(id);
    };
    window.addEventListener(SELECT_PRODUCT, onSelect);
    return () => window.removeEventListener(SELECT_PRODUCT, onSelect);
  }, []);

  return (
    <>
      <Range selected={selected} onSelect={setSelected} />
      <Spotlight selected={selected} onSelect={setSelected} />
    </>
  );
}
