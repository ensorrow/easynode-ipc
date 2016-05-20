import co from 'co';

var func = function *(){
    return true;
}

co(function * () {

    var ret = yield  func();
    console.log(ret);


});