import { IStackTokens, Stack } from "@fluentui/react";
import { Card } from "@uifabric/react-cards";
import React from "react";
import { CurrencyConverterHeader } from "./CurrencyConverterHeader";
import { CurrencyConverterResult } from "./CurrencyConverterResult";

export class CurrencyConverterApp extends React.Component<Record<string, never>> {
  render(): JSX.Element {
    const sectionStackTokens: IStackTokens = { childrenGap: 30 };
    return (
      <>
        <Stack horizontal tokens={sectionStackTokens}>
          <Card
            aria-label="Currency Converter"
            style={{ height: 300, minWidth: 600, padding: 30, margin: 20, backgroundColor: "white" }}
          >
            <Card.Section fill={true}>
              <CurrencyConverterHeader />
            </Card.Section>
            <Card.Section fill={true}>
              <CurrencyConverterResult />
            </Card.Section>
          </Card>
        </Stack>
      </>
    );
  }
}
