webpackJsonp([4],{

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(213);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(159);
	
	var _reactRouter = __webpack_require__(160);
	
	var _Utility = __webpack_require__(246);
	
	var _Utility2 = _interopRequireDefault(_Utility);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var CheckPhotoNoPass = _react2["default"].createClass({
	    displayName: 'CheckPhotoNoPass',
	
	    render: function render() {
	
	        var reasons = [];
	        if (__globals__.record.hasOwnProperty('reasons')) {
	            var arr = _Utility2["default"].parsePTag(__globals__.record.reasons);
	            arr.forEach(function (v, i) {
	                reasons.push(_react2["default"].createElement(
	                    'p',
	                    { className: 'tip-bd', key: i },
	                    i + 1,
	                    '、',
	                    v.replace(/<p>|<\/p>/g, "")
	                ));
	            });
	        }
	
	        return _react2["default"].createElement(
	            'div',
	            { className: 'm-checkphotonopass' },
	            _react2["default"].createElement(
	                'div',
	                { className: 'tip-label' },
	                _react2["default"].createElement('img', { src: '../assets/icon-err.png', alt: '', className: 'tip-icon' })
	            ),
	            _react2["default"].createElement(
	                'div',
	                { className: 'tip' },
	                _react2["default"].createElement(
	                    'p',
	                    { className: 'tip-header' },
	                    '照片审核未通过，请根据下列提示信息，修改备案申请！'
	                ),
	                reasons
	            )
	        );
	    }
	});
	
	module.exports = CheckPhotoNoPass;

/***/ }

});
//# sourceMappingURL=bundle.js.map