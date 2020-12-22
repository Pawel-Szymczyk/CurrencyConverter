import { CdsService } from "../../CdsService";
import { CurrencyItem } from "../../interfaces/CurrencyItem";
import { ServiceProvider } from "../../ServiceProvider";
import { CurrencyViewModel } from "../CurrencyViewModel";

test("convertUSDtoEUR", async () => {
  const serviceProvider = new ServiceProvider();
  const cdsService = new CdsService();

  cdsService.getCurrencies = jest.fn().mockReturnValue([
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
  ] as CurrencyItem[]);

  serviceProvider.register("CdsService", cdsService);

  const viewModel = new CurrencyViewModel(serviceProvider);

  await viewModel.init();

  const output = viewModel.currencies.convert("USD", "EUR", 100);

  expect(output).toBe("81.66");
});

test("convertEURtoUSD", async () => {
  const serviceProvider = new ServiceProvider();
  const cdsService = new CdsService();

  cdsService.getCurrencies = jest.fn().mockReturnValue([
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
  ] as CurrencyItem[]);

  serviceProvider.register("CdsService", cdsService);

  const viewModel = new CurrencyViewModel(serviceProvider);

  await viewModel.init();

  const output = viewModel.currencies.convert("EUR", "USD", 100);

  expect(output).toBe("122.59");
});
