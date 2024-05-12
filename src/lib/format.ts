import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import Big from "big.js";
import { convert } from "cashify";
import { Rates } from "cashify/dist/lib/options";

const axios = setupCache(Axios.create());

const req = axios.get(
  `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API}/latest/EUR`,
);

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
  let conversion_rates: Rates;

  try {
    conversion_rates = (await req).data.conversion_rates;
  } catch {
    return "NO PRICE AVAILABLE";
  }

  const currency = localeToCurrency(locale);

  const convertedPrice: number = Math.round(
    convert(price, {
      rates: conversion_rates,
      base: "EUR",
      from: "EUR",
      to: currency,
      BigJs: Big,
    }),
  );

  return (convertedPrice / 100).toLocaleString(locale, {
    currency,
    style: "currency",
  });
}
