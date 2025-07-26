import React from "react";

interface PriceFormatterProps {
  price: number;
  noSymbol?: boolean;
}

function PriceFormatter({ price, noSymbol = false }: PriceFormatterProps) {
  const formattedPrice = new Intl.NumberFormat("mn-MN").format(price);
  return <>{`${formattedPrice}${noSymbol ? "" : "₮"}`}</>;
}

export default PriceFormatter;
