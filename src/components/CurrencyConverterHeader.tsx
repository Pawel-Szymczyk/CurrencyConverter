import { observer } from "mobx-react";
import React from "react";
import { ServiceProviderContext } from "../ServiceProvider";
import "office-ui-fabric-react/dist/css/fabric.css";
import { Dropdown, DefaultButton, Stack, TextField, IIconProps } from "@fluentui/react";
import { Icon } from "@fluentui/react/lib/Icon";
import { CurrencyViewModel } from "../viewmodels/CurrencyViewModel";

const options = [
  {
    key: "USD",
    text: "USD",
  },
  {
    key: "GBP",
    text: "GBP",
  },
  {
    key: "EUR",
    text: "EUR",
  },
];

export class CurrencyConverterHeader extends React.PureComponent<Record<string, never>> {
  context!: React.ContextType<typeof ServiceProviderContext>;

  constructor(props: Record<string, never>) {
    super(props);
  }

  render(): JSX.Element {
    const model = this.context.get<CurrencyViewModel>("Currencies");
    const btnIcon: IIconProps = { iconName: "ChevronRight" };

    return (
      <>
        <Stack
          tokens={{ childrenGap: 6 }}
          horizontal
          horizontalAlign="center"
          verticalAlign="center"
          style={{ alignItems: "flex-end", paddingBottom: 10 }}
        >
          <TextField label="Amount" value={model.amount} onChange={model.onAmountChanged}></TextField>
          <Dropdown
            placeholder="Select currency"
            label="From"
            onChange={model.onCurrencyFromChanged}
            options={options}
            style={{ width: 160 }}
          />
          <Icon iconName="Switch" style={{ paddingBottom: 8 }} />
          <Dropdown
            placeholder="Select currency"
            label="To"
            onChange={model.onCurrencyToChanged}
            options={options}
            style={{ width: 160 }}
          />
          <DefaultButton
            disabled={model.disabledBtn}
            iconProps={btnIcon}
            onClick={model.onConvert}
            style={{ backgroundColor: "#F3FF35" }}
          ></DefaultButton>
        </Stack>
      </>
    );
  }
}

CurrencyConverterHeader.contextType = ServiceProviderContext;
observer(CurrencyConverterHeader);
