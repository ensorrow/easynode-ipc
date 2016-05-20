import '../../css/index.css';
import React from 'react';


let ViewPhoto = React.createClass({
    propTypes:{
        url: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
        };
    },
    componentDidMount: function () {
        document.body.style.overflow = 'hidden';
    },
    handleClose: function () {
        var onHidden = this.props.onHidden;
        onHidden && onHidden();
        document.body.style.overflow = 'scroll';
    },
    handleDoubleClick: function () {
        this.handleClose();
    },
    render: function () {
        return (
            <div className="m-viewphoto-modal">
                <div className="m-viewphoto-mask">
                </div>
                <div className="m-viewphoto-dialog">
                    <img src={this.props.url} onDoubleClick={this.handleDoubleClick}></img>
                </div>
                <a className="m-viewphoto-close">
                    <img src={_g.surl + 'close2.png'} alt="Icon shot x light" onClick={this.handleClose}></img>
                </a>
            </div>
        );
    }
});

module.exports = ViewPhoto;

