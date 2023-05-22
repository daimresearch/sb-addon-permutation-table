import{j as e,a as r,F as d}from"./jsx-runtime-390e5fc8.js";import{u as l}from"./index-da4379a2.js";import"./index-570b25c1.js";import"./_commonjsHelpers-042e6b4d.js";function o(i){const n=Object.assign({h1:"h1",p:"p",code:"code",a:"a",strong:"strong",ol:"ol",li:"li",ul:"ul",pre:"pre",h2:"h2"},l(),i.components),{Meta:t}=n;return t||a("Meta",!0),r(d,{children:[e(t,{title:"Introduction"}),`
`,e("style",{children:`
    .subheading {
      --mediumdark: '#999999';
      font-weight: 700;
      font-size: 13px;
      color: #999;
      letter-spacing: 6px;
      line-height: 24px;
      text-transform: uppercase;
      margin-bottom: 12px;
      margin-top: 40px;
    }

    .link-list {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 10px;
    }

    @media (min-width: 620px) {
      .link-list {
        row-gap: 20px;
        column-gap: 20px;
        grid-template-columns: 1fr 1fr;
      }
    }

    @media all and (-ms-high-contrast:none) {
    .link-list {
        display: -ms-grid;
        -ms-grid-columns: 1fr 1fr;
        -ms-grid-rows: 1fr 1fr;
      }
    }

    .link-item {
      display: block;
      padding: 20px;
      border: 1px solid #00000010;
      border-radius: 5px;
      transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
      color: #333333;
      display: flex;
      align-items: flex-start;
    }

    .link-item:hover {
      border-color: #1EA7FD50;
      transform: translate3d(0, -3px, 0);
      box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
    }

    .link-item:active {
      border-color: #1EA7FD;
      transform: translate3d(0, 0, 0);
    }

    .link-item strong {
      font-weight: 700;
      display: block;
      margin-bottom: 2px;
    }

    .link-item img {
      height: 40px;
      width: 40px;
      margin-right: 15px;
      flex: none;
    }

    .link-item span,
    .link-item p {
      margin: 0;
      font-size: 14px;
      line-height: 20px;
    }

    .tip {
      display: inline-block;
      border-radius: 1em;
      font-size: 11px;
      line-height: 12px;
      font-weight: 700;
      background: #E7FDD8;
      color: #66BF3C;
      padding: 4px 12px;
      margin-right: 10px;
      vertical-align: top;
    }

    .tip-wrapper {
      font-size: 13px;
      line-height: 20px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .tip-wrapper code {
      font-size: 12px;
      display: inline-block;
    }
  `}),`
`,e(n.h1,{id:"sb-addon-permutation-table",children:"SB Addon Permutation-Table"}),`
`,e(n.p,{children:`Permutation Addon은 컴포넌트의 다양한 모습을 손쉽게 확인할 수 있는 Addon입니다.
이 데모 페이지에서, Permutation Addon을 사용하는 방법을 확인할 수 있습니다.
유명 프론트엔드 컴포넌트 라이브러리와도 완전히 호환되며, 직접 설계한 컴포넌트에도 적용할 수 있습니다.`}),`
`,r(n.p,{children:[`사이드바에 있는 스토리들을 살펴보면서, Permutation Addon을 사용하는 방법을 익혀보세요.
애드온이 어떻게 동작하는지는 `,e(n.code,{children:"stories"}),` 디렉토리에 있는 코드를 확인해보세요.
`,e(n.a,{href:"https://componentdriven.org",target:"_blank",rel:"nofollow noopener noreferrer",children:e(n.strong,{children:"컴포넌트 기반"})})," 방식으로 UI를 구축하는 것을 권장합니다."]}),`
`,e(n.p,{children:e(n.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table",target:"_blank",rel:"nofollow noopener noreferrer",children:"Github"})}),`
`,e(n.h1,{id:"get-started",children:"Get started"}),`
`,e(n.p,{children:`이 라이브러리는 React로 작성되었으며, Storybook 7.X >= 에서 정상적으로 동작함을 확인하였습니다.
이외의 환경에서는 정상적으로 동작하지 않을 수 있습니다.`}),`
`,r(n.ol,{start:"0",children:[`
`,e(n.li,{children:"Perequisites"}),`
`]}),`
`,r(n.ul,{children:[`
`,e(n.li,{children:e(n.code,{children:"node>=16"})}),`
`,r(n.li,{children:[e(n.code,{children:"yarn"})," or ",e(n.code,{children:"npm"})]}),`
`,r(n.li,{children:["a working project with:",`
`,r(n.ul,{children:[`
`,e(n.li,{children:"react >= 16.8"}),`
`]}),`
`]}),`
`]}),`
`,r(n.ol,{children:[`
`,e(n.li,{children:"Installation"}),`
`]}),`
`,r(n.p,{children:[e(n.code,{children:"npm install --save-dev sb-addon-permutation-table"}),`
`,e(n.code,{children:"yarn add -D sb-addon-permutation-table"})]}),`
`,r(n.ol,{start:"2",children:[`
`,e(n.li,{children:"Resister the addon in main.transform"}),`
`]}),`
`,e(n.pre,{children:e(n.code,{className:"language-tyepscript",children:`
const config = {
  // ...
  addons: ['sb-addon-permutation-table']
}

`})}),`
`,r(n.ol,{start:"3",children:[`
`,e(n.li,{children:"Add it to story!"}),`
`]}),`
`,r(n.p,{children:["see details in ",e(n.a,{href:"https://github.com/daimresearch/sb-addon-permutation-table#usage",target:"_blank",rel:"nofollow noopener noreferrer",children:"here"})]}),`
`,e(n.h2,{id:"contribution-guidelines",children:"Contribution guidelines"}),`
`,e(n.p,{children:"TODO"})]})}function m(i={}){const{wrapper:n}=Object.assign({},l(),i.components);return n?e(n,Object.assign({},i,{children:e(o,i)})):o(i)}function a(i,n){throw new Error("Expected "+(n?"component":"object")+" `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
//# sourceMappingURL=Introduction-a654c7fa.js.map
