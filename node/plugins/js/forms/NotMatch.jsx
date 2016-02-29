import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
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