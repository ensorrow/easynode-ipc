
<h1><i class="fa fa-group"></i> Example Introduction </h1>


<h2><i class="fa"></i> Preparations</h2>
<ul>
    <li><a href="https://docs.docker.com/"><span class="icon fa"></span><span class="title">Install Docker</span></a></li>
    <li><a href="https://git-scm.com/"><span class="icon fa"></span><span class="title">Install Git</span></a></li>
    <li><a href="https://www.oracle.com/"><span class="icon fa"></span><span class="title">Install JDK 8.0</span></a></li>
    <li><a href="https://jenkins.io/"><span class="icon fa"></span><span class="title">Download Jenkins 2.8</span></a></li><p>and run jenkins: <code>nohup java -jar  jenkins2.8.war &</code></p>
    <li><a href="https://github.com/easynode/easynode-ipc.git"><span class="icon fa"></span><span class="title">Download example</span></a></li><p><code>git clone https://github.com/easynode/easynode-ipc.git</code></p>
</ul>


<h2><i class="fa"></i> Example introduction</h2>

This example permits user to login system by SSO(URS), then storage the session of logined-user to a distributed K/V system(Redis), and allow users to fill out forms.
after verification, the form data will be stored to RDS(likely mysql Server) and the form file will be stored to the NOS(net object storage) system. It provides some APIs of Restfule style for management backend to audit.

<br>
<br>
<img src="https://raw.githubusercontent.com/nhipster/nhipster.github.io/master/images/example_architecture.png" width="800"/>
<br>
<br>

<h2><i class="fa"></i> Directory structure of this example</h2>

<pre>
    <code class="language-shell" data-lang="shell">.
    ├── bin
    ├── config
    ├── docs
    ├── etc
    |── plugins
    ├── public
    ├── src
    ├── test
    ├── .babelrc
    ├── .dockerignore
    ├── Dockerfile
    ├── README.md
    ├── package.json
    └── test.sh
    </code>
</pre>

The example directory:

<div class="panel panel-default">
    <table class="table">
        <thead>
        <tr>
            <th>File / Directory</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <p><code>bin</code></p>
            </td>
            <td>
                <p>
                    This directory stores the startup scripts and main programs for each environment (such as DEVELOP,TEST,PRODUCTION environment).
                </p>
                    <p>Now you only need to care about the following two files:</p>
                    <ur>
                    <li>start.sh : as the start script for TEST and PRODUCTION env</li>
                    <li>dev_start: as the start script for DEVELOP env</li>
                    <li>main.js: as the main program for DEVLOP env(need babel-node run this main program)</li>
                    <li>main.min.js: as the main program for TEST and PRODUCTION env(transformed into es5 by babel, node can run it)</li>
                    </ur>
                    You can ignore the other files.
            </td>
        </tr>
        <tr>
            <td>
                <p><code>config</code></p>
            </td>
            <td>
                <p>
                    You can ignore this directory, the configuration will be provided by the configuration services
                </p>
            </td>
        </tr>

        <tr>
            <td>
                <p><code>docs</code></p>
            </td>
            <td>
                <p>
                    You can save a number of documents related to the project, such as protocol documents, requirements design documents, meeting memories, etc.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>etc</code></p>
            </td>
            <td>
                <p>
                    This is the internal configuration for the need of  the Easynode framework
                </p>
                <p>
                    You can ignore it now.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>plugins</code></p>
            </td>
            <td>
                <p>
                    The directory includes source code of a single page application based on react framework , and configuration for packing.
                    <a href="#plugins">see details</a>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>src</code></p>
            </td>
            <td>
                <p>
                    This directory contains the source code of backend for this example.
                    <a href="#src">see details</a>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>test</code></p>
            </td>
            <td>
                <p>
                    This directory contains the source  code of test for main business lines
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>.babelrc</code></p>
            </td>
            <td>
                <p>
                    The entire range of Babel API <a href="http://babeljs.io/docs/usage/options/">options</a> are allowed.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>.dockerignore</code></p>
            </td>
            <td>
                <p>
                    If a file named <a href="https://docs.docker.com/v1.5/reference/builder/#the-dockerignore-file">.dockerignore</a> exists in the source repository, then it is interpreted as a newline-separated list of exclusion patterns. Exclusion patterns match files or directories
                    relative to the source repository that will be excluded from the context. It can even be used to ignore the Dockerfile and .dockerignore files.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>Dockerfile</code></p>
            </td>
            <td>
                <p>
                    Docker can build images automatically by reading the instructions from a <a href="https://docs.docker.com/v1.5/reference/builder/">Dockerfile</a>. A Dockerfile is a text document that contains all the commands you would normally execute manually in order to build a Docker image. By calling docker build from your terminal, you can have Docker build your image step by step, executing the instructions successively.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>README.md</code></p>
            </td>
            <td>
                <p>
                    This file is the introduction of the project's portal, written in MarkDown format.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>package.json</code></p>
            </td>
            <td>
                <p>
                    Specifics of npm's <a href="https://docs.npmjs.com/files/package.json">package.json</a> handling,It must be actual JSON, not just a JavaScript object literal.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>test.sh</code></p>
            </td>
            <td>
                <p>
                    It just a test startup shell script, and can be run after the container has been started.
                </p>
            </td>
        </tr>
        </tbody>
    </table>
