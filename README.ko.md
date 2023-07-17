<div align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/107913240/239455269-15b3e7a3-26a1-4262-8f62-a0728d73a23c.png" alt="logo" width="150px"/>
  <h1>sb-addon-permutation-table</h1>
  <span><img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg"/></span>
  <span><img src="https://img.shields.io/github/package-json/v/daimresearch/sb-addon-permutation-table?color=brightgreen"/></span>
  <span><img src="https://badgen.net/badge/Built%20With/TypeScript/blue"/></span>
  <div>
  <strong><a href="./README.md" target="_blank">English</a></strong> |
  <strong><a href="https://daimresearch.github.io/sb-addon-permutation-table/?path=/docs/introduction--docs" target="_blank">Demos</a></strong>
  </div>
</div>
<hr/>

- **Typescript only Project. We don't have a plan to support Javascript**

![demo](./static/demo.gif)

이 프로젝트는 Storybook에 추가 기능을 제공하기 위한 애드온입니다.
별도의 패널 창을 통하여 컴포넌트의 다양한 모습을 테이블로서 확인할 수 있습니다.

Datadog의 디자인 시스템인 [DRUIDS](https://druids.datadoghq.com/)에 크게 영감을 받은 프로젝트로, DRUIDS에서 보여주는 Component Permutation 기능을 Storybook에서도 사용하고자 제작하게 되었습니다.

## Table of contents

- [Feature](#feature)
- [Installation](#installation)
  - [Requirements](#requirements)
- [Why should I use it?](#why-should-i-use-it)
- [Usage](#usage)
  - [Advance](#advance)
- [Demos](#demos)
- [License](#license)

### Feature

- `Argument Control`: 컴포넌트의 속성을 직접 조작할 수 있습니다. 상황에 맞는 컴포넌트의 모습을 확인할 수 있습니다.
- `Permutation` : 여러 속성 조합에 대한 모습을 테이블로 제공합니다. 조합의 결과를 한 눈에 비교하고 분석할 수 있습니다

### Installation

`yarn add sb-addon-permutation-table`

#### Requirements

- `Storybook >= 7.x`
- `node >= 16.x`

### Why should I use it?

`sb-addon-permutation`를 사용하면 복잡하고 많은 속성을 가진 컴포넌트의 모습을 한 눈에 확인할 수 있습니다. 개발자는 애드온이 제공하는 쇼케이스를 통하여 효율적으로 컴포넌트를 디버깅하고, 테스트 할 수 있게 됩니다.

### Usage

`.stories/main.ts`에 아래와 같이 애드온을 추가합니다.

```typescript
import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["sb-addon-permutation-table"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

0.x 버전과 달리, 1 버전 부터는 애드온을 사용하기 위해 별도의 설정이 필요하지 않습니다.
애드온은 각 Story의 요소를 자동으로 끌어옵니다. 하지만, parameter를 전달함으로서 좀 더 디테일한 설정이 가능합니다. Parameter로 받는 값들은 아래와 같습니다. parameter로 사용되는 값들은 Preview와는 무관하고, Panel에 사용되기 위해서 지정되는 값입니다.

| 이름          | 설명                                                            | 타입       | 기본 값        |
| ------------- | --------------------------------------------------------------- | ---------- | -------------- | --- |
| componentName | Panel에 표시되는 컴포넌트의 이름                                | `string?`  | `Story의 이름` |
| importPath    | `Copy import path`버튼을 클릭했을 때 복사되는 component의 경로  | `string?`  | `""`           |
| children      | Story Component에 들어가는 children                             | `string?`  | `{{children}}` |
| deactivate    | Permutation 기능을 사용하지 않을 property Name                  | `string[]` | `[]`           |
| autoload      | Story가 로드 되었을 때, 클릭 없이도 자동으로 활성화 될 property | `all       | string[]`      | []  |

**parameter children에 관한 상세**

children parameter는 Story에 argment로 children을 전달 하였을 때, Panel의 CodeEditor 영역에 표시 될 children의 코드의 형상을 뜻합니다. arg로 children을 전달하면 Preview에서 제대로 표시되지만, Panel에서는 별도의 parameter를 전달하지 않는 이상 children은 `{{children}}`으로 표시됩니다. Panel에 children의 형상을 보여주고 싶을 때, 이 parameter를 사용하십시오.

[참고: Storybook에서 children을 arg로 사용하는 법](https://storybook.js.org/docs/react/writing-stories/stories-for-multiple-components#using-children-as-an-ar)

사용 예시

```typescript
import React from "react";
import { PermutationMeta } from "sb-addon-permutation-table";
import YourComponent from "YourComponent";

const meta: PermutationMeta<typeof YourComponent> = {
  //...
  parameters: {
    permutation: {
      componentName: "Takahashi", // Component의 이름과 관계없이 Panel에서 "Takahashi" 로 표기.
      importPath: "@yourLib/yourComponent", // Copy import path button을 클릭하면 복사 되는 값.
      children: "<div>Chef of the diamond city</div>", // children으로 전달 될 값.
      deactivate: ["foo", "bar"], //foo,bar를 비활성화
      autoload: "all", // deactivate 된 속성을 제외하고 모든 속성을 활성화
    },
  },
};
```

Story 단위로 개별 적용도 가능합니다.

```typescript
export const Primary: Story = {
  args: {
    primary: true,
    label:'Hello World'
  },
};

export const PermutationDisabled: Story = {
  args:{
    label:'Hello World'
  }
  parameters: {
    permutation: {
      deactivate: ["primary", "size"],
    },
  },
};
```

### Advance

#### 각 스토리에 다른 설정 적용하기

permutation parmeter는 개별적으로 적용이 가능합니다. 만약, Permutation table을 스토리 전체가 아니라, 단독 스토리에만 적용하고 싶다면, 아래와 같이 설정해주세요

```tsx
const meta:PermutationMeta<type of Foo> = {
  title: 'Example/Foo',
  component: Foo,
  parameters:{
    // importPath 역시 개별 스토리에 따로 적용될 수 있으나, 불편하기 때문에  추천하지 않습니다
    permutation :{
      importPath : "import Foo from somewhere"
    }
  }
}

export default meta
export type Story = StoryObj<typeof Foo>

// Primary story에서는 Permutation을 보고 싶지 않지만, Secondary story에서는 보고 싶은 경우

export const Primary:Story = ()=>{
  return (
    <Wrapper>
      <Foo/>
    </Wrapper>
  )
}

export const Secondary: Story = {
  parameters: {
    permutation:{
      deactivate: ['bar']
    }
  }
}



```

### Activate autoload

autoload가 활성화 되면, permutation table은 각 story가 로드 될 때 자동으로 활성화 됩니다.

```tsx
export const Primary: Story = {
  args: {
    primary: true,
  },
  parameters: {
    permutation: {
      //이제 permutation 될 수 있는 모든 요소가 story 로드시 활성화 상태가 됩니다.
      autoload: "all",
    },
  },
};
```

일부 속성에 대해서만 활성화 역시 가능합니다

```tsx
export const Primary: Story = {
  args: {
    primary: true,
  },
  parameters: {
    permuations: {
      // 'foo','bar' attribute만 활성화 됩니다.
      autoload: ["foo", "bar"],
    },
  },
};
```

만약, autoload와 deactivate 모두 활성화 되어있다면, deactivate가 우선권을 가집니다.

```tsx
export const Primary: Story = {
  args: {
    primary: true,
  },
  parameters: {
    permuations: {
      // bar attribute만 활성화 됩니다.
      autoload: ["foo", "bar"],
      deactivate: ["foo"],
    },
  },
};
```

### Demos

[Demo Page](https://daimresearch.github.io/sb-addon-permutation-table/?path=/docs/introduction--docs)

### License

MIT

## Sponsors

<a href="http://www.daimresearch.com/" target="_blank"><img src="https://www.daimresearch.com/theme/business/extend/sections/header/daim9952_header/img/logo.png"></a>
