import  '../../css/global.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


require('../es5-shim.min.js');
var ReactUI = require('../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;
var Table = ReactUI.Table;
var Filter = ReactUI.Filter;
var Pagination = ReactUI.Pagination;

const headerArr = [
    { name: 'name', sortAble: false, header: 'Name' }
];

let datas = ['Tokyo', 'Singapore', 'New York', 'London', 'San Francisco'] ;


let RecordList = React.createClass({
    render: function () {
        return (
            <div>
            </div>
        );
    }
});


module.exports = RecordList;