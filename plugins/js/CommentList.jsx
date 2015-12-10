/**
 * Created by hujiabao on 12/8/15.
 */

var CommentList = React.createClass({
    render: function() {

        var commentNotes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author} key={comment.id}>
                 {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
        return {commentNotes}
            </div>
        );
    }
});

export default CommentList;

