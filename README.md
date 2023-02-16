# 前端代码工厂

## 核心组件
### 1. CRUD/crud.js

 负责添删改查

#### crud配置
- // 标签

tag: 'default',
- // id字段名

idField: 'id',
- // 标题

title: '',
- // 请求数据的url

url: '',
- // 表格数据

data: [],
- // 选择项

selections: [],
- // 待查询的对象

query: {},
- // 查询数据的参数

params: {},
- // Form 表单

form: {},
- // 重置表单

defaultForm: () => {},
- // 排序规则 

默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
sort: ['id,desc'],
- // 等待时间

time: 50,
- // CRUD Method
```
crudMethod: {
add: (form) => {},
del: (id) => {},
edit: (form) => {},
get: (id) => {}
},
```
- // 主页操作栏显示哪些按钮

```
optShow: {
add: true,
edit: true,
del: true,
download: true,
reset: true
},
```

- // 自定义一些扩展属性

props: {},
- // 在主页准备

queryOnPresenterCreated: true,
- // 调试开关

debug: false