/**
 * Created by hujiabao on 12/8/15.
 */


var CommentBox = React.createClass({
   render: function(){
       return (
           <div className="commentBox">
               Hello, world! I am a CommentBox
           </div>
       );
   }
});


ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);