</div>

The plugins directory:

<div class="panel panel-default" id="plugins">
    <table class="table">
        <thead>
        <tr>
            <th>File / Directory</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <p><code>apidoc</code></p>
            </td>
            <td>
                <p>
                    This directory contains the configuration and scripts to generate the API document of the backend's code.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>assets</code></p>
            </td>
            <td>
                <p>
                    This directory stores a static resource file, such as a picture.
                </p>
            </td>
        </tr>

        <tr>
            <td>
                <p><code>build</code></p>
            </td>
            <td>
                <p>
                    This directory stores packaged files and mapped files for the front-end resource files such as html, css, js, png as suffix.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>css</code></p>
            </td>
            <td>
                <p>
                    An output  directory of the <a href="https://github.com/leeluolee/mcss">MCSS</a> tool.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>js</code></p>
            </td>
            <td>
                <p>
                    The front-end source code folder of the project,  based on the React framework.
                </p>
                <pre>
                <code class="language-shell" data-lang="shell">.
                    ├── constants, Constant definition
                    ├── forms, Each form component
                    ├── mocks, mock data for testing
                    ├── services, services class
                    |── utils, utils class
                    ├── widgets, widget components
                    ├── App.jsx, App component
                    ├── Footer.js, Footer component
                    ├── Header.js, Header component
                    ├── index.js,App entry
                    └── routes.jsx, front-end route based on hash
                </code>
            </pre>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>lib</code></p>
            </td>
            <td>
                <p>
                    Third party dependence, will be replaced webpack. You can ignore it now.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>mcss</code></p>
            </td>
            <td>
                <p>
                    Modular css with <a href="https://github.com/leeluolee/mcss">mcss</a>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>test</code></p>
            </td>
            <td>
                <p>
                    Static pages before design of components, You can ignore it now.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>views</code></p>
            </td>
            <td>
                <p>
                    Similar to the WWW directory, but can not be named as the WWW directory, because it has been occupied by the easynode framework
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>yuidoc</code></p>
            </td>
            <td>
                <p>
                    Description document as a micro service interface.
                    It contains the configuration and scripts to generate the Restful style API document
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>README.md</code></p>
            </td>
            <td>
                <p>
                    This file is the introduction of the front-end's portal, written in MarkDown format.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>.eslintrc</code></p>
            </td>
            <td>
                <p>
                    ESLint is designed to be completely configurable, meaning you can turn off every rule and run only with basic syntax validation, or mix and match the bundled rules and your custom rules to make ESLint perfect for your project.
                    This is a <a href="http://eslint.org/docs/user-guide/configuring">configuration file</a> tell eslint how to work.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>mcss.json</code></p>
            </td>
            <td>
                <p>
                    This is a <a href="https://github.com/leeluolee/mcss">configuration file</a> tell mcss how to work.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>webpack.config.js</code></p>
            </td>
            <td>
                <p>
                    This is a <a href="https://webpack.github.io/docs/configuration.html">configuration file</a> tell webpack how to work for the development environment.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>webpack.prod.config.js</code></p>
            </td>
            <td>
                <p>
                    This is a <a href="https://webpack.github.io/docs/configuration.html">configuration file</a> tell webpack how to work for the test or production environment.
                </p>
            </td>
        </tr>
        </tbody>
    </table>
</div>

The src/netease/icp/backend directory, The organization structure of this directory is as similar as to  organize in the Java programming language that the directory path as the namespace of the class.

You can declare a class and create a object like below:

