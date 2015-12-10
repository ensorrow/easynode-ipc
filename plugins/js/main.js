/**
 * Created by hujiabao on 12/8/15.
 */

const React = require('react');
const ReactDOM = require('react-dom');

var style = require('../css/main.css');

var img1 = document.createElement('img');
img1.src = require("../assets/small.png");

document.getElementById('content').appendChild(img1);
//document.body.appendChild(img1);


var img2 = document.createElement('img');
img2.src = require("../assets/big.png");


//document.body.appendChild(img2);

document.getElementById('content').appendChild(img2);

ReactDOM.render(
    <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className="h2">Hello Webpack</h2>
    </div>,
    document.getElementById('content')
);

