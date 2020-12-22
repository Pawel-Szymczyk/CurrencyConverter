import { IDropdownOption } from "@fluentui/react";
import { action, decorate, IObservableArray, observable } from "mobx";
import { CdsService } from "../CdsService";
import { ServiceProvider } from "../ServiceProvider";
import { Currency } from "./Currency";

export class CurrencyViewModel {
  loading = true;
  currencies = new Currency();
  amount = "1";
  currencyFrom = "";
  currencyTo = "";
  result = "";
  disabledBtn = true;
  showResults = false;
  baseRate = "";
  reversedBaseRate = "";

  serviceProvider: ServiceProvider;

  constructor(serviceProvider: ServiceProvider) {
    this.serviceProvider = serviceProvider;
  }

  async init(): Promise<void> {
    const cdsService = this.serviceProvider.get<CdsService>("CdsService");
    // get data...
    (this.currencies.currencies as IObservableArray).replace(await cdsService.getCurrencies());
    this.loading = false;
  }

  // click events...
  onAmountChanged(event: any, newValue?: string | undefined): void {
    this.amount = newValue || "1";
    this.validateBtn();
  }

  onCurrencyFromChanged(event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void {
    this.currencyFrom = (item?.key as string) || "";
    this.validateBtn();
  }

  onCurrencyToChanged(event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void {
    this.currencyTo = (item?.key as string) || "";
    this.validateBtn();
  }

  onConvert(): void {
    // collect information and perform calculations...
    this.result = this.currencies.convert(this.currencyFrom, this.currencyTo, parseFloat(this.amount));
    this.getRates();
    this.showResults = true;
  }

  getRates(): void {
    let object = this.currencies.getBaseRate(this.currencyFrom, this.currencyTo);
    this.baseRate = `1 ${object.input} = ${object.outputRate} ${object.output}`;

    object = this.currencies.getBaseRate(this.currencyTo, this.currencyFrom);
    this.reversedBaseRate = `1 ${object.input} = ${object.outputRate} ${object.output}`;
  }

  validateBtn(): void {
    // console.log(this.amount);
    // console.log(this.currencyFrom);
    // console.log(this.currencyTo);
    this.showResults = false;

    if (this.currencyFrom !== "" && this.currencyTo !== "") {
      this.disabledBtn = false;
    }
  }
}

decorate(CurrencyViewModel, {
  loading: observable,
  amount: observable,
  currencyFrom: observable,
  currencyTo: observable,
  result: observable,
  disabledBtn: observable,
  showResults: observable,
  baseRate: observable,
  reversedBaseRate: observable,
  onAmountChanged: action.bound,
  onCurrencyFromChanged: action.bound,
  onCurrencyToChanged: action.bound,
  onConvert: action.bound,
});
