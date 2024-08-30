import React from "react";
import { Highlight, themes } from "prism-react-renderer";

export const CodeEditor = ({
  value,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: Props) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>
      <Highlight theme={themes.oneDark} code={value} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{ ...style, margin: "0px", background: "transparent" }}
            className={className}
          >
            {tokens.map((line, i) => (
              <div key={i}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
