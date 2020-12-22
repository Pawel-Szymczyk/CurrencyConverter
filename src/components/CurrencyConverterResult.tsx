import { observer } from "mobx-react";
import React from "react";
import { ServiceProviderContext } from "../ServiceProvider";
import { CurrencyViewModel } from "../viewmodels/CurrencyViewModel";

export class CurrencyConverterResult extends React.PureComponent {
  context!: React.ContextType<typeof ServiceProviderContext>;

  render(): JSX.Element {
    const model = this.context.get<CurrencyViewModel>("Currencies");

    if (model.showResults) {
      return (
        <>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row" style={{ textAlign: "center" }}>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{ fontSize: 20 }}>
                {model.amount} {model.currencyFrom} =
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{ display: "flex", alignItems: "flex-end" }}>
                <div
                  className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"
                  style={{ fontSize: 42, textAlign: "end", paddingRight: 0 }}
                >
                  {model.result}
                </div>
                <div
                  className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"
                  style={{ fontSize: 24, textAlign: "left", paddingBottom: 4 }}
                >
                  {model.currencyTo}
                </div>
              </div>
            </div>
            <div className="ms-Grid-row" style={{ textAlign: "center", fontSize: 14, paddingTop: 30 }}>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">{model.reversedBaseRate}</div>
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">{model.baseRate}</div>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

CurrencyConverterResult.contextType = ServiceProviderContext;
observer(CurrencyConverterResult);
