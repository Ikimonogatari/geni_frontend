import React from "react";

function PriceFormatter({ price }) {
  const formattedPrice = new Intl.NumberFormat("mn-MN").format(price);
  return <>{`₮${formattedPrice}`}</>;
}

export default PriceFormatter;
