import '../../css/index.css';
import React from 'react';

let data = [
	{step:1, describe:'基本信息'},
	{step:2, describe:'填写主体信息'},
	{step:3, describe:'填写网站信息'},
	{step:4, describe:'上传资料'},
	{step:5, describe:'提交审核'}
];

let ProgressBar = React.createClass({

  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  render: function () {
    let step = this.props.step;
	var me = this;
	var stepsList = data.map(function (item, i) {
		return (
			<li key={i}>
				<div className="f-fl">
				<div className={step < item.step ? 'step do' : step == item.step ? 'step doing' : 'step done' }>{item.step}</div>
				<span className="describe">{item.describe}</span>
				</div>
				<div className="f-fl arrow">
				</div>
			</li>
		);
	});

	return (
	<div className="m-progress">
		<ul className="m-progress-ul">
		{stepsList}
		</ul>
	</div>
	);
  }
});


module.exports = ProgressBar;

