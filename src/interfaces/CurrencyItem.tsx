export interface CurrencyItem {
  base: string;
  rates: { code: string; rate: number }[];
}
