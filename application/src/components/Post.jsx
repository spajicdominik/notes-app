import classes from "./Post.module.css";
import { BsFillTrashFill } from "react-icons/bs";

function Post({author, body, postKey}) {
  return (
    <div className="col" key={postKey}>
      <div className={classes.post}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </div>
    </div>
  );
}

export default Post;
