webpackJsonp([3],{

/***/ 268:
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
	
	var CheckTrialPass = _react2["default"].createClass({
	    displayName: 'CheckTrialPass',
	
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
	            { className: 'm-checktrialpass' },
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
	                    '备案信息初审已通过，请点击列表中的上传照片，完成后续步骤！'
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
	                )
	            )
	        );
	    }
	});
	
	module.exports = CheckTrialPass;

/***/ }

});
//# sourceMappingURL=bundle.js.map