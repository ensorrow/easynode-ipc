import '../../css/index.css';
import React from 'react';
import ProgressBar from './ProgressBar.jsx';

let NotMatch = React.createClass({
    render: function () {
        return (
        <div>
            <p>Can't find route </p>
       </div>
        );
    }
});


module.exports = NotMatch;

