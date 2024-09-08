import classes from "./PostsList.module.css";
import Post from "./Post";
import { useState } from "react";

function PostsList({name, author, postsArray}) {
  return (
      <div className="col-md-6 col-12">
        {postsArray.map((post) => <Post author={post.author} body={post.body} key={post.body}></Post>)}
      </div>
  );
}

export default PostsList;
