import { observable, decorate } from "mobx";
import { CurrencyItem } from "../interfaces/CurrencyItem";

export class Currency {
  currencies: CurrencyItem[] = [];

  convert(inputBase: string, outputCode: string, qty: number): string {
    const outputRate = this.getOutputRate(inputBase, outputCode);
    const exchangedValue = qty * outputRate;

    return exchangedValue.toFixed(2);
  }

  getBaseRate(inputBase: string, outputCode: string): Record<string, unknown> {
    return {
      input: inputBase,
      output: outputCode,
      outputRate: this.getOutputRate(inputBase, outputCode),
    };
  }

  getOutputRate(inputBase: string, outputCode: string): number {
    const ratesArray = this.currencies.filter((x) => x.base == inputBase);
    return ratesArray[0].rates.find((item) => item.code == outputCode)?.rate ?? 1;
  }
}

decorate(Currency, {
  currencies: observable.shallow,
});
