import React from "react";
import { Avatar, List as AntdList } from "antd";
import { styled } from "@storybook/theming";

interface ListProps {
  data: { title: string }[];
  color?: "black" | "red" | "blue";
  loading?: boolean;
}

const Wrapper = styled.div<{ color: string }>`
  & * {
    color: ${(props) => props.color} !important;
  }
  min-width: 300px;
`;

export const List = ({ data, color = "black", loading }: ListProps) => {
  return (
    <Wrapper color={color}>
      <AntdList
        itemLayout="horizontal"
        dataSource={data}
        loading={loading}
        renderItem={(item, index) => (
          <AntdList.Item>
            <AntdList.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </AntdList.Item>
        )}
      />
    </Wrapper>
  );
};
