# 后台管理（前端）

# 介绍

### 目录结构

```sh
├── mock # mock数据
├── public # 静态资源
├── src # 项目代码
│   ├── api #请求相关
│   ├── assets # 静态资源
│   ├── components # 组件
│   ├── service # 数据配置
│   ├── layout # 布局
│   ├── router #路由，菜单等
│   ├── settings # 配置文件
│   ├── stores # pinia
│   ├── styles  # 样式
│   ├── utils # 工具类
│   └── views # 页面
│   ├── main.js # 入口文件
│   ├── permission.js # 路由权限查询配置
```



### 快速上手

#### 安装依赖

在项目根目录下,打开命令窗口执行,耐心等待安装完成即可

```
yarn install
```

#### 运行项目

```sh
yarn dev
```

#### Meta 配置说明

```js
{
  // title
  title: string;

  keepAlive?: boolean;
    
  // 图标，也是菜单图标
  icon?: string;

  // 父级菜单路由path,非一级菜单必传，用于配置展开菜单
  parentPath?: string;
    
  // 可以访问的角色:['admin']
  roles?: RoleEnum[];

  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  activeMenu?: string;

  // 当前路由不在菜单显示
  hideMenu?: boolean;
  
  // 是否外部链接
  isLink?: boolean;

  // 外部链接地址
  linkUrl?: string;

  // 是否iframe
  isIframe?: boolean;

  // 内嵌iframe的地址
  iframeUrl?: string;
  
  // 菜单排序。越大排名越后面
  orderNo?: number;
}
```



### 样式

项目中使用的通用样式,都存放于styles下面

```sh
.
├── app.scss #	布局样式
├── ant.scss # ant 样式覆盖
└── color.scss # 颜色变量
├── index.scss # 入口
├── base.scss # 公共类
├── transition # 动画
└── variables.scss # 变量
