'use strict';


import Utility from '../js/utils/Utility';
import assigner from 'object.assign';
var assign = assigner.getPolyfill();


var target = { a: true };
var source1 = { b: true };
var source2 = { c: true };
var sourceN = { n: true };

var expected = {
    a: true,
    b: true,
    c: true,
    n: true
};

assign(target, source1, source2, sourceN);

console.log(target);

var arr = Utility.parsePTag("<p>aa</p><p>bbb</p>");
console.log(arr);