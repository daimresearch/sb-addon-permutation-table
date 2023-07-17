import React from "react";

interface BreadCrumbProps {
  color?: string;
  fontWeight?: string;
  size: "small" | "medium" | "large";
  children: React.ReactNode;
}

export const BreadCrumb = ({
  color = "black",
  fontWeight = "bold",
  children,
}: BreadCrumbProps) => {
  return <div style={{ color, fontWeight }}>{children}</div>;
};
