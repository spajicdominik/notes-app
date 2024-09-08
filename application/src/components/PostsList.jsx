import React from 'react';
import Post from './Post';
import { BsFillTrashFill } from "react-icons/bs";
import classes from './PostsList.module.css';

function PostsList({ postsArray }) {
  const handleDelete = (id) => {
    console.log('Delete post with id:', id);
    // Add logic to delete post
  };

  return (
    <div className="col-md-6 col-12">
      {postsArray.map((post) => (
        <div className={classes.postContainer} key={post._id}>
          <Post author={post.author} body={post.body} />
          <BsFillTrashFill 
            className={classes.trashIcon} 
            onClick={() => handleDelete(post._id)} 
          />
        </div>
      ))}
    </div>
  );
}

export default PostsList;
