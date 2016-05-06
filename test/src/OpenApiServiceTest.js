/**
 * Created by hujiabao on 9/21/15.
 */

'use strict';

import co from 'co';
import chai from 'chai';
import request from 'superagent';

const assert = chai.assert;


require('easynode');

EasyNode.addArg('easynode-home',process.cwd());
EasyNode.addSourceDirectory('/node_modules/easynode/src');


const logger = using('easynode.framework.Logger').getLogger();

var openapic = {
    "app_key": "daaf3fdb307f4a38844211325116b72c",
    "app_secret": "bc12d62d47344a31b3c21a8693e2498d"
};

var url = "https://open.c.163.com";
var token = {};
var image = {};
describe('OpenApiServiceTest',function() {

    before(function(done){
        console.log("OpenApiServiceTest before");
        try{
            done();
        }catch(e){
            done(e);
        }
    });

    it('generate api token',function (done){
        request.post(url+'/api/v1/token')
            .send(openapic)
            .accept('json')
            .end(function(err, res){
                // Do something
                //{"token":"6ffc416758d4410fba78fa39120d9bb6","expires_in":86400}
                token = JSON.parse(res.text);
                console.log(token.token);
                done();
            });
    });



     it('get images list',function (done){
        request.get(url+'/api/v1/repositories')
            .send({limit:20,offset:0})
            .set('Authorization', 'Token ' + token.token)
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                image = json.repositories[0];
                console.log(res.text);
                console.log(image);
                done();
            });
    });

    it('get image\'s tags list',function (done){
        request.get(url+'/api/v1/repositories/424')
            .set('Authorization', 'Token ' + token.token)
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                console.log(res.text);
                done();
            });
    });

    /*
        it('create image\'s tag',function (done){
            request.post(url+'/api/v1/repositories/icp/tags/0.0.36/actions/build')
                .set('Authorization', 'Token ' + token.token)
                .send({repo_name:'icp','tag':'0.0.36'})
                .attach('docker_file','/Users/hujiabao/workspace_docker/icp/easynode-ipc/Dockerfile')
                .accept('json')
                .end(function(err, res){
                    // Do something
                    console.log(res.ok);
                    console.log(res.text);
                    done();
                });
        });*/

    /* var tags = {"tags":[{"name":"0.0.35","size":0,"status":2},{"name":"0.0.34","size":0,"status":2},{"name":"0.0.33","size":0,"status":2},{"name":"0.0.32","size":0,"status":2},{"name":"0.0.31","size":0,"status":2},{"name":"0.0.30","size":0,"status":2},{"name":"0.0.29","size":0,"status":2},{"name":"0.0.28","size":0,"status":2},{"name":"0.0.27","size":0,"status":2},{"name":"0.0.26","size":0,"status":2},{"name":"0.0.25","size":0,"status":2},{"name":"0.0.24","size":0,"status":2},{"name":"0.0.23","size":0,"status":2},{"name":"0.0.21","size":0,"status":2},{"name":"0.0.20","size":0,"status":2},{"name":"0.0.19","size":0,"status":2},{"name":"0.0.16","size":0,"status":2},{"name":"0.0.15","size":0,"status":2},{"name":"0.0.14","size":0,"status":2},{"name":"0.0.13","size":0,"status":2},{"name":"0.0.12","size":0,"status":2},{"name":"0.0.11","size":0,"status":2},{"name":"0.0.10","size":0,"status":2},{"name":"0.0.9","size":0,"status":2},{"name":"0.0.8","size":0,"status":2},{"name":"0.0.7","size":0,"status":2},{"name":"0.0.4","size":838386207,"status":2},{"name":"0.0.3","size":841825961,"status":2},{"name":"0.0.6","size":0,"status":2},{"name":"0.0.5","size":855271019,"status":2}],"repo_id":424,"user_name":"hujb2000","repo_name":"icp","open_level":0,"base_desc":null,"detail_desc":null,"tag_count":30,"download_url":"hub.c.163.com/hujb2000/icp:0.0.35","created_at":"2016-01-28T17:50:45Z","updated_at":"2016-05-06T01:51:29Z"};

         tags.tags.forEach((cur,index)=>{
         it('delete image\'s tags',function (done){
             console.log(cur);

             request.delete(url+`/api/v1/repositories/icp/tags/${cur.name}`)
                 .set('Authorization', 'Token ' + token.token)
                 .accept('json')
                 .end(function(err, res){
                     // Do something
                     //var json = JSON.parse(res.text);
                     console.log(res.text);
                     done();
                 });
         });
     })
 */

   /* it('get contains list',function (done){
        request.get(url+'/api/v1/containers')
            .send({limit:20,offset:0})
            .set('Authorization', 'Token ' + token.token)
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                console.log(res.text);
                done();
            });
    });
*/

    it('get apps list',function (done){
        request.get(url+'/api/v1/apps')
            .send({limit:20,offset:0})
            .set('Authorization', 'Token ' + token.token)
            .set('Content-Type','application/json;charset=utf-8')
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                console.log(res.text);
                done();
            });
    });

    //icp4=92405  icp2=92399
    it('get app detail',function (done){
        request.get(url+'/api/v1/apps/92405')
            .set('Authorization', 'Token ' + token.token)
            .accept('json')
            .end(function(err, res){
                // Do something
                var json = JSON.parse(res.text);
                console.log(res.text);
                done();
            });
    });

    it('resize replicas',function (done){
        request.put(url+'/api/v1/apps/92399/replications/2/actions/resize')
            .set('Authorization', 'Token ' + token.token)
            .accept('json')
            .end(function(err, res){
                // Do something
                console.log(res.ok);
                console.log(res.text);
                done();
            });
    });

    var newapp = {
        "name": "icp3",
        "desc": "",
        "domain": "",
        "image_type": 2,
        "image_id": 29047,
        "spec_id": 10,
        "replicas": 1,
        "env_var": {
            "ENV": "PRODUCTION",
            "PORT": "81",
            "CONFIG_URL": "http://apollodev.nos.netease.com/146192995136214606349336371459339304947"
        },
        "version_control": {
            "type": "git",
            "path": "",
            "subdir": "",
            "branch": "master",
            "version": "",
            "account": "",
            "password": ""
        },
        "docker_file_type":2,
        "custom_docker_file": "",
        "use_load_balance": 1,
        "load_balance": {
            "bandwidth": 1,
            "port_map": [
                {
                    "protocol": "HTTP",
                    "source_port": 80,
                    "destination_port": 81
                }
            ],
            "charge_type": 1
        },
        "log_dirs":[]
    };

    it('create new app',function (done){
        request.post(url+'/api/v1/apps')
            .set('Authorization', 'Token ' + token.token)
            .set('Content-Type','application/json;charset=utf-8')
            .send(newapp)
            .accept('json')
            .end(function(err, res){
                // Do something
                console.log(res.ok);
                console.log(res.text);
                done();
            });
    });

    //icp4 hook:
    //icp2 hook: https://open.c.163.com/api/v1/hooks/app/5a560695727647cbb0a10eceb4964a40
    after(function(done){
        console.log("OpenApiServiceTest after");
        done();

    });

});
