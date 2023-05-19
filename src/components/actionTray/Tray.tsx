import React, { CSSProperties, PropsWithChildren } from "react";
import { styled } from "@storybook/theming";

const Wrapper = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
`;

interface Props {
  onClick?: () => void;
  style?: CSSProperties;
  children?: React.ReactNode;
}
//create Tray React component
export const Tray = ({ children, onClick, style }: Props) => {
  return (
    <Wrapper onClick={onClick} style={style}>
      {children}
    </Wrapper>
  );
};
// Compare this snippet from src/components/Preview.tsx:
