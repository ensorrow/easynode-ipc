webpackJsonp([1],{

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(213);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(159);
	
	var _reactRouter = __webpack_require__(160);
	
	var _ProgressBar = __webpack_require__(229);
	
	var _ProgressBar2 = _interopRequireDefault(_ProgressBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var Help = _react2["default"].createClass({
	    displayName: 'Help',
	
	    render: function render() {
	        return _react2["default"].createElement(
	            'div',
	            { className: 'm-help' },
	            _react2["default"].createElement(
	                'h1',
	                null,
	                'ICP备案系统帮助文档'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '1. 引言'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '1.1. 文档范围'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '本文档是网易蜂巢ICP备案系统帮助文档，便于用户进行快速查看ICP备案相关资料，了解网易蜂巢ICP备案流程和解答常见问题。'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '1.2. 读者对象'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '本文档的读者对象网易蜂巢全体用户。'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '1.3. 术语'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '术语 描述'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                'ICP 因特网内容提供商英文全称为 Internet Content Provider 简写为ICP'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '接入商 IDC服务商，比如网易蜂巢。'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '通管局 通信管理局。省级单位都设有通管局，通管局是属于工信部直属的单位。目前经营论坛、视频网站等互联网需要获得专项备案，可以到当地通管局办理。'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '首次备案 域名未备案，备案主体证件无备案号，需要备案。未备案域名的网站在申请备案期间需要关闭，否则备案无法通过管局审核。'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '新增网站 主体已经备过案，需要再给其它网站备案。'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '新增接入 域名在别的接入商备案过，需要变更接入商。已经通过备案域名的网站可以在域名备案转入的期间正常开放。'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '变更备案 已经在网易蜂巢备过案，需要修改之前备案中的内容。'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '2. 网易蜂巢ICP备案须知'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '2.1. 备案简介'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '为了规范互联网信息服务活动，促进互联网信息服务健康有序发展，根据国务院令第292号《互联网信息服务管理办法》和工信部令第33号《非经营性互联网信息服务备案管理办法》规定，国家对经营性互联网信息服务实行许可制度，对非经营性互联网信息服务实行备案制度。未取得许可或者未履行备案手续的，不得从事互联网信息服务，否则就属于违法行为。工信部官方备案网站为：http://www.miitbeian.gov.cn'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '网易蜂巢已经完成IDC资质的申请，可以作为接入商接受用户网站备案申请，网易蜂巢ICP备案系统方便用户申请ICP备案，更好的管理用户备案信息。'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '2.2. 备案类型'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '目前网易蜂巢支持以下三种类型的备案申请：'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '首次备案、新增网站、新增接入'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '目前还不支持变更备案。'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '2.3. 备案对象'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '根据中国大陆工信部的规定，所有在大陆境内运行的服务都必须进行 ICP 备案。只要在互联网能访问并且使用公网IP地址的域名都需要备案。如果网站不备案，很有可能被查处以后关停。如果使用网易蜂巢来做开发、测试、Mobile Apps 后端、数据库、文件存储等，都无需备案。顶级域名备案过，二级域名无需备案。'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                'BBS、Blog 划归为交互式网站，目前个人已经无法备案了。企业可以备案，但需要相应的前置审批，具体政策法规请查询工信部备案管理网站。'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '相关的具体政策及细则，请参阅工信部备案管理系统。'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '2.4. 备案流程'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '首先选择备案类型和备案区域，然后填写主体信息、网站信息等相关信息，提交给网易蜂巢初审。初审通过后，再拍照邮寄核验单等资料给 IDC和通管局审核。具体时间跟各省的通管局审核有关，一般在20个工作日左右完成，备案通过或拒绝会有短信及邮件通知。'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '2.5. 注意事项'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '网站备案是网站正式发布使用前必须完成的步骤。为了确保用户能尽快完成这一工作，并确保网站后期不受备案影响，需要注意以下几点：'
	            ),
	            _react2["default"].createElement(
	                'h4',
	                null,
	                '2.5.1. 预留充裕的时间'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '新申请备案工作涉及到用户资料筹备、网上提交、现场拍照核验、纸质资料快递、网易蜂巢初审、通信管理局审核等较多环节，耗时较长。网易蜂巢力求将备案服务环节做到最好，从备案各环节降低用户时间，加快备案进度。但对整体备案进度造成影响的因素仍有较多，包括资料准确度、资料完整度、用户配合时间以及通信管理局审批进度等，从用户筹备到最终通信管理局发放备案许可证编号，可能需要20个工作日或更长时间。个别用户还可能因为资料问题造成多次修改提交，从而导致时间进一步延长。因此，对于需要新申请备案的用户，还请预留出充裕的时间完成该项工作。'
	            ),
	            _react2["default"].createElement(
	                'h4',
	                null,
	                '2.5.2. 准备好所需材料'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '为了顺利完成备案工作，需要您仔细阅读备案相关帮助文档，确认所适用的备案类型及相关所需资料，并按照文档说明，仔细进行各步骤的工作，避免出现信息纰漏，从而造成备案时间延误。'
	            ),
	            _react2["default"].createElement(
	                'h4',
	                null,
	                '2.5.3. 确保信息真实有效'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '网站备案是依据国家法律法规所进行的行政性质工作，真实有效的备案信息是依法完成备案工作的最基本要求。因此，网站所有者必须确保所提交信息完全属实，不得留存错误的电话号码、电子邮箱等联系信息，更不能盗用他人或伪造有效证件，否则一经发现，在不予备案、封禁网站的基础上，还将纳入工信部备案系统黑名单，其网站域名和所有者将终生不得备案。'
	            ),
	            _react2["default"].createElement(
	                'h4',
	                null,
	                '2.5.4. 确保联系方式畅通'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '作为保障备案信息真实性的一个举措，通信管理局会在备案期间进行电话抽查确认，如届时多次无法联系到网站主办者或负责人（如拨打时出现无应答、占线、无法接通等情形），则会造成信息核验无效，从而造成备案失败。因此，用户所提交的联系方式信息，一定是可及时联络到的、常用的方式，如手机、邮箱或固话等。如备案后这些信息发生变更，还需及时进行备案信息变更操作。'
	            ),
	            _react2["default"].createElement(
	                'h4',
	                null,
	                '2.5.5. 请勿随意变更备案内容'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '因备案信息中是需要指明对应使用产品的IP的，也就是只有备案信息中添加过的网站域名、对应IP以及网站内容是被许可使用的，因此备案期间一定要保证勿动域名和网站内容信息，如变更域名解析到其他IP，或更换已备案的网站内容，造成与登记的信息不符，都将可能造成备案失败。'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '2.6. 备案政策'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '工业与信息化部官网'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '《互联网信息服务管理办法》'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '《非经营性互联网信息服务备案管理办法》'
	            ),
	            _react2["default"].createElement(
	                'h2',
	                null,
	                '3. 备案FAQ'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '3.1. 什么样的网站需要ICP备案？'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '根据国家规定，只要网站所使用的服务器是在中国大陆境内，就需要到有关部门进行备案登记，凡是指向该网站的域名都必须登记，没有备案登记的域名是不能访问网站的。特别的，如网站没有域名，直接使用IP访问，则该IP同样需要备案。'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '3.2. 网站备案期间可以访问吗？'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '没有备案的域名是不允许上线访问的。需确认您的域名是打不开的，再做备案操作。同时网易蜂巢会对未备案域名进行主动阻断拦截，即使您做了域名指向和相关绑定，也将无法打开。因此，新域名备案需要预留出不能访问的一段时间，需要您提前做好预备工作。'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '3.3. 网易蜂巢会拦截未备案IP的80和443端口吗？'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '网易蜂巢会扫描未备案的IP的80端口和443端口，并加以拦截。'
	            ),
	            _react2["default"].createElement(
	                'h3',
	                null,
	                '3.4. 网易蜂巢的机房在哪里？'
	            ),
	            _react2["default"].createElement(
	                'p',
	                null,
	                '杭州，我们会陆续增加其他地区的IDC机房'
	            )
	        );
	    }
	});
	
	module.exports = Help;

/***/ }

});
//# sourceMappingURL=bundle.js.map