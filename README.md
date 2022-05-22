# react-weather-app

描述：利用 react 做的一个天气 App demo

# 访问地址

-   <a href="https://michaeljunlove.github.io/weather-react-app/" target="_blank">点我访问</a>

# 做了哪些事

-   基本的页面布局
-   移动端禁止缩放
-   rem 适配移动端
-   tinypng 压缩图片
-   天气 API 来自彩云天气，注册后，需发邮件开通 API key
-   在设计层面抽离公共组件

# 本地环境

-   git clone https://github.com/michaeljunlove/weather-react-app.git
-   npm install && npm start

本地环境访问的是真实数据，由于彩云天气 API 不支持跨域，所以 github pages 访问的是 2022 年 5 月 21 号的 mock 数据

# 踩坑

-   [404](https://github.com/facebook/create-react-app/discussions/11938)
-   [react-router V6 ](https://segmentfault.com/q/1010000041418022/a-1020000041418358)

# 部署

-   npm run build
-   git subtree push --prefix=build origin gh-pages

# 参考文献

-   [create-react-app](https://create-react-app.dev/)
-   [dayjs](https://dayjs.fenxianglu.cn/)
-   [echarts](https://echarts.apache.org/handbook/zh/basics/import)
-   [swiperjs](https://swiperjs.com/react)
-   [axios](https://axios-http.com/docs/intro)
