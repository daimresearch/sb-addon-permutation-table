import React from "react";

interface Data {
  label: string;
  type?: "default" | "primary" | "danger";
}

interface ListProps {
  data: Data[];
  title: { title: string };
  color?: "black" | "red" | "blue";
  fontWeight: "bold" | "normal";
}

export const List = ({
  data,
  title,
  color = "black",
  fontWeight = "bold",
}: ListProps) => {
  return (
    <div style={{ color, fontWeight }}>
      {title.title}
      <ul>
        {data?.map((item, index) => (
          <li key={index}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
};
