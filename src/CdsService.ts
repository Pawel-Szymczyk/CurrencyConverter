import { CurrencyItem } from "./interfaces/CurrencyItem";

export class CdsService {
  async getCurrencies(): Promise<CurrencyItem[]> {
    await this.timeout(2000);
    return [
      {
        base: "USD",
        rates: [
          { code: "GBP", rate: 0.7353421525 },
          { code: "EUR", rate: 0.8165931733 },
          { code: "USD", rate: 1 },
        ],
      },
      {
        base: "EUR",
        rates: [
          { code: "GBP", rate: 0.90828 },
          { code: "EUR", rate: 1 },
          { code: "USD", rate: 1.2259 },
        ],
      },
      {
        base: "GBP",
        rates: [
          { code: "GBP", rate: 1 },
          { code: "EUR", rate: 1.100982076 },
          { code: "USD", rate: 1.349693927 },
        ],
      },
    ];
  }

  timeout(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
