import React from "react";
import { EuiButton } from "@elastic/eui";

export const Button = ({ label: string, ...props }: any) => {
  return (
    <EuiButton size="m" fill={true}>
      Button
    </EuiButton>
  );
};
