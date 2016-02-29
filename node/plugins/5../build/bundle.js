webpackJsonp([5],{

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(213);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(159);
	
	var _reactRouter = __webpack_require__(160);
	
	var _DataService = __webpack_require__(233);
	
	var _DataService2 = _interopRequireDefault(_DataService);
	
	var _globals = __webpack_require__(211);
	
	var _globals2 = _interopRequireDefault(_globals);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var CheckPhotoPass = _react2["default"].createClass({
	    displayName: 'CheckPhotoPass',
	
	    handleSubmit: function handleSubmit(e) {
	        e.preventDefault();
	
	        _DataService2["default"].getRecord(__globals__.record.id || 0, function () {
	            _globals2["default"].set('global', __globals__);
	            location.href = "#/reviewrecorddetail";
	        }, function (err) {
	            console.log("getRecord err");
	            console.log(err);
	        });
	    },
	    render: function render() {
	        var code = '';
	        if (__globals__.record && __globals__.record.code) {
	            code = __globals__.record.code;
	        }
	
	        return _react2["default"].createElement(
	            'div',
	            { className: 'm-checkphotopass' },
	            _react2["default"].createElement(
	                'div',
	                { className: 'tip-label' },
	                _react2["default"].createElement('img', { src: '../assets/selected.png', alt: '', className: 'tip-icon' })
	            ),
	            _react2["default"].createElement(
	                'div',
	                { className: 'tip' },
	                _react2["default"].createElement(
	                    'p',
	                    { className: 'tip-header' },
	                    '照片审核已通过，将在1个工作日内将您的备案信息提交至省通信管理局审核！'
	                ),
	                _react2["default"].createElement(
	                    'div',
	                    null,
	                    _react2["default"].createElement(
	                        'p',
	                        { className: 'tip-bd' },
	                        '备案订单号: ',
	                        code,
	                        ' '
	                    ),
	                    _react2["default"].createElement(
	                        'button',
	                        { className: 'tip-button-detail', type: 'button', onClick: this.handleSubmit },
	                        ' 查看备案详请 '
	                    )
	                ),
	                _react2["default"].createElement(
	                    'div',
	                    null,
	                    _react2["default"].createElement(
	                        'p',
	                        { className: 'tip-footer' },
	                        '省通信管理局审核通过后将生成备案号和备案密码。并邮件发送给您，请及时查收邮件。'
	                    )
	                )
	            )
	        );
	    }
	});
	
	module.exports = CheckPhotoPass;

/***/ }

});
//# sourceMappingURL=bundle.js.map