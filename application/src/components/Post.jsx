import classes from "./Post.module.css";

function Post({author, body}) {
  const chosenName = "Dominik";
  return (
    <div className="col">
      <div className={classes.post}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </div>
    </div>
  );
}

export default Post;
