import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import regions from '../constants/region.zh.js';

let P_INDEX = 1;
let C_INDEX = 2;
let A_INDEX = 3;

let MySelect = React.createClass({
    propTypes:{
        items: React.PropTypes.array.isRequired,
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
        var value = '';

        if( index == P_INDEX ){
            value = this.props.province;
        }else if( index == C_INDEX){
            value = this.props.city;
        }else if( index == A_INDEX){
            value = this.props.area;
        }
        this.index = index;//must
        var name = this.index == 1 ?  "p" :
                this.index == 2 ?  "c" :
                this.index == 3 ?  "a" : "p";
        return (
            <select data-order={index} name={name} onChange={this._handleChange} className="item-ctrl-three" value={value}>
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

    propTypes:{
        province: React.PropTypes.string.isRequired,
        city: React.PropTypes.string.isRequired,
        area: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        return {province:'',city:'',area:''};
    },

    componentWillMount: function(){
        this.setState({
            province:this.props.province,
            city:this.props.city,
            area:this.props.area
        });
    },


    render: function () {
        return (
            <div>
                {this.renderMySelects()}
            </div>
        );
    },
    _onChange: function(index, value, p){
        var onChange = this.props.onChange;

         if( index == P_INDEX ) {
             this.setState({
                 province: value
             });

             this._onChange( C_INDEX, this.getCities(value)[0],value);
             onChange && onChange(value,'','');
         }else if( index == C_INDEX ){
             this.setState({
                 city: value
             });
             this._onChange( A_INDEX, this.getAreas(p||this.state.province, value)[0]);
             onChange && onChange(this.state.province,value,'');
         }else if( index == A_INDEX ){
             this.setState({
                 area: value
             });
             onChange && onChange(this.state.province,this.state.city,value);
         }
    },

    renderMySelects(){
            var provinces = this.getProvinces();
            var cities  = this.getCities(this.state.province);
            var areas = this.getAreas(this.state.province,this.state.city);

            var area = null;
            if( this.hasArea(this.state.province) ){
                area =
                    <MySelect key={A_INDEX} items={areas} onChange={this._onChange}
                                 province={this.props.province} city={this.props.city} area={this.props.area} index={A_INDEX}/>
                ;
            }
            return (
                <div className="item-ctrl">
                    <MySelect key={P_INDEX} items={provinces} onChange={this._onChange}
                              province={this.props.province} city={this.props.city} area={this.props.area} index={P_INDEX}/>
                    <MySelect key={C_INDEX} items={cities} onChange={this._onChange}
                              province={this.props.province} city={this.props.city} area={this.props.area} index={C_INDEX}/>
                    {area}
                    <span className="u-popover hidden">a</span>
                </div>
            );
    },

    getRegions(){
        return regions;
    },
    getProvinces(){
        return regions.p;
    },
    getCities(p){
        return regions.c[p] || [];
    },
    getAreas(p,c){
        return regions.a[p + '-' + c] || [];
    },
    hasArea(p){
        return !regions.s[p];
    }
});

module.exports = CascadeSelect;
