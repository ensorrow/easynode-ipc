import auth from './utils/auth';

import App from './App';

import BaseInfo from './forms/BaseInfo';
import CompanyInfo from './forms/CompanyInfo';
import SiteInfo from './forms/SiteInfo';
import UploadMaterial from './forms/UploadMaterial';
import SubmitTrialSuccess from './forms/SubmitTrialSuccess'
import RecordList from './forms/RecordList.jsx';
import RecordInfo from './forms/RecordInfo';
import ApplyCurtain from './forms/ApplyCurtain';
import SubmitCheckSuccess from './forms/SubmitCheckSuccess';
import UploadPhoto from './forms/UploadPhoto.jsx';


function redirectToLogin(nextState, replaceState){
    if(!auth.loggedIn()){
        replaceState({nextPathname:nextState.location.pathname},'/login');
    }
}

function redirectToHome(nextState,replaceState){
    if(auth.loggedIn()){
        replaceState(null,'/');
    }
}

export default{
    component: App,
    childRoutes: [
        {
            path: '/',
            getComponent: (location,cb) => {
                if(!auth.loggedIn()){
                    console.log("loggedIn ");
                    return require.ensure([],(require)=>{
                            cb(null,require('./Footer'));
                        });
                }
                return require.ensure([],(require) =>{
                    cb(null,require('./forms/RecordList.jsx' +
                        ''));
                })
            }
        },
        {
            path:'/help',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/Help.jsx'));
                });
            }
        },
        {
            path:'/exit',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/UploadMaterial'));
                });
            }
        },
        {
            path:'/modify',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/UploadMaterial'));
                });
            }
        },
        {
            path:'/detail',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/CompanyInfo'));
                });
            }
        },
        {
            path:'/checkresult',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/CompanyInfo'));
                });
            }
        },
        {
            path:'/delete',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/CompanyInfo'));
                });
            }
        }
    ]
}