<pre>
    <code>
    var LoginService = using('netease.icp.backend.services.LoginService');
    var loginService = new LoginService(app);
    </code>
</pre>

<div class="panel panel-default" id="src">
    <table class="table">
        <thead>
        <tr>
            <th>File / Directory</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <p><code>controllers</code></p>
            </td>
            <td>
                <p>
                    This is the controller layer of the MVC Pattern.
                    Controller acts on both model and view. It controls the data flow into model object and updates the view whenever data changes. It keeps view and model separate.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>json</code></p>
            </td>
            <td>
                <p>
                    This is the model layer of the MVC Pattern, is not been used to render to views directly but carring data for protocol.
                </p>
            </td>
        </tr>

        <tr>
            <td>
                <p><code>models</code></p>
            </td>
            <td>
                <p>
                    This is the model layer of the MVC Pattern, is not been used to render to views directly but as a model of database.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>routes</code></p>
            </td>
            <td>
                <p>
                    Routing refers to the definition of application end points (URIs) and how they respond to client requests. It's master responsiblity is to
                    map the method and URIs and Generator.
                    example:
                    <ul>
                        <li><code> httpServer.addRoute('get', '/login/callback', Controllers.loginCallback(httpServer));</code></li>
                        <li><code>httpServer.addRoute('get', '/logout', Controllers.logout(httpServer));</code></li>
                    </ul>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>services</code></p>
            </td>
            <td>
                <p>
                    This is the logic service layer of business.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p><code>Main.js</code></p>
            </td>
            <td>
                <p>
                    The main entrance of this program is similar to the main in  Java or c/c++ language
                </p>
            </td>
        </tr>
        </tbody>
    </table>
</div>

<h2>How to run the example</h2>

<ul>
    <li>
        <p>step 1: </p>
        <p>Start a mysql container.</p>
        <p><code>docker run --name mysql --restart=always -v `pwd`:/etc/mysql/conf.d -v `pwd`/db/:/var/lib/mysql -e MYSQL_ROOT_PASSWORD='test' -e MYSQL_DATABASE=test -e MYSQL_USER=test -e MYSQL_PASSWORD=test -p 3306:3306  -d mysql</code></p>
    </li>
    <li>
        <p>step 2: </p>
        <p> Start a redis container.</p>
        <code>docker run -d --name redis  -p 6379:6379   -v `pwd`/db/:/data redis redis-server /usr/local/etc/redis/redis.conf</code>
    </li>
    <li>
        <p>step 3: </p>
        <p> fill in the config.json , and you can store the file as the same position with dev_start.sh at bin directory </p>
        <a href="{{ site.url }}/images/config.json"> config.json </a>
        If the config din't been  encoded. You need to uncomment the line "config = JSON.parse(StringUtil.decryptAdv(config));" at the file Main.js.
    </li>
    <li>
        <p>step 4: </p>
        <p> build the image </p>
        <code>docker build -t  your_image_name .</code>
    </li>
    <li>
        <p>step 5: </p>
        <p> Run the example </p>
        <code>docker run -ti --name dev_example  -p 8888:8888 -v `pwd`:/usr/src/app --workdir=/usr/src/app/bin --env ENV=DEVELOP -e CONFIG_URL=/usr/src/app/bin/config.json -e PORT=8888 your_image_name  ./start.sh</code>
    </li>

</ul>



<h2>How to debug the example</h2>

<ul>
    <li>
        <p>step 1: </p>
        <p> Run the container </p>
        <code>docker run -ti --name dev_example  -p 8888:8888 -v `pwd`:/usr/src/app --workdir=/usr/src/app/bin --env ENV=DEVELOP -e CONFIG_URL=/usr/src/app/bin/config.json -e PORT=8888 your_image_name  /bin/bash</code>
    </li>
    <li>
        <p>step 2: </p>
        <p> Run the example </p>
        <p>After entering the container, cd /usr/src/app/bin, and run</p>
        <code>supervisor -w ../src -spid /var/tmp/icp.pid  sh dev_start.sh</code>
        <p>note: /var/temp/icp.pid is the value of the key easynode.app.id in the file etc/EasyNode.conf, The hot loader willn't work if you have not config the key.</p>
    </li>
    <li>
        <p>step 3: </p>
        <p> Debug the front-end code </p>
        <code>cd plugins;  webpack -w & mcss mcss/index.mcss -o css/ -w</code>
    </li>
</ul>