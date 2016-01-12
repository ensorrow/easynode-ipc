1. cd easynode-icp; webpack-dev-server --content-base plugins

2. http://localhost:8080/webpack-dev-server/views/index.html

3. npm install file-loader url-loader --save-dev

4.  npm install  webpack --save-dev

5. 3rd-party plugins

	npm install html-webpack-plugin open-browser-webpack-plugin --save-dev

6. You can enable some codes only in development environment with environment flags

	env DEBUG=true weback

7. Code splitting

	For big wen apps it's not efficient to put all code into a single file.  Webpack allows you to split them into serveral chunks.

	Especially if some blocks of code are only required under some circumstances. these chunks could be loaded on demand

* on demand

    copy 1.../build/1.js to views directory, now the page'll work.


8. Common chunk

When multi scripts have common chunks. you can extract the common part into a separate file with CommonsChunkPlugin.

9. Vendor chunk

npm install jquery --save-dev

 You can also extract the vendor libraries from a script into a separate  file with CommonsChunkPlugin.

10. Vendor chunk use ProvidePlugin

If you want a module available as variable in every module. such as making $ and jQuery available in every module without

writing require('jquery') . Your should use ProvidePlugin

11. Exposing global variables

If your want to use some global variables , and don't want to includes them in  teh Webpack bundle, you can enable externals filed in webpack.config.js


12. Hot Module Replacement

npm install webpack-dev-server --save-dev

cd plugins

webpack --watch

13. React router

npm install react-router

14. webstorm JSX Emmet

File | Settings | Editor | Emmet - JSX for Windows and Unix

WebStorm | Preferences | Editor | Emmet - JSX for OS X

15. babel-loader

Webpack plugin for Babel

16. react-hot-loader

Cannot define 'query' and multiple loaders in loaders list

loaders: ['react-hot', 'babel']
query: {
                    presets: ['es2015', 'react']
      },
Q: How to solve?
query json object as query parameter?

17. Matcher

{ test: /\.(js|jsx)$/, loader: 'babel-loader' } - 匹配 js 和 jsx

import UploadPhoto from './forms/UploadPhoto.jsx';

18.  webpack_and_react

JSX is a superset of JavaScript that allows you to mix XMLish syntax with JavaScript

 You can expect bundle sizes for small applications to be around 150-200k, React included

19. Webstrom turn off updating indecies

Mark directory  as/Excluded

20.
[icp_ui](file:///Users/hujiabao/workspace_docker/icp/icp_ui/%E9%A1%B5%E9%9D%A2%E6%A0%87%E6%B3%A8%E5%AF%BC%E5%87%BA/index.html)

21. plugins

cd plugins;  webpack -w & mcss mcss/index.mcss -o css/ -w
cd ..; webpack-dev-server --content-base plugins

22. fieldset没有问题,legend margin-left设置有问题不用,改用div替代, 整体在form外的div里设置margin

23. 原生option高度不可调的,很多样式不支持,需要div模拟

24. <label><input type="checkbox" name="3"><span>英语</span></label> 点中文字也能选中
	<input type="checkbox" name="4"><span>日语</span> 这样点中文字不能选中

25. 行内元素,对宽度没有影响, 必须设置为块

26. popover 用绝对定位, 元素用relative, 本元素用absolute

27. 相差一个像素是小数点的缘故( 350-15*3 - 2*4)/4 , border-width=2

28. Mac chrome浏览器下, select 设置高度无效,要先设置下border: 1px solid #

29.  psd-> sketch(marketch plugin)->html
    psd->svg(Affinity design)
* Affinity Design
Affinity Designer是一款专业的设计绘图工具，适用于苹果操作系统，主要用于矢量图形的绘制，适用于图标、UI 设计、网站设计、宣传素材等图像的制作，具有较强的易用性，操作也十分方便

30. loginCallback

[2016-01-11 19:51:45.135] [INFO] console - tenantId b261f52d302b43ba821a6d731b17034c
[2016-01-11 19:51:45.135] [INFO] console - expire Mon Jan 11 2016 19:52:00 GMT+0800 (CST)
[2016-01-11 19:51:45.136] [INFO] console - status 1
[2016-01-11 19:51:45.136] [INFO] console - regIn undefined
[2016-01-11 19:51:45.136] [INFO] console - persist e8edea596b18befda5525e266951a58398d86e758d19a2e7aa224fc9661e79a9ad36ea9d4a5a3912e72bd326ebd2292eb04d6b92226285e68b255796c1f4c08982f9ea690d34e03e98a6603b6b35090d
[2016-01-11 19:51:45.136] [INFO] console - code 200
[2016-01-11 19:51:45.136] [INFO] console - loginType 1
[2016-01-11 19:51:45.136] [INFO] console - sign l0QGcLPrWAo2pe5xLfQcAs4sjnzBem87MQHcd4UC7Zw=
[2016-01-11 19:51:45.136] [INFO] console - category 0
[2016-01-11 19:51:45.136] [INFO] console - email hujb2000@163.com
[2016-01-11 19:51:45.136] [INFO] console - callback https://c.163.com/?action=login
[2016-01-11 19:51:45.136] [INFO] console - userName hujb2000@163.com

