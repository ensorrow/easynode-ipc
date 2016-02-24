import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


import '../es5-shim.min.js';
var ReactUI = require('../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;

import ProgressBar from './ProgressBar.jsx';

let NotMatch = React.createClass({
    render: function () {
        return (
        <div>
            <p>Can't find route </p>
       </div>
        );
    }
});


module.exports = NotMatch;