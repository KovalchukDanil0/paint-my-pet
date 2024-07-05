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
    case "eu":
      return "EUR";
    default:
      throw new Error(`This locale "${locale}" doesn't exist`);
  }
}

export async function formatPrice(
  price: number,
  locale: string,
  withSign = true,
): Promise<string> {
  const exchangeApi = process.env.NEXT_PUBLIC_EXCHANGE_API;
  if (!exchangeApi) {
    throw new Error("Exchange url was not set");
  }

  const req: Promise<CacheAxiosResponse | null> = axios
    .get(`https://v6.exchangerate-api.com/v6/${exchangeApi}/latest/EUR`)
    .catch(() => null);

  let rates: Rates = { EUR: 1 };
  let currency = localeToCurrency(locale);

  const reqResolved: CacheAxiosResponse | null = await req;
  if (reqResolved) {
    rates = reqResolved.data.conversion_rates;
  } else {
    currency = "EUR";
  }

  const convertedPrice: number = Math.round(
    convert(price, {
      base: "EUR",
      from: "EUR",
      to: currency,
      rates,
      BigJs,
    }),
  );

  if (!withSign) {
    return convertedPrice.toString();
  }

  return (convertedPrice / 100).toLocaleString(locale, {
    currency,
    style: "currency",
  });
}
