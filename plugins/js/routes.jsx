import auth from './utils/auth';
import Global from './utils/globals';
import App from './App.jsx';
import BaseInfo from './forms/BaseInfo';
import CompanyInfo from './forms/CompanyInfo.jsx';
import SiteInfo from './forms/SiteInfo.jsx';
import UploadMaterial from './forms/UploadMaterial.jsx';
import SubmitTrialSuccess from './forms/SubmitTrialSuccess'
import RecordList from './forms/RecordList.jsx';
import RecordInfo from './forms/RecordInfo.jsx';
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
                console.log("index")
                if(!auth.loggedIn()){
                    return require.ensure([],(require)=>{
                            cb(null,require('./forms/Login.jsx'))
                        });
                }
                return require.ensure([],(require) =>{
                    if( __globals__.user && __globals__.user.recordnumber > 0 ) {
                        require.ensure([],(require) => {
                            cb(null,require('./forms/RecordList.jsx'));
                        });
                    } else {
                        cb(null,require('./forms/BaseInfo' +
                        ''));
                    }
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
                    auth.logout();
                    cb(null,require('./forms/Login.jsx'));
                });
            }
        },
        {
            path:'/modify',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/BaseInfo'));
                });
            }
        },
        {
            path:'/detail',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/CompanyInfo.jsx'));
                });
            }
        },
        {
            path:'/checkresulttrialnopass',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/status/CheckTrialNoPass.jsx'));
                });
            }
        },
        {
            path:'/checkresulttrialpass',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/status/CheckTrialPass.jsx'));
                });
            }
        },
        {
            path:'/checkresultphotonopass',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/status/CheckPhotoNoPass.jsx'));
                });
            }
        },
        {
            path:'/checkresultphotopass',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/status/CheckPhotoPass.jsx'));
                });
            }
        },
        {
            path:'/checkresultcouncilpass',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/status/CheckCouncilPass.jsx'));
                });
            }
        },
        {
            path:'/checkresultcouncilnopass',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/status/CheckCouncilNoPass.jsx'));
                });
            }
        },
        {
            path:'/delete',
            getComponent: (location,cb) => {

                require.ensure([],(require) => {
                    //ToDo ,execute delete operation
                    //cb(null,require('./forms/CompanyInfo.jsx'));
                });
            }
        },
        {
            path:'/fillcompanyinfo',
                getComponent: (location,cb) => {
                    var a = Global.get('global');
                    if (a.hasOwnProperty('companyinfo.jsx') ){
                        __globals__ = a;
                    }
                    require.ensure([],(require) => {
                        cb(null,require('./forms/CompanyInfo.jsx'));
                });
            }
        },
        {
            path:'/savetodraft',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/CompanyInfo.jsx'));
                });
            }
        },
        {
            path:'/returntobase',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo.jsx') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/BaseInfo'));
                });
            }
        },
        {
            path:'/fillsiteinfo',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo.jsx') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/SiteInfo.jsx'));
                });
            }
        },
        {
            path:'/uploadmaterial',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/UploadMaterial.jsx'));
                });
            }
        },
        {
            path:'/submittrialsuccess',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/SubmitTrialSuccess'));
                });
            }
        },
        {
            path:'/submitchecksuccess',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/SubmitCheckSuccess'));
                });
            }
        },
        {
            path:'/reviewrecorddetail',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/RecordInfo.jsx'));
                });
            }
        },
        {
            path:'/recordlist',
            getComponent: (location,cb) => {
                require.ensure([],(require) => {
                    cb(null,require('./forms/RecordList.jsx'));
                });
            }
        },
        {
            path:'/uploadphoto',
            getComponent: (location,cb) => {
                var a = Global.get('global');
                if (a.hasOwnProperty('companyinfo') ){
                    __globals__ = a;
                }
                require.ensure([],(require) => {
                    cb(null,require('./forms/UploadPhoto.jsx'));
                });
            }
        }
    ]
}
