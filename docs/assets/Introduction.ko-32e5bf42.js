import{j as e,a as o,F as a}from"./jsx-runtime-91a467a5.js";import{M as l}from"./index-4e6c389d.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-8a71209c.js";import"../sb-preview/runtime.js";import"./index-788a26c5.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-ae8e40e8.js";import"./index-016bc981.js";import"./index-d37d4223.js";import"./setPrototypeOf-6f2f822b.js";import"./inheritsLoose-856773bf.js";import"./isNativeReflectConstruct-e378569d.js";import"./index-c41dfe6e.js";import"./_baseIsEqual-e0960ee2.js";import"./index-356e4a49.js";function t(r){const n=Object.assign({p:"p",code:"code",a:"a",strong:"strong",img:"img",hr:"hr",h2:"h2",em:"em",ol:"ol",li:"li",ul:"ul",pre:"pre"},i(),r.components);return o(a,{children:[e(l,{title:"Introduction.ko"}),`
`,o("div",{align:"center",children:[e("img",{src:"https://github-production-user-asset-6210df.s3.amazonaws.com/107913240/239455269-15b3e7a3-26a1-4262-8f62-a0728d73a23c.png",alt:"logo",width:"150px"}),e("h1",{children:"sb-addon-permutation-table"})]}),`
`,e("hr",{}),`
`,e(n.p,{children:`Permutation-Table은 컴포넌트의 다양한 모습을 손쉽게 확인할 수 있는 Addon입니다.
이 데모 페이지에서, Permutation-Table을 사용하는 방법을 확인할 수 있습니다.
유명 프론트엔드 컴포넌트 라이브러리와도 완전히 호환되며, 직접 설계한 컴포넌트에도 적용할 수 있습니다.`}),`
`,o(n.p,{children:[`사이드바에 있는 스토리들을 살펴보면서, Permutation-Table Addon을 사용하는 방법을 익혀보세요.
애드온이 어떻게 동작하는지는 `,e(n.code,{children:"stories"}),` 디렉토리에 있는 코드를 확인해보세요.
`,e(n.a,{href:"https://componentdriven.org",target:"_blank",rel:"nofollow noopener noreferrer",children:e(n.strong,{children:"컴포넌트 기반"})})," 방식으로 UI를 구축하는 것을 권장합니다."]}),`
`,o(n.p,{children:[e(n.a,{href:"https://www.npmjs.com/package/sb-addon-permutation-table",target:"_blank",rel:"nofollow noopener noreferrer",children:e(n.img,{src:"https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white",alt:"NPM"})}),`
`,e(n.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table",target:"_blank",rel:"nofollow noopener noreferrer",children:e(n.img,{src:"https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",alt:"Github"})})]}),`
`,e(n.hr,{}),`
`,e(n.h2,{id:"시작하기",children:"시작하기"}),`
`,e(n.p,{children:e(n.em,{children:"면책조항: 이 애드온은 Typescript 프로젝트만을 지원하며, Storybook 7만을 위해 설계되었습니다. 타 환경에서는 정상적으로 동작하지 않을 수 있습니다."})}),`
`,o(n.ol,{start:"0",children:[`
`,e(n.li,{children:"선수조건"}),`
`]}),`
`,o(n.ul,{children:[`
`,e(n.li,{children:e(n.code,{children:"node>=16"})}),`
`,o(n.li,{children:[e(n.code,{children:"yarn"})," or ",e(n.code,{children:"npm"})]}),`
`,o(n.li,{children:["a working project with:",`
`,o(n.ul,{children:[`
`,e(n.li,{children:"react >= 16.8"}),`
`]}),`
`]}),`
`]}),`
`,o(n.ol,{children:[`
`,e(n.li,{children:"설치"}),`
`]}),`
`,e(n.pre,{children:e(n.code,{children:`npm install --save-dev sb-addon-permutation-table

`})}),`
`,e(n.pre,{children:e(n.code,{children:`yarn add -D sb-addon-permutation-table
`})}),`
`,o(n.ol,{start:"2",children:[`
`,o(n.li,{children:[e(n.code,{children:".stories/main.ts"}),"에 애드온을 등록하세요"]}),`
`]}),`
`,e(n.pre,{children:e(n.code,{className:"language-typescript",children:`const config = {
  // ...
  addons: ["sb-addon-permutation-table"],
};
`})}),`
`,o(n.ol,{start:"3",children:[`
`,o(n.li,{children:[e(n.code,{children:".stories/your-component.stories.tsx"}),"에 애드온을 위한 설정을 넣어주세요. ",e(n.code,{children:"PermutationMeta"})," 타입을 사용한다면 쉽게 하실 수 있습니다."]}),`
`]}),`
`,e(n.pre,{children:e(n.code,{className:"language-typescript",children:`// stories/Component.stories.(ts|tsx)

import React from "react";
import { PermutationMeta } from "sb-addon-permutation-table";
import YourComponent from "YourComponent";

const meta: PermutationMeta<typeof YourComponent> = {
  //...
  parameters: {
    storySource: {
      source: <YourComponent />, // 컴포넌트가 어떤 형상을 갖췄는지
      importPath: "import YourComponent from 'yourpackage", // package화 된 컴포넌트의 import path
    },
    permutation: {
      scope: {
        YourComponent, // Story에서 보여질 컴포넌트 그 자체를 넣어주세요
      },
    },
  },
};
`})}),`
`,o(n.p,{children:["3.1. 만약 테이블로 확인하고 싶지 않은 속성이 있다면, ",e(n.code,{children:"deactivate"})," 옵션을 사용하세요."]}),`
`,e(n.pre,{children:e(n.code,{className:"language-typescript",children:`const meta: PermutationMeta<typeof YourComponent> = {
  //...
  parameters: {
    storySource: {
      source: <YourComponent />, // 컴포넌트가 어떤 형상을 갖췄는지
      importPath: "import YourComponent from 'yourpackage", // package화 된 컴포넌트의 import path
    },
    permutation: {
      scope: {
        YourComponent, // Story에서 보여질 컴포넌트 그 자체를 넣어주세요
      },
      deactivate: ["foo", "bar"], // 이제 "foo"와 "bar"는 테이블화 할 수 없습니다.
    },
  },
};
`})}),`
`,o(n.ol,{start:"4",children:[`
`,e(n.li,{children:"끝났습니다! 이제 Permutation Table을 사용 할 수 있습니다"}),`
`]}),`
`,e(n.h2,{id:"고급-사용법",children:"고급 사용법"}),`
`,o(n.p,{children:["자세한 정보는 저희 ",e(n.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table",target:"_blank",rel:"nofollow noopener noreferrer",children:"Github 저장소"})," 에서 확인해보세요"]}),`
`,e(n.h2,{id:"troubleshooting--faq",children:"Troubleshooting & FAQ"}),`
`,o(n.p,{children:["제출할 이슈가 있다면, ",e(n.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table/issues",target:"_blank",rel:"nofollow noopener noreferrer",children:'"Issues"'}),` 탭을 이용해주세요.
애드온에 대한 질문이나, 제안할 사항이 있다면`,e(n.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table/discussions",target:"_blank",rel:"nofollow noopener noreferrer",children:'"Discussions"'})," 탭을 이용해주세요."]}),`
`,e(n.h2,{id:"license",children:"License"}),`
`,e(n.p,{children:"MIT"})]})}function j(r={}){const{wrapper:n}=Object.assign({},i(),r.components);return n?e(n,Object.assign({},r,{children:e(t,r)})):t(r)}export{j as default};
//# sourceMappingURL=Introduction.ko-32e5bf42.js.map
