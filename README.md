# vuepress-theme-2zh

## 介绍

> vuepress 是由 vue 驱动的静态网站生成器，而 vuepress-theme-2zh 是一款基于 vuepress 的静态主题

1. 优雅的响应式设计
2. 简洁的文章列表
3. 直观的标题目录
4. mermaid 语法支持
5. latex 公式支持

## 安装

1. 下载源码

   [https://github.com/CadeCode/vuepress-theme-2zh](https://github.com/CadeCode/vuepress-theme-2zh)

2. 使用 npm

   ```
   npm i -S @cadecode/vuepress-theme-2zh
   ```

## 配置

### 主题配置

> 在 .vuepress/config.js 中的 themeConfig 属性下进行配置

1. logo

   顶部导航图片标志

   ```javascript
   // 类型 Array
   // 默认
   logo: ['text','2zh']
   ```

   logo[0] 可选 'text' 和 'image'，logo[1] 分别对应文字和图片链接

2. author

   页面底部的署名信息

   ```javascript
   // 类型 String
   // 默认
   author: '2zh'
   ```

3. notice

   首页滚动通知

   ```javascript
   // 类型 Array 
   // 默认
   notice: []
   // 示例
   notice: [
               {
                   text: 'vuepress 博客主题 2zh 开源地址',
                   url: 'https://github.com/cadecode/vuepress-theme-2zh'
               },
               {
                   text: 'vuepress 官方文档',
                   url: 'https://www.vuepress.cn/'
               },
               {
                   text: 'vue 官方文档',
                   url: 'https://cn.vuejs.org/v2/guide/'
               }
   		]
   ```

4. links

   页面底部导航链接

   ```javascript
   // 类型 Array 
   // 默认
   links: []
   // 示例
   links: [
               {text: 'Github', url: 'https://github.com'},
               {text: 'Email', url: 'https://mail.foxmail.com'},
               {text: 'Weibo', url: 'https://weibo.com/'},
               {text: 'Facebook', url: 'https://www.facebook.com'},
           ]
   ```

5. pagination

   首页文章列表分页，指定每页文章个数

   该参数不影响标签分类下的文章列表，标签下默认显示该标签的全部文章

   ```javascript
   // 类型 Number
   // 默认
   pagination: 12
   ```

### md 配置

> 在每个 markdown 文件的头部进行配置，使用 YAML 语法

1. title

   文章名称，影响浏览器标题

   ```javascript
   // 示例
   title: vuepress 介绍
   // 不配置默认为 No title
   ```

2. date

   写作日期，在文章列表上显示，影响文章排序

   ```javascript
   // 示例
   date: 2020/7/26
   // 不配置默认为 1970/1/1
   ```

3. description

   文章描述，在文章列表上显示

   ```javascript
   // 示例
   description: 关于 vuepress 的介绍
   // 不配置默认为 No description
   ```

4. tag

   文章标签，类型为 String 或 Array

   用以标签分类以及在文章列表上显示（为数组则显示第一个元素）

   ```javascript
   // 示例
   tag: Java
   // 或
   tag: [Java, Java web]
   ```

5. use

   为文章内容开启插件支持

   ```javascript
   // 示例
   // mermaid 流程图渲染支持
   use: mermaid
   // latex 公式渲染支持
   use: latex
   // 或
   use: [mermaid, latex]
   ```

6. cover

   文章列表中显示的封面

   不指定该项会默认使用 cover 文件夹下的图片，以文章在列表排序中的索引为名称，png 为后缀，如 0.jpg 为列表中的最后一篇文章的封面

   ```javascript
   // 示例
   cover: /cover/picture.png
   ```
>需要注意的是，docs 文件夹下 about.md 和 links.md 分别对应导航栏中的关于和友链
>
>需要在 md 文件头部标注要使用的布局，如下
>
>```yaml
>layout: Info 
>permalink: /:slug
>title: About
>description: '...'
>```

### 目录配置

1. docs 结构

   ```
   |- docs
   	|- .vuepress 
   		|- config.js // 配置文件
   	|- post // markdown 文章
   		|- post1.md
   		|- post2.md
   		|- ...
   	|- about.md // 关于页面
   	|- links.md // 友链页面
   ```

2. 静态资源

   图片等静态资源放在 .vuepress/public 下，vuepress build 时自动拷贝到 index.html 所在目录

   ```
   |- docs
   	|- .vuepress
   		|- public
   			|- cover // 封面
   			|- meta // favicon.ico, logo.png...
   			|- image // 其他图片
   ```
## 最后

不足之处，敬请见谅，编码不易，感谢支持！

拥抱变化，拥抱开源