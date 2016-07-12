import auth from './utils/auth';
import Global from './utils/globals';
import App from './App.jsx';
import BaseInfo from './forms/BaseInfo.jsx';
import CompanyInfo from './forms/CompanyInfo.jsx';
import SiteInfo from './forms/SiteInfo.jsx';
import UploadMaterial from './forms/UploadMaterial.jsx';
import SubmitTrialSuccess from './forms/SubmitTrialSuccess';
import RecordList from './forms/RecordList.jsx';
import RecordInfo from './forms/RecordInfo.jsx';
import SubmitCheckSuccess from './forms/SubmitCheckSuccess';
import UploadPhoto from './forms/UploadPhoto.jsx';
import Help from './forms/Help.jsx';
import Login from './forms/Login.jsx';
import CheckTrialNoPass from './forms/status/CheckTrialNoPass.jsx';
import CheckTrialPass from './forms/status/CheckTrialPass.jsx';
import CheckPhotoNoPass from './forms/status/CheckPhotoNoPass.jsx';
import CheckPhotoPass from './forms/status/CheckPhotoPass.jsx';
import CheckCouncilPass from './forms/status/CheckCouncilPass.jsx';
import CheckCouncilNoPass from './forms/status/CheckCouncilNoPass.jsx';


function redirectToLogin (nextState, replaceState) {
    if(!auth.loggedIn()) {
        replaceState({nextPathname:nextState.location.pathname}, '/login');
    }
}


function redirectToHome (nextState, replaceState) {
    if(auth.loggedIn()) {
        replaceState(null, '/');
    }
}

export default{
    component: App,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, cb) => {
                if(!auth.loggedIn()) {
                    return require.ensure([], (require)=>{
                        cb(null, Login);
                    });
                }
                return require.ensure([], (require) =>{
                    if( _g.user && _g.user.recordnumber > 0 ) {
                        require.ensure([], (require2) => {
                            cb(null, RecordList);
                        });
                    } else {
                        cb(null, BaseInfo);
                    }
                });
            }
        },
        {
            path:'/help',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, Help);
                });
            }
        },
        {
            path:'/exit',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    auth.logout();
                    cb(null, Login);
                });
            }
        },
        {
            path:'/modify',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, BaseInfo);
                });
            }
        },
        {
            path:'/detail',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CompanyInfo);
                });
            }
        },
        {
            path:'/checkresulttrialnopass',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CheckTrialNoPass);
                });
            }
        },
        {
            path:'/checkresulttrialpass',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CheckTrialPass);
                });
            }
        },
        {
            path:'/checkresultphotonopass',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CheckPhotoNoPass);
                });
            }
        },
        {
            path:'/checkresultphotopass',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CheckPhotoPass);
                });
            }
        },
        {
            path:'/checkresultcouncilpass',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CheckCouncilPass);
                });
            }
        },
        {
            path:'/checkresultcouncilnopass',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CheckCouncilNoPass);
                });
            }
        },
        {
            path:'/delete',
            getComponent: (location, cb) => {

                require.ensure([], (require) => {
                    // ToDo ,execute delete operation
                    // cb(null,require('./forms/CompanyInfo.jsx'));
                });
            }
        },
        {
            path:'/fillcompanyinfo',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CompanyInfo);
                });
            }
        },
        {
            path:'/savetodraft',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, CompanyInfo);
                });
            }
        },
        {
            path:'/returntobase',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, BaseInfo);
                });
            }
        },
        {
            path:'/fillsiteinfo',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, SiteInfo);
                });
            }
        },
        {
            path:'/uploadmaterial',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, UploadMaterial);
                });
            }
        },
        {
            path:'/submittrialsuccess',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, SubmitTrialSuccess);
                });
            }
        },
        {
            path:'/submitchecksuccess',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, SubmitCheckSuccess);
                });
            }
        },
        {
            path:'/reviewrecorddetail',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, RecordInfo);
                });
            }
        },
        {
            path:'/recordlist',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, RecordList);
                });
            }
        },
        {
            path:'/uploadphoto',
            getComponent: (location, cb) => {
                require.ensure([], (require) => {
                    cb(null, UploadPhoto);
                });
            }
        }
    ]
};


