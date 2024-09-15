export enum Dimensions {
  "16x20",
  "12x16",
  "11x14",
  "8x10",
  "5x7",
}

export enum ProductTags {
  "dog",
  "landscape",
}

export function isEmpty(object?: Object) {
  if (!object) {
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
