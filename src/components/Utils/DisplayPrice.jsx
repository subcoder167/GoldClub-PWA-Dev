import React from "react";
import CurrencyPrefix from "./CurrencyPrefix";

function formatPriceWithCommas(price) {
  // Convert the price to a string
  const priceString = price.toString();

  // Split the price into integer and decimal parts (if any)
  const [integerPart, decimalPart = ""] = priceString.split(".");

  // Add commas to the integer part
  let formattedIntegerPart = "";
  for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
    if ((count === 3 && i !== 0) || ((count + 1) % 2 === 0 && count > 3)) {
      formattedIntegerPart = "," + formattedIntegerPart;
    }

    formattedIntegerPart = integerPart[i] + formattedIntegerPart;
  }

  // Combine the formatted parts and return the result
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

function DisplayPrice({ price }) {
  const formattedPrice = price && formatPriceWithCommas(price);

  return (
    <span>
      {formattedPrice && (
        <>
          <CurrencyPrefix /> {formattedPrice}
        </>
      )}
    </span>
  );
}

export default DisplayPrice;
