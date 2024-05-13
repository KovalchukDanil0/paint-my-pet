import Axios from "axios";
import { CacheAxiosResponse, setupCache } from "axios-cache-interceptor";
import Big from "big.js";
import { convert } from "cashify";
import { Rates } from "cashify/dist/lib/options";

const axios = setupCache(Axios.create());

const req: Promise<CacheAxiosResponse | null> = axios
  .get(
    `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API}/latest/EUR`,
  )
  .catch(() => null);

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

export async function FormatPrice(
  price: number,
  locale: string,
  withSign = true,
): Promise<string | number> {
  let conversion_rates: Rates = { EUR: 1 };

  let currency = localeToCurrency(locale);

  const reqResolved: CacheAxiosResponse | null = await req;
  if (reqResolved != null) {
    conversion_rates = reqResolved.data.conversion_rates;
  } else {
    currency = "EUR";
  }

  const convertedPrice: number = Math.round(
    convert(price, {
      rates: conversion_rates,
      base: "EUR",
      from: "EUR",
      to: currency,
      BigJs: Big,
    }),
  );

  if (!withSign) {
    return convertedPrice;
  }

  return (convertedPrice / 100).toLocaleString(locale, {
    currency,
    style: "currency",
  });
}
