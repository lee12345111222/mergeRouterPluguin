# mergeRouterPluguin
手写一个合并路由的webpack插件

功能介绍：

合并、去重routers文件夹下的路由配置，格式如下：

//lcok.ts
module.exports = [
  {
    name: 'listShops',
    path: '/cms/lock/pattern/listShops',
    method: 'get',
  },
  {
    name: 'pagingPatterns',
    path: '/cms/lock/pattern/pagingPatterns',
    method: 'get',
  },
  {
    name: 'changePatterns',
    path: '/cms/lock/pattern/change',
    method: 'post',
  },
  {
    name: 'removePatterns',
    path: '/cms/lock/pattern/remove',
    method: 'post',
  }
]

/index.ts
module.exports = [
    {
      name: 'listShops1',
      path: '/cms/lock/pattern/listShops',
      method: 'get',
    },
    {
      name: 'pagingPatterns',
      path: '/cms/lock/pattern/pagingPatterns',
      method: 'get',
    },
  ]
  
  生成router-config.js
  module.exports = {
  "listShops1": {
    "name": "listShops1",
    "path": "/cms/lock/pattern/listShops",
    "method": "get"
  },
  "pagingPatterns": {
    "name": "pagingPatterns",
    "path": "/cms/lock/pattern/pagingPatterns",
    "method": "get"
  },
  "listShops": {
    "name": "listShops",
    "path": "/cms/lock/pattern/listShops",
    "method": "get"
  },
  "changePatterns": {
    "name": "changePatterns",
    "path": "/cms/lock/pattern/change",
    "method": "post"
  },
  "removePatterns": {
    "name": "removePatterns",
    "path": "/cms/lock/pattern/remove",
    "method": "post"
  }
}
