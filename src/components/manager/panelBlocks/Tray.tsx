import React, { CSSProperties } from "react";
import { styled } from "@storybook/theming";

const Wrapper = styled.div`
  /* position: absolute;
  right: 0px;
  display: flex;
  align-items: center; */
  display: flex;
  align-items: center;
  align-self: center;
`;

const Tray = ({ children, onClick, style, ...rest }: Props) => {
  return (
    <Wrapper style={style} onClick={onClick} {...rest}>
      {children}
    </Wrapper>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export { Tray };
export type { Props as TrayProps };
