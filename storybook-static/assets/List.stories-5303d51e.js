import{j as b,a as o}from"./jsx-runtime-a888423b.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";const r=({data:e,title:u,color:c="black",fontWeight:d="bold"})=>b("div",{style:{color:c,fontWeight:d},children:[u.title,o("ul",{children:e==null?void 0:e.map((f,y)=>o("li",{children:f.label},y))})]});try{r.displayName="List",r.__docgenInfo={description:"",displayName:"List",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"Data[]"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"{ title: string; }"}},color:{defaultValue:{value:"black"},description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"red"'},{value:'"blue"'}]}},fontWeight:{defaultValue:{value:"bold"},description:"",name:"fontWeight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'}]}}}}}catch{}const v={title:"Sample/List",component:r,parameters:{storySource:{source:"<List/>",importPath:'import { List } from "@daim/component/List"'},permutation:{scope:{List:r}}}},t={args:{data:[{label:"foo",type:"default"},{label:"bar",type:"primary"},{label:"baz",type:"danger"}],title:{title:"hello"}}},a={args:{title:{title:"Lorem, ipsum."},data:[{label:"foo",type:"default"}]},parameters:{storySource:{source:"<List title={{'title':'foo'}} />",importPath:'import { List } from "@daim/component/List"'}}};var l,i,s;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    data: [{
      label: "foo",
      type: "default"
    }, {
      label: "bar",
      type: "primary"
    }, {
      label: "baz",
      type: "danger"
    }],
    title: {
      title: "hello"
    }
  }
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,p,m;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    title: {
      title: "Lorem, ipsum."
    },
    data: [{
      label: "foo",
      type: "default"
    }]
  },
  parameters: {
    storySource: {
      source: \`<List title={{'title':'foo'}} />\`,
      importPath: 'import { List } from "@daim/component/List"'
    }
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const _=["Default","onProps"];export{t as Default,_ as __namedExportsOrder,v as default,a as onProps};
//# sourceMappingURL=List.stories-5303d51e.js.map
