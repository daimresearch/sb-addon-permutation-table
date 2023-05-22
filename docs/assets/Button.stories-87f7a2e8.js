import{j as B}from"./jsx-runtime-390e5fc8.js";import"./index-570b25c1.js";import"./_commonjsHelpers-042e6b4d.js";const t=({primary:a=!1,size:y="medium",backgroundColor:b,label:g,...f})=>{const h=a?"storybook-button--primary":"storybook-button--secondary";return B("button",{type:"button",className:["storybook-button",`storybook-button--${y}`,h].join(" "),style:{backgroundColor:b},...f,children:g})};try{t.displayName="Button",t.__docgenInfo={description:"Primary UI component for user interaction",displayName:"Button",props:{primary:{defaultValue:{value:"false"},description:"Is this the principal call to action on the page?",name:"primary",required:!1,type:{name:"boolean"}},backgroundColor:{defaultValue:null,description:"What background color to use",name:"backgroundColor",required:!1,type:{name:"string"}},size:{defaultValue:{value:"medium"},description:"How large should the button be?",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},label:{defaultValue:null,description:"Button contents",name:"label",required:!0,type:{name:"string"}},onClick:{defaultValue:null,description:"Optional click handler",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const v={title:"Example/Button",component:t,argTypes:{backgroundColor:{control:"color"}},parameters:{permutation:{scope:{Button:t}}},args:{label:"Hello World"}},e={args:{primary:!0},parameters:{storySource:{source:'<Button label="Hello World" />',importPath:"import { Button } from 'antd"}}},r={args:{size:"large"}},o={args:{},parameters:{storySource:{source:'<Button label="Hello World" />',importPath:"import { Button } from '@daim/component-library'"},permutation:{deactivate:["primary","size"]}}};var s,n,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    primary: true
  },
  parameters: {
    storySource: {
      source: '<Button label="Hello World" />',
      importPath: "import { Button } from 'antd"
    }
  }
}`,...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var i,u,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    size: "large"
  }
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var c,p,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  parameters: {
    storySource: {
      source: '<Button label="Hello World" />',
      importPath: "import { Button } from '@daim/component-library'"
    },
    permutation: {
      deactivate: ["primary", "size"]
    }
  }
}`,...(d=(p=o.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const P=["Primary","NoStorySource","PermutationDisabled"];export{r as NoStorySource,o as PermutationDisabled,e as Primary,P as __namedExportsOrder,v as default};
//# sourceMappingURL=Button.stories-87f7a2e8.js.map
