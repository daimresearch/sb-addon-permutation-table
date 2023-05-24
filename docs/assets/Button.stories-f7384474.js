import{j as h}from"./jsx-runtime-91a467a5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";const o=({primary:a=!1,size:y="medium",backgroundColor:b,label:g,...f})=>{const B=a?"storybook-button--primary":"storybook-button--secondary";return h("button",{type:"button",className:["storybook-button",`storybook-button--${y}`,B].join(" "),style:{backgroundColor:b},...f,children:g})};try{o.displayName="Button",o.__docgenInfo={description:"Primary UI component for user interaction",displayName:"Button",props:{primary:{defaultValue:{value:"false"},description:"Is this the principal call to action on the page?",name:"primary",required:!1,type:{name:"boolean"}},backgroundColor:{defaultValue:null,description:"What background color to use",name:"backgroundColor",required:!1,type:{name:"string"}},size:{defaultValue:{value:"medium"},description:"How large should the button be?",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},label:{defaultValue:null,description:"Button contents",name:"label",required:!0,type:{name:"string"}},onClick:{defaultValue:null,description:"Optional click handler",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const v={title:"Example/Button",component:o,argTypes:{backgroundColor:{control:"color"}},parameters:{permutation:{scope:{Button:o}}},args:{label:"Button"}},e={args:{primary:!0},parameters:{storySource:{source:"<Button />",importPath:"import { Button } from 'antd"}}},r={args:{size:"large"}},t={args:{},parameters:{storySource:{source:"<Button />",importPath:"import { Button } from '@daim/component-library'"},permutation:{deactivate:["primary","size"]}}};var s,n,u;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    primary: true
  },
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: "import { Button } from 'antd"
    }
  }
}`,...(u=(n=e.parameters)==null?void 0:n.docs)==null?void 0:u.source}}};var i,m,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    size: "large"
  }
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var l,p,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: "import { Button } from '@daim/component-library'"
    },
    permutation: {
      deactivate: ["primary", "size"]
    }
  }
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const P=["Primary","NoStorySource","PermutationDisabled"];export{r as NoStorySource,t as PermutationDisabled,e as Primary,P as __namedExportsOrder,v as default};
//# sourceMappingURL=Button.stories-f7384474.js.map
