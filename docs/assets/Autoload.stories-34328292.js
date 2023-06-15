import{B as o}from"./Button-1f26d2a7.js";import"./jsx-runtime-91a467a5.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";const y={title:"Example/Autoload",component:o,argTypes:{backgroundColor:{control:"color"}},parameters:{storySource:{source:"<Button>Button</Button>",importPath:"import { Button } from 'antd"},permutation:{scope:{Button:o}}},args:{label:"Button"}},a={parameters:{permutation:{autoload:"all"}}},r={parameters:{permutation:{autoload:["primary","size"]}}},t={parameters:{permutation:{autoload:"all",deactivate:["size"]}}};var e,s,n;a.parameters={...a.parameters,docs:{...(e=a.parameters)==null?void 0:e.docs,source:{originalSource:`{
  parameters: {
    permutation: {
      autoload: "all"
    }
  }
}`,...(n=(s=a.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var m,p,l;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    permutation: {
      autoload: ["primary", "size"]
    }
  }
}`,...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var c,u,i;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    permutation: {
      autoload: "all",
      deactivate: ["size"]
    }
  }
}`,...(i=(u=t.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};const z=["loadAll","loadPartial","deactivate"];export{z as __namedExportsOrder,t as deactivate,y as default,a as loadAll,r as loadPartial};
//# sourceMappingURL=Autoload.stories-34328292.js.map
