export enum Dimensions {
  "16x20",
  "12x16",
  "11x14",
  "8x10",
  "5x7",
}

export enum ProductTags {
  "dog",
  "cat",
  "rat",
}

export function isEmpty(object: Object | null) {
  if (object == null) {
    return true;
  }
  return Object.values(object).every((x) => x == null || x === "");
}

export interface Countries {
  data: Name[];
}

interface Name {
  name: { common: string };
}
