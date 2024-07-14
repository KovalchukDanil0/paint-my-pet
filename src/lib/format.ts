import Axios from "axios";
import { CacheAxiosResponse, setupCache } from "axios-cache-interceptor";
import BigJs from "big.js";
import { convert } from "cashify";
import { Rates } from "cashify/dist/lib/options";

const axios = setupCache(Axios.create());

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

export async function formatPrice(
  price: number,
  locale: string,
  withSign = true,
): Promise<string> {
  let convertedPrice = price;
  const currency = localeToCurrency(locale);

  if (currency !== "USD") {
    const exchangeApi = process.env.NEXT_PUBLIC_EXCHANGE_API;
    if (!exchangeApi) {
      throw new Error("Exchange url was not set");
    }

    const req: Promise<CacheAxiosResponse> = axios.get(
      `https://v6.exchangerate-api.com/v6/${exchangeApi}/latest/USD`,
    );

    const reqResolved: CacheAxiosResponse<{ conversion_rates: Rates }> =
      await req;

    const rates: Rates = reqResolved.data.conversion_rates;

    convertedPrice = Math.round(
      convert(price, {
        base: "USD",
        from: "USD",
        to: currency,
        rates,
        BigJs,
      }),
    );
  }

  if (!withSign) {
    return convertedPrice.toString();
  }

  return (convertedPrice / 100).toLocaleString(locale, {
    currency,
    style: "currency",
  });
}
