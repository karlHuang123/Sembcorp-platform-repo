# dc-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

基本技术方案：
采用Vue 3.0+TS架构，用axios处理http请求和错误返回。

没有引入其他三方组件库或是UI库。

三个组件，搜索框；快速搜索标签和列表元素，通过一个大的容器container整合到一起。

搜索框包含emit事件，实时监听用户输入；
快速搜索同理。

搜索框响应事件发送http请求，并根据返回处理对应的信息。

can be better:
动画过渡没有做，时间太紧急了，只有上周日下午和本周二有时间弄，不想耽误太长时间，思路可以是用css的transtion或者animation配合js处理；

暂时没有考虑是否需要在输入框做防抖，因为频繁输入会造成http频繁请求，体验一般。

loading画面用了粗暴的position: absolute覆盖处理，如果碰到搜索框需要响应样式的需求，该解决方案可以直接放弃，因为把容器宽度和高度写死了。同时根据错误信息不同有多重判断，可读性一般。

键盘控制没有做，暂时没有想到可以比较优雅实现的方案。

滚动条样式做的一般。

代码注释比较少，习惯问题，会多注意。


