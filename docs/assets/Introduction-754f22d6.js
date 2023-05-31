import{j as n,a as o,F as a}from"./jsx-runtime-91a467a5.js";import{M as s}from"./index-8f359772.js";import{u as i}from"./index-1d576ef5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-cdd5bba1.js";import"../sb-preview/runtime.js";import"./index-782b1f84.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-ae8e40e8.js";import"./index-016bc981.js";import"./index-d37d4223.js";import"./setPrototypeOf-6f2f822b.js";import"./inheritsLoose-856773bf.js";import"./isNativeReflectConstruct-e378569d.js";import"./index-c41dfe6e.js";import"./_baseIsEqual-e0960ee2.js";import"./index-356e4a49.js";function r(t){const e=Object.assign({p:"p",code:"code",a:"a",strong:"strong",img:"img",hr:"hr",h2:"h2",em:"em",ol:"ol",li:"li",ul:"ul",pre:"pre"},i(),t.components);return o(a,{children:[n(s,{title:"Introduction"}),`
`,o("div",{align:"center",children:[n("img",{src:"https://github-production-user-asset-6210df.s3.amazonaws.com/107913240/239455269-15b3e7a3-26a1-4262-8f62-a0728d73a23c.png",alt:"logo",width:"150px"}),n("h1",{children:"sb-addon-permutation-table"})]}),`
`,n("hr",{}),`
`,n(e.p,{children:`Permutation-Table is a storybook addon that makes it easy to see different looks for your components.
On this demo page, you can see how to use the Permutation-Table Addon.
It's fully compatible with popular front-end component libraries and can be applied to components of your own design.`}),`
`,o(e.p,{children:[`Explore the stories in the sidebar to learn how to use the Permutation Addon.
Check out the code in the `,n(e.code,{children:"stories"}),` directory to see how the addon works.
We recommend make a UI with `,n(e.a,{href:"https://componentdriven.org",target:"_blank",rel:"nofollow noopener noreferrer",children:n(e.strong,{children:"Component Driven"})})," approach."]}),`
`,o(e.p,{children:[n(e.a,{href:"https://www.npmjs.com/package/sb-addon-permutation-table",target:"_blank",rel:"nofollow noopener noreferrer",children:n(e.img,{src:"https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white",alt:"NPM"})}),`
`,n(e.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table",target:"_blank",rel:"nofollow noopener noreferrer",children:n(e.img,{src:"https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",alt:"Github"})})]}),`
`,n(e.hr,{}),`
`,n(e.h2,{id:"get-started",children:"Get started"}),`
`,n(e.p,{children:n(e.em,{children:"Disclaimer: This addon only supports Typescript projects and is designed for Storybook 7. It may not work properly in other environments."})}),`
`,o(e.ol,{start:"0",children:[`
`,n(e.li,{children:"Perequisites"}),`
`]}),`
`,o(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"node>=16"})}),`
`,o(e.li,{children:[n(e.code,{children:"yarn"})," or ",n(e.code,{children:"npm"})]}),`
`,o(e.li,{children:["a working project with:",`
`,o(e.ul,{children:[`
`,n(e.li,{children:"react >= 16.8"}),`
`]}),`
`]}),`
`]}),`
`,o(e.ol,{children:[`
`,n(e.li,{children:"Installation"}),`
`]}),`
`,n(e.pre,{children:n(e.code,{children:`npm install --save-dev sb-addon-permutation-table

`})}),`
`,n(e.pre,{children:n(e.code,{children:`yarn add -D sb-addon-permutation-table
`})}),`
`,o(e.ol,{start:"2",children:[`
`,o(e.li,{children:["Resister the addon in ",n(e.code,{children:".stories/main.ts"})]}),`
`]}),`
`,n(e.pre,{children:n(e.code,{className:"language-typescript",children:`const config = {
  // ...
  addons: ["sb-addon-permutation-table"],
};
`})}),`
`,o(e.ol,{start:"3",children:[`
`,o(e.li,{children:["Define config for your component in ",n(e.code,{children:".stories/your-component.stories.tsx"}),". Following by type ",n(e.code,{children:"PermutationMeta"})," will make this step easy"]}),`
`]}),`
`,n(e.pre,{children:n(e.code,{className:"language-typescript",children:`// stories/Component.stories.(ts|tsx)

import React from "react";
import { PermutationMeta } from "sb-addon-permutation-table";
import YourComponent from "YourComponent";

const meta: PermutationMeta<typeof YourComponent> = {
  //...
  parameters: {
    storySource: {
      source: <YourComponent />, // type what your component looks like
      importPath: "import YourComponent from 'yourpackage", // import path of packaged component
    },
    permutation: {
      scope: {
        YourComponent, // add component here
      },
    },
  },
};
`})}),`
`,o(e.p,{children:["3.1. If you don't want to see specific props in the table, you can use ",n(e.code,{children:"deactivate"})," option"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-typescript",children:`const meta: PermutationMeta<typeof YourComponent> = {
  //...
  parameters: {
    storySource: {
      source: <YourComponent />, // type what your component looks like
      importPath: "import YourComponent from 'yourpackage", // import path of packaged component
    },
    permutation: {
      scope: {
        YourComponent, // add component here
      },
      deactivate: ["foo", "bar"], // now property "foo" and "bar" disabled.
    },
  },
};
`})}),`
`,o(e.ol,{start:"4",children:[`
`,n(e.li,{children:"That's it! Now you can see the permutation table in your storybook."}),`
`]}),`
`,n(e.h2,{id:"advanced-usage",children:"Advanced Usage"}),`
`,o(e.p,{children:["Check our ",n(e.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table",target:"_blank",rel:"nofollow noopener noreferrer",children:"github repository"})," for more information."]}),`
`,n(e.h2,{id:"troubleshooting--faq",children:"Troubleshooting & FAQ"}),`
`,o(e.p,{children:["If you have an issue to submit, please visit ",n(e.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table/issues",target:"_blank",rel:"nofollow noopener noreferrer",children:'"Issues"'}),`.
If you're using the addon and have questions or suggestions, please use `,n(e.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table/discussions",target:"_blank",rel:"nofollow noopener noreferrer",children:'"Discussions"'}),"."]}),`
`,n(e.h2,{id:"license",children:"License"}),`
`,n(e.p,{children:"MIT"})]})}function I(t={}){const{wrapper:e}=Object.assign({},i(),t.components);return e?n(e,Object.assign({},t,{children:n(r,t)})):r(t)}export{I as default};
//# sourceMappingURL=Introduction-754f22d6.js.map
