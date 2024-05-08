import axios from "axios";
import Big from "big.js";
import { convert } from "cashify";
import { Rates } from "cashify/dist/lib/options";

export function localeToCurrency(locale: string) {
  switch (locale) {
    case "cz":
      return "CZK";
    case "en":
      return "USD";
    default:
      throw new Error(`This locale "${locale}" doesn't exist`);
  }
}

export async function FormatPrice(price: number, locale: string) {
  const {
    data: { rates },
  }: { data: { rates: Rates } } = await axios.get(
    "https://open.er-api.com/v6/latest/EUR",
  );

  const convertedPrice: number = Math.round(
    convert(price, {
      rates,
      base: "EUR",
      from: "EUR",
      to: localeToCurrency(locale),
      BigJs: Big,
    }),
  );

  return (convertedPrice / 100).toLocaleString(locale, {
    style: "currency",
    currency: localeToCurrency(locale),
  });
}
