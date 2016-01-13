import  '../../css/index.css';
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

import regions from '../constants/region.zh.js';

let P_INDEX = 1;
let C_INDEX = 2;
let A_INDEX = 3;

let MySelect = React.createClass({
    propTypes:{
        items: React.PropTypes.object.isRequired,
        index: React.PropTypes.number.isRequired,
        province: React.PropTypes.string.isRequired,
        city: React.PropTypes.string.isRequired,
        area: React.PropTypes.string.isRequired
    },

    _handleChange: function(e){
        e.preventDefault();
        var value = e.target.value;

        var onChange = this.props.onChange;
        onChange && onChange(this.index, value);

    },
    render(){
        let index = this.props.index;
        let items = this.props.items;
        if( index == P_INDEX ){
            items = this.props.items.p;
        }else if( index == C_INDEX){
            items = this.props.items.c[this.props.province];
        }else if( index == A_INDEX){
            if( this.props.city.length <= 0 ){
                items = [];
            }
            else{
                items = this.props.items.a[this.props.province + '-' + this.props.city];
            }
        }
        if( items === undefined ){
            items = [];
        }
        this.index = index;
        return (
            <select data-order={index} onChange={this._handleChange} className="item-ctrl-three">
                {
                    items.map((name,i)=> {
                        return (<option key={i} value={name}>{name}</option>);
                    })
                }
            </select>
        );
    }
});


let CascadeSelect = React.createClass({

    getInitialState: function(){
        return {
            province: '',
            city: '',
            area: ''
        }
    },

    componentWillMount: function(){
        this.setState({

        });
    },


    render: function () {
        return (
            <div>
                {this.renderMySelects()}
            </div>
        );
    },
    _onChange: function(index, value){
        var onChange = this.props.onChange;

         if( index == P_INDEX ) {
             this.setState({
                 province:value
             });
             onChange && onChange(value,'','');
         }else if( index == C_INDEX ){
             this.setState({
                 city: value
             });
             onChange && onChange(this.state.province,value,'');
         }else if( index == A_INDEX ){
             this.setState({
                 area: value
             });
             onChange && onChange(this.state.province,this.state.city,value);
         }

    },

    renderMySelects(){

            return (
                <div className="item-ctrl">
                    <MySelect key={P_INDEX} items={this.getRegions()} onChange={this._onChange}
                              province={this.state.province} city={this.state.city} area={this.state.area} index={P_INDEX}/>
                    <MySelect key={C_INDEX} items={this.getRegions()} onChange={this._onChange}
                              province={this.state.province} city={this.state.city} area={this.state.area} index={C_INDEX}/>
                    <MySelect key={A_INDEX} items={this.getRegions()} onChange={this._onChange}
                              province={this.state.province} city={this.state.city} area={this.state.area} index={A_INDEX}/>
                    <span className="u-popover hidden">a</span>
                </div>
            );
    },

    getRegions(){
        return regions;
    }

});

module.exports = CascadeSelect;
