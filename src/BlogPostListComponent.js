import React from 'react';
import BlogPost from './BlogPostComponent'

class BlogPostList extends React.Component{

    constructor(props){

        super(props);

    }

    componentDidMount(){

        this.props.getPosts();
    }

    render(){
        let postitems = this.props.posts.map(item => {
            return (
              <BlogPost
                key={item._id}
                post={item}
                postUpdateCallback={this.props.updatePostState}
              />
            );
          });

          return(<>{postitems}</>)
    }


}

export default BlogPostList