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

