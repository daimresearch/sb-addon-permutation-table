import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
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
