import  '../css/global.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import BaseInfo from './forms/BaseInfo';
import CompanyInfo from './forms/CompanyInfo';
import SiteInfo from './forms/SiteInfo';
import UploadMaterial from './forms/UploadMaterial';
import SubmitTrialSuccess from './forms/SubmitTrialSuccess'
import RecordList from './forms/RecordList';
import RecordInfo from './forms/RecordInfo';
import ApplyCurtain from './forms/ApplyCurtain';
import SubmitCheckSuccess from './forms/SubmitCheckSuccess';
import UploadPhoto from './forms/UploadPhoto.jsx';

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Header/>
                <UploadPhoto/>
                <Footer/>
            </div>
        );
    }
});


module.exports = App;