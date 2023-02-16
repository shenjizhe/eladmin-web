# 前端代码工厂

## 核心组件
### 1. CRUD/crud.js

 负责添删改查

#### crud配置

  名称   | 说明  | 备注
  ---  | ---  | ---
 tag  | 标签 |tag: 'default',
id|字段名|idField: 'domain_id',//默认是 id
title|标题|title: '领域建模',页面的主要标题，新建XX,编辑XX
url|请求数据的根路径|url: 'api/domain',
data|表格的数据|data: [],
selections|选择项|selections: [],
query|带查询的对象|query: {},
params|查询的参数|params: {name:'name1'},
form|表单|form: {},
defaultForm|重置表单| defaultForm: () => {}
sort|排序规则|sort: ['id,desc'],   <br/>//默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
time|等待时间|time: 50,
crudMethod|添删改查方法|crudMethod: {<br/>add: (form) => {},<br/>del: (id) => {},<br/>edit: (form) => {},<br/>get: (id) => {}<br/>},
optShow|主页操作栏按钮显示|optShow: {<br/>add: true,<br/>edit: true,<br/>del: true,<br/>download: true,<br/>reset: true<br/>},
props|自定义扩展属性|props: {},
queryOnPresenterCreated|在主页准备|queryOnPresenterCreated: true,
debug|调试开关|debug: